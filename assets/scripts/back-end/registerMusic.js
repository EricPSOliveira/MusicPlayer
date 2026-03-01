const id = document.getElementById("id");
const nae = document.getElementById("name");
const autor = document.getElementById("autor");
const file = document.getElementById("file");
const music_url = document.getElementById("music_url");
const sub = document.getElementById("sub");



sub.addEventListener("click", e => {
  e.preventDefault();
  const alvo = e.target;
  const form = new FormData();


  if (music_url == null) return;
  form.append("id", id.value);
  form.append("name", nae.value);
  form.append("autor", autor.value);
  form.append("file", file.files[0]);
  form.append("music_url", music_url.files[0]);


})