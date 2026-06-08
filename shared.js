// ===== SHARED CONFIG =====
const SUPABASE_URL = 'https://jtsifootrchbsgrldfxk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0c2lmb290cmNoYnNncmxkZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzM4MjEsImV4cCI6MjA5NjUwOTgyMX0.GvpAsYR2LO8aXAw6y-oyrGRe0aj2neneVFFs5BmLrv8';

// ===== SHARED UTILS =====
function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
