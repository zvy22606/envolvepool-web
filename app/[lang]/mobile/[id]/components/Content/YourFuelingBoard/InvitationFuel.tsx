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
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';

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
    <div className="mt-[1.25rem]">
      <p className="body-l text-[#0B0D41]">{t('invitationFuel')}</p>
      <div className="body-m relative  mt-[.75rem] rounded-[1rem] border border-[#F1F2FA] bg-neutral-white px-[1rem] py-[1.375rem] text-neutral-black">
        {!launchInfo.isStake && <LockMask />}
        <div className="flex flex-1 gap-[.75rem]">
          <div className="relative h-[2.5rem] w-[2.5rem] flex-shrink-0 overflow-hidden rounded-[50%]">
            <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
          </div>
          <div className="pt-[.375rem]">
            <p>{invitation?.name}</p>
            <p className="caption-12pt text-[#3E3E3E]">{t('shareDescription')}</p>
          </div>
        </div>
        <div className="relative my-[1rem]  flex h-[2.5rem] items-center justify-between rounded-[1.25rem] bg-[#F1F2FA] p-[.9375rem]">
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
            <CopyIcon width={17} height={21} color={'var(--[#0B0D41])'} />
            <span>{t('copy')}</span>
          </div>
        </div>
        <div className="flex  h-full flex-shrink-0 flex-col justify-between gap-[2rem] pl-[1.25rem]">
          <div className="flex items-center justify-between">
            <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem] bg-[#F1F2FA] pr-[.9375rem]">
              <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-[#121BDF]">
                <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-[#F1F2FA]">🚀</div>
              </div>
              <span>{`${separationNumber(invitation?.reward || 0)}`}</span>
            </div>

            <div className="flex  h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem] bg-[#F1F2FA] pr-[.9375rem]">
              <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-neutral-off-white">
                <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-[#F1F2FA] text-[#0B0D41]">
                  <FaUser size={20} />
                </div>
              </div>
              <span>
                {invitation?.inviteCount} {t('inv')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationFuel;
