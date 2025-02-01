
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import useResponsive from '@/utils/useResponsive';
import { setOpenCreate } from '@/store/mfo/mfo';
import MfosMain from '@/views/mfo/mfos-main';

const MFOPages: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    return (
        <div>
            <PageHeader title='MFO' >
                <Button view='outlined-info' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>
            </PageHeader>
            <MfosMain />
        </div>
    );
};


export default MFOPages
