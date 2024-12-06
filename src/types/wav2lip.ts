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
  outputPath: string;
}

declare global {
  interface Window {
    electron: {
      processWav2Lip: (data: Wav2LipInput) => Promise<Wav2LipResult>;
    };
  }
}