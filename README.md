# Wav2Lip Environment Setup

This repository includes a batch script to automatically set up the required environment for Wav2Lip, including Python 3.8.10 and CUDA 11.8.

## System Requirements

- Windows 10 or later
- NVIDIA GPU with CUDA support
- Internet connection for downloading components

## Installation

1. Run the setup script:
   ```batch
   setup-env.bat
   ```

The script will:
- Install Python 3.8.10 if not present
- Install CUDA 11.8 if not present
- Create a virtual environment
- Install PyTorch with CUDA support
- Install all required dependencies
- Download necessary model files

## Usage

1. Activate the virtual environment:
   ```batch
   call wav2lip-env\Scripts\activate
   ```

2. Run your Wav2Lip application

3. When finished, deactivate the environment:
   ```batch
   deactivate
   ```

## Verification

To verify the installation:

1. Activate the environment
2. Run Python and verify CUDA:
   ```python
   import torch
   print(torch.cuda.is_available())
   ```

Should output `True` if everything is set up correctly.

## Troubleshooting

If you encounter any issues:

1. Ensure your NVIDIA drivers are up to date
2. Check if your GPU supports CUDA
3. Verify Python is in your system PATH
4. Try running the setup script with administrator privileges