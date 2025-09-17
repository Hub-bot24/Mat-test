
/* Auto-fill Work End & Guaranteed from Start (Conformed stays blank) */
const dStart = document.getElementById('dStart');
const dEnd = document.getElementById('dEnd');
const dGuarantee = document.getElementById('dGuarantee');
dStart?.addEventListener('change', () => {
  if (dEnd && !dEnd.value) dEnd.value = dStart.value || '';
  if (dGuarantee && !dGuarantee.value) dGuarantee.value = dStart.value || '';
});

/* Total Litres = Bitumen + Kerosene + Additive */
const fBit = document.getElementById('bitumen');
const fKer = document.getElementById('kerosene');
const fAdd = document.getElementById('additive');
const fLit = document.getElementById('litres');
function asNum(x){ const n = parseFloat(x); return isFinite(n)? n : 0; }
function calcLitres(){
  const sum = asNum(fBit?.value) + asNum(fKer?.value) + asNum(fAdd?.value);
  fLit.value = sum>0 ? sum.toFixed(2) : '';
}
[fBit,fKer,fAdd].forEach(el => el?.addEventListener('input', calcLitres));

/* Tri-state: blank -> ✓ -> ✕ -> blank */
const mapState = { '': 'tick', 'tick': 'cross', 'cross': '' };
document.querySelectorAll('#attachments .item').forEach(it=>{
  const box = it.querySelector('.box');
  function paint(s){
    box.classList.remove('tick','cross');
    box.textContent = '';
    if (s==='tick'){ box.classList.add('tick'); box.textContent='✓'; }
    if (s==='cross'){ box.classList.add('cross'); box.textContent='✕'; }
  }
  paint(''); // init
  function toggle(){
    const s = box.dataset.state || '';
    const ns = mapState[s];
    box.dataset.state = ns;
    paint(ns);
  }
  it.addEventListener('click', toggle);
  it.addEventListener('keydown', e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); toggle(); } });
});

/* Prepare one-page print for Page 1 */
function preparePrintFit(){
  const page = document.querySelector('.page');
  if(!page) return;
  const prevTransform = page.style.transform;
  if (getComputedStyle(page).transform !== 'none' && window.innerWidth < 980){
    page.style.transform = 'none';
  }
  const contentH = page.scrollHeight;
  const targetPx = 1122;
  let scale = 1;
  if (contentH > targetPx){
    scale = (targetPx / contentH) * 0.98;
    if (scale < 0.7) scale = 0.7;
  }
  document.documentElement.style.setProperty('--print-scale', String(scale));
  page.style.transform = prevTransform || '';
}
document.getElementById('btnPdf')?.addEventListener('click', ()=>{
  preparePrintFit(); setTimeout(()=>window.print(), 20);
});
document.getElementById('btnReset')?.addEventListener('click', ()=>{
  document.querySelectorAll('input[type=text],input[type=number],input[type=date],textarea')
    .forEach(el => { if(!['dStart','dEnd','dGuarantee'].includes(el.id)) el.value=''; });
  document.querySelectorAll('#attachments .box').forEach(b=>{ b.dataset.state=''; b.classList.remove('tick','cross'); b.textContent=''; });
  calcLitres();
});
