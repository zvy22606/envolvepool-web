'use client';
import { FC } from 'react';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { submitIdoLink } from '../../constants/data';

interface TopBannerProps {
  lang: Lang;
}

const TopBanner: FC<TopBannerProps> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex w-full flex-col items-center gap-[40px] pt-[80px]">
      <div className="flex flex-col items-center gap-[24px]">
        <h1 className="text-[48px] font-bold uppercase text-[#0B0D41]">{`Envolve Pool`}</h1>
        <div className="flex items-center gap-[12px]">
          <span className="bold-m-bold text-[#A6A6A6]">{t('poweredBy')}</span>
          <Image src={'/images/launch/powerd_by.png'} alt="Open Campus" width={156} height={40}></Image>
        </div>
        <p className="bold-m-bold text-[#0B0D41] ">{'No.1 LaunchPool on EDU Chain'}</p>
      </div>
      <div className="flex gap-4">
        <Button
          ghost
          className="body-m-bold h-[3.5rem] w-[15rem]"
          onClick={() => {
            const container = document.getElementById('launch-container') as HTMLBRElement;
            container.scrollTo({
              top: 600
            });
          }}
        >
          {t('seeProjects')}
        </Button>
        <Link href={submitIdoLink} target="_blank">
          <Button type="primary" className="body-m-bold h-[3.5rem] w-[15rem]">
            {t('submitIDO')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
