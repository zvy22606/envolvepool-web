'use client';
import React, { useContext } from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';
import YourFuelingBoard from './YourFuelingBoard';
import About from './About';
import DemoVideo from './DemoVideo';
import KeyMetrics from './KeyMetrics';
import Tractions from './Tractions';
import Loading from '@/components/Common/Loading';
import { useWriteAirdropClaim } from '@/lib/generated';
import { useAccount } from 'wagmi';
import { LaunchDetailContext } from '@/app/[lang]/(web)/[id]/constants/type';

interface ContentProp {
  loading: boolean;
}

const Content: React.FC<ContentProp> = ({ loading }) => {
  const { setLoading } = useContext(LaunchDetailContext);
  const account = useAccount();
  const { writeContractAsync: writeContractAsyncClaim } = useWriteAirdropClaim();
  return (
    <div className="pb-[2rem]">
      <Loading loading={loading} className="w-full">
        <div className="[&>div]:relative">
          <div>
            <OverView />
          </div>
          <div className="mt-[4rem]">
            <TimeLine />
          </div>
          <div className="mt-[4rem]">
            <YourFuelingBoard />
          </div>
          <div className="mt-[4rem]">
            <About />
          </div>
          <div className="mt-[4rem]">
            <DemoVideo />
          </div>
          <div className="mt-[4rem]">
            <KeyMetrics />
          </div>
          <div className="mt-[4rem]">
            <Tractions />
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default Content;
