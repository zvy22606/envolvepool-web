import React, { useContext, useState } from 'react';
import Image from 'next/image';
import IconTarget from '@/public/images/launch/target_icon.png';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../../constants/type';
import { FuelInfo } from '@/service/webApi/launchPool/type';
import DiscordIcon from '@/public/images/launch/discord_icon.png';
import Twitter from '@/public/images/launch/twitter_icon.png';
import webApi from '@/service';
import message from 'antd/es/message';
import { errorMessage } from '@/helper/ui';
import { isNotDefaultTargetType } from '../../../constants/data';

interface TargetCardProp {
  target: FuelInfo;
}

const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
  const { refreshFuel } = useContext(LaunchDetailContext);
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const completed = target.completed;
  const claimed = target.claimed;
  const icon = () => {
    switch (target.type) {
      case 'JOIN_DISCORD':
        return DiscordIcon;
      case 'FOLLOW_TWITTER':
      case 'RETWEET_TWITTER':
        return Twitter;
      default:
        return IconTarget;
    }
  };

  const claimTarget = () => {
    if (!target.completed || (target.completed && target.claimed)) return;
    setLoading(true);
    webApi.launchPoolApi
      .claimTarget(target.id)
      .then(() => {
        message.success('success');
        refreshFuel();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className={`body-m item-center relative mt-[16px] flex justify-between gap-[40px] rounded-[16px]   px-[30px] py-[22px] text-[#3E3E3E] ${completed ? 'border border-neutral-light-gray bg-neutral-off-white' : 'bg-neutral-white  shadow-[0_0_8px_0px_rgba(241,242,250,1)]'}`}
    >
      <div className="flex items-center gap-[19px]">
        <div
          className={`relative  overflow-hidden ${~isNotDefaultTargetType.indexOf(target.type) ? 'h-[32px] w-[32px]' : 'h-[40px] w-[40px]'}`}
        >
          <Image src={icon()} alt="avatar" fill className="object-cover"></Image>
        </div>
        <span>{target.name}</span>
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] bg-[#F1F2FA] pr-[15px]">
          <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-[#121BDF]">
            <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-[#F1F2FA]">🚀</div>
          </div>
          <span>{`${separationNumber(target.reward)}`}</span>
        </div>
        <Button
          loading={loading}
          onClick={claimTarget}
          className={`button-text-s h-[34px] w-[165px]  uppercase ${!target.completed ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray' : target.claimed ? 'cursor-not-allowed bg-yellow-primary text-neutral-black opacity-50' : ''}`}
        >
          {`${claimed ? 'claimed' : 'claim'}`}
        </Button>
      </div>
    </div>
  );
};

export default TargetCard;
