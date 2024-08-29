import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/[id]/constants/data';
import YouTube from 'react-youtube';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';
import { getYoutubeId } from '@/helper/utils';

interface DemoVideoProp {}

const DemoVideo: React.FC<DemoVideoProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  const videoUrl = launchInfo.video?.[0] || '';
  const isYoutubeUrl = videoUrl.includes('youtube') || videoUrl.includes('youtu.be');

  const renderVideo = () => {
    if (isYoutubeUrl) {
      return <YouTube videoId={getYoutubeId(videoUrl)} loading="lazy" iframeClassName="w-full" />;
    }
    if (!videoUrl.includes('youtu')) {
      return (
        <video controls className={`w-full`}>
          <source src={videoUrl}></source>
        </video>
      );
    }
  };
  return (
    <div className="">
      <p className="text-h3-mob px-[1.25rem] text-[#0B0D41]">{t(titleTxtData[4])}</p>
      <div className="mt-[1.25rem] w-full">{renderVideo()}</div>
    </div>
  );
};

export default DemoVideo;
