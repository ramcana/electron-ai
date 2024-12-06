import { useState } from 'react';
import type { Wav2LipResult } from '../types/wav2lip';

export function useWav2lip() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Wav2LipResult | null>(null);

  const processVideo = async (videoFile: File, audioFile: File) => {
    if (!videoFile || !audioFile) return;

    setProcessing(true);
    setResult(null);

    try {
      const outputPath = `output_${Date.now()}.mp4`;
      const result = await window.electron.processWav2Lip({
        videoPath: videoFile.path,
        audioPath: audioFile.path,
        outputPath
      });
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    result,
    processVideo
  };
}