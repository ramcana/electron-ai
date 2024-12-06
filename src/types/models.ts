export interface BaseModel {
  id: string;
  name: string;
  description: string;
  filename: string;
  url: string;
  size: number;
}

export interface Wav2LipModel extends BaseModel {}

export interface GFPGANModel extends BaseModel {
  version: string;
}

export const WAV2LIP_MODELS: Wav2LipModel[] = [
  {
    id: 'wav2lip',
    name: 'Wav2Lip',
    description: 'Highly accurate lip-sync model',
    filename: 'wav2lip.pth',
    url: 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA',
    size: 153000000
  },
  {
    id: 'wav2lip_gan',
    name: 'Wav2Lip + GAN',
    description: 'Slightly inferior lip-sync, but better visual quality',
    filename: 'wav2lip_gan.pth',
    url: 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA',
    size: 156000000
  }
];

export const GFPGAN_MODELS: GFPGANModel[] = [
  {
    id: 'gfpgan_v1.3',
    name: 'GFPGANv1.3',
    description: 'More natural restoration results, better on very low/high-quality inputs',
    filename: 'GFPGANv1.3.pth',
    url: 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth',
    size: 332000000,
    version: '1.3'
  },
  {
    id: 'gfpgan_v1.2',
    name: 'GFPGANv1.2 Clean',
    description: 'No colorization, no CUDA extensions required',
    filename: 'GFPGANCleanv1-NoCE-C2.pth',
    url: 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANCleanv1-NoCE-C2.pth',
    size: 328000000,
    version: '1.2'
  },
  {
    id: 'gfpgan_v1',
    name: 'GFPGANv1',
    description: 'Original GFPGAN model',
    filename: 'GFPGANv1.pth',
    url: 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.pth',
    size: 325000000,
    version: '1.0'
  }
];

export const REQUIRED_MODELS: BaseModel[] = [
  {
    id: 'face_detection',
    name: 'Face Detection Model',
    description: 'S3FD Face Detection Model',
    filename: 's3fd.pth',
    url: 'https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth',
    size: 31000000
  }
];