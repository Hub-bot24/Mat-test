document.addEventListener("DOMContentLoaded", () => {
  const workStart = document.getElementById("workStart");
  const workEnd = document.getElementById("workEnd");
  const guaranteed = document.getElementById("guaranteed");
  const bitumen = document.getElementById("bitumen");
  const kerosene = document.getElementById("kerosene");
  const additive = document.getElementById("additive");
  const totalLitres = document.getElementById("totalLitres");

  if (workStart) {
    workStart.addEventListener("input", () => {
      if (workEnd) workEnd.value = workStart.value;
      if (guaranteed) guaranteed.value = workStart.value;
    });
  }

  function calcTotal() {
    const b = parseFloat(bitumen?.value) || 0;
    const k = parseFloat(kerosene?.value) || 0;
    const a = parseFloat(additive?.value) || 0;
    if (totalLitres) totalLitres.value = (b + k + a).toFixed(2);
  }
  [bitumen, kerosene, additive].forEach(el => {
    if (el) el.addEventListener("input", calcTotal);
  });
});