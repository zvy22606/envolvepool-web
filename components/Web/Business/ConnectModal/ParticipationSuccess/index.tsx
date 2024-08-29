'use client';
import Button from '@/components/Common/Button';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { useRedirect } from '@/hooks/router/useRedirect';
import { FC } from 'react';

interface ParticipationSuccessProps {
  projectId: string;
  onClose: VoidFunction;
}

const ParticipationSuccess: FC<ParticipationSuccessProps> = ({ projectId, onClose }) => {
  const pathname = useCustomPathname();
  const { redirectToUrl } = useRedirect();
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mt-6 flex flex-col gap-8">
        <h3 className="text-h3 text-center text-neutral-black ">You Are In! 🎉</h3>
        <p className="body-l text-neutral-black">{`Thank you for participating in project! We're excited to have you on board.`}</p>
        <div className="flex flex-col gap-4">
          <p className="body-xl-bold text-neutral-black">What’s next?</p>
          <p className="body-l text-neutral-black">{`In order to unlock all fuel earning approaches, you'll need to stake Manta tokens on project detail page.`}</p>
        </div>
      </div>
      <div className="flex w-full justify-center gap-4">
        <Button
          type="primary"
          className="button-text-l w-full max-w-[270px] uppercase"
          onClick={() => {
            if (pathname === '/') {
              redirectToUrl(`/${projectId}`);
            } else {
              onClose();
            }
          }}
        >
          go to stake
        </Button>
        <Button ghost className="button-text-l w-full max-w-[270px] uppercase" onClick={onClose}>
          later
        </Button>
      </div>
    </div>
  );
};

export default ParticipationSuccess;
