import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import LaunchImg from '@/public/images/launch/launch_frame.png';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { IoIosArrowForward } from 'react-icons/io';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { useCountDown } from 'ahooks';
import moment from 'moment';
import Link from 'next/link';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';
import { linkIcons } from '@/app/[lang]/(web)/[id]/constants/data';

interface OverViewProp {}

const TimeText: React.FC<Record<string, number>> = ({ d, h, m, s }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="text-[#0B0D41]">
      {d}
      {t('day')} {h}
      {t('hour')} {m}
      {t('minutes')} {s}
      {t('seconds')}
    </div>
  );
};

const OverView: React.FC<OverViewProp> = ({}) => {
  const { launchInfo, loading, joinWaitlist, participateNow, handleClaimToken } = useContext(LaunchDetailContext);

  const targetDate = useMemo(() => {
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return launchInfo.fuelStart;
      case LaunchPoolProjectStatus.FUELING:
        return launchInfo.allocationStart;
      case LaunchPoolProjectStatus.ALLOCATION:
        return launchInfo.airdropStart;
      case LaunchPoolProjectStatus.AIRDROP:
        return launchInfo.airdropEnd;
      default:
        return launchInfo.airdropEnd;
    }
  }, [launchInfo]);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: moment(targetDate).format('YYYY-MM-DD HH:mm:ss')
  });
  const { days, hours, minutes, seconds } = formattedRes;

  const statusRender = () => {
    if (loading) return null;
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[100px] border border-[#0B0D41]  px-[12px] py-[.25rem] uppercase text-[#0B0D41]">
              {t('upComing')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingStartsIn')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.isJoined && (
            <Button type="primary" className="button-text-l h-[3rem] w-full uppercase" onClick={joinWaitlist}>
              {t('joinWaitlist')}
            </Button>
          )
        };
      case LaunchPoolProjectStatus.FUELING:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[100px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] uppercase text-[#293CEA]">
              {t('liveNow')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('fuelingClosesIn')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button type="primary" className="button-text-l h-[3rem] w-full uppercase" onClick={participateNow}>
              {t('participateNow')}
            </Button>
          ) : null
        };
      case LaunchPoolProjectStatus.ALLOCATION:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[100px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] uppercase text-[#293CEA]">
              {t('allocating')}
            </div>
          ),
          time: launchInfo.participateInfo?.isParticipate ? (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('allocationEndsin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ) : (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : null
        };
      case LaunchPoolProjectStatus.AIRDROP:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[100px] border border-[#121BDF] bg-[#E6E8F9] px-[12px] uppercase text-[#293CEA]">
              {t('airdrop')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: !launchInfo.participateInfo?.isParticipate ? (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('fuelingEnded')}
            </Button>
          ) : (
            <Button
              type="primary"
              className="button-text-l h-[3rem] w-full  uppercase "
              loading={loading}
              onClick={handleClaimToken}
            >
              {t('claimToken')}
            </Button>
          )
        };
      case LaunchPoolProjectStatus.END:
        return {
          topTag: (
            <div className="body-m-bold flex items-center rounded-[100px] border-[0.5px] border-[#0B0D41] px-[12px] uppercase text-[#0B0D41]">
              {t('ended')}
            </div>
          ),
          time: (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('airdropClosesin')}</div>
              <TimeText d={days} h={hours} m={minutes} s={seconds} />
            </div>
          ),
          button: (
            <Button className="button-text-l h-[3rem] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
              {t('ended')}
            </Button>
          )
        };
    }
  };
  return (
    <div className="">
      <div className="flex-center h-[16.875rem] w-full bg-[#F1F2FA]">
        <Image src={LaunchImg} alt="launch" width={243}></Image>
      </div>
      <div className="mt-[2.5rem] flex flex-1 flex-col gap-[20px] px-[1.25rem]">
        <div className="">
          <div className="item-center flex justify-between">
            <p className="text-h2-mob text-[#121BDF]">ChainCrafter</p>
            {statusRender()?.topTag}
          </div>
          <h1 className="body-m mt-[.25rem] text-[#0B0D41]">{launchInfo.name}</h1>
        </div>

        <div className="body-xs flex text-[#0B0D41]">
          <div className="flex-1 ">
            <p> {t('totalParticipatedUsers')}</p>
            <p className="body-xl-bold mt-[.25rem] text-[#0B0D41]">
              {launchInfo.status === LaunchPoolProjectStatus.UPCOMING ? '??' : separationNumber(launchInfo.userCount)}
            </p>
          </div>
          <div className="flex-1 ">
            <p> {t('totalFuel')}</p>
            <p className="body-xl-bold mt-[.25rem] text-[#0B0D41]">
              {launchInfo.status === LaunchPoolProjectStatus.UPCOMING ? '??' : separationNumber(launchInfo.totalFuel)}
            </p>
          </div>
        </div>

        <div className="body-s text-[rgba(11,13,65,0.5)] [&>div]:mb-[.5rem]">
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('projectToken')}</div>
            <div className="text-[#0B0D41]">$EDU</div>
          </div>
          {statusRender()?.time}
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('totalAirdropAmount')}</div>
            <div className="text-[#0B0D41]">{`${launchInfo.airdropRatio * 100}% / ${separationNumber(launchInfo.totalAirdropAmount)} $EDU`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('currentStakings')}</div>
            <div className="text-[#0B0D41]">{`${separationNumber(launchInfo.currentStakings)} $EDU`}</div>
          </div>
          <div className="flex [&>div]:flex-1">
            <div className=""> {t('blockchainNetwork')}</div>
            <div className="text-[#0B0D41]">Open Campus</div>
          </div>
          {launchInfo.participateInfo?.isParticipate && launchInfo.status !== LaunchPoolProjectStatus.END && (
            <div className="flex [&>div]:flex-1">
              <div className=""> {t('yourFuel')}</div>
              <div className="flex cursor-pointer items-center gap-[.5rem] text-[#0B0D41]">
                <div className="relative">
                  {t('checkYourFuelingBoard')}
                  <div className="absolute bottom-0 left-0 h-[.125rem] w-full bg-[#121BDF]"></div>
                </div>
                <IoIosArrowForward size={18} className="text-[#0B0D41]" />
              </div>
            </div>
          )}
        </div>
        {statusRender()?.button}
        <div className="my-[.625rem] h-[.0625rem] w-full bg-neutral-light-gray"></div>
        <div className="body-s flex items-center text-[#8586A0]">
          <span className="flex-1 ">{t('links')}</span>
          <div className="flex flex-1 items-center justify-between">
            {linkIcons(true).map((v: any) => (
              <Link key={v.id} target="_blank" href={v.link}>
                {v.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
