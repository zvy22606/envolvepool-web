import { FC, ReactNode, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../constant';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface NavListProps {
  toggleOpen: VoidFunction;
  children: ReactNode;
}

const NavList: FC<NavListProps> = ({ toggleOpen, children }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [openNavKeys, setOpenNavKeys] = useState<string[]>([]);
  const { pageHeight } = useGetHeight();

  return (
    <motion.div
      variants={{
        open: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          pointerEvents: 'auto',
          overflow: 'scroll',
          height: pageHeight
        },
        closed: {
          // transition: { staggerChildren: 0.05, staggerDirection: -1 },
          pointerEvents: 'none'
        }
      }}
      className="absolute top-16 w-screen px-5 pb-[6.5rem] pt-6"
      style={{
        height: pageHeight
      }}
    >
      <motion.div variants={itemVariants} className="" />
      {children}
    </motion.div>
  );
};

export default NavList;
