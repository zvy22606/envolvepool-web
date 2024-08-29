import { FC, ReactNode } from 'react';
import Layout from '@/components/Web/Layout/LaunchPage';
interface WebLayoutProps {
  children: ReactNode;
}

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return <Layout navbarData={{}}>{children}</Layout>;
};

export default WebLayout;
