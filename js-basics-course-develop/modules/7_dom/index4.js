function add(e) {
  $("#tbody").append('<tr>\n' +
      '            <td ondblclick="change(event)">\n' +
      '                Cell1\n' +
      '            </td>\n' +
      '            <td ondblclick="change(event)">\n' +
      '                Cell2\n' +
      '            </td>\n' +
      '            <td><img onclick="del(event)" width="15" height="15" src="https://4.bp.blogspot.com/-nifuKMWMbHQ/WcfyLLgFdQI/AAAAAAAAUFo/M4nQYyxdkk89uJ3XvnU4mGVG404NtHTdQCLcBGAs/s1600/delete.png"></td>\n' +
      '        </tr>')
}
function del(e) {
  e.target.parentNode.parentElement.remove();
}
function change(e) {
  const text = e.target.innerText;
  e.target.innerHTML = `<input onkeydown="search(this)" autofocus value="${text}"/>`
}
function search(ele) {
  if(event.key === 'Enter') {
      const text = ele.value;
      ele.parentNode.innerHTML = text;
  }
}