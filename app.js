
// Register SW (cache-busted)
if ('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js?v=331')
      .catch(console.warn);
  });
}

// Tri-state attachments
(function(){
  const STATES = ["", "tick", "cross"];
  const A11Y = {"":"false","tick":"true","cross":"mixed"};

  function syncHidden(tri){
    const name = tri.dataset.name;
    const hidden = tri.parentElement.querySelector(`input[name="${name}"]`);
    if(hidden){
      hidden.value = (tri.dataset.state==="tick" ? "✓" : tri.dataset.state==="cross" ? "✗" : "");
    }
  }

  function cycle(tri){
    const i = STATES.indexOf(tri.dataset.state || "");
    const next = STATES[(i+1) % STATES.length];
    tri.dataset.state = next;
    tri.setAttribute("aria-checked", A11Y[next]);
    syncHidden(tri);
  }

  document.addEventListener('click', e=>{
    const tri = e.target.closest('.tri');
    if(tri) cycle(tri);
  });
  document.addEventListener('keydown', e=>{
    if((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('tri')){
      e.preventDefault();
      cycle(e.target);
    }
  });

  // Auto-copy Work Start into End & Guaranteed if blank
  const ws = document.getElementById('workStart');
  const we = document.getElementById('workEnd');
  const gu = document.getElementById('guaranteed');
  if(ws && we && gu){
    ws.addEventListener('change', ()=>{
      if(!we.value) we.value = ws.value;
      if(!gu.value) gu.value = ws.value;
    });
  }

  // PDF (print)
  const btnPdf = document.getElementById('btnPdf');
  if(btnPdf) btnPdf.addEventListener('click', ()=>{ window.print(); });

  // Reset
  const btnReset = document.getElementById('btnReset');
  if(btnReset){
    btnReset.addEventListener('click', ()=>{
      document.querySelectorAll('input[type="text"],input[type="number"],textarea').forEach(el=>el.value="");
      document.querySelectorAll('.tri').forEach(el=>{ el.dataset.state=""; el.setAttribute('aria-checked','false'); syncHidden(el); });
    });
  }
})();
