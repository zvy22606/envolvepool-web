'use client';
import { FC, PropsWithChildren } from 'react';
import LangProvider from '../Lang';
import { Lang } from '@/i18n/config';
import WagmiConfigProvider from '../WagmiConfigProvider';
import GlobalModal from '@/components/Web/GlobalModal';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
interface WebAppProviderProps {
  lang: Lang;
}

const WebAppProvider: FC<PropsWithChildren<WebAppProviderProps>> = ({ lang, children }) => {
  return (
    <LangProvider lang={lang}>
      <WagmiConfigProvider>
        {children}
        <ProgressBar
          height="4px"
          color="#121BDF"
          options={{ showSpinner: false, positionUsing: '' }}
          shallowRouting
          disableSameURL
        />
        <GlobalModal />
      </WagmiConfigProvider>
    </LangProvider>
  );
};

export default WebAppProvider;
