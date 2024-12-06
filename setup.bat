@echo off
setlocal enabledelayedexpansion

echo Wav2Lip Desktop Setup Script
echo ===========================
echo.

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Please run this script as Administrator
    pause
    exit /b 1
)

:: Check for Python
python --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Installing Python 3.8.10...
    curl -L -o python-3.8.10.exe https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe
    python-3.8.10.exe /quiet InstallAllUsers=1 PrependPath=1
    del python-3.8.10.exe
)

:: Check for Node.js
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Installing Node.js...
    curl -L -o nodejs.msi https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi
    msiexec /i nodejs.msi /qn
    del nodejs.msi
)

:: Check for Git
git --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Installing Git...
    curl -L -o git.exe https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.1/Git-2.41.0-64-bit.exe
    git.exe /VERYSILENT /NORESTART
    del git.exe
)

:: Check for CUDA Toolkit
nvcc --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Installing CUDA Toolkit 11.8...
    curl -L -o cuda_11.8.0_522.06_windows.exe https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_522.06_windows.exe
    cuda_11.8.0_522.06_windows.exe /s /n
    del cuda_11.8.0_522.06_windows.exe
    
    :: Add CUDA to PATH
    setx PATH "%PATH%;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin" /M
    setx CUDA_PATH "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8" /M
)

:: Create Python virtual environment
echo Creating Python virtual environment...
python -m venv venv
call venv\Scripts\activate

:: Install Python dependencies
echo Installing Python packages...
python -m pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install numpy opencv-python python-speech-features tqdm numba librosa scipy face-detection face-alignment

:: Clone Wav2Lip repository
if not exist wav2lip (
    echo Cloning Wav2Lip repository...
    git clone https://github.com/Rudrabha/Wav2Lip.git wav2lip
)

:: Create models directory
if not exist models mkdir models

:: Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

:: Download models
echo Downloading models...
npm run postinstall

:: Verify CUDA installation
echo Verifying CUDA installation...
python -c "import torch; print('CUDA available:', torch.cuda.is_available()); print('GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Activate the virtual environment: call venv\Scripts\activate
echo 2. Run the application: npm run electron:dev
echo.
echo For production build:
echo npm run electron:build
echo.

pause