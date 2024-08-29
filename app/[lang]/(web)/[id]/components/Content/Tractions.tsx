import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';

interface TractionsProp {}

const Tractions: React.FC<TractionsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div className="pb-20">
      <p className="body-xl-bold text-[#0B0D41]">{t(titleTxtData[6])}</p>
      <ul className="body-xl w-full list-disc pl-[20px] text-[#0B0D41] [&>li]:mt-[24px]">
        {launchInfo?.tractions?.map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    </div>
  );
};

export default Tractions;
