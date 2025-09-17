// Simple storage helpers
const SKEY = 'mtp_page_data_v3';
const store = {
  get() { try { return JSON.parse(localStorage.getItem(SKEY) || '{}'); } catch(e){ return {}; } },
  set(d) { localStorage.setItem(SKEY, JSON.stringify(d)); }
};

// Register SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try { await navigator.serviceWorker.register('service-worker.js?v=40'); } catch(e){}
  });
}

// Page detection
const isPage6 = location.pathname.endsWith('page6.html');

// Tri-state buttons on Page 1
function initTri() {
  document.querySelectorAll('.tri').forEach(btn => {
    const key = 'tri_' + btn.dataset.key;
    let state = (store.get()[key] ?? 0) | 0; // 0 blank, 1 tick, 2 cross
    applyTri(btn, state);
    btn.addEventListener('click', () => {
      state = (state + 1) % 3;
      applyTri(btn, state);
      const data = store.get(); data[key] = state; store.set(data);
    });
  });
}
function applyTri(btn, s){
  btn.classList.remove('tick','cross');
  if (s === 1) { btn.textContent = '✔'; btn.classList.add('tick'); }
  else if (s === 2) { btn.textContent = '✖'; btn.classList.add('cross'); }
  else { btn.textContent = '□'; }
}

// Sync inputs to storage
function bindInputs(map){
  const data = store.get();
  for (const [id, def] of map) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (data[id] != null) el.value = data[id];
    el.addEventListener('input', () => { const d = store.get(); d[id]=el.value; store.set(d); });
  }
}

// Autofill logic for dates: WorkStart copies to WorkEnd + Guaranteed if empty
function initDates(){
  const ws = document.getElementById('workStart');
  const we = document.getElementById('workEnd');
  const gu = document.getElementById('guaranteed');
  if (ws && we && gu) {
    ws.addEventListener('change', () => {
      if (!we.value) we.value = ws.value;
      if (!gu.value) gu.value = ws.value;
      const d = store.get(); d['workEnd']=we.value; d['guaranteed']=gu.value; d['workStart']=ws.value; store.set(d);
    });
  }
}

// PDF (print) handler
function initPDF(btnId='pdf'){
  const b = document.getElementById(btnId);
  if (!b) return;
  b.addEventListener('click', () => window.print());
}

// Clear / Reset
function initReset(){
  const r = document.getElementById('reset');
  if (!r) return;
  r.addEventListener('click', () => {
    if (!confirm('Clear all saved values?')) return;
    localStorage.removeItem(SKEY);
    location.reload();
  });
}

// Page 6 calculations
function calcR1R2(){
  const m1 = parseFloat(document.getElementById('m1').value);
  const m2 = parseFloat(document.getElementById('m2').value);
  const a  = parseFloat(document.getElementById('a').value);
  const dl = parseFloat(document.getElementById('dl').value);
  let r1 = '', r2 = '';
  if (isFinite(m1) && isFinite(m2) && isFinite(a) && a>0) {
    r1 = ( (m1-m2) / a );
    r1 = isFinite(r1) ? r1.toFixed(2) : '';
  }
  if (r1 && parseFloat(r1)>0 && isFinite(dl)) {
    r2 = (1000 * dl / parseFloat(r1)).toFixed(2);
  } else {
    r2 = '';
  }
  document.getElementById('r1').value = r1;
  document.getElementById('r2').value = r2;
}

function initPage1(){
  initTri();
  bindInputs([
    ['jobNo',''],['projectName',''],['lot',''],['area',''],['bitumen',''],
    ['grade',''],['aggSize',''],['kerosene',''],['additive',''],['totalLitres',''],
    ['description',''],['qaBy',''],['conformedBy',''],['sealBy',''],
    ['workStart',''],['workEnd',''],['guaranteed',''],['notes','']
  ]);
  initDates();
  initPDF();
  initReset();
}

function initPage6(){
  // Prefill job/project from Page1
  const d = store.get();
  const pj = document.getElementById('p6_project');
  const jb = document.getElementById('p6_job');
  if (pj && d.projectName) pj.value = d.projectName;
  if (jb && d.jobNo) jb.value = d.jobNo;
  // values
  bindInputs([['m1',''],['m2',''],['a',''],['dl','']]);
  document.getElementById('calc').addEventListener('click', calcR1R2);
  document.getElementById('clear').addEventListener('click', () => {
    ['m1','m2','a','dl','r1','r2'].forEach(id => {
      const el = document.getElementById(id); if(el) el.value = '';
    });
    const saved = store.get();
    ['m1','m2','a','dl'].forEach(k=> delete saved[k]);
    store.set(saved);
  });
  initPDF();
}

document.addEventListener('DOMContentLoaded', () => {
  if (isPage6) initPage6(); else initPage1();
});
