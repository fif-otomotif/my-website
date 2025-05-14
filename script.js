async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
    alert("Pilih file terlebih dahulu.");
    return;
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const base64Content = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  const fileName = file.name;

  const response = await fetch('/.netlify/functions/addFile', {
    method: 'POST',
    body: JSON.stringify({ fileName, content: base64Content })
  });

  const result = await response.json();
  alert(JSON.stringify(result));
}