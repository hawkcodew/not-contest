import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '@/features/utils/debounce.ts';
import profileFallbackImage from '../../../../public/profile.png';

interface ProfilePhotoProps {
  username?: string;
  className?: string;
}
export const ProfilePhoto = ({ username, className }: ProfilePhotoProps) => {
  const [error, setError] = useState<boolean | null>(null);
  const [debouncedUsername, setDebouncedUsername] = useState<
    string | undefined
  >(username);
  const [hasCheckedImage, setHasCheckedImage] = useState<boolean>(false);

  const debouncedSetUsername = useMemo(() => {
    return debounce((newUsername: string | undefined) => {
      setDebouncedUsername(newUsername);
      setHasCheckedImage(false);
    }, 1000);
  }, [setDebouncedUsername, setHasCheckedImage]);

  const checkImageSize = useCallback(
    (img: HTMLImageElement) => {
      if (hasCheckedImage) return;

      const tempImg = new Image();
      tempImg.src = img.src;
      tempImg.onload = function () {
        if (tempImg.width === 1 && tempImg.height === 1) {
          setError(true);
        } else {
          setError(false);
        }
        setHasCheckedImage(true);
      };
    },
    [hasCheckedImage]
  );

  useEffect(() => {
    debouncedSetUsername(username);
  }, [debouncedSetUsername, username]);

  const src = debouncedUsername
    ? `https://t.me/i/userpic/320/${debouncedUsername.replace('@', '')}.jpg`
    : profileFallbackImage;

  const finalSrc = error && hasCheckedImage ? profileFallbackImage : src;

  return (
    <div className={`bg-[#202020] rounded-full ${className}`}>
      <img
        alt="profile-photo"
        className={`rounded-full w-full h-full ${className}`}
        onLoad={(e) => checkImageSize(e.target as HTMLImageElement)}
        src={finalSrc}
      />
    </div>
  );
};
