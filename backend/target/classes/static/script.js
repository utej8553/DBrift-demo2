const form = document.getElementById("deployForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const projectName = document.getElementById("projectName").value.trim();
  const slug = document.getElementById("slug").value.trim();
  const filesInput = document.getElementById("files");
  const files = filesInput.files;

  if (!validateFiles(files)) return;

  const formData = new FormData();
  formData.append("projectName", projectName);
  formData.append("slug", slug);

  for (let file of files) {
    formData.append("files", file);
  }

  statusText.innerText = "Deploying...";

  try {
    const res = await fetch("http://localhost:8080/api/deploy", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    statusText.innerText = "Deployed at: " + data.url;

    window.open(data.url, "_blank");

  } catch (err) {
    statusText.innerText = "Deployment failed";
  }
});

function validateFiles(files) {
  const allowed = ["text/html", "text/css", "application/javascript"];
  let indexFound = false;

  for (let file of files) {
    if (!allowed.includes(file.type)) {
      alert("Only HTML, CSS, JS files allowed");
      return false;
    }
    if (file.name === "index.html") {
      indexFound = true;
    }
  }

  if (!indexFound) {
    alert("index.html is required");
    return false;
  }

  return true;
}
