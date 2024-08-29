import Button from '@/components/Common/Button';
import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext, useMemo, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext, ModalName } from '../../../constants/type';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import { useAccount } from 'wagmi';
import moment from 'moment';
import { FuelInfo } from '@/service/webApi/launchPool/type';
import MetamaskLoginButton from '@/components/Web/Business/AuthModal/ThreePartyLogin/MetamaskLoginButton';

interface StakeFuelProp {}

const StakeFuel: React.FC<StakeFuelProp> = () => {
  const { launchInfo, modalName, setModalName } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [fule, setFule] = useState<FuelInfo>();
  const account = useAccount();
  const stakeList = useMemo(() => {
    return launchInfo.fuelsInfo.filter((v: any) => v.type === 'STAKE_TOKEN');
  }, [launchInfo]);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  console.log(fule);
  return (
    <div className="mt-[24px]">
      <div className="flex items-center gap-[24px]">
        <p className="body-l text-[#0B0D41]">{t('stakeFuel')}</p>
        {launchInfo.isStake && (
          <>
            {account.status === 'connected' && userInfo ? (
              <div
                className="body-m flex cursor-pointer items-center gap-[5px] text-[#0B0D41]"
                onClick={() => setModalName(ModalName.STAKE)}
              >
                <IoMdAddCircle size={24} />
                <span>{t('addNewStake')}</span>
              </div>
            ) : (
              <div className="body-m relative flex cursor-pointer items-center gap-[5px] text-[#0B0D41]">
                <IoMdAddCircle size={24} />
                <span>{t('addNewStake')}</span>
                <div className="absolute left-0 top-0 h-full w-full opacity-0">
                  <MetamaskLoginButton />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {stakeList.length > 0 ? (
        stakeList.map((v: any) => (
          <div
            key={v.id}
            className="body-m mt-[16px] flex items-center justify-between rounded-[16px] border-[2px] border-[#F1F2FA] bg-neutral-white px-[30px] py-[22px] text-[#0B1141]"
          >
            <div className="flex items-center gap-[19px]">
              <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[50%]">
                <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
              </div>
              <span>
                {lang === Lang.EN
                  ? `${v.name} on ${moment(v.stakeTime).format('DD/MM/yyyy')}`
                  : `${moment(v.stakeTime).format('yyyy年MM月DD日')}抵押${v.name}`}
              </span>
            </div>
            <div className="flex items-center gap-[40px]">
              <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px]  bg-[#F1F2FA] pr-[15px]">
                <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-[#121BDF]">
                  <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-[#F1F2FA]">🚀</div>
                </div>
                <span>{`${separationNumber(v.reward)}`}</span>
              </div>

              <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] bg-[#F1F2FA] pr-[15px]">
                <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-neutral-off-white">
                  <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-[#F1F2FA] text-[#0B0D41]">
                    <MdOutlineAccessTimeFilled size={24} />
                  </div>
                </div>
                <span>{`${v.duration}${t('d')}`}</span>
              </div>

              <div className="relative">
                <div
                  className="underline-l ml-[-20px] cursor-pointer text-[#0B0D41]"
                  onClick={() => {
                    setFule(v);
                    setModalName(ModalName.UNSTAKE);
                  }}
                >
                  {t('unstake')}
                </div>
                {account.status !== 'connected' ||
                  (!userInfo && (
                    <div className="absolute left-0 top-0 h-full w-full opacity-0">
                      <MetamaskLoginButton />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-[16px] flex flex-col items-center">
          <p className="body-l w-[507px] text-center text-[#0B0D41]">{t('stakeDescription')}</p>
          {account.status === 'connected' && userInfo ? (
            <Button
              type="primary"
              className=" mt-[12px] h-[48px] w-[165px] p-0"
              onClick={() => setModalName(ModalName.STAKE)}
            >
              {t('stake')} $EDU
            </Button>
          ) : (
            <div className="relative mt-[12px] h-[48px]  w-[165px]">
              <Button type="primary" className="mt-[12px] h-[48px] w-[165px] p-0">
                {t('stake')} $EDU
              </Button>
              <div className="absolute left-0 top-0 h-full w-full opacity-0">
                <MetamaskLoginButton />
              </div>
            </div>
          )}
        </div>
      )}

      <StakeModal open={modalName === ModalName.STAKE} onClose={() => setModalName(ModalName.EMPTY)} />
      <UnstakeModal
        open={modalName === ModalName.UNSTAKE}
        onClose={() => setModalName(ModalName.EMPTY)}
        fule={fule as FuelInfo}
      />
    </div>
  );
};

export default StakeFuel;
