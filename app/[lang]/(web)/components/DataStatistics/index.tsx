import { FC } from 'react';
import CountUp from './CountUp';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
interface DataStatisticsProps {
  lang: Lang;
}

const DataStatistics: FC<DataStatisticsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="body-l container relative mx-auto flex justify-between rounded-[16px] bg-[#E6E8F9] px-[1.875rem] py-[1.75rem] text-[#0B0D41]">
      <div className="flex flex-1 flex-col items-center ">
        <p className="text-h2 text-[#121BDF]">
          <CountUp start={0} end={10} duration={3}></CountUp>+
        </p>
        <p className="text-center">{t('totalUsers')}</p>
      </div>
      <div className="flex flex-1 flex-col items-center ">
        <p className="text-h2 text-[#121BDF]">
          <CountUp
            start={0}
            end={20}
            duration={3}
            // enableScrollSpy
          ></CountUp>
          +
        </p>
        <p className="text-center">{t('totalStakedValue')}</p>
      </div>
      <div className="flex flex-1 flex-col items-center ">
        <p className="text-h2 text-[#121BDF]">
          <CountUp
            start={0}
            end={30}
            duration={3}
            // enableScrollSpy
          ></CountUp>
          +
        </p>
        <p className="text-center">{t('totalFuel')}</p>
      </div>
      <div className="flex flex-1 flex-col items-center ">
        <p className="text-h2 text-[#121BDF]">
          <CountUp
            start={0}
            end={30}
            duration={3}
            // enableScrollSpy
          ></CountUp>
          +
        </p>
        <p className="text-center">{t('totalAirdropToken')}</p>
      </div>
    </div>
  );
};

export default DataStatistics;
