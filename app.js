
// ===== Tri-state pills (blank -> tick -> cross) =====
const STATES = ['blank','tick','cross'];
document.querySelectorAll('.pill').forEach(p => {
  p.addEventListener('click', () => {
    const i = STATES.indexOf(p.dataset.state);
    p.dataset.state = STATES[(i+1)%STATES.length];
    p.textContent = p.dataset.state === 'tick' ? '✓' : p.dataset.state === 'cross' ? '✕' : '—';
    save();
  });
});

// ===== Auto: Work Start copies into End & Guaranteed on change (only if empty) =====
const start = document.getElementById('dateStart');
const end   = document.getElementById('dateEnd');
const guar  = document.getElementById('dateGuaranteed');
const conf  = document.getElementById('dateConformed');

start.addEventListener('change', () => {
  if(!end.value) end.value = start.value;
  if(!guar.value) guar.value = start.value;
  save();
});
[end,guar,conf].forEach(el=>el.addEventListener('change', save));

// ===== Total Litres = Bitumen + Kerosene + Additive (2dp, blank if 0 or NaN) =====
const bitumen  = document.getElementById('bitumen');
const kerosene = document.getElementById('kerosene');
const additive = document.getElementById('additive');
const total    = document.getElementById('totalLitres');

function calcTotal(){
  const b = parseFloat(bitumen.value)  || 0;
  const k = parseFloat(kerosene.value) || 0;
  const a = parseFloat(additive.value) || 0;
  const sum = b+k+a;
  total.value = sum>0 ? sum.toFixed(2) : '';
}
[bitumen,kerosene,additive].forEach(el=>el.addEventListener('input', ()=>{ calcTotal(); save(); }));

// ===== Persistence (localStorage) =====
const ids = ['jobNo','projectName','lotNumber','description',
             'dateStart','dateEnd','dateGuaranteed','dateConformed',
             'grade','aggSize','m3','bitumen','kerosene','additive','totalLitres'];

function save(){
  const data = {};
  ids.forEach(id => data[id] = document.getElementById(id)?.value ?? '');
  document.querySelectorAll('.pill').forEach(p => data['pill_'+p.dataset.key] = p.dataset.state);
  localStorage.setItem('coverSheet', JSON.stringify(data));
}
function load(){
  try{
    const data = JSON.parse(localStorage.getItem('coverSheet') || '{}');
    ids.forEach(id => { if(data[id] !== undefined) document.getElementById(id).value = data[id]; });
    document.querySelectorAll('.pill').forEach(p => {
      const s = data['pill_'+p.dataset.key] || 'blank';
      p.dataset.state = s;
      p.textContent = s==='tick' ? '✓' : s==='cross' ? '✕' : '—';
    });
    calcTotal();
  }catch(e){ /* ignore */ }
}
load();

// ===== PDF (print) =====
function doPDF(){ window.print(); }
function doReset(){ localStorage.removeItem('coverSheet'); location.reload(); }
