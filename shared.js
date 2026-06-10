// ===== SHARED CONFIG =====
const SUPABASE_URL = 'https://jtsifootrchbsgrldfxk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0c2lmb290cmNoYnNncmxkZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzM4MjEsImV4cCI6MjA5NjUwOTgyMX0.GvpAsYR2LO8aXAw6y-oyrGRe0aj2neneVFFs5BmLrv8';

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
  const colors=['#FF9900','#FFD814','#00A8E0','#CC0C39','#067D62','#fff'];
  for(let i=0;i<30;i++){
    const c=document.createElement('div');
    c.className='confetti-piece';
    c.style.cssText=`left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*0.5}s;animation-duration:${1+Math.random()}s;`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),2000);
  }
}

function showToast(msg, duration=2500){
  const t=document.getElementById('cartToast');
  if(!t)return;
  t.innerHTML=msg;
  t.style.display='block';
  setTimeout(()=>t.style.display='none',duration);
}

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
    .dz-tab.active{background:#FF9900;color:#fff;}
    .dz-stars{display:flex;gap:6px;margin-bottom:14px;}
    .dz-star{font-size:28px;cursor:pointer;color:#ddd;transition:color 0.1s;}
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
    <button id="dz-feedback-btn">💬 Feedback</button>
    <div id="dz-fb-overlay">
      <div id="dz-fb-modal">
        <h2>Share your thoughts</h2>
        <p>Help us improve Dopazon — your fake shopping paradise 🛒</p>
        <div class="dz-tab-row">
          <button class="dz-tab active" onclick="dzSwitchTab('feedback',this)">💬 Feedback</button>
          <button class="dz-tab" onclick="dzSwitchTab('suggest',this)">💡 Suggest a Product</button>
        </div>

        <div id="dz-tab-feedback">
          <div class="dz-stars" id="dzStars">
            <span class="dz-star" data-v="1" onclick="dzSetStar(1)">★</span>
            <span class="dz-star" data-v="2" onclick="dzSetStar(2)">★</span>
            <span class="dz-star" data-v="3" onclick="dzSetStar(3)">★</span>
            <span class="dz-star" data-v="4" onclick="dzSetStar(4)">★</span>
            <span class="dz-star" data-v="5" onclick="dzSetStar(5)">★</span>
          </div>
          <textarea id="dz-fb-msg" placeholder="What do you love? What's missing? Any bugs?"></textarea>
        </div>

        <div id="dz-tab-suggest" style="display:none;">
          <input id="dz-sg-name" type="text" placeholder="Product name (e.g. AirPods Pro clone)">
          <select id="dz-sg-cat">
            <option value="">— Category —</option>
            <option>fashion</option><option>electronics</option><option>beauty</option>
            <option>home</option><option>kitchen</option><option>sports</option>
            <option>pets</option><option>food</option><option>health</option>
            <option>toys</option><option>gaming</option><option>baby</option>
            <option>books</option><option>tools</option><option>automotive</option>
            <option>garden</option><option>office</option><option>travel</option>
            <option>music</option><option>art</option>
          </select>
          <textarea id="dz-sg-reason" placeholder="Why should Dopazon carry this? (optional)"></textarea>
        </div>

        <div id="dz-fb-success">
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
  document.getElementById('dz-fb-success').style.display='none';
  document.getElementById('dz-fb-submit').style.display='';
  document.getElementById('dz-fb-cancel').style.display='';
  document.getElementById('dz-fb-msg') && (document.getElementById('dz-fb-msg').value='');
  document.getElementById('dz-sg-name') && (document.getElementById('dz-sg-name').value='');
  document.getElementById('dz-sg-reason') && (document.getElementById('dz-sg-reason').value='');
  _dzStar=0; dzSetStar(0);
}

function dzSwitchTab(tab, btn){
  _dzTab=tab;
  document.querySelectorAll('.dz-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('dz-tab-feedback').style.display=tab==='feedback'?'':'none';
  document.getElementById('dz-tab-suggest').style.display=tab==='suggest'?'':'none';
}

function dzSetStar(n){
  _dzStar=n;
  document.querySelectorAll('.dz-star').forEach(s=>{
    s.classList.toggle('lit', parseInt(s.dataset.v)<=n);
  });
}

async function dzSubmitFeedback(){
  const btn=document.getElementById('dz-fb-submit');
  btn.textContent='Sending…'; btn.disabled=true;
  try {
    const { createClient } = supabase;
    const sb=createClient(SUPABASE_URL,SUPABASE_KEY);
    if(_dzTab==='feedback'){
      const msg=document.getElementById('dz-fb-msg').value.trim();
      if(!msg){
        btn.textContent='Send →';btn.disabled=false;
        document.getElementById('dz-fb-msg').style.borderColor='#CC0C39';
        document.getElementById('dz-fb-msg').placeholder='Please write something first!';
        return;
      }
      document.getElementById('dz-fb-msg').style.borderColor='';
      await sb.from('feedback').insert({message:msg,page:location.pathname,rating:_dzStar||null});
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
      await sb.from('suggestions').insert({product_name:name,category:cat||null,reason:reason||null});
    }
    document.getElementById('dz-fb-success').style.display='block';
    btn.style.display='none';
    document.getElementById('dz-fb-cancel').textContent='Close';
    setTimeout(dzCloseFb,3000);
  } catch(e){
    btn.textContent='Send →'; btn.disabled=false;
  }
}
