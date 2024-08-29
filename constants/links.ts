import { Domain } from './enum';

export const getDomain = (domain: string) => {
  switch (domain) {
    case 'dev':
      return Domain.DEV;
    case 'staging':
      return Domain.STAGING;
    case 'production':
      return Domain.PROD;
    default:
      return Domain.LOCAL;
  }
};
