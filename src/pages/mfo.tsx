
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import AdminsMain from '@/views/admins/admins-main';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import useResponsive from '@/utils/useResponsive';
import { setOpenCreate } from '@/store/mfo/mfo';

const MFOPages: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    return (
        <div>
            <PageHeader title='Adminstatorlar' >
                <Button view='outlined-info' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>
            </PageHeader>
            <AdminsMain />
        </div>
    );
};


export default MFOPages
