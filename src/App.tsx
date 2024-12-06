import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { Play, RefreshCw } from 'lucide-react';
import { useWav2lip } from './hooks/useWav2lip';

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const { processing, result, processVideo } = useWav2lip();

  const handleProcess = () => {
    if (!videoFile || !audioFile) return;
    processVideo(videoFile, audioFile);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Wav2Lip Desktop</h1>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Video Input</h2>
            <FileUpload
              accept="video/*"
              onFileSelect={setVideoFile}
              label="Select Video File"
            />
            {videoFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {videoFile.name}
              </p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Audio Input</h2>
            <FileUpload
              accept="audio/*"
              onFileSelect={setAudioFile}
              label="Select Audio File"
            />
            {audioFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {audioFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleProcess}
            disabled={!videoFile || !audioFile || processing}
            className={`
              flex items-center px-6 py-3 rounded-lg text-white
              ${!videoFile || !audioFile || processing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {processing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Processing
              </>
            )}
          </button>
        </div>

        <ProcessingStatus result={result} />
      </div>
    </div>
  );
}

export default App;