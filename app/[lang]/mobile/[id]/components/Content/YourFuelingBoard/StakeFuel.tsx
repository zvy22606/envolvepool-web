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
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import { useAccount } from 'wagmi';
import moment from 'moment';
import { FuelInfo } from '@/service/webApi/launchPool/type';
import ConnectButton from '@/components/Web/Business/ConnectButton';
import { LaunchDetailContext, ModalName } from '@/app/[lang]/(web)/[id]/constants/type';

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
  return (
    <div className="mt-[1.25rem]">
      <div className="flex items-center gap-[1rem]">
        <p className="body-m text-[#0B0D41]">{t('stakeFuel')}</p>
        {launchInfo.isStake && (
          <>
            {account.status === 'connected' ? (
              <div
                className="body-s flex  items-center gap-[.25rem] text-[#0B0D41]"
                onClick={() => setModalName(ModalName.STAKE)}
              >
                <IoMdAddCircle size={16} />
                <span>{t('addNewStake')}</span>
              </div>
            ) : (
              <div className="body-s relative  flex items-center gap-[.25rem] text-[#0B0D41]">
                <IoMdAddCircle size={16} />
                <span>{t('addNewStake')}</span>
                <div className="absolute left-0 top-0 h-full w-full opacity-0">
                  <ConnectButton t={t} />
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
            className="body-m mt-[1rem]  rounded-[1rem] border border-[#F1F2FA] bg-neutral-white p-[1rem] text-[#0B1141]"
          >
            <div className="flex items-center gap-[.75rem]">
              <div className="relative h-[2.5rem] w-[2.5rem] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
              </div>
              <span>
                {lang === Lang.EN
                  ? `${v.name} on ${moment(v.stakeTime).format('DD/MM/yyyy')}`
                  : `${moment(v.stakeTime).format('yyyy年MM月DD日')}抵押${v.name}`}
              </span>
            </div>
            <div className="my-[1rem] flex justify-between pl-[1.25rem]">
              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem]  bg-[#F1F2FA] pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-[#121BDF]">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-[#F1F2FA]">🚀</div>
                </div>
                <span>{`${separationNumber(v.reward)}`}</span>
              </div>

              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)]   items-center justify-between rounded-r-[1.25rem] bg-[#F1F2FA] pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-neutral-off-white">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-[#F1F2FA] text-[#0B0D41]">
                    <MdOutlineAccessTimeFilled size={24} />
                  </div>
                </div>
                <span>{`${v.duration}${t('d')}`}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative">
                <div
                  className="underline-l body-m cursor-pointer text-[#0B0D41]"
                  onClick={() => {
                    setFule(v);
                    setModalName(ModalName.UNSTAKE);
                  }}
                >
                  {t('unstake')}
                </div>
                {account.status !== 'connected' && (
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <ConnectButton t={t} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-[1rem] flex flex-col items-center">
          <p className="body-m w-full text-center text-[#0B0D41]">{t('stakeDescription')}</p>
          {account.status === 'connected' ? (
            <Button
              type="primary"
              className="button-text-m mt-[.75rem] h-[3rem] w-[10.3125rem] p-0 uppercase text-[#0B0D41]"
              onClick={() => setModalName(ModalName.STAKE)}
            >
              {t('stake')} $EDU
            </Button>
          ) : (
            <div className="relative mt-[.75rem] h-[3rem]  w-[10.3125rem]">
              <Button
                type="primary"
                className="button-text-m mt-[.75rem] h-[3rem] w-[10.3125rem] p-0 uppercase text-[#0B0D41]"
              >
                {t('stake')} $EDU
              </Button>
              <div className="absolute left-0 top-0 h-full w-full opacity-0">
                <ConnectButton t={t} />
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
