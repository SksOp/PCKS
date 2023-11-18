function download(event) {
  // prevent default form submission
  event.preventDefault();
  const year = document.querySelector("input[name=year]").value;
  const semester = document.querySelector("select[name=semester]").value;
  const url = `http://localhost:3000/download?year=${year}&semester=${semester}`;
  console.log(url);
}
