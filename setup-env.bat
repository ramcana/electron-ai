@echo off
setlocal enabledelayedexpansion

echo Setting up Wav2Lip environment...

:: Check if Python is installed
python --version > nul 2>&1
if errorlevel 1 (
    echo Python not found. Downloading Python 3.8.10...
    curl -o python-3.8.10-amd64.exe https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe
    echo Installing Python 3.8.10...
    python-3.8.10-amd64.exe /quiet InstallAllUsers=1 PrependPath=1
    del python-3.8.10-amd64.exe
)

:: Check if CUDA is installed
nvidia-smi > nul 2>&1
if errorlevel 1 (
    echo CUDA not found. Downloading CUDA 11.8...
    curl -o cuda_11.8.0_522.06_windows.exe https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_522.06_windows.exe
    echo Installing CUDA 11.8...
    cuda_11.8.0_522.06_windows.exe /s /n
    del cuda_11.8.0_522.06_windows.exe
)

:: Create and activate virtual environment
echo Creating Python virtual environment...
python -m venv wav2lip-env
call wav2lip-env\Scripts\activate

:: Install PyTorch with CUDA support
echo Installing PyTorch with CUDA support...
pip install torch==2.1.0 torchvision==0.16.0 --index-url https://download.pytorch.org/whl/cu118

:: Install other requirements
echo Installing other requirements...
pip install numpy opencv-python python-speech-features tqdm numba librosa scipy face-detection face-alignment

:: Download face detection model
echo Downloading face detection model...
mkdir wav2lip\face_detection\detection\sfd 2>nul
curl -o wav2lip\face_detection\detection\sfd\s3fd.pth https://www.adrianbulat.com/downloads/python-fan/s3fd-619a316812.pth

:: Download Wav2Lip model
echo Downloading Wav2Lip pre-trained model...
mkdir wav2lip\checkpoints 2>nul
curl -o wav2lip\checkpoints\wav2lip.pth https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA

:: Set environment variables
setx CUDA_HOME "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8"
setx Path "%Path%;%CUDA_HOME%\bin"

echo Environment setup complete!
echo.
echo To activate the environment, run:
echo     call wav2lip-env\Scripts\activate
echo.
echo To deactivate the environment, run:
echo     deactivate

endlocal