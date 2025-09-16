
const APP_VERSION = 'v2.3.0';

// Persist simple fields & tri-state
const FIELDS = ['jobNo','projectName','lotNumber','description','workStart','workEnd','guaranteed','conformed','shift','grade','aggSize','m3','bitumen','kerosene','additive','totalLitres'];
function save(){ const d={}; FIELDS.forEach(id=>{const el=document.getElementById(id); if(el) d[id]=el.value||'';});
  const tri={}; document.querySelectorAll('.tri').forEach(t=>tri[t.dataset.id]=t.classList.contains('state-1')?1:t.classList.contains('state-2')?2:0);
  d._tri=tri; localStorage.setItem('page1', JSON.stringify(d)); }
function load(){ try{ const d=JSON.parse(localStorage.getItem('page1')||'{}'); Object.entries(d).forEach(([k,v])=>{ if(k==='_tri')return; const el=document.getElementById(k); if(el) el.value=v; });
  if(d._tri) document.querySelectorAll('.tri').forEach(t=>{ const s=d._tri[t.dataset.id]||0; t.classList.toggle('state-1', s===1); t.classList.toggle('state-2', s===2); });
}catch(_){}}

// Mirror dates: Work Start -> End & Guaranteed (only if empty)
function mirrorDates(){ const s=document.getElementById('workStart'); const e=document.getElementById('workEnd'); const g=document.getElementById('guaranteed');
  if(s && s.value){ if(e && !e.value) e.value=s.value; if(g && !g.value) g.value=s.value; } }

// Total Litres = integer sum of Bitumen + Kerosene + Additive
function computeTotal(){ const n=id=>parseFloat(document.getElementById(id)?.value)||0;
  const t=Math.round(n('bitumen')+n('kerosene')+n('additive')); const o=document.getElementById('totalLitres'); if(o) o.value = t ? String(t) : ''; save(); }

// Tri-state toggles
function initTri(){
  document.querySelectorAll('.tri').forEach(el=>{
    el.addEventListener('click', ()=>{ if(el.classList.contains('state-1')){ el.classList.remove('state-1'); el.classList.add('state-2'); }
      else if(el.classList.contains('state-2')){ el.classList.remove('state-2'); }
      else { el.classList.add('state-1'); } save(); });
  });
}

document.addEventListener('input', e=>{ if(['bitumen','kerosene','additive'].includes(e.target.id)) computeTotal(); if(e.target.id==='workStart') mirrorDates(); save(); });
document.addEventListener('DOMContentLoaded', ()=>{ const vb=document.getElementById('version-badge'); if(vb) vb.textContent=APP_VERSION; load(); computeTotal(); initTri(); });

// PDF + Reset
document.getElementById('btnPdf').addEventListener('click', ()=>window.print());
document.getElementById('btnReset').addEventListener('click', ()=>{ if(confirm('Clear all Page 1 fields?')){ localStorage.removeItem('page1'); location.reload(); } });
