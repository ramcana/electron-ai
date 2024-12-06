export interface Wav2LipResult {
  success: boolean;
  outputPath?: string;
  error?: string;
  messages?: string[];
  details?: string;
}

export interface Wav2LipInput {
  videoPath: string;
  audioPath: string;
}

declare global {
  interface Window {
    electron: {
      selectFile: (fileType: 'video' | 'audio') => Promise<string | null>;
      processWav2Lip: (data: Wav2LipInput) => Promise<Wav2LipResult>;
    };
  }
}

export const processVideo = async (
  videoFile: File,
  audioFile: File
): Promise<Wav2LipResult> => {
  try {
    const videoPath = await window.electron.selectFile('video');
    const audioPath = await window.electron.selectFile('audio');
    
    if (!videoPath || !audioPath) {
      throw new Error('Please select both video and audio files');
    }

    return await window.electron.processWav2Lip({
      videoPath,
      audioPath
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};