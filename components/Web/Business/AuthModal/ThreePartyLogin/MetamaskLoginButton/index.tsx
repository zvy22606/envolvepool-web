'use client';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { removeToken, setToken } from '@/helper/user-token';
import useIsPc from '@/hooks/utils/useIsPc';
import { useRedirect } from '@/hooks/router/useRedirect';
// import Metamask from '@/public/images/login/metamask.svg';
import OKX from '@/public/images/login/okx.png';
import webApi from '@/service';
import { LoginResponse } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import { omit } from 'lodash-es';
import Image from 'next/image';
import React, { useState } from 'react';
import { useUserStore } from '@/store/zustand/userStore';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

interface MetamaskLoginButtonProps {}

const MetamaskLoginButton: React.FC<MetamaskLoginButtonProps> = (props) => {
  const isPc = useIsPc();
  const { redirectToUrl } = useRedirect();
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();

  const wagmiAccount = useAccount();
  const { setAuthType, setUserInfo, setAuthModalOpen } = useUserStore((state) => ({
    setAuthType: state.setAuthType,
    setUserInfo: state.setUserInfo,
    setAuthModalOpen: state.setAuthModalOpen
  }));

  const { run: skipInviteCode, loading: skipInviteCodeLoading } = useRequest(
    async (token: string) => {
      const res = await webApi.userApi.activateUser(token);
      return res;
    },
    {
      onSuccess(res: any) {
        console.info(111);
        setUserInfo(omit(res, 'token') as Omit<LoginResponse, 'token'>);
        BurialPoint.track('signup-Google三方登录输入邀请码登录成功');
        setToken(res.token);
        // setAuthModalOpen(false);
        router.refresh();
        // console.log('登录成功');
        // window.location.reload();
        setLoginPending(false);
      },
      onError(e: any) {
        let msg = '';
        if (e.msg) {
          message.error(e.msg);
          msg = e.msg;
        } else {
          message.error(e.message);
          msg = e.message;
        }
      },

      manual: true,
      debounceWait: 500
    }
  );

  const [loginPending, setLoginPending] = useState(false);

  const login = (address: string) => {
    webApi.userApi.walletVerify(address).then((res) => {
      console.log('登录结果');
      if (res.status === 'UNACTIVATED') {
        // setAuthType({
        //   type: AuthType.INVITE_CODE,
        //   params: {
        //     registerType: ThirdPartyAuthType.METAMASK,
        //     ...res
        //   }
        // });
        skipInviteCode(res.token);
      } else {
        console.log('2333333');
        BurialPoint.track('signup-Metamask第三方登录code验证成功');
        setUserInfo(omit(res, 'token'));
        setToken(res.token);
        // setAuthModalOpen(false);
        router.refresh();
        console.log('登录成功');
        // window.location.reload();
        setLoginPending(false);
      }
    });
  };

  return (
    <>
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none'
                }
              })}
            >
              {(() => {
                if (!loginPending && !wagmiAccount.isConnected && !wagmiAccount.isConnecting && userInfo) {
                  removeToken();
                  window.location.reload();
                }
                if (!connected || !userInfo) {
                  if (wagmiAccount.address && !userInfo && !loginPending) {
                    setLoginPending(true);
                    login(wagmiAccount.address);
                  }
                  return (
                    <Button
                      ghost
                      loading={authenticationStatus === 'loading'}
                      disabled={authenticationStatus === 'loading'}
                      onClick={() => {
                        if (connected) {
                          login(account.address);
                        } else {
                          setLoginPending(true);
                          openConnectModal();
                        }
                      }}
                      className="body-m h-full w-full rounded-[.75rem] border border-neutral-light-gray p-3"
                    >
                      <Image src={OKX} width={24} height={24} alt="MetaMask"></Image>
                    </Button>
                  );
                }
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default MetamaskLoginButton;
