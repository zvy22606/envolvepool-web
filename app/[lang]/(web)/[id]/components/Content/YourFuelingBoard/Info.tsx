import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../../constants/type';
import LockMask from '../../LockMask';
import { BiUser } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa6';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';
import { useAccount } from 'wagmi';
import MetamaskLoginButton from '@/components/Web/Business/AuthModal/ThreePartyLogin/MetamaskLoginButton';

interface InfoProp {}

const Info: React.FC<InfoProp> = () => {
  const { launchInfo, loading, joinWaitlist, participateNow, handleClaimToken } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  const account = useAccount();

  const statusRender = () => {
    if (loading) return null;
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.UPCOMING:
        return {
          desc: <p className="body-l my-[40px] text-[#0B0D41]">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              {userInfo && account.status === 'connected' ? (
                <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={joinWaitlist}>
                  {t('joinWaitlist')}
                </Button>
              ) : (
                <div className="relative">
                  <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={joinWaitlist}>
                    {t('joinWaitlist')}
                  </Button>
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <MetamaskLoginButton />
                  </div>
                </div>
              )}
            </div>
          )
        };
      case LaunchPoolProjectStatus.FUELING:
        if (launchInfo.participateInfo?.isParticipate) return null;
        return {
          desc: <p className="body-l my-[40px] text-[#0B0D41]">{t('fuelingDescription')}</p>,
          button: (
            <div className="flex justify-center">
              {userInfo && account.status === 'connected' ? (
                <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={participateNow}>
                  {t('participateNow')}
                </Button>
              ) : (
                <div className="relative">
                  <Button type="primary" className="h-[60px] w-[477px] uppercase" onClick={participateNow}>
                    {t('participateNow')}
                  </Button>
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <MetamaskLoginButton />
                  </div>
                </div>
              )}
            </div>
          )
        };
      case LaunchPoolProjectStatus.AIRDROP:
        if (!launchInfo.participateInfo?.isParticipate) return null;
        return {
          button: (
            <div className="mt-[24px] flex justify-center">
              {userInfo && account.status === 'connected' ? (
                <Button
                  type="primary"
                  className="h-[60px] w-[270px] uppercase"
                  loading={loading}
                  onClick={handleClaimToken}
                >
                  {t('claimToken')}
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    type="primary"
                    className="h-[60px] w-[270px] uppercase"
                    loading={loading}
                    onClick={handleClaimToken}
                  >
                    {t('claimToken')}
                  </Button>
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <MetamaskLoginButton />
                  </div>
                </div>
              )}
            </div>
          )
        };
      case LaunchPoolProjectStatus.ALLOCATION:
        return null;
      case LaunchPoolProjectStatus.END:
        if (!launchInfo.participateInfo?.isParticipate) return null;
        return {
          button: (
            <div className="mt-[24px] flex justify-center">
              <Button className="h-[60px] w-[270px] cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray">
                {t('claimed')}
              </Button>
            </div>
          )
        };
    }
  };
  return (
    <div className="body-l relative overflow-hidden rounded-[16px] bg-[#F1F2FA] px-[40px] py-[32px]">
      {(launchInfo.status === LaunchPoolProjectStatus.ALLOCATION ||
        launchInfo.status === LaunchPoolProjectStatus.AIRDROP ||
        launchInfo.status === LaunchPoolProjectStatus.END) &&
        !launchInfo.participateInfo?.isParticipate && <LockMask text={t('dontParticipateText')} />}
      {launchInfo.status === LaunchPoolProjectStatus.ALLOCATION && launchInfo.participateInfo?.isParticipate && (
        <FaLock size={20} className="absolute left-[12px] top-[12px] text-neutral-medium-gray" />
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-[50%]">
            {!launchInfo.participateInfo?.isParticipate ? (
              <div className="flex-center h-full w-full bg-neutral-off-white text-neutral-light-gray">
                <BiUser size={40}></BiUser>
              </div>
            ) : (
              <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
            )}
          </div>
          <p className="body-l mt-[8px] text-[#0B0D41]">
            {!launchInfo.participateInfo?.isParticipate ? 'N/A' : userInfo?.nickname}
          </p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-[#0B0D41]">
            {' '}
            {!launchInfo.participateInfo?.isParticipate
              ? 'N/A'
              : separationNumber(launchInfo.participateInfo?.userLaunchProject?.totalFuel || 0)}
          </p>
          <p className="mt-[22px] text-[#0B0D41]">{t('totalFuel')}</p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-[#0B0D41]">
            {' '}
            {!launchInfo.participateInfo?.isParticipate
              ? 'N/A'
              : `#${launchInfo.participateInfo?.userLaunchProject?.rank || 0}`}
          </p>
          <p className="mt-[22px] text-[#0B0D41]">{t('fuelRank')}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-h2 text-[#0B0D41]">
            {' '}
            {!launchInfo.participateInfo?.isParticipate
              ? 'N/A'
              : `${launchInfo.participateInfo?.userLaunchProject?.estimatedToken || 0} $EDU`}
          </p>
          <p className="mt-[22px] text-[#0B0D41]">{t('finalTokenShare')}</p>
        </div>
      </div>
      {statusRender()?.desc}
      {statusRender()?.button}
    </div>
  );
};

export default Info;
