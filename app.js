document.getElementById('dateField').valueAsDate = new Date();

function createPanel(i){
  return `<div class="panel">
    <h3>Calculation Sheet ${i}</h3>
    <table>
      <tr><th>Item</th><th>Value</th></tr>
      <tr><td>Mass of Canvas Mat & Aggregate (kg)</td><td><input class="m1-${i}" type="number" step="0.01"></td></tr>
      <tr><td>Mass of Canvas Mat (kg)</td><td><input class="m2-${i}" type="number" step="0.01" value="0.85"></td></tr>
      <tr><td>Area of Canvas Mat (m²)</td><td><input class="a-${i}" type="number" step="0.01" value="0.97"></td></tr>
      <tr><td><b>Spread Rate (kg/m²)</b></td><td><output class="r1-${i}"></output></td></tr>
      <tr><td>Loose Unit Mass of Screenings (t/m³)</td><td><input class="dl-${i}" type="number" step="0.01" value="1.45"></td></tr>
      <tr><td><b>Spread Rate (m²/m³)</b></td><td><output class="r2-${i}"></output></td></tr>
    </table>
    <div class="actions"><button onclick="resetPanel(${i})">Reset</button></div>
  </div>`;
}

document.getElementById('panels').innerHTML=[1,2,3].map(i=>createPanel(i)).join('');

function calc(i){
  const m1Field=document.querySelector('.m1-'+i);
  const m1=parseFloat(m1Field.value);
  if(isNaN(m1)){ // if M1 empty
    document.querySelector('.r1-'+i).textContent='';
    document.querySelector('.r2-'+i).textContent='';
    return;
  }
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
  document.querySelector('.m1-'+i).value='';
  document.querySelector('.m2-'+i).value='0.85';
  document.querySelector('.a-'+i).value='0.97';
  document.querySelector('.dl-'+i).value='1.45';
  document.querySelector('.r1-'+i).textContent='';
  document.querySelector('.r2-'+i).textContent='';
}
function resetAll(){
  document.querySelectorAll('.info-grid input').forEach(inp=>inp.value='');
  document.getElementById('dateField').valueAsDate = new Date();
  [1,2,3].forEach(resetPanel);
}
setInterval(()=>[1,2,3].forEach(calc),500);
