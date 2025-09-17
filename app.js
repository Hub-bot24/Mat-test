
// No service worker — instant updates on desktop every reload.
const SKEY = 'mtp_data_v324';
const getStore = () => { try { return JSON.parse(localStorage.getItem(SKEY)||'{}'); } catch(e){ return {}; } };
const setStore = (d) => localStorage.setItem(SKEY, JSON.stringify(d));

function bindInputs(ids){
  const data = getStore();
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    if(data[id]!==undefined) el.value = data[id];
    el.addEventListener('input', ()=>{ const d=getStore(); d[id]=el.value; setStore(d); });
  });
}
function initPDF(btnId){ const b=document.getElementById(btnId); if(b) b.addEventListener('click', ()=>window.print()); }
function initReset(btnId, keys){
  const r=document.getElementById(btnId);
  if(!r) return;
  r.addEventListener('click', ()=>{
    if(!confirm('Clear all saved values?')) return;
    const d=getStore();
    keys.forEach(k=> delete d[k]);
    setStore(d);
    location.reload();
  });
}
// Tri-state
function applyTri(btn, s){
  btn.classList.remove('tick','cross');
  if (s===1){ btn.textContent='✔'; btn.classList.add('tick'); }
  else if (s===2){ btn.textContent='✖'; btn.classList.add('cross'); }
  else { btn.textContent='□'; }
}
function initTri(){
  document.querySelectorAll('.tri').forEach(btn=>{
    const key='tri_'+btn.dataset.key;
    let s=(getStore()[key] ?? 0)|0;
    applyTri(btn,s);
    btn.addEventListener('click', ()=>{
      s=(s+1)%3; applyTri(btn,s);
      const d=getStore(); d[key]=s; setStore(d);
    });
  });
}

// Page 1
function initPage1(){
  bindInputs(['jobNo','projectName','lot','area','bitumen','grade','aggSize','kerosene','additive','totalLitres','description','qaBy','conformedBy','sealBy','workStart','workEnd','guaranteed','notes']);
  // Auto-copy Work Start → End/Guaranteed if blank
  const ws=document.getElementById('workStart');
  const we=document.getElementById('workEnd');
  const gu=document.getElementById('guaranteed');
  if(ws && we && gu){
    ws.addEventListener('change', ()=>{
      const d=getStore();
      if(!we.value){ we.value=ws.value; d['workEnd']=we.value; }
      if(!gu.value){ gu.value=ws.value; d['guaranteed']=gu.value; }
      d['workStart']=ws.value; setStore(d);
    });
  }
  initTri();
  initPDF('pdf1');
  initReset('reset1',['jobNo','projectName','lot','area','bitumen','grade','aggSize','kerosene','additive','totalLitres','description','qaBy','conformedBy','sealBy','workStart','workEnd','guaranteed','notes','tri_qvc','tri_spray','tri_memo','tri_ball','tri_photos','tri_agg','tri_docket','tri_tins','tri_ncrs']);
}

// Page 6
function fix2(n){return (Math.round(n*100)/100).toFixed(2);}
function num(id){const el=document.getElementById(id); if(!el) return null; const t=el.value.trim(); return t===''?null:parseFloat(t);}
function setVal(id,v){const el=document.getElementById(id); if(el) el.value=v;}
function initPage6(){
  // Prefill from Page 1 if present
  const d=getStore();
  if (d.projectName && document.getElementById('p6_project')) document.getElementById('p6_project').value = d.projectName;
  if (d.jobNo && document.getElementById('p6_job')) document.getElementById('p6_job').value = d.jobNo;
  bindInputs(['p6_project','p6_job','m1','m2','a','dl']);
  const calc=()=>{
    const m1=num('m1'), m2=num('m2'), a=num('a'), dl=num('dl');
    let r1='', r2='';
    if (m1!=null && m2!=null && a!=null && a>0){ r1 = fix2((m1-m2)/a); }
    setVal('r1', r1);
    if (dl!=null && r1 && parseFloat(r1)>0){ r2 = fix2(1000*dl/parseFloat(r1)); }
    setVal('r2', r2);
  };
  document.getElementById('calc6').addEventListener('click', calc);
  document.getElementById('clear6').addEventListener('click', ()=>{
    ['p6_project','p6_job','m1','m2','a','dl','r1','r2'].forEach(id=>setVal(id,''));
    const data=getStore(); ['p6_project','p6_job','m1','m2','a','dl'].forEach(k=>delete data[k]); setStore(data);
  });
  ['m1','m2','a','dl'].forEach(id=>{
    const el=document.getElementById(id);
    el.addEventListener('change', calc);
    el.addEventListener('input', ()=>{ const data=getStore(); data[id]=el.value; setStore(data); });
  });
  initPDF('pdf6');
  calc();
}

document.addEventListener('DOMContentLoaded', ()=>{
  if (location.pathname.endsWith('page6.html')) initPage6(); else initPage1();
});
