import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import NotFoundDuckAnimationData from '@/shared/lottie/not_found_duck.lottie';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { AnimationPage } from '@/app/AnimationPage.tsx';

export const NotFound = () => {
  return (
    <AnimationPage animationKey={'not-found'}>
      <div
        className={
          'flex flex-col items-center justify-center min-h-[calc(100vh-150px)]'
        }
      >
        <DotLottieReact
          src={NotFoundDuckAnimationData}
          autoplay
          loop
          className={'w-20 h-20'}
        />
        <Title text={'Not found'} />
        <Body text={'This style doesn’t exist'} className={'text-secondary'} />
      </div>
    </AnimationPage>
  );
};
