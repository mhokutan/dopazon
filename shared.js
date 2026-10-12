// ===== SHARED CONFIG =====
const SUPABASE_URL = 'https://jtsifootrchbsgrldfxk.supabase.co';
// Publishable key (new Supabase API keys). Public by design — RLS is what
// protects the data. Replaced the legacy anon JWT so the legacy keys, one of
// which leaked, can be disabled without taking the site down.
const SUPABASE_KEY = 'sb_publishable_Z5U1ezNeqISFqmrCEs1ItQ_HxX3J-o9';
// Same pinned build + SRI as the <script> tags in the pages (and the CSP).
const SUPABASE_JS_SRC = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
const SUPABASE_JS_SRI = 'sha384-Rj26LVGvoeRVR6+mwQmFfcR3QOBEwT+ZmuCWpuiqeTzJpCs0ER4ITAWGb4Hiy3Ok';

// ===== SHARED UTILS =====
function escHtml(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;')
    .replace(/`/g,'&#96;');
}

// Brand names users may not put in store or product names. Shared by every
// page that lets a user name something (shop.html, mystore.html).
const TRADEMARKS = ['nike','apple','samsung','amazon','google','microsoft','sony','disney','netflix','adidas','gucci','prada','chanel','louis vuitton','hermes','rolex','tesla','walmart','zara','lululemon','peloton'];
function dzHasTrademark(s){
  const v=String(s||'').toLowerCase();
  return TRADEMARKS.some(t=>v.includes(t));
}

// Product categories a user can pick, with the emoji used when a product has
// none of its own.
const DZ_CATEGORY_EMOJI = {fashion:'👗',electronics:'📱',beauty:'💄',home:'🏠',kitchen:'🍳',sports:'🏃',pets:'🐾',food:'🛒',health:'💊',toys:'🧸',gaming:'🎮',baby:'👶',books:'📚',tools:'🔧',automotive:'🚗',garden:'🌱',office:'🖊️',travel:'🧳',music:'🎸',art:'🎨'};

// Safe image-load fallback: replaces only the broken <img> with its emoji
// (read from data-emoji). No user data is ever placed inside inline JS, which
// prevents XSS via product img/emoji. Replacing just the element (not the
// parent's contents) keeps sibling nodes like titles intact.
function imgFallback(el){
  const emoji = el.getAttribute('data-emoji') || '📦';
  const span = document.createElement('span');
  span.textContent = emoji;
  el.replaceWith(span);
}

function launchConfetti(){
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors=['#FF9900','#FFD814','#00A8E0','#CC0C39','#067D62','#fff'];
  for(let i=0;i<30;i++){
    const c=document.createElement('div');
    c.className='confetti-piece';
    c.style.cssText=`left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*0.5}s;animation-duration:${1+Math.random()}s;`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),2000);
  }
}

let _dzToastTimer=null;
function showToast(msg, duration=2500){
  const t=document.getElementById('cartToast');
  if(!t)return;
  t.setAttribute('role','status');
  t.innerHTML=msg;
  t.style.display='block';
  clearTimeout(_dzToastTimer);
  _dzToastTimer=setTimeout(()=>t.style.display='none',duration);
}

// "Added to cart" toast with a way forward: the free checkout.
function dzAddedToast(msg){
  showToast(msg+' <a href="shop.html?cart=1" class="toast-cta">Check out free →</a>', 5000);
}
// On the shop page the cart is a panel, so open it instead of reloading.
document.addEventListener('click', e=>{
  const a=e.target.closest && e.target.closest('.toast-cta');
  if(a && typeof window.openCheckout==='function'){ e.preventDefault(); window.openCheckout(); }
});

function updateCartCount(){
  const cart=JSON.parse(localStorage.getItem('dz_cart')||'[]');
  const el=document.getElementById('cartCount');
  if(el)el.textContent=cart.length;
}

// ===== FEEDBACK + SUGGEST WIDGET =====
(function injectFeedbackWidget(){
  const style=document.createElement('style');
  style.textContent=`
    #dz-feedback-btn{position:fixed;bottom:24px;right:24px;z-index:9999;background:#131921;color:#FF9900;border:none;border-radius:50px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.35);display:flex;align-items:center;gap:6px;transition:transform 0.15s;}
    #dz-feedback-btn:hover{transform:scale(1.06);background:#1a252f;}
    #dz-fb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:10000;align-items:center;justify-content:center;}
    #dz-fb-overlay.open{display:flex;}
    #dz-fb-modal{background:#fff;border-radius:8px;padding:28px;width:100%;max-width:420px;margin:16px;box-shadow:0 8px 40px rgba(0,0,0,0.25);}
    #dz-fb-modal h2{font-size:18px;font-weight:700;margin-bottom:4px;color:#131921;}
    #dz-fb-modal p{font-size:13px;color:#555;margin-bottom:16px;}
    .dz-tab-row{display:flex;gap:0;margin-bottom:18px;border:1px solid #ddd;border-radius:6px;overflow:hidden;}
    .dz-tab{flex:1;padding:9px;font-size:13px;font-weight:600;cursor:pointer;background:#f7f7f7;border:none;transition:background 0.15s;}
    .dz-tab.active{background:#131921;color:#FF9900;}
    .dz-stars{display:flex;gap:6px;margin-bottom:14px;}
    .dz-star{font-size:28px;cursor:pointer;color:#ddd;transition:color 0.1s;background:none;border:none;padding:0 2px;line-height:1;}
    .dz-star.lit{color:#FF9900;}
    #dz-fb-modal textarea,#dz-fb-modal input,#dz-fb-modal select{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;padding:10px;font-size:13px;font-family:inherit;margin-bottom:10px;resize:vertical;}
    #dz-fb-modal textarea{height:90px;}
    #dz-fb-submit{width:100%;background:#FFD814;border:1px solid #FCD200;border-radius:4px;padding:11px;font-size:15px;font-weight:700;cursor:pointer;margin-top:4px;}
    #dz-fb-submit:hover{background:#F7CA00;}
    #dz-fb-cancel{width:100%;background:none;border:none;color:#007185;font-size:13px;cursor:pointer;margin-top:8px;padding:4px;}
    #dz-fb-success{text-align:center;padding:20px 0;display:none;}
    #dz-fb-success .dz-big-check{font-size:52px;margin-bottom:10px;}
  `;
  document.head.appendChild(style);

  const html=`
    <button type="button" id="dz-feedback-btn" aria-haspopup="dialog">💬 Feedback</button>
    <div id="dz-fb-overlay" data-dz-dialog="dzCloseFb">
      <div id="dz-fb-modal" role="dialog" aria-modal="true" aria-labelledby="dz-fb-title">
        <h2 id="dz-fb-title">Share your thoughts</h2>
        <p>Help us improve Dopazon — your fake shopping paradise 🛒</p>
        <div class="dz-tab-row">
          <button type="button" class="dz-tab active" aria-pressed="true" onclick="dzSwitchTab('feedback',this)">💬 Feedback</button>
          <button type="button" class="dz-tab" aria-pressed="false" onclick="dzSwitchTab('suggest',this)">💡 Suggest a Product</button>
        </div>

        <div id="dz-tab-feedback">
          <div class="dz-stars" id="dzStars" role="group" aria-label="Rating">
            <button type="button" class="dz-star" data-v="1" aria-label="1 star" aria-pressed="false" onclick="dzSetStar(1)">★</button>
            <button type="button" class="dz-star" data-v="2" aria-label="2 stars" aria-pressed="false" onclick="dzSetStar(2)">★</button>
            <button type="button" class="dz-star" data-v="3" aria-label="3 stars" aria-pressed="false" onclick="dzSetStar(3)">★</button>
            <button type="button" class="dz-star" data-v="4" aria-label="4 stars" aria-pressed="false" onclick="dzSetStar(4)">★</button>
            <button type="button" class="dz-star" data-v="5" aria-label="5 stars" aria-pressed="false" onclick="dzSetStar(5)">★</button>
          </div>
          <textarea id="dz-fb-msg" aria-label="Your feedback" maxlength="2000" placeholder="What do you love? What's missing? Any bugs?"></textarea>
        </div>

        <div id="dz-tab-suggest" style="display:none;">
          <input id="dz-sg-name" type="text" aria-label="Product name" maxlength="120" placeholder="Product name (e.g. noise-cancelling earbuds)">
          <select id="dz-sg-cat" aria-label="Category">
            <option value="">— Category —</option>
            <option>fashion</option><option>electronics</option><option>beauty</option>
            <option>home</option><option>kitchen</option><option>sports</option>
            <option>pets</option><option>food</option><option>health</option>
            <option>toys</option><option>gaming</option><option>baby</option>
            <option>books</option><option>tools</option><option>automotive</option>
            <option>garden</option><option>office</option><option>travel</option>
            <option>music</option><option>art</option>
          </select>
          <textarea id="dz-sg-reason" aria-label="Why should Dopazon carry this" maxlength="1000" placeholder="Why should Dopazon carry this? (optional)"></textarea>
        </div>

        <div id="dz-fb-err" role="alert" style="display:none;color:#CC0C39;font-size:13px;margin-bottom:8px;"></div>
        <div id="dz-fb-success" role="status">
          <div class="dz-big-check">🎉</div>
          <strong style="font-size:16px;">Thanks! We got it.</strong>
          <p style="color:#555;font-size:13px;margin-top:6px;">Your dopamine contribution has been recorded.</p>
        </div>

        <button id="dz-fb-submit" onclick="dzSubmitFeedback()">Send →</button>
        <button id="dz-fb-cancel" onclick="dzCloseFb()">Cancel</button>
      </div>
    </div>
  `;
  const wrap=document.createElement('div');
  wrap.innerHTML=html;
  document.body.appendChild(wrap);

  document.getElementById('dz-feedback-btn').onclick=()=>document.getElementById('dz-fb-overlay').classList.add('open');
  document.getElementById('dz-fb-overlay').onclick=e=>{if(e.target===e.currentTarget)dzCloseFb();};
})();

let _dzStar=0;
let _dzTab='feedback';

function dzCloseFb(){
  document.getElementById('dz-fb-overlay').classList.remove('open');
  document.getElementById('dz-fb-err').style.display='none';
  document.getElementById('dz-fb-success').style.display='none';
  const sub=document.getElementById('dz-fb-submit');
  sub.style.display=''; sub.disabled=false; sub.textContent='Send →';
  document.getElementById('dz-fb-cancel').style.display='';
  document.getElementById('dz-fb-cancel').textContent='Cancel';
  document.getElementById('dz-fb-msg') && (document.getElementById('dz-fb-msg').value='');
  document.getElementById('dz-sg-name') && (document.getElementById('dz-sg-name').value='');
  document.getElementById('dz-sg-reason') && (document.getElementById('dz-sg-reason').value='');
  _dzStar=0; dzSetStar(0);
}

function dzSwitchTab(tab, btn){
  _dzTab=tab;
  document.querySelectorAll('.dz-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.dz-tab').forEach(t=>t.setAttribute('aria-pressed', t===btn?'true':'false'));
  document.getElementById('dz-tab-feedback').style.display=tab==='feedback'?'':'none';
  document.getElementById('dz-tab-suggest').style.display=tab==='suggest'?'':'none';
}

function dzSetStar(n){
  _dzStar=n;
  document.querySelectorAll('.dz-star').forEach(s=>{
    s.classList.toggle('lit', parseInt(s.dataset.v)<=n);
    s.setAttribute('aria-pressed', parseInt(s.dataset.v)===n ? 'true' : 'false');
  });
}

// The dopa*.html pages do not load supabase-js, so the widget used to throw
// on `supabase` there and drop the message. Load it on demand instead.
let _dzFbClient=null;
function dzFeedbackClient(){
  if(_dzFbClient) return _dzFbClient;
  const make=()=>window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
  _dzFbClient = window.supabase ? Promise.resolve(make()) : new Promise((resolve,reject)=>{
    const sc=document.createElement('script');
    sc.src=SUPABASE_JS_SRC; sc.integrity=SUPABASE_JS_SRI; sc.crossOrigin='anonymous';
    sc.onload=()=>window.supabase?resolve(make()):reject(new Error('supabase-js missing'));
    sc.onerror=()=>reject(new Error('could not load supabase-js'));
    document.head.appendChild(sc);
  });
  _dzFbClient.catch(()=>{_dzFbClient=null;});
  return _dzFbClient;
}

async function dzSubmitFeedback(){
  const btn=document.getElementById('dz-fb-submit');
  const errEl=document.getElementById('dz-fb-err');
  errEl.style.display='none';
  btn.textContent='Sending…'; btn.disabled=true;
  try {
    const sb=await dzFeedbackClient();
    let res;
    if(_dzTab==='feedback'){
      const msg=document.getElementById('dz-fb-msg').value.trim();
      if(!msg){
        btn.textContent='Send →';btn.disabled=false;
        document.getElementById('dz-fb-msg').style.borderColor='#CC0C39';
        document.getElementById('dz-fb-msg').placeholder='Please write something first!';
        return;
      }
      document.getElementById('dz-fb-msg').style.borderColor='';
      res=await sb.from('feedback').insert({message:msg,page:location.pathname,rating:_dzStar||null});
    } else {
      const name=document.getElementById('dz-sg-name').value.trim();
      if(!name){
        btn.textContent='Send →';btn.disabled=false;
        document.getElementById('dz-sg-name').style.borderColor='#CC0C39';
        document.getElementById('dz-sg-name').placeholder='Product name is required!';
        return;
      }
      document.getElementById('dz-sg-name').style.borderColor='';
      const cat=document.getElementById('dz-sg-cat').value;
      const reason=document.getElementById('dz-sg-reason').value.trim();
      res=await sb.from('suggestions').insert({product_name:name,category:cat||null,reason:reason||null});
    }
    // supabase-js returns {error} instead of throwing
    if(res.error) throw res.error;
    document.getElementById('dz-fb-success').style.display='block';
    btn.style.display='none';
    document.getElementById('dz-fb-cancel').textContent='Close';
    setTimeout(dzCloseFb,3000);
  } catch(e){
    btn.textContent='Send →'; btn.disabled=false;
    errEl.textContent='Sorry, that did not send. Please try again in a moment.';
    errEl.style.display='block';
  }
}

// ===== DIALOGS =====
// Overlays marked data-dz-dialog="<name of their close function>" get the
// basics a modal needs: focus moves in when it opens, Tab stays inside,
// Escape closes it, and focus goes back where it was afterwards.
(function(){
  const FOCUSABLE='a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const returnTo=new Map();
  const isOpen=o=>getComputedStyle(o).display!=='none';
  const focusables=o=>[...o.querySelectorAll(FOCUSABLE)].filter(e=>e.offsetParent!==null);
  function watch(o){
    let was=isOpen(o);
    new MutationObserver(()=>{
      const now=isOpen(o); if(now===was) return; was=now;
      if(now){
        returnTo.set(o,document.activeElement);
        const f=focusables(o); const first=f.find(e=>/INPUT|TEXTAREA/.test(e.tagName))||f[0];
        if(first) first.focus();
      } else {
        const prev=returnTo.get(o); returnTo.delete(o);
        if(prev && prev.focus && document.contains(prev)) prev.focus();
      }
    }).observe(o,{attributes:true,attributeFilter:['class','style']});
  }
  document.addEventListener('keydown',e=>{
    const open=[...document.querySelectorAll('[data-dz-dialog]')].filter(isOpen).pop();
    if(!open) return;
    if(e.key==='Escape'){
      const close=window[open.getAttribute('data-dz-dialog')];
      if(typeof close==='function'){ e.preventDefault(); close(); }
    } else if(e.key==='Tab'){
      const f=focusables(open); if(!f.length) return;
      const first=f[0], last=f[f.length-1];
      if(!open.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
      else if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  const init=()=>document.querySelectorAll('[data-dz-dialog]').forEach(watch);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
