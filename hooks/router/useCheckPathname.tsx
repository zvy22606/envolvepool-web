import { locales } from '@/i18n/config';
import { usePathname } from 'next/navigation';

export const useCustomPathname = () => {
  const originPathname = usePathname();

  let pathname = originPathname;
  const lang = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (lang && pathname.startsWith(`/${lang}`)) {
    pathname = pathname.replace(`/${lang}`, '');
  }

  pathname = pathname.startsWith('/mobile') ? pathname.replace('/mobile', '') : pathname;

  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }
  return pathname;
};
