function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p','pt','a4');
  doc.html(document.querySelector('.form-container'), {
    callback: function (pdf) {
      pdf.save("CoverPage.pdf");
    },
    x: 10,
    y: 10,
    width: 580,
    windowWidth: 900
  });
}

// Auto-fill today's date
window.onload = function() {
  let today = new Date().toISOString().split('T')[0];
  document.getElementById("workstart").value = today;
  document.getElementById("workend").value = today;
  document.getElementById("guaranteed").value = today;
};
