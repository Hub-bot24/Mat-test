
// Helper: number from input (treat blank/invalid as 0)
function nval(el){ const v = (el.value||'').trim(); const x = Number(v); return isFinite(x) ? x : 0; }

// --- KEY DATES ---
(function(){
  const start = document.getElementById('workStart');
  const end   = document.getElementById('workEnd');
  const guar  = document.getElementById('guaranteed');
  const conf  = document.getElementById('conformed');

  if(start){
    start.addEventListener('change', ()=>{
      // Only auto-fill End & Guaranteed if they are blank
      if(end && !end.value) end.value = start.value;
      if(guar && !guar.value) guar.value = start.value;
      // Conformed stays blank unless set by the user
    });
  }
})();

// --- TOTAL LITRES = Bitumen + Kerosene + Additive ---
(function(){
  const bit = document.getElementById('bitumen');
  const ker = document.getElementById('kerosene');
  const add = document.getElementById('additive');
  const tot = document.getElementById('totalLitres');

  function recalc(){
    if(!(bit && ker && add && tot)) return;
    const s = nval(bit) + nval(ker) + nval(add);
    tot.value = s ? (Math.round(s*100)/100).toString() : '';
  }
  ['input','change','blur'].forEach(ev=>{
    [bit,ker,add].forEach(el=> el && el.addEventListener(ev,recalc));
  });
  recalc();
})();

// --- TRI-STATE attachments (blank -> check -> cross -> blank) ---
(function(){
  document.querySelectorAll('.tri').forEach(item=>{
    item.addEventListener('click',()=>{
      const state = item.getAttribute('data-state') || '';
      const next = state === '' ? 'check' : (state === 'check' ? 'cross' : '');
      item.setAttribute('data-state', next);
      const hidden = item.querySelector('input[type="hidden"]');
      if(hidden) hidden.value = next; // store "check" or "cross" or ""
    });
  });
})();

// --- Nav between pages ---
function goPage(p){ location.href = p; }

// --- Simple print ---
function pdf(){ window.print(); }

// --- PAGE 6 logic (Mat Test) ---
function two(n){ return (Math.round(n*100)/100).toFixed(2); }
function calcSpread(){
  const m1 = Number(document.getElementById('m1').value || 0);
  const m2 = Number(document.getElementById('m2').value || 0);
  const a  = Number(document.getElementById('area').value || 0);
  const dl = Number(document.getElementById('dl').value || 0);
  const r1El = document.getElementById('r1');
  const r2El = document.getElementById('r2');

  if(!m1 && !m2 && !a){ r1El.value=''; r2El.value=''; return; }
  if(a<=0){ r1El.value=''; r2El.value=''; return; }

  const r1 = (m1 - m2) / a; // kg/m²
  if(!isFinite(r1) || r1<=0){ r1El.value=''; r2El.value=''; return; }
  r1El.value = two(r1);

  const r2 = 1000 * dl / r1; // m²/m³
  r2El.value = isFinite(r2) ? two(r2) : '';
}
function resetCalc(){
  ['m1','m2','area','dl','r1','r2'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value='';
  });
}
