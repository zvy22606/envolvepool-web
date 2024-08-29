import { separationNumber } from '@/helper/utils';
import React, { useContext, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { useUserStore } from '@/store/zustand/userStore';
import { FaUser } from 'react-icons/fa6';
import CopyIcon from '@/components/Common/Icon/Copy';
import InviteCodeIcon from '@/components/Common/Icon/InviteCodeIcon';
import message from 'antd/es/message';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import LockMask from '../../LockMask';
import { LaunchDetailContext } from '../../../constants/type';

interface InvitationFuelProp {}

const InvitationFuel: React.FC<InvitationFuelProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  const invitation = useMemo(() => {
    return launchInfo.fuelsInfo.find((v: any) => v.type === 'INVITATION');
  }, [launchInfo]);
  return (
    <div className="mt-[24px]">
      <p className="body-l text-[#0B0D41]">{t('invitationFuel')}</p>
      <div className="body-m relative  mt-[16px] flex  justify-between gap-[40px] rounded-[16px] border-[2px] border-[#F1F2FA] bg-neutral-white px-[30px] py-[22px] text-[#0B1141]">
        {!launchInfo.isStake && <LockMask />}
        <div className="flex flex-1 gap-[19px]">
          <div className="relative h-[40px] w-[40px] flex-shrink-0 overflow-hidden rounded-[50%]">
            <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
          </div>
          <div className="pt-[7px]">
            {/* <p>{t('shareYourInviteCodetoEarnFuel')}</p> */}
            <p>{invitation?.name}</p>
            <p className="body-s text-[#3E3E3E]">{t('shareDescription')}</p>
          </div>
        </div>
        <div className="flex  h-full flex-shrink-0 flex-col justify-between gap-[20px]">
          <div className="flex items-center gap-[40px]">
            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] bg-[#F1F2FA] pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-[#121BDF]">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-[#F1F2FA]">🚀</div>
              </div>
              <span>{`${separationNumber(invitation?.reward || 0)}`}</span>
            </div>

            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px]  bg-[#F1F2FA] pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-neutral-off-white">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-[#F1F2FA] text-[#0B0D41]">
                  <FaUser size={20} />
                </div>
              </div>
              <span>
                {invitation?.inviteCount} {t('inv')}
              </span>
            </div>
          </div>
          <div className="relative left-[-20px] flex h-[40px] w-[calc(100%+20px)] items-center justify-between rounded-[20px]  bg-[#F1F2FA] p-[15px]">
            <div className="body-s flex items-center gap-[5px] text-[#0B0D41]">
              <InviteCodeIcon />
              <span>{userInfo?.inviteCode}</span>
            </div>
            <div
              className="caption-14pt flex cursor-pointer  items-center gap-[6px] text-[#0B0D41]"
              onClick={async (e) => {
                try {
                  await navigator.clipboard.writeText(userInfo?.inviteCode || '');
                  message.success('Copy success!');
                } catch (e) {
                  message.warning('The browser version is too low or incompatible！');
                }
              }}
            >
              <CopyIcon width={17} height={21} color={'#0B0D41'} />
              <span>{t('copy')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationFuel;
