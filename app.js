
// Shared helpers
const VERSION = "v3.18 Pro — 2025-09-16 — J. Hugo";
document.addEventListener('DOMContentLoaded', () => {
  const v = document.querySelectorAll('.js-version');
  v.forEach(el => el.textContent = VERSION);

  // Navigation
  document.querySelectorAll('[data-nav]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ location.href = btn.dataset.nav; });
  });
});

// Tri-state checkboxes (blank -> ✓ -> ✕ -> blank)
function setupTriState(scope=document){
  scope.querySelectorAll('.tri').forEach(b=>{
    b.addEventListener('click', () => {
      const st = b.getAttribute('data-state') || '0';
      let ns = '0', mark='';
      if(st==='0'){ ns='1'; mark='✓'; b.classList.add('ok'); b.classList.remove('bad'); }
      else if(st==='1'){ ns='2'; mark='✕'; b.classList.remove('ok'); b.classList.add('bad'); }
      else { ns='0'; mark=''; b.classList.remove('ok','bad'); }
      b.setAttribute('data-state', ns);
      b.textContent = mark;
      const hidden = b.nextElementSibling;
      if(hidden && hidden.type==='hidden') hidden.value = ns;
    });
  });
}
