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
    <div className="body-m relative mx-auto flex w-full flex-col gap-8  px-5 text-[#0B0D41]">
      <div className="flex flex-col gap-8 rounded-[16px] bg-[#E6E8F9]  py-10">
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-[#121BDF]">
            <CountUp start={0} end={10} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-[#0B0D41]">{t('totalUsers')}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-[#121BDF]">
            <CountUp start={0} end={20} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-[#0B0D41]">{t('totalStakedValue')}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-[#121BDF]">
            <CountUp start={0} end={30} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-[#0B0D41]">{t('totalFuel')}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob text-[#121BDF]">
            <CountUp start={0} end={30} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-[#0B0D41]">{t('totalAirdropToken')}</p>
        </div>
      </div>
    </div>
  );
};

export default DataStatistics;
