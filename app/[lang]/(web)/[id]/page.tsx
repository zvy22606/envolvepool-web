import React from 'react';
import LaunchDetailPage from './components';

interface LaunchDetailProp {
  params: {
    id: string;
    lang: string;
  };
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  return <LaunchDetailPage id={params.id} />;
};

export default LaunchDetail;
