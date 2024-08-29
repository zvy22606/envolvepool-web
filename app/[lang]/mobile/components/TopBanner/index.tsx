'use client';
import { FC } from 'react';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { submitIdoLink } from '@/app/[lang]/(web)/constants/data';

interface TopBannerProps {
  lang: Lang;
}

const TopBanner: FC<TopBannerProps> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex w-full flex-col items-center px-5 py-10">
      <div className="mt-[5.625rem] flex flex-col items-center gap-8">
        <h1 className="text-h1-mob text-center capitalize text-[#0B0D41]">{`Envolve Pool`}</h1>
        <div className="flex items-center gap-6">
          <span className="body-m-bold text-[#A6A6A6]">{t('poweredBy')}</span>
          <Image src={'/images/launch/powerd_by.png'} alt="Open Campus" width={156} height={40}></Image>
        </div>
        <p className="body-m-bold max-w-[257px] text-center text-[#0B0D41]">{`No.1 LaunchPool on EDU Chain`}</p>
      </div>
      <div className="mt-16 flex gap-4">
        <Button
          ghost
          className="button-text-m w-[165px] max-w-[165px]  py-4"
          onClick={() => {
            const container = document.getElementById('launch-container') as HTMLBRElement;
            container.scrollTo({
              top: 800
            });
          }}
        >
          {t('seeProjects')}
        </Button>
        <Link href={submitIdoLink} target="_blank">
          <Button type="primary" className="button-text-m w-[165px] max-w-[165px] py-4 ">
            {t('submitIDO')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
