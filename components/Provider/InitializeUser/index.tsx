'use client';
import { FC, ReactNode } from 'react';
import { Lang } from '@/i18n/config';
import { LoginResponse } from '@/service/webApi/user/type';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';

interface InitializeUserProviderProps {
  children: ReactNode;
  lang: Lang;
  userInfo: Partial<LoginResponse> | null;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ lang, children, userInfo: propUserInfo }) => {
  const { waitingLoadUserInfo } = useLoadUserInfo(propUserInfo);

  return <>{children}</>;
};

export default InitializeUserProvider;
