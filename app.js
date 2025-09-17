// Auto-fill Guaranteed & Work End from Work Start, keep Conformed blank until user selects
// Work Start defaults to today's date

document.addEventListener("DOMContentLoaded", () => {
  const workStart = document.getElementById("workStart");
  const guaranteed = document.getElementById("guaranteed");
  const workEnd = document.getElementById("workEnd");
  const conformed = document.getElementById("conformed");

  // Set Work Start to today by default
  if (workStart) {
    const today = new Date().toISOString().split("T")[0];
    workStart.value = today;
  }

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
