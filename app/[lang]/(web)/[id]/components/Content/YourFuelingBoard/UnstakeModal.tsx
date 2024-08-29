import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import { LaunchDetailContext } from '../../../constants/type';
import { FuelInfo } from '@/service/webApi/launchPool/type';

interface UnstakeModalProp {
  open: boolean;
  onClose: VoidFunction;
  fule: FuelInfo;
}

const UnstakeModal: React.FC<UnstakeModalProp> = ({ open, onClose, fule }) => {
  const { loading, handleUnStake, launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className=" scroll-wrap-y  w-[808px] rounded-[10px] bg-neutral-white px-[137px]  pb-[40px] pt-[60px]  text-[#0B0D41]">
        <div className="">
          <div className="text-h3 text-center">{t('unStake')} $EDU</div>
          <p className="body-m my-[24px]  text-[#0B0D41]">{t('unStakeWarning')}</p>
          <div className="flex justify-center gap-[16px]">
            <Button
              loading={loading}
              type="primary"
              className="button-text-m  h-[48px]  w-[165px] p-0"
              onClick={() => handleUnStake(fule)}
            >
              {t('unStakeNow')}
            </Button>
            <Button ghost onClick={onClose} className="button-text-m  h-[48px]  w-[165px] ">
              {t('cancel')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UnstakeModal;
