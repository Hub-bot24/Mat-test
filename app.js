document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("qaForm");
  const bitumen = document.getElementById("bitumen");
  const kerosene = document.getElementById("kerosene");
  const additive = document.getElementById("additive");
  const totalLitres = document.getElementById("totalLitres");

  // Load saved values
  Object.keys(localStorage).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.value = localStorage.getItem(key);
  });

  // Auto-save + recalc
  form.addEventListener("input", () => {
    // Save values
    Array.from(form.elements).forEach(el => {
      if (el.id) localStorage.setItem(el.id, el.value);
    });

    // Recalc total
    const b = parseFloat(bitumen.value) || 0;
    const k = parseFloat(kerosene.value) || 0;
    const a = parseFloat(additive.value) || 0;
    totalLitres.value = (b + k + a).toFixed(2);
  });

  // Reset handler
  form.addEventListener("reset", () => {
    localStorage.clear();
    totalLitres.value = "";
  });
});
