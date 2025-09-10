const VERSION = 'v1.0 Pro ' + new Date().toISOString().slice(0,10);
document.getElementById('ver').textContent = VERSION;
document.getElementById('dateField').valueAsDate = new Date();

function createPanel(i){
  return `<div class="panel">
  <table>
    <tr><th>Item</th><th>Value</th></tr>
    <tr><td>Mass of Canvas Mat & Aggregate (kg)</td><td><input class="m1-${i}" type="number" step="0.01"></td></tr>
    <tr><td>Mass of Canvas Mat (kg)</td><td><input class="m2-${i}" type="number" step="0.01"></td></tr>
    <tr><td>Area of Canvas Mat (m²)</td><td><input class="a-${i}" type="number" step="0.01"></td></tr>
    <tr><td><b>Spread Rate (kg/m²) = (M1–M2)/A</b></td><td><output class="r1-${i}"></output></td></tr>
    <tr><td>Loose Unit Mass of Screenings (t/m³)</td><td><input class="dl-${i}" type="number" step="0.01"></td></tr>
    <tr><td><b>Spread Rate (m²/m³) = 1000×DL/R1</b></td><td><output class="r2-${i}"></output></td></tr>
  </table>
  <div class="actions"><button onclick="resetPanel(${i})">Reset</button></div>
</div>`;}

document.getElementById('panels').innerHTML=[1,2,3].map(i=>createPanel(i)).join('');

function calc(i){
  const m1=parseFloat(document.querySelector('.m1-'+i).value)||0;
  const m2=parseFloat(document.querySelector('.m2-'+i).value)||0;
  const a=parseFloat(document.querySelector('.a-'+i).value)||0;
  const dl=parseFloat(document.querySelector('.dl-'+i).value)||0;
  let r1='',r2='';
  if(a>0){r1=((m1-m2)/a).toFixed(2);}
  if(r1 && dl>0){r2=(1000*dl/parseFloat(r1)).toFixed(2);}
  document.querySelector('.r1-'+i).textContent=r1;
  document.querySelector('.r2-'+i).textContent=r2;
}
function resetPanel(i){
  ['m1','m2','a','dl'].forEach(cls=>document.querySelector('.'+cls+'-'+i).value='');
  ['r1','r2'].forEach(cls=>document.querySelector('.'+cls+'-'+i).textContent='');
}
setInterval(()=>[1,2,3].forEach(calc),500);
