let _capsuleAvatarFile: File | null = null;

export const setCapsuleAvatarFile = (file: File | null) => {
  _capsuleAvatarFile = file;
};

export const getCapsuleAvatarFile = () => _capsuleAvatarFile;
