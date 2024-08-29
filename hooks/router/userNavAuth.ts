'use client';
import { useEffect } from 'react';

import { getToken } from '@/helper/user-token';
import { useRedirect } from '../router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { LoginResponse } from '@/service/webApi/user/type';

function useNavAuth(propUserInfo: Partial<LoginResponse> | null, waitingUserData: boolean) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

  useEffect(() => {
    if (waitingUserData) return;
    const redirect_url = query.get('redirect_url');
    // 已经登录了
    if (propUserInfo || userInfo) {
      const token = getToken();
      if (redirect_url && token) {
        redirectToUrl(`${redirect_url}?token=${token}`);
      } else {
        // redirectToUrl(V2_DASHBOARD_PATH);
      }

      return;
    }

    // 未登录
    redirectToUrl('/');
    setAuthType(AuthType.LOGIN);
  }, [userInfo, pathname, redirectToUrl, setAuthType]);
}

export default useNavAuth;
