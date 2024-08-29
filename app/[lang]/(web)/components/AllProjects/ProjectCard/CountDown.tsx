'use client';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useCountDown } from 'ahooks';
import { cn } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LaunchPoolProjectType } from '@/service/webApi/launchPool/type';

interface CountDownItemProps {
  count: number;
  format: string;
  className: string;
}

const CountItem: FC<CountDownItemProps> = ({ count, format, className }) => {
  const countNode = useMemo(() => {
    const countString = count.toString().split('');
    if (countString.length === 1) {
      return (
        <>
          <span className={cn('body-xl-bold inline-block rounded-[4px] px-2 py-1 text-[#0B0D41]', className)}>
            0{countString[0]}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className={cn('body-xl-bold inline-block rounded-[4px] px-2 py-1 text-[#0B0D41]', className)}>
            {countString.join('')}
          </span>
        </>
      );
    }
  }, [count, className]);

  return (
    <div className="flex items-center gap-1">
      {countNode}
      <span className="body-l uppercase text-[#0B0D41]">{format}</span>
    </div>
  );
};

interface CountDownProps {
  project: LaunchPoolProjectType;
}

const CountDown: FC<CountDownProps> = ({ project }) => {
  const [mount, setMount] = useState(false);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [countdown, formattedRes] = useCountDown({
    targetDate: project.airdropEnd
  });
  const status = project.status;
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className="body-s text-[#0B0D41]">{t('closeIn')}</p>
      <div className="flex gap-4">
        <CountItem count={days} format={t('day')} className={`bg-[#E6E8F9]`} />
        <CountItem count={hours} format={t('hour')} className={`bg-[#E6E8F9]`} />
        <CountItem count={minutes} format={t('minutes')} className={`bg-[#E6E8F9]`} />
        <CountItem count={seconds} format={t('seconds')} className={`bg-[#E6E8F9]`} />
      </div>
    </div>
  );
};

export default CountDown;
