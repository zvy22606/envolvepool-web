import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/[id]/constants/data';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';

interface TractionsProp {}

const Tractions: React.FC<TractionsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div className="px-[1.25rem] pb-20">
      <p className="text-h3-mob text-[#0B0D41]">{t(titleTxtData[6])}</p>
      <ul className="body-s w-full list-disc pl-[1.25rem] text-[#0B0D41] [&>li]:mt-[1.25rem]">
        {launchInfo?.tractions?.map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    </div>
  );
};

export default Tractions;
