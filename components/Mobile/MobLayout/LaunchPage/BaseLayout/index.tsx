'use client';
import React, { ReactNode } from 'react';
import NavBar, { NavbarProps } from '../Navbar';

// import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import { LoginResponse } from '@/service/webApi/user/type';

export interface V2LayoutProps {
  navbarData: Omit<NavbarProps, 'userInfo'>;
  // footerData: IFooterProps;
  children: ReactNode;
  userInfo: Partial<LoginResponse> | null;
}

const V2Layout: React.FC<V2LayoutProps> = ({ navbarData, children, userInfo }) => {
  return (
    <div className={`relative w-full  `}>
      <div className="fixed top-0 z-50 flex w-full items-center bg-neutral-white">
        <NavBar {...navbarData} userInfo={userInfo} />
      </div>
      <div id="content-scroll-wrap" className={`m-auto w-full pt-[4rem] `}>
        {children}
      </div>
    </div>
  );
};

export default V2Layout;
