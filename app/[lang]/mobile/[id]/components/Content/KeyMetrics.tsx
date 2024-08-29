import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { titleTxtData } from '@/app/[lang]/(web)/[id]/constants/data';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';

interface KeyMetricsProp {}

const KeyMetrics: React.FC<KeyMetricsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div className="px-[1.25rem]">
      <p className="text-h3-mob text-[#0B0D41]">{t(titleTxtData[5])}</p>
      <div className="body-m text-[#8586A0] [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:border-neutral-light-gray [&>div]:py-[1.25rem]">
        <div>
          <div>{t('blockchainNetwork')}</div>
          <div className="body-m-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[0]}</div>
        </div>
        <div>
          <div>{t('initialMarketCap')}</div>
          <div className="body-m-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[1]}</div>
        </div>
        <div>
          <div>{t('totalTokenSupply')}</div>
          <div className="body-m-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[2]}</div>
        </div>
        <div>
          <div>{t('projectValuation')}</div>
          <div className="body-m-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[3]}</div>
        </div>
        <div>
          <div>{t('airdropShare')}</div>
          <div className="body-m-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[4]}</div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
