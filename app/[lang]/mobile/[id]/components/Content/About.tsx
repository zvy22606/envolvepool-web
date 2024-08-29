import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/[id]/constants/data';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';

interface AboutProp {}

const About: React.FC<AboutProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-[#0B0D41]">{t(titleTxtData[3])}</p>
      <p className="body-s mt-[1.25rem] whitespace-pre-line text-[#0B0D41]">{launchInfo.about}</p>
    </div>
  );
};

export default About;
