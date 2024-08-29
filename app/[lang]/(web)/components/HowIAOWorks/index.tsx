import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { data } from './constant';
import { useTranslation } from '@/i18n/server';

interface HowIAOWorksProps {
  lang: Lang;
}

const HowIAOWorks: FC<HowIAOWorksProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="mt-5 w-full">
      <h2 className="text-h25 mb-10 text-center text-[#0B0D41]">{t('howIAOWorks')}</h2>
      <div className="relative w-full">
        <div className="absolute left-1/2 top-[12px] w-full -translate-x-1/2 border-b-[2px] border-dashed border-[#0B0D41]"></div>
        <div className="container relative z-10 mx-auto flex items-stretch gap-8">
          {data.map((item) => {
            return (
              <div key={item.title} className="flex  flex-1 flex-col">
                <span className="relative left-[1.25rem]">{item.icon}</span>
                <div className="mt-4 flex flex-1 flex-col gap-6 rounded-[1rem] bg-[#F1F2FA] p-6">
                  <p className="body-xl-bold text-[#0B0D41]">{t(item.title)}</p>
                  <p className="body-s text-[#0B0D41]">{t(item.desc)}</p>
                  {/* {item.buttonText && (
                    <Link href={item.buttonLink} target="_blank">
                      <Button ghost className="body-xs h-[50px] text-[#000]">
                        {t(item.buttonText)}
                      </Button>
                    </Link>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowIAOWorks;
