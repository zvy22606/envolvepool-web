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

const projectCardVariants = cva('rounded-[24px] w-full p-16 flex items-stretch justify-between card-hover', {
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
        'body-m-bold w-fit rounded-[6.25rem] border px-3 py-1 leading-[160%]',
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
  const goDetail = () => {
    redirectToUrl(`/${project.id}`);
  };
  return (
    <div className={cn(projectCardVariants({ className, status }))} onClick={goDetail}>
      <div className="flex w-[60%] flex-col justify-center gap-[1rem]">
        <div className="text-h25 uppercase leading-[32px] text-[#121BDF]">{project.name}</div>
        <div className="flex w-full flex-col gap-8">
          <p className="body-l-bold w-full overflow-hidden truncate pr-20 text-[#0B0D41]">{project.about}</p>
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
          {status !== LaunchPoolProjectStatus.END && <CountDown project={project} />}
          <ProjectLabels project={project} />
          <HandleButton project={project} />
        </div>
      </div>
      <div className="flex  w-full flex-1 items-center rounded-[1rem] bg-[#F1F2FA] px-[49px]">
        <Image src={'/images/launch/launch_frame.png'} alt="" width={424} height={400}></Image>
      </div>
    </div>
  );
};

export default ProjectCard;
