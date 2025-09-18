document.addEventListener("DOMContentLoaded", () => {
  const pageSelect = document.getElementById("pageSelect");
  const pages = document.querySelectorAll(".page");

  pageSelect.addEventListener("change", () => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageSelect.value).classList.add("active");
  });

  const workStart = document.getElementById("workStart");
  const workEnd = document.getElementById("workEnd");
  const guaranteed = document.getElementById("guaranteed");
  const conformed = document.getElementById("conformed");
  const bitumen = document.getElementById("bitumen");
  const kerosene = document.getElementById("kerosene");
  const additive = document.getElementById("additive");
  const totalLitres = document.getElementById("totalLitres");

  if (workStart) {
    workStart.addEventListener("input", () => {
      workEnd.value = workStart.value;
      guaranteed.value = workStart.value;
    });
  }

  function calcTotal() {
    const b = parseFloat(bitumen.value) || 0;
    const k = parseFloat(kerosene.value) || 0;
    const a = parseFloat(additive.value) || 0;
    totalLitres.value = (b + k + a).toFixed(2);
  }
  [bitumen, kerosene, additive].forEach(el => {
    if (el) el.addEventListener("input", calcTotal);
  });

  document.getElementById("exportCurrent").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("exportAll").addEventListener("click", () => {
    const pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.add("active"));
    window.print();
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageSelect.value).classList.add("active");
  });
});
