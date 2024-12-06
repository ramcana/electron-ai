const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');
const ProgressBar = require('progress');
const pipeline = promisify(stream.pipeline);

const MODELS = {
  wav2lip: {
    url: 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA',
    path: 'models/wav2lip_gan.pth',
    size: 156000000
  },
  face_detection: {
    url: 'https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth',
    path: 'models/s3fd.pth',
    size: 31000000
  },
  gfpgan_v1_3: {
    url: 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth',
    path: 'models/gfpgan_v1.3.pth',
    size: 332000000
  }
};

async function downloadFile(url, outputPath, expectedSize) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size === expectedSize) {
      console.log(`${path.basename(outputPath)} already exists and is complete.`);
      return;
    }
    fs.unlinkSync(outputPath); // Remove incomplete file
  }

  return new Promise((resolve, reject) => {
    const progressBar = new ProgressBar(`Downloading ${path.basename(outputPath)} [:bar] :percent :etas`, {
      complete: '=',
      incomplete: ' ',
      width: 50,
      total: expectedSize
    });

    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.on('data', chunk => progressBar.tick(chunk.length));

      pipeline(response, fileStream)
        .then(resolve)
        .catch(error => {
          fs.unlinkSync(outputPath); // Clean up incomplete file
          reject(error);
        });
    }).on('error', error => {
      fs.unlinkSync(outputPath); // Clean up incomplete file
      reject(error);
    });
  });
}

async function downloadModels() {
  try {
    console.log('Starting model downloads...\n');
    
    for (const [name, model] of Object.entries(MODELS)) {
      try {
        await downloadFile(model.url, model.path, model.size);
      } catch (error) {
        console.error(`\nError downloading ${name}:`, error.message);
        console.log('Continuing with remaining downloads...\n');
      }
    }
    
    console.log('\nModel downloads completed!');
    
    // Verify downloads
    let allComplete = true;
    for (const [name, model] of Object.entries(MODELS)) {
      if (!fs.existsSync(model.path)) {
        console.error(`Warning: ${name} model is missing`);
        allComplete = false;
        continue;
      }
      
      const stats = fs.statSync(model.path);
      if (stats.size !== model.size) {
        console.error(`Warning: ${name} model is incomplete`);
        allComplete = false;
      }
    }
    
    if (!allComplete) {
      throw new Error('Some models failed to download completely');
    }
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

downloadModels();