const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { fileName, content } = JSON.parse(event.body);

  const repoOwner = 'fif-otomotif'; // Ganti dengan username Anda
  const repoName = 'my-website'; // Ganti dengan nama repo
  const branch = 'main'; // atau 'master' sesuai dengan repo Anda
  const token = process.env.GITHUB_TOKEN;

  // Menambahkan file ke folder uploads/
  const filePath = `uploads/${fileName}`;
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  const message = `Add ${fileName}`;
  const contentBase64 = content; // Sudah dalam format Base64

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      content: contentBase64,
      branch: branch
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File added successfully', data }),
    };
  } else {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: data.message }),
    };
  }
};