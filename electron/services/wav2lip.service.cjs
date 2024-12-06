const { PythonShell } = require('python-shell');
const path = require('path');
const isDev = require('electron-is-dev');

class Wav2LipService {
  constructor() {
    this.modelsPath = isDev 
      ? path.join(process.cwd(), 'models')
      : path.join(process.resourcesPath, 'models');
  }

  async process(videoPath, audioPath, outputPath) {
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(process.cwd(), 'wav2lip'),
      args: [
        '--face', videoPath,
        '--audio', audioPath,
        '--outfile', outputPath,
        '--checkpoint_path', path.join(this.modelsPath, 'wav2lip_gan.pth'),
        '--face_det_checkpoint', path.join(this.modelsPath, 's3fd.pth')
      ]
    };

    try {
      const messages = await PythonShell.run('inference.py', options);
      return { success: true, outputPath, messages };
    } catch (error) {
      return { 
        success: false, 
        error: error.toString(),
        details: 'Failed to process video with Wav2Lip'
      };
    }
  }
}

module.exports = new Wav2LipService();