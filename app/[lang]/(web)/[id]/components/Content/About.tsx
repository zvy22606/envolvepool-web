import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';

interface AboutProp {}

const About: React.FC<AboutProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div>
      <p className="body-xl-bold text-[#0B0D41]">{t(titleTxtData[3])}</p>
      <p className="body-l mt-[24px] whitespace-pre-line text-[#0B0D41]">{launchInfo.about}</p>
    </div>
  );
};

export default About;
