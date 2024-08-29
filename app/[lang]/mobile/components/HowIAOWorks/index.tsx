import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { useTranslation } from '@/i18n/server';
import { data } from '@/app/[lang]/(web)/components/HowIAOWorks/constant';

interface HowIAOWorksProps {
  lang: Lang;
}

const HowIAOWorks: FC<HowIAOWorksProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="mt-5 w-full py-10">
      <h2 className="text-h3-mob mb-10 text-center text-[#0B0D41]">{t('howIAOWorks')}</h2>
      <div className="relative h-fit w-full">
        <div className="absolute left-[34px] top-0 h-full border-l-[2px] border-dashed border-[#0B0D41]"></div>
        <div className="relative z-10 mx-auto flex w-full flex-col gap-5">
          {data.map((item) => {
            return (
              <div key={item.title} className="flex flex-1 gap-4 px-6">
                <span className="inline-block pt-5">{item.icon}</span>
                <div className="flex flex-col gap-5 py-5">
                  <p className="body-l-bold text-[#0B0D41]">{t(item.title)}</p>
                  <p className="body-s text-[#0B0D41]">{t(item.desc)}</p>
                  {/* {item.buttonText && (
                    <Link href={item.buttonLink} target="_blank">
                      <Button ghost className="body-s h-[3rem] text-[#000]">
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
