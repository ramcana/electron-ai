const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);

async function checkCuda() {
  try {
    const { stdout } = await execAsync('nvidia-smi');
    return stdout.toLowerCase().includes('cuda');
  } catch {
    return false;
  }
}

async function checkPython() {
  try {
    const { stdout } = await execAsync('python --version');
    const version = parseFloat(stdout.split(' ')[1]);
    return version >= 3.8;
  } catch {
    return false;
  }
}

async function checkWav2lip(wav2lipPath) {
  try {
    return fs.existsSync(path.join(wav2lipPath, 'inference.py'));
  } catch {
    return false;
  }
}

async function checkModels(wav2lipPath) {
  try {
    const modelPath = path.join(wav2lipPath, 'checkpoints', 'wav2lip.pth');
    const faceModelPath = path.join(wav2lipPath, 'face_detection/detection/sfd/s3fd.pth');
    return fs.existsSync(modelPath) && fs.existsSync(faceModelPath);
  } catch {
    return false;
  }
}

module.exports = {
  checkSystemRequirements: async (wav2lipPath) => {
    return {
      cuda: await checkCuda(),
      python: await checkPython(),
      wav2lip: await checkWav2lip(wav2lipPath),
      models: await checkModels(wav2lipPath)
    };
  }
};