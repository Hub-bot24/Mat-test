
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
document.addEventListener('DOMContentLoaded',()=>{
  const p=$('#pdfBtn'); if(p) p.addEventListener('click',()=>window.print());
  const r=$('#resetBtn'); if(r) r.addEventListener('click',()=>{
    if(!confirm('Clear all fields?')) return;
    document.getElementById('f').reset();
    $$('.tri').forEach(l=>{const b=l.querySelector('.box'),i=l.querySelector('input[type="hidden"]'); b.classList.remove('state-1','state-2'); i.value='';});
  });
});
(function autoFillDates(){
  const s=$('#workStart'), e=$('#workEnd'), g=$('#guaranteed'); if(!s||!e||!g) return;
  const mark=el=>el.dataset.autofill='1', un=el=>delete el.dataset.autofill, isA=el=>el.dataset.autofill==='1';
  ['change','input'].forEach(evt=>{ e.addEventListener(evt,()=>un(e)); g.addEventListener(evt,()=>un(g)); });
  s.addEventListener('change',()=>{ if(s.value){ if(!e.value||isA(e)){e.value=s.value;mark(e)} if(!g.value||isA(g)){g.value=s.value;mark(g)} } });
  window.addEventListener('load',()=>{ if(s.value){ if(!e.value){e.value=s.value;mark(e)} if(!g.value){g.value=s.value;mark(g)} } });
})();
(function tri(){
  $$('.tri').forEach(l=>{ const b=l.querySelector('.box'), i=l.querySelector('input[type="hidden"]'); const vals=['','yes','no']; let st= i.value==='yes'?1:(i.value==='no'?2:0);
    const apply=()=>{ b.classList.remove('state-1','state-2'); if(st===1)b.classList.add('state-1'); if(st===2)b.classList.add('state-2'); i.value=vals[st]; };
    apply(); l.addEventListener('click',e=>{ if(!e.target.closest('a,button,input,textarea,select')){ st=(st+1)%3; apply(); } });
  });
})();