function showPage(id) {
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page6').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

function resetForm(pageId) {
  const inputs = document.querySelectorAll(`#${pageId} input, #${pageId} textarea`);
  inputs.forEach(el => { el.value = ''; });
}

function generatePDF(pageId) {
  window.print();
}
