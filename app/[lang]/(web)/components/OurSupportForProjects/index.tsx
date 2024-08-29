import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { data } from './constant';
import Button from '@/components/Common/Button';
import { useTranslation } from '@/i18n/server';

interface OurSupportForProjectsProps {
  lang: Lang;
}

const OurSupportForProjects: FC<OurSupportForProjectsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="container relative mx-auto mt-5 flex w-full flex-col items-center pb-40">
      <h2 className="text-h25 mb-6 text-center text-[#0B0D41]">{t('projectsSupport')}</h2>
      <p className="body-m mx-auto w-[960px] max-w-[960px] text-center text-[#0B0D41]">{t('projectsSupportDesc')}</p>
      <div className="flex flex-wrap justify-center gap-6 py-10">
        {data.map((item) => {
          return (
            <div key={item} className="body-m-bold rounded-[24px] bg-[#F1F2FA] p-6 tracking-tight  text-[#0B0D41]">
              {t(item)}
            </div>
          );
        })}
      </div>
      <Button ghost className="body-m-bold px-6 py-4 uppercase">
        {t('projectsSupportSubmitBtnText')}
      </Button>
    </div>
  );
};

export default OurSupportForProjects;
