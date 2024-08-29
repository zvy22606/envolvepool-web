'use client';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { useRedirect } from '@/hooks/router/useRedirect';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import User from '../User';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LoginResponse } from '@/service/webApi/user/type';
import Link from 'next/link';

export interface NavBarProps {
  logo?: ReactNode;
  userInfo: Partial<LoginResponse> | null;
  loading: boolean;
}

const NavBar: React.FC<NavBarProps> = (NavBarProps) => {
  const { userInfo, loading } = NavBarProps;
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const [curNavId, setCurNavId] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative z-[999] h-[64px]  w-full border-b border-[#A6A6A6] bg-neutral-white">
      <div className={`container mx-auto h-full`}>
        <div className="flex h-full items-center justify-between">
          <Link href={'/'} className="block h-full">
            <nav className="flex h-full items-center text-[14px] font-extra-bold text-[#121BDF]">ENVOLVE POOL</nav>
          </Link>
          <div className="flex items-center">
            <User userInfo={userInfo} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
