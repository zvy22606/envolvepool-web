import React, { useContext, useState } from 'react';
import Image from 'next/image';
import IconTarget from '@/public/images/launch/target_icon.png';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { FuelInfo } from '@/service/webApi/launchPool/type';
import DiscordIcon from '@/public/images/launch/discord_icon.png';
import Twitter from '@/public/images/launch/twitter_icon.png';
import webApi from '@/service';
import message from 'antd/es/message';
import { errorMessage } from '@/helper/ui';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';
import { isNotDefaultTargetType } from '@/app/[lang]/(web)/[id]/constants/data';

interface TargetCardProp {
  target: FuelInfo;
}

const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
  const { refreshFuel, launchInfo } = useContext(LaunchDetailContext);
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const completed = true;
  const claimed = true;
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
      .claimTarget(launchInfo.id, target.id)
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
      className={`body-m item-center relative mt-[1rem] rounded-[1rem] border  p-[1rem] text-neutral-black ${completed ? 'border border-neutral-light-gray bg-neutral-off-white' : 'bg-neutral-white  shadow-[0_0_8px_1px_rgba(#F1F2FA)]'}`}
    >
      <div className="flex items-center gap-[.75rem]">
        <div
          className={`relative  overflow-hidden ${~isNotDefaultTargetType.indexOf(target.type) ? 'h-[2rem] w-[2rem]' : 'h-[2.5rem] w-[2.5rem]'}`}
        >
          <Image src={icon()} alt="avatar" fill className="object-cover"></Image>
        </div>
        <span>{target.name}</span>
      </div>
      <div className="mt-[1rem] flex items-center justify-between pl-[1.25rem]">
        <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem] bg-[#F1F2FA] pr-[.9375rem]">
          <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-[#121BDF]">
            <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-[#F1F2FA]">🚀</div>
          </div>
          <span>{`${separationNumber(target.reward)}`}</span>
        </div>
        <Button
          loading={loading}
          onClick={claimTarget}
          className={`button-text-s h-[2.125rem] w-[calc((100%-2rem)/2+1.25rem)]  uppercase ${!target.completed ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray' : target.claimed ? 'cursor-not-allowed bg-yellow-primary text-neutral-black opacity-50' : ''}`}
        >
          {`${claimed ? 'claimed' : 'claim'}`}
        </Button>
      </div>
    </div>
  );
};

export default TargetCard;
