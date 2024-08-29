import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';

import TopBanner from './components/TopBanner';
import DataStatistics from './components/DataStatistics';
import AllProjects from './components/AllProjects';
import HowIAOWorks from './components/HowIAOWorks';
import OnlyChooseBestProjects from './components/OnlyChooseBestProjects';
import OurSupportForProjects from './components/OurSupportForProjects';
import webApi from '@/service';

interface LaunchProp {
  params: {
    lang: Lang;
  };
}

const Launch: React.FC<LaunchProp> = async ({ params: { lang } }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);

  const projects = await webApi.launchPoolApi.getProjectsFromCache();
  return (
    <div className="h-[calc(100vh-4rem)] overflow-auto" id="launch-container">
      <div className="max-w-screen flex w-screen flex-col justify-center overflow-hidden">
        <TopBanner lang={lang} />
        <DataStatistics lang={lang} />
        <AllProjects lang={lang} projects={projects.data} />
        <HowIAOWorks lang={lang} />
        <OnlyChooseBestProjects lang={lang} />
        <OurSupportForProjects lang={lang} />
      </div>
    </div>
  );
};

export default Launch;
