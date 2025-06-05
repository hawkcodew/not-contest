import ConfettiAnimationData from '@/shared/lottie/confetti.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { useCartStore } from '@/entities/cart/cart.store.ts';
import { useEffect, useState } from 'react';
export const SuccessPurchase = () => {
  const { setJustBought } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }, 10);

    return () => {
      clearTimeout(id);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsFadingOut(true);
    document.body.style.overflow = '';

    setTimeout(() => {
      setJustBought(false);
    }, 300);
  };

  return (
    <div
      className={`top-0 overflow-hidden flex flex-col items-center justify-center min-h-screen absolute z-20 bg-system backdrop-blur-md w-full h-full px-4 transition-opacity duration-300
        ${isFadingOut ? 'opacity-0' : isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <DotLottieReact
        className="max-w-xs max-h-[320px] h-full w-full"
        src={ConfettiAnimationData}
        autoplay
        loop
      />
      <Title text="You Got It!" level={0} className="mt-6" />
      <Body text="Your purchase is on the way" className="text-primary mt-3" />
      <Button
        onClick={handleClose}
        text="Awesome"
        color="white"
        className="mt-[60px] !bg-white !text-black"
      />
    </div>
  );
};
