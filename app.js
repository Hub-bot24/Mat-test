
// Local storage helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function toNum(v){
  const n = parseFloat(String(v).replace(/,/g,''));
  return isFinite(n) ? n : 0;
}

function format2(n){
  return (Math.round(n*100)/100).toFixed(2);
}

function save(){
  const data = {};
  document.querySelectorAll('input, textarea').forEach(el=>{
    if(el.type==='date' || el.type==='text' || el.type==='number' || el.tagName==='TEXTAREA'){
      data[el.id] = el.value;
    }
  });
  // tri states
  data.tri = {};
  document.querySelectorAll('.tri').forEach(btn=>{
    data.tri[btn.dataset.name] = btn.classList.contains('tick') ? 'tick' :
                                 btn.classList.contains('cross') ? 'cross' : 'blank';
  });
  localStorage.setItem('mattest-v333', JSON.stringify(data));
}

function load(){
  const raw = localStorage.getItem('mattest-v333');
  if(!raw) return;
  const data = JSON.parse(raw);
  Object.entries(data).forEach(([k,v])=>{
    if(k==='tri') return;
    const el = document.getElementById(k);
    if(el) el.value = v;
  });
  if(data.tri){
    document.querySelectorAll('.tri').forEach(btn=>{
      const st = data.tri[btn.dataset.name] || 'blank';
      btn.classList.remove('tick','cross');
      if(st!=='blank') btn.classList.add(st);
    });
  }
  recalc();
}

function recalc(){
  const total = toNum($('#bitumen').value) + toNum($('#kerosene').value) + toNum($('#additive').value);
  $('#totalLitres').value = format2(total);
  save();
}

window.addEventListener('input', e=>{
  if(['bitumen','kerosene','additive'].includes(e.target.id)) recalc();
  else save();
});

// Auto-copy dates from Work Start to End/Guaranteed if blank
$('#workStart').addEventListener('change', e=>{
  const v = e.target.value;
  if(!$('#workEnd').value) $('#workEnd').value = v;
  if(!$('#guaranteed').value) $('#guaranteed').value = v;
  save();
});

// Tri-state buttons
document.querySelectorAll('.tri').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(btn.classList.contains('tick')){ btn.classList.remove('tick'); btn.classList.add('cross'); }
    else if(btn.classList.contains('cross')){ btn.classList.remove('cross'); }
    else { btn.classList.add('tick'); }
    save();
  });
});

// Reset
$('#resetBtn').addEventListener('click', ()=>{
  if(!confirm('Clear all fields?')) return;
  localStorage.removeItem('mattest-v333');
  document.querySelectorAll('input, textarea').forEach(el=>{
    if(el.readOnly) return;
    el.value = '';
  });
  document.querySelectorAll('.tri').forEach(b=>b.classList.remove('tick','cross'));
  recalc();
});

// PDF
$('#pdfBtn').addEventListener('click', ()=>{
  window.print();
});

window.addEventListener('DOMContentLoaded', ()=>{
  load();
  recalc();
});


// Auto-fill Guaranteed & Work End from Work Start, keep Conformed blank until user selects

document.addEventListener("DOMContentLoaded", () => {
  const workStart = document.getElementById("workStart");
  const guaranteed = document.getElementById("guaranteed");
  const workEnd = document.getElementById("workEnd");
  const conformed = document.getElementById("conformed");

  // Keep Conformed always blank unless user selects
  if (conformed) {
    conformed.value = "";
  }

  // When Work Start changes, prefill Guaranteed + Work End only if they are empty
  if (workStart) {
    workStart.addEventListener("change", () => {
      if (guaranteed && !guaranteed.value) {
        guaranteed.value = workStart.value;
      }
      if (workEnd && !workEnd.value) {
        workEnd.value = workStart.value;
      }
    });
  }
});
