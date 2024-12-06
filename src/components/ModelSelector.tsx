import React from 'react';
import type { BaseModel, Wav2LipModel, GFPGANModel } from '../types/models';
import { WAV2LIP_MODELS, GFPGAN_MODELS } from '../types/models';

interface ModelSelectorProps {
  selectedWav2Lip: string;
  selectedGFPGAN: string | null;
  onWav2LipChange: (modelId: string) => void;
  onGFPGANChange: (modelId: string | null) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedWav2Lip,
  selectedGFPGAN,
  onWav2LipChange,
  onGFPGANChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Wav2Lip Model</h3>
        <div className="space-y-2">
          {WAV2LIP_MODELS.map((model) => (
            <label key={model.id} className="flex items-start space-x-3">
              <input
                type="radio"
                name="wav2lip-model"
                value={model.id}
                checked={selectedWav2Lip === model.id}
                onChange={(e) => onWav2LipChange(e.target.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-800">{model.name}</div>
                <div className="text-sm text-gray-500">{model.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">GFPGAN Enhancement</h3>
        <div className="space-y-2">
          <label className="flex items-start space-x-3">
            <input
              type="radio"
              name="gfpgan-model"
              value=""
              checked={selectedGFPGAN === null}
              onChange={() => onGFPGANChange(null)}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-800">No Enhancement</div>
              <div className="text-sm text-gray-500">Process video without GFPGAN enhancement</div>
            </div>
          </label>
          {GFPGAN_MODELS.map((model) => (
            <label key={model.id} className="flex items-start space-x-3">
              <input
                type="radio"
                name="gfpgan-model"
                value={model.id}
                checked={selectedGFPGAN === model.id}
                onChange={(e) => onGFPGANChange(e.target.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-800">{model.name}</div>
                <div className="text-sm text-gray-500">{model.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};