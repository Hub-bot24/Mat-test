
/* Mat Test spacing hotfix v334 — Grade width == Aggregate Size (mm) */
(function() {
  function txt(el){ return (el.textContent||el.innerText||'').trim().toLowerCase(); }
  function findStarts(root, s){
    const nodes = root.querySelectorAll('label,.label,.form-label,.field-label,.row>span,.row>div');
    s = s.toLowerCase();
    for (const n of nodes){ if (txt(n).startsWith(s)) return n; }
    return null;
  }
  function nextInput(n){
    if(!n) return null;
    let el=n;
    for(let i=0;i<4&&el;i++){
      el = el.nextElementSibling;
      if(!el) break;
      if(el.matches && el.matches('input,select,textarea')) return el;
      const inner = el.querySelector && el.querySelector('input,select,textarea');
      if(inner) return inner;
    }
    return null;
  }
  function sync(){
    const agg = nextInput(findStarts(document.body,'aggregate size'));
    const grd = nextInput(findStarts(document.body,'grade'));
    if(agg && grd){
      const w = Math.round(agg.getBoundingClientRect().width);
      if(w>40 && w<1200) grd.style.width = w+'px';
    }
  }
  window.addEventListener('DOMContentLoaded', function(){ sync(); setTimeout(sync, 150); });
  window.addEventListener('resize', sync);
})();
