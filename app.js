// TriState behaviour: Work Start defaults to today; Guaranteed & Work End copy from Work Start (editable);
// Conformed stays blank until user sets it; Build footer shows live time.
document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const workStart   = $("workStart");
  const guaranteed  = $("guaranteed");
  const workEnd     = $("workEnd");
  const conformed   = $("conformed");
  const footer      = $("buildFooter");

  // Work Start = today
  if (workStart) {
    const today = new Date().toISOString().split("T")[0];
    workStart.value = today;
  }

  // Conformed blank until user selects
  if (conformed) conformed.value = "";

  // Prefill from Work Start if empty
  function applyFromWorkStart() {
    if (!workStart) return;
    if (guaranteed && !guaranteed.value) guaranteed.value = workStart.value;
    if (workEnd && !workEnd.value) workEnd.value = workStart.value;
  }
  applyFromWorkStart();
  if (workStart) workStart.addEventListener("change", applyFromWorkStart);

  // Live footer timestamp
  if (footer) {
    const n = new Date();
    const pad = x => x.toString().padStart(2,"0");
    const stamp = `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    footer.textContent = "Build version: " + stamp;
  }
});
