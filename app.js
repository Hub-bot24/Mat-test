document.addEventListener("DOMContentLoaded", () => {
  const workStart = document.getElementById("workStart");
  const workEnd = document.getElementById("workEnd");
  const guaranteed = document.getElementById("guaranteed");
  const conformed = document.getElementById("conformed");
  const bitumen = document.getElementById("bitumen");
  const kerosene = document.getElementById("kerosene");
  const additive = document.getElementById("additive");
  const totalLitres = document.getElementById("totalLitres");

  // Auto-fill logic
  workStart.addEventListener("input", () => {
    workEnd.value = workStart.value;
    guaranteed.value = workStart.value;
  });

  // Total litres calc
  function calcTotal() {
    const b = parseFloat(bitumen.value) || 0;
    const k = parseFloat(kerosene.value) || 0;
    const a = parseFloat(additive.value) || 0;
    totalLitres.value = (b + k + a).toFixed(2);
  }
  [bitumen, kerosene, additive].forEach(el => el.addEventListener("input", calcTotal));

  // Tri-state checkboxes: cycle blank -> ✓ -> ✗
  document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("click", e => {
      if (!cb.hasAttribute("data-state")) cb.setAttribute("data-state", "");
      let state = cb.getAttribute("data-state");
      if (state === "") { cb.setAttribute("data-state", "tick"); cb.indeterminate = false; cb.checked = true; }
      else if (state === "tick") { cb.setAttribute("data-state", "cross"); cb.indeterminate = true; cb.checked = false; }
      else { cb.setAttribute("data-state", ""); cb.indeterminate = false; cb.checked = false; }
      e.preventDefault();
    });
  });
});
