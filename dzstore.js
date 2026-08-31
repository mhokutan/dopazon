// ===== DOPAZON USER STORE =====
// One place that decides where a user's data lives.
//
// Signed out -> localStorage, so the site works with no account at all.
// Signed in  -> Supabase, so orders, savings, wishlist and streak survive
//               closing the tab and switching device.
// On the first sign-in we copy whatever is sitting in localStorage up to the
// account, so nobody loses the history they built up as a guest.

const DZ = (() => {
  const K = { orders: 'dz_orders', wish: 'dz_wishlist', streak: 'dz_streak', lastDrop: 'dz_last_drop', merged: 'dz_merged_for' };

  let sb = null;
  let user = null;
  const listeners = [];

  const lsGet = (k, fallback) => {
    try { return JSON.parse(localStorage.getItem(k) || fallback); } catch (e) { return JSON.parse(fallback); }
  };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  function emit() { listeners.forEach(fn => { try { fn(user); } catch (e) {} }); }

  /** Wire the store to a Supabase client. Safe to call on every page. */
  async function init(client) {
    sb = client;
    try {
      const { data: { session } } = await sb.auth.getSession();
      user = session?.user || null;
      if (user) await mergeLocalIntoAccount();
    } catch (e) { user = null; }
    emit();
    sb.auth.onAuthStateChange(async (_e, session) => {
      const was = user?.id;
      user = session?.user || null;
      if (user && user.id !== was) await mergeLocalIntoAccount();
      emit();
    });
    return user;
  }

  function onUser(fn) { listeners.push(fn); if (user !== undefined) fn(user); }
  const currentUser = () => user;
  const signedIn = () => !!user;

  // ---- first sign-in migration -------------------------------------------
  // Guests build up orders and a wishlist in localStorage. The first time they
  // sign in we push that up, then remember we did it so it never doubles.
  async function mergeLocalIntoAccount() {
    if (!user) return;
    if (localStorage.getItem(K.merged) === user.id) return;
    try {
      const localOrders = lsGet(K.orders, '[]');
      if (localOrders.length) {
        const rows = localOrders.map(o => ({
          user_id: user.id,
          ref: o.id || null,
          saved: Number(o.saved) || 0,
          items: o.items || [],
          placed_at: o.placedAt ? new Date(o.placedAt).toISOString() : new Date().toISOString()
        }));
        await sb.from('orders').insert(rows);
      }
      const localWish = lsGet(K.wish, '[]').filter(w => w && typeof w === 'object' && w.id);
      if (localWish.length) {
        const rows = localWish.map(w => ({ user_id: user.id, product_id: String(w.id), item: w }));
        // ignore duplicates rather than failing the whole merge
        await sb.from('wishlist').upsert(rows, { onConflict: 'user_id,product_id', ignoreDuplicates: true });
      }
      const streak = parseInt(localStorage.getItem(K.streak) || '0', 10);
      if (streak > 0) {
        await sb.from('profiles').update({ streak, last_drop: localStorage.getItem(K.lastDrop) || null }).eq('id', user.id);
      }
      localStorage.setItem(K.merged, user.id);
    } catch (e) {
      // A failed merge must never block the page; the local copy stays put.
      console.warn('dzstore: merge skipped', e?.message || e);
    }
  }

  // ---- orders -------------------------------------------------------------
  async function getOrders() {
    if (!signedIn()) return lsGet(K.orders, '[]');
    const { data, error } = await sb.from('orders').select('*').order('placed_at', { ascending: false }).limit(100);
    if (error) return lsGet(K.orders, '[]');
    return (data || []).map(r => ({
      id: r.ref || r.id.slice(0, 8).toUpperCase(),
      placedAt: new Date(r.placed_at).getTime(),
      saved: r.saved,
      items: r.items || []
    }));
  }

  async function addOrder(order) {
    // always keep the local copy so a signed-out tab still shows the order
    const local = lsGet(K.orders, '[]');
    local.unshift(order);
    lsSet(K.orders, local.slice(0, 50));
    if (!signedIn()) return;
    try {
      await sb.from('orders').insert({
        user_id: user.id, ref: order.id, saved: Number(order.saved) || 0,
        items: order.items || [], placed_at: new Date(order.placedAt || Date.now()).toISOString()
      });
    } catch (e) { console.warn('dzstore: order not synced', e?.message || e); }
  }

  // ---- wishlist -----------------------------------------------------------
  async function getWishlist() {
    if (!signedIn()) return lsGet(K.wish, '[]').filter(w => w && typeof w === 'object');
    const { data, error } = await sb.from('wishlist').select('*').order('added_at', { ascending: false });
    if (error) return lsGet(K.wish, '[]').filter(w => w && typeof w === 'object');
    return (data || []).map(r => ({ ...r.item, id: r.product_id, addedAt: new Date(r.added_at).getTime() }));
  }

  /** Adds if missing, removes if present. Resolves to true when it was added. */
  async function toggleWishlist(item) {
    const local = lsGet(K.wish, '[]').filter(w => w && typeof w === 'object');
    const idx = local.findIndex(w => w.id === item.id);
    const adding = idx === -1;
    if (adding) local.push({ ...item, addedAt: Date.now() }); else local.splice(idx, 1);
    lsSet(K.wish, local);

    if (signedIn()) {
      try {
        if (adding) {
          await sb.from('wishlist').upsert(
            { user_id: user.id, product_id: String(item.id), item },
            { onConflict: 'user_id,product_id', ignoreDuplicates: true });
        } else {
          await sb.from('wishlist').delete().eq('user_id', user.id).eq('product_id', String(item.id));
        }
      } catch (e) { console.warn('dzstore: wishlist not synced', e?.message || e); }
    }
    return adding;
  }

  async function removeWishlist(productId) {
    const local = lsGet(K.wish, '[]').filter(w => w && typeof w === 'object' && w.id !== productId);
    lsSet(K.wish, local);
    if (!signedIn()) return;
    try { await sb.from('wishlist').delete().eq('user_id', user.id).eq('product_id', String(productId)); }
    catch (e) { console.warn('dzstore: wishlist delete not synced', e?.message || e); }
  }

  async function clearWishlist() {
    lsSet(K.wish, []);
    if (!signedIn()) return;
    try { await sb.from('wishlist').delete().eq('user_id', user.id); } catch (e) {}
  }

  // ---- streak -------------------------------------------------------------
  /** Records today's visit and returns the running streak. */
  async function checkInStreak() {
    const today = new Date().toDateString();
    if (!signedIn()) {
      let streak = parseInt(localStorage.getItem(K.streak) || '0', 10);
      if (localStorage.getItem(K.lastDrop) !== today) {
        streak += 1;
        localStorage.setItem(K.streak, String(streak));
        localStorage.setItem(K.lastDrop, today);
      }
      return streak;
    }
    try {
      const { data } = await sb.from('profiles').select('streak,last_drop').eq('id', user.id).maybeSingle();
      const todayIso = new Date().toISOString().slice(0, 10);
      let streak = data?.streak || 0;
      if (data?.last_drop !== todayIso) {
        const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        // consecutive day continues the run, a gap starts it over at 1
        streak = data?.last_drop === yest ? streak + 1 : 1;
        await sb.from('profiles').update({ streak, last_drop: todayIso }).eq('id', user.id);
      }
      localStorage.setItem(K.streak, String(streak));
      localStorage.setItem(K.lastDrop, today);
      return streak;
    } catch (e) {
      return parseInt(localStorage.getItem(K.streak) || '0', 10);
    }
  }

  // ---- the number the whole site is about ---------------------------------
  async function savingsSummary() {
    const orders = await getOrders();
    const wish = await getWishlist();
    const cart = lsGet('dz_cart', '[]');
    const totalSaved = orders.reduce((s, o) => s + (Number(o.saved) || 0), 0);
    const itemCount = orders.reduce((s, o) => s + (o.items?.length || 0), 0);
    const since = orders.length ? Math.min(...orders.map(o => o.placedAt)) : null;
    return { orders: orders.length, totalSaved, itemCount, wishlist: wish.length, cart: cart.length, since };
  }

  return { init, onUser, currentUser, signedIn,
           getOrders, addOrder,
           getWishlist, toggleWishlist, removeWishlist, clearWishlist,
           checkInStreak, savingsSummary };
})();
