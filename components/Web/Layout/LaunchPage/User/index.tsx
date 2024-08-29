import { BurialPoint } from '@/helper/burialPoint';
import Image from 'next/image';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/store/zustand/userStore';
import { LoginResponse } from '@/service/webApi/user/type';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import DropDownMotion from '@/components/Common/DropDownMotion';
import Settings from '@/components/Web/User/Settings';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import UserDropCard from '../UserDropCard';
import { ChevronDown } from 'lucide-react';
import MetamaskLoginButton from '@/components/Web/Business/AuthModal/ThreePartyLogin/MetamaskLoginButton';
import { useAccount } from 'wagmi';
import { truncateMiddle } from '@/helper/utils';
interface UserProps {
  userInfo: Partial<LoginResponse> | null;
  loading: boolean;
}

const User: FC<UserProps> = ({ userInfo, loading }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [showUserDropCard, setShowUserDropCard] = useState(false);
  const userDropCardRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const pathname = useCustomPathname();

  const account = useAccount();

  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);

  if (loading) return null;
  return (
    <div className="relative h-full">
      <div className="relative  flex h-full items-center justify-end" ref={userDropCardRef as any}>
        <div className="flex h-full cursor-pointer items-center justify-end">
          {account.status === 'connected' && userInfo ? (
            <div className="flex-row-center body-s text-neutral-off-black">
              <div
                className="relative flex h-[64px]  items-center justify-end"
                onMouseEnter={() => setShowUserDropCard(true)}
                onMouseLeave={() => setShowUserDropCard(false)}
              >
                <div
                  className={`flex items-center gap-[8px] rounded-[12px] border border-neutral-white bg-[#F1F2FA] px-[16px] py-[8px]`}
                >
                  <div className="relative h-[32px] w-[32px] rounded-[50%]">
                    <Image
                      src={userInfo?.avatar as string}
                      alt="avatar"
                      fill
                      className="object-cover"
                      onError={() => {
                        BurialPoint.track('头像加载失败', {
                          userId: userInfo?.id || ''
                        });
                      }}
                    ></Image>
                  </div>

                  <div className="body-s flex items-center gap-[8px] text-[#2A2829]">
                    <div>{truncateMiddle(account.address as string)}</div>
                    <ChevronDown className={`transition-all ${showUserDropCard && 'rotate-180'}`} />
                  </div>
                </div>
                <DropDownMotion open={!!(userInfo && showUserDropCard)} className={'-right-[15px]'}>
                  <UserDropCard
                    userInfo={(userInfo as LoginResponse) || {}}
                    onClose={() => setShowUserDropCard(false)}
                  ></UserDropCard>
                </DropDownMotion>
              </div>
            </div>
          ) : !account.isConnecting ? (
            <div className=" ">
              <div className="body-s relative rounded-[17px] border-[1px] border-[#121BDF] px-[12px] py-[6px] text-neutral-black">
                Connect Wallet
                <div className="absolute left-0 top-0 h-full w-full opacity-0">
                  <MetamaskLoginButton></MetamaskLoginButton>
                </div>
              </div>

              {/* <Button
                ghost
                className="h-[2.5rem] text-[14px]   uppercase"
                onClick={() => {
                  setAuthType(AuthType.LOGIN);
                  setAuthModalOpen(true);
                }}
              >
                {t('logIn')}
              </Button>
              <Button
                type="primary"
                className="h-[2.5rem] text-[14px]  uppercase"
                onClick={() => {
                  setAuthType(AuthType.SIGN_UP);
                  setAuthModalOpen(true);
                }}
              >
                {t('signUp')}
              </Button> */}
            </div>
          ) : null}
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default User;
