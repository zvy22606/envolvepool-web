import React, { useCallback, useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';
import { getYoutubeId } from '@/helper/utils';
import YouTube from 'react-youtube';

interface DemoVideoProp {}

const DemoVideo: React.FC<DemoVideoProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  const renderVideo = useCallback(() => {
    const videoUrl = launchInfo.video?.[0] || '';
    const isYoutubeUrl = videoUrl.includes('youtube') || videoUrl.includes('youtu.be');
    if (isYoutubeUrl) {
      return <YouTube videoId={getYoutubeId(videoUrl)} loading="lazy" iframeClassName="w-full h-[500px]" />;
    }
    return (
      <video controls className={`h-[500px] w-full`} src={videoUrl}>
        {/* <source src={videoUrl}></source> */}
      </video>
    );
  }, [launchInfo]);
  return (
    <div>
      <p className="body-xl-bold text-[#0B0D41]">{t(titleTxtData[4])}</p>
      <div className="mt-[24px]">{renderVideo()}</div>
    </div>
  );
};

export default DemoVideo;
