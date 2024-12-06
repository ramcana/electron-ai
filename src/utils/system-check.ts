export interface SystemRequirements {
  cuda: boolean;
  python: boolean;
  wav2lip: boolean;
  models: boolean;
}

export const checkSystemRequirements = async (): Promise<SystemRequirements> => {
  try {
    const result = await window.electron.checkSystem();
    return result;
  } catch (error) {
    console.error('Error checking system requirements:', error);
    return {
      cuda: false,
      python: false,
      wav2lip: false,
      models: false
    };
  }
};