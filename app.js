// TriState form behaviour
// - Work Start defaults to today
// - Guaranteed & Work End auto-fill from Work Start (only if empty), remain editable
// - Conformed stays blank until user sets it
document.addEventListener("DOMContentLoaded", () => {
  const workStart   = document.getElementById("workStart");
  const guaranteed  = document.getElementById("guaranteed");
  const workEnd     = document.getElementById("workEnd");
  const conformed   = document.getElementById("conformed");

  // Set Work Start to today by default
  if (workStart) {
    const today = new Date().toISOString().split("T")[0];
    workStart.value = today;
  }

  // Conformed always blank until user selects
  if (conformed) {
    conformed.value = "";
  }

  // When Work Start changes, prefill Guaranteed + Work End only if they are empty
  if (workStart) {
    const applyFromWorkStart = () => {
      if (guaranteed && !guaranteed.value) guaranteed.value = workStart.value;
      if (workEnd && !workEnd.value) workEnd.value = workStart.value;
    };
    // Run once on load to populate blanks
    applyFromWorkStart();
    // Run on user change
    workStart.addEventListener("change", applyFromWorkStart);
  }

  // Build footer shows current time (so you can see it's fresh)
  const bf = document.getElementById("buildFooter");
  if (bf) {
    const n = new Date();
    const pad = x => x.toString().padStart(2,"0");
    const stamp = `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    bf.textContent = "Build version: " + stamp;
  }
});
