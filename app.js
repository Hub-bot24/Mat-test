
// ===== Auto-update service worker (network-first for HTML/CSS/JS) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js?v=322', {updateViaCache:'none'});
      // If a new SW is waiting, activate and reload
      if (reg.waiting) { reg.waiting.postMessage({type:'SKIP_WAITING'}); }
      reg.addEventListener('updatefound', () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            sw.postMessage({type:'SKIP_WAITING'});
          }
        });
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => location.reload());
    } catch(e){ /* ignore */ }
  });
}

// ===== Storage helpers =====
const KEYS = ['project','job','m1','m2','a','dl'];
function getVal(id){ const v = document.getElementById(id).value.trim(); return v === '' ? null : parseFloat(v); }
function fmt2(n){ return (Math.round(n*100)/100).toFixed(2); }

function calc(){
  const m1 = getVal('m1'), m2 = getVal('m2'), a = getVal('a'), dl = getVal('dl');
  let r1 = '', r2 = '';
  if (m1!=null && m2!=null && a!=null && a>0) {
    r1 = fmt2( (m1 - m2) / a );
  }
  document.getElementById('r1').value = r1;
  if (dl!=null && r1 && parseFloat(r1)>0) {
    r2 = fmt2( 1000 * dl / parseFloat(r1) );
  }
  document.getElementById('r2').value = r2;
}

function save(e){
  const id = e.target.id;
  localStorage.setItem('mt_' + id, e.target.value);
}
function load(){
  KEYS.forEach(id => {
    const v = localStorage.getItem('mt_' + id);
    if (v !== null) document.getElementById(id).value = v;
  });
  calc();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calc').addEventListener('click', calc);
  document.getElementById('clear').addEventListener('click', () => {
    KEYS.forEach(id => { localStorage.removeItem('mt_' + id); const el = document.getElementById(id); if (el) el.value=''; });
    document.getElementById('r1').value=''; document.getElementById('r2').value='';
  });
  document.getElementById('pdf').addEventListener('click', () => window.print());
  KEYS.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', save);
    el.addEventListener('change', calc);
  });
  load();
});
