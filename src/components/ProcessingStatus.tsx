import React from 'react';
import type { Wav2LipResult } from '../types/wav2lip';

interface ProcessingStatusProps {
  result: Wav2LipResult | null;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ result }) => {
  if (!result) return null;

  if (!result.success) {
    return (
      <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p className="font-semibold">Error Processing Video</p>
        <p>{result.error}</p>
        {result.details && (
          <p className="mt-2 text-sm">{result.details}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      <p className="font-semibold">Processing Complete!</p>
      <p>Output saved to: {result.outputPath}</p>
      {result.messages && result.messages.length > 0 && (
        <pre className="mt-4 text-sm overflow-x-auto">
          {result.messages.join('\n')}
        </pre>
      )}
    </div>
  );
};