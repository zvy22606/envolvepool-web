'use client';
import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/helper/utils';
import HandleButton from './HandleButton';
import Image from 'next/image';
import CountDown from './CountDown';
import { useTranslation } from '@/i18n/client';
import { LaunchPoolProjectType, LaunchPoolProjectStatus, LIVE_NOW_STATUS } from '@/service/webApi/launchPool/type';
import moment from 'moment';
import ProjectLabels from './ProjectLabels';
import { useRedirect } from '@/hooks/router/useRedirect';

const projectCardVariants = cva('rounded-[24px] w-full p-6 flex-col card-hover', {
  variants: {
    status: {
      [LaunchPoolProjectStatus.UPCOMING]: ' border border-dashed border-[#121BDF]',
      [LaunchPoolProjectStatus.AIRDROP]: ' border border-[#121BDF]',
      [LaunchPoolProjectStatus.ALLOCATION]: ' border border-[#121BDF]',
      [LaunchPoolProjectStatus.FUELING]: ' border border-[#121BDF]',
      [LaunchPoolProjectStatus.END]: 'bg-[#F1F2FA]'
    }
  },
  defaultVariants: {
    status: LaunchPoolProjectStatus.UPCOMING
  }
});

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: Lang;
  project: LaunchPoolProjectType;
}

const StatusTag = ({ status, text }: { status: LaunchPoolProjectStatus; text: string }) => {
  return (
    <div
      className={cn(
        'body-m-bold w-fit rounded-[8px] border-[2px] px-3 py-1',
        LIVE_NOW_STATUS.includes(status)
          ? 'border-[#121BDF] bg-[#E6E8F9] text-[#293CEA]'
          : 'border-[#0B0D41] text-[#0B0D41]'
      )}
    >
      {text}
    </div>
  );
};

const ProjectCard: FC<ProjectCardProps> = ({ lang, project, className }) => {
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { status } = project;
  const { redirectToUrl } = useRedirect();
  if (lang === Lang.ZH) {
    moment.locale('zh-cn', {
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
      }
    });
  }
  const goDetail = () => {
    redirectToUrl(`/${project.id}`);
  };
  return (
    <div className={cn(projectCardVariants({ className, status }))} onClick={goDetail}>
      <div className="flex flex-col justify-center gap-3">
        <div className="text-h3-mob uppercase leading-[32px] text-[#121BDF]">ChainCrafter</div>
        <div className="flex flex-col gap-6">
          <p className="body-s text-[#0B0D41]">{t('projectCardDesc')}</p>
          {status === LaunchPoolProjectStatus.UPCOMING && <StatusTag status={status!} text={t('upComing')} />}
          {LIVE_NOW_STATUS.includes(status) && <StatusTag status={status!} text={t('liveNow')} />}
          {status === LaunchPoolProjectStatus.END && (
            <StatusTag
              status={status!}
              text={t('closedDate', {
                date: moment(project.airdropEnd).format('LL')
              })}
            />
          )}
          <div className="flex h-full items-center">
            <Image src={'/images/launch/launch_frame.png'} alt="" width={300} height={283}></Image>
          </div>
          {status !== LaunchPoolProjectStatus.END && <CountDown project={project} />}

          <ProjectLabels project={project} />
          <HandleButton project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
