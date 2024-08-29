import { FC, ReactNode } from 'react';

import BaseLayout from './BaseLayout';
export interface LayoutProps {
  navbarData: any;
  children: ReactNode;
}

const V2Layout: FC<LayoutProps> = async (props) => {
  let { children, navbarData } = props;
  return <BaseLayout navbarData={navbarData}>{children}</BaseLayout>;
};
export default V2Layout;
