import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';

interface KeyMetricsProp {}

const KeyMetrics: React.FC<KeyMetricsProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { launchInfo } = useContext(LaunchDetailContext);
  return (
    <div>
      <p className="body-xl-bold text-[#0B0D41]">{t(titleTxtData[5])}</p>
      <div className="body-xl text-[#8586A0] [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:border-neutral-light-gray [&>div]:py-[24px]">
        <div>
          <div>{t('blockchainNetwork')}</div>
          <div className="body-xl-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[0]}</div>
        </div>
        <div>
          <div>{t('initialMarketCap')}</div>
          <div className="body-xl-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[1]}</div>
        </div>
        <div>
          <div>{t('totalTokenSupply')}</div>
          <div className="body-xl-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[2]}</div>
        </div>
        <div>
          <div>{t('projectValuation')}</div>
          <div className="body-xl-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[3]}</div>
        </div>
        <div>
          <div>{t('airdropShare')}</div>
          <div className="body-xl-bold text-[#0B0D41]">{launchInfo.keyMtrics?.[4]}</div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
