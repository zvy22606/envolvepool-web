import { FC, ReactNode } from 'react';

import { NavbarProps } from './Navbar';
import BaseLayout from './BaseLayout';
import webApi from '@/service';
export interface LayoutProps {
  navbarData: Omit<NavbarProps, 'userInfo'>;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = async (props) => {
  let { children, navbarData } = props;
  let userInfo = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err) {}
  return (
    <BaseLayout navbarData={navbarData} userInfo={userInfo}>
      {children}
    </BaseLayout>
  );
};
export default V2Layout;
