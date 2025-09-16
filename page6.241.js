
function calc(){
  const m1=parseFloat(document.getElementById('m1').value)||0;
  const m2=parseFloat(document.getElementById('m2').value)||0;
  const A =parseFloat(document.getElementById('area').value)||0;
  const dl=parseFloat(document.getElementById('rloose').value)||0;
  const r1=(A>0)?(m1-m2)/A:0;
  const r2=(r1>0)?(1000*dl)/r1:0;
  const fmt=n=> n? (Math.round(n*100)/100).toFixed(2):'';
  document.getElementById('r1').value=fmt(r1);
  document.getElementById('r2').value=fmt(r2);
}
['m1','m2','area','rloose'].forEach(id=>document.addEventListener('input',e=>{if(e.target.id===id)calc()}));
document.addEventListener('DOMContentLoaded',calc);
