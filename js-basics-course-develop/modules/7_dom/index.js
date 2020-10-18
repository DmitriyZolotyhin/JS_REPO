function insertToParagraph() {
  document.getElementById('out_text').textContent = document.getElementById('in_text').value;
}
function searchText() {
  const textToSearch = document.getElementById('search_text_box').value;
  const regEx = new RegExp(textToSearch, "g");
  const targetObject = document.getElementById('out_text');
  const replacement = `<b>${textToSearch}</b>`;
  targetObject.innerHTML = targetObject.textContent.replace(regEx, replacement);
}
