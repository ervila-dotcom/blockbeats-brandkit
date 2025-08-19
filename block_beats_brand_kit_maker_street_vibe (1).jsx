<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlockBeats Brand Kit Maker</title>
  <style>
    body { background: black; color: white; font-family: sans-serif; padding: 20px; }
    input, button, select { margin: 5px 0; padding: 8px; width: 100%; max-width: 400px; }
    .preview { margin-top: 20px; display: flex; gap: 20px; }
    .logo, .banner { display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .logo { width: 512px; height: 512px; }
    .banner { width: 1024px; height: 512px; }
  </style>
</head>
<body>
  <h1>BlockBeats Brand Kit Maker (Street Vibe)</h1>
  <p>Adjust settings and download your logo/banner.</p>
  <input id="nameInput" placeholder="Channel Name" value="BlockBeats">
  <input id="taglineInput" placeholder="Tagline" value="Trap • Afrobeat • Street Mixes • Party Vibes">
  <input type="color" id="accent1" value="#ff1a1a">
  <input type="color" id="accent2" value="#00ff95">
  <select id="textureSelect">
    <option value="grunge">Grunge</option>
    <option value="asphalt">Asphalt</option>
    <option value="brick">Brick</option>
    <option value="neon-alley">Neon Alley</option>
  </select>
  <button id="downloadLogo">Download Logo</button>
  <button id="downloadBanner">Download Banner</button>

  <div class="preview">
    <div id="logo" class="logo">Logo Preview</div>
    <div id="banner" class="banner">Banner Preview</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js"></script>
  <script>
    const textures = {
      asphalt: 'repeating-linear-gradient(45deg, #111 0 10px, #0e0e0e 10px 20px)',
      brick: 'repeating-linear-gradient(0deg, #1b1b1b 0 18px, #141414 18px 36px)',
      grunge: 'radial-gradient(circle, #0d0d0d 0%, #000 100%)',
      'neon-alley': 'linear-gradient(135deg, #0a0a0a, #0e0e14 40%, #0b0b10)'
    };

    const nameInput = document.getElementById('nameInput');
    const taglineInput = document.getElementById('taglineInput');
    const accent1 = document.getElementById('accent1');
    const accent2 = document.getElementById('accent2');
    const textureSelect = document.getElementById('textureSelect');
    const logo = document.getElementById('logo');
    const banner = document.getElementById('banner');

    function updatePreview() {
      logo.style.background = textures[textureSelect.value];
      banner.style.background = textures[textureSelect.value];
      logo.textContent = nameInput.value;
      banner.textContent = taglineInput.value;
      logo.style.color = accent1.value;
      banner.style.color = accent2.value;
    }

    [nameInput, taglineInput, accent1, accent2, textureSelect].forEach(el => el.addEventListener('input', updatePreview));
    updatePreview();

    function download(node, filename) {
      htmlToImage.toPng(node).then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
      });
    }

    document.getElementById('downloadLogo').addEventListener('click', () => download(logo, nameInput.value + '_logo.png'));
    document.getElementById('downloadBanner').addEventListener('click', () => download(banner, nameInput.value + '_banner.png'));
  </script>
</body>
</html>
