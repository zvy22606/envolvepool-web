import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import moment from 'moment';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../constants/type';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';

interface TimeLineProp {}

const TimeLine: React.FC<TimeLineProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const tagRender = (type: string) => {
    switch (type) {
      case 'fueling':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-10pt rounded-[20px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] py-[4px] text-[#121BDF]">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('ended')}
              </div>
            );
        }
      case 'allocation':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
          case LaunchPoolProjectStatus.FUELING:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.ALLOCATION:
            return (
              <div className="caption-10pt rounded-[20px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] py-[4px] text-[#121BDF]">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('ended')}
              </div>
            );
        }
      case 'airdrop':
        switch (launchInfo.status) {
          case LaunchPoolProjectStatus.UPCOMING:
          case LaunchPoolProjectStatus.FUELING:
          case LaunchPoolProjectStatus.ALLOCATION:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('upComing')}
              </div>
            );
          case LaunchPoolProjectStatus.AIRDROP:
            return (
              <div className="caption-10pt rounded-[20px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] py-[4px] text-[#121BDF]">
                {t('liveNow')}
              </div>
            );
          default:
            return (
              <div className="caption-10pt rounded-[20px] border-[0.5px] border-[#0B0D41] px-[12px] py-[4px] text-[#0B0D41]">
                {t('ended')}
              </div>
            );
        }
    }
  };
  const descriptionRender = () => {
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
      case LaunchPoolProjectStatus.FUELING:
        return (
          <div>
            <p>{t('fuelingDescriptionTop')}</p>
            <ul className="my-[10px] list-disc pl-[20px]">
              <li>{t('fuelingDescription1')}</li>
              <li>{t('fuelingDescription2')}</li>
              <li>{t('fuelingDescription3')}</li>
            </ul>
            <p>
              <span>{t('fuelingDescriptionBottom')}</span>
              <span className="cursor-pointer underline">{t('allocationCalculation')}</span>
            </p>
          </div>
        );
      case LaunchPoolProjectStatus.ALLOCATION:
        return <p>{t('allocationDescription')}</p>;
      default:
        return <p>{t('airdropDescription')}</p>;
    }
  };
  return (
    <div>
      <p className="body-xl-bold text-[#0B0D41]">{t(titleTxtData[1])}</p>
      <div className="my-[24px] flex gap-[20px] [&>div]:flex-1">
        <div
          className={`rounded-[16px]  px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.FUELING ? 'border border-[#121BDF] bg-neutral-white' : 'bg-[#F1F2FA]'}`}
        >
          <div className="flex items-center justify-between">
            <span className="body-l-bold text-[#0B0D41]">{t('fueling')}</span>
            {tagRender('fueling')}
          </div>
          <p className="body-s mt-[8px] text-[#0B0D41]">
            {moment(launchInfo.fuelStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.allocationStart).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div
          className={`rounded-[16px]  px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.ALLOCATION ? 'border border-[#121BDF] bg-neutral-white' : 'bg-[#F1F2FA]'}`}
        >
          <div className="flex items-center justify-between">
            <span className="body-l-bold text-[#0B0D41]">{t('allocation')}</span>
            {tagRender('allocation')}
          </div>
          <p className="body-s mt-[8px] text-[#0B0D41]">
            {moment(launchInfo.allocationStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.airdropStart).format('ll').split(',').slice(0, 1)}
          </p>
        </div>

        <div
          className={`rounded-[16px]   px-[20px] py-[16px] ${launchInfo.status === LaunchPoolProjectStatus.AIRDROP || launchInfo.status === LaunchPoolProjectStatus.END ? 'border border-[#121BDF] bg-neutral-white' : 'bg-[#F1F2FA]'}`}
        >
          <div className="flex items-center justify-between">
            <span className="body-l-bold text-[#0B0D41]">{t('airdrop')}</span>
            {tagRender('airdrop')}
          </div>
          <p className="body-s mt-[8px] text-[#0B0D41]">
            {moment(launchInfo.airdropStart).format('ll').split(',').slice(0, 1)}
            {' - '}
            {moment(launchInfo.airdropEnd).format('ll').split(',').slice(0, 1)}
          </p>
        </div>
      </div>
      <div className="body-s text-[#0B0D41]">{descriptionRender()}</div>
    </div>
  );
};

export default TimeLine;
