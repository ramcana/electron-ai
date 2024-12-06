import { promises as fs } from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import download from 'download';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const wav2lipPath = path.join(projectRoot, 'wav2lip');

async function setupWav2lip() {
  try {
    console.log('Setting up Wav2Lip repository and dependencies...');

    // Clone Wav2Lip repository if it doesn't exist
    if (!await fs.access(wav2lipPath).then(() => true).catch(() => false)) {
      console.log('Cloning Wav2Lip repository...');
      await simpleGit().clone('https://github.com/rudrabha/Wav2Lip.git', wav2lipPath);
    }

    // Download pre-trained model
    const modelPath = path.join(wav2lipPath, 'checkpoints');
    await fs.mkdir(modelPath, { recursive: true });
    
    console.log('Downloading pre-trained model...');
    const modelUrl = 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA';
    await download(modelUrl, modelPath);

    // Create requirements.txt for local installation
    const requirements = `
torch==2.1.0
torchvision==0.16.0
numpy
opencv-python
python-speech-features
tqdm
numba
librosa
scipy
face-detection
face-alignment
    `.trim();

    await fs.writeFile(path.join(wav2lipPath, 'requirements.txt'), requirements);

    // Create setup instructions
    const setupInstructions = `
# Wav2Lip Setup Instructions

1. Install CUDA Toolkit 11.8 from NVIDIA website
2. Install Python 3.8 or higher
3. Install dependencies:
   pip install -r requirements.txt

4. Download additional models:
   - Download face detection model from: https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth
   - Place it in: wav2lip/face_detection/detection/sfd/s3fd.pth

The application will automatically use these dependencies when processing videos.
    `.trim();

    await fs.writeFile(path.join(wav2lipPath, 'SETUP.md'), setupInstructions);

    console.log('Wav2Lip setup completed successfully!');
  } catch (error) {
    console.error('Error setting up Wav2Lip:', error);
    process.exit(1);
  }
}

setupWav2lip();