
// helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// PDF = print
$('#pdfBtn').addEventListener('click', () => window.print());

// Reset
$('#resetBtn').addEventListener('click', () => {
  if (!confirm('Clear all fields?')) return;
  document.getElementById('f').reset();
  // Clear tri-state visual & values
  $$('.tri').forEach(l => {
    const box = l.querySelector('.box');
    const input = l.querySelector('input[type="hidden"]');
    box.classList.remove('state-1','state-2');
    input.value = '';
  });
});

// Auto-fill End/Guaranteed from Start (still editable after)
(function autoFillDates(){
  const start = $('#workStart'), end = $('#workEnd'), guar = $('#guaranteed');
  const mark = el => el.dataset.autofill = '1';
  const unmark = el => delete el.dataset.autofill;
  const isAuto = el => el.dataset.autofill === '1';

  ['change','input'].forEach(evt => {
    end.addEventListener(evt, () => unmark(end));
    guar.addEventListener(evt, () => unmark(guar));
  });

  start.addEventListener('change', () => {
    if (start.value) {
      if (!end.value || isAuto(end))  { end.value  = start.value; mark(end); }
      if (!guar.value || isAuto(guar)) { guar.value = start.value; mark(guar); }
    }
  });

  window.addEventListener('load', () => {
    if (start.value) {
      if (!end.value)  { end.value  = start.value; mark(end); }
      if (!guar.value) { guar.value = start.value; mark(guar); }
    }
  });
})();

// Tri-state controls
(function triState(){
  $$('.tri').forEach(label => {
    const box = label.querySelector('.box');
    const input = label.querySelector('input[type="hidden"]');
    const values = ["", "yes", "no"]; // blank, tick, cross
    let state = 0;
    if (input.value === 'yes') state = 1;
    else if (input.value === 'no') state = 2;
    const apply = () => {
      box.classList.remove('state-1','state-2');
      if (state === 1) box.classList.add('state-1');
      if (state === 2) box.classList.add('state-2');
      input.value = values[state];
    };
    apply();
    label.addEventListener('click', e => {
      if (!e.target.closest('a,button,input,textarea,select')) {
        state = (state + 1) % 3;
        apply();
      }
    });
  });
})();

// Simple navigation placeholders
$('#page1').addEventListener('click', () => alert('Already on Page 1'));
$('#page6').addEventListener('click', () => alert('Page 6 link goes here (integrate when ready).'));
