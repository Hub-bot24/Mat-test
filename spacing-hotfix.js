
/* Mat Test spacing hotfix v332 — Grade width == Aggregate Size (mm) */
(function() {
  function textOf(el){ return (el.textContent||el.innerText||'').trim(); }
  function findLabelStartsWith(container, startsWith){
    const labels = container.querySelectorAll('label, .label, .form-label, .field-label, .row > span, .row > div');
    const n = startsWith.toLowerCase();
    for (const el of labels){
      const t = textOf(el).toLowerCase();
      if (t.startsWith(n)) return el;
    }
    return null;
  }
  function inputNextTo(node){
    if (!node) return null;
    let el = node;
    for (let i=0; i<4 && el; i++){
      el = el.nextElementSibling;
      if (!el) break;
      if (el.matches && el.matches('input,select,textarea')) return el;
      const inner = el.querySelector && el.querySelector('input,select,textarea');
      if (inner) return inner;
    }
    return null;
  }
  function sync(){
    const root = document.body;
    const aggLabel = findLabelStartsWith(root, 'aggregate size');
    const aggInput = inputNextTo(aggLabel);
    const gradeLabel = findLabelStartsWith(root, 'grade');
    const gradeInput = inputNextTo(gradeLabel);
    if (aggInput && gradeInput){
      const w = Math.round(aggInput.getBoundingClientRect().width);
      if (w > 40 && w < 1200) gradeInput.style.width = w + 'px';
    }
  }
  window.addEventListener('DOMContentLoaded', function(){ sync(); setTimeout(sync, 150); });
  window.addEventListener('resize', sync);
})();
