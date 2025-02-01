
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import SettingsMain from '@/views/status/settings-main';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import useResponsive from '@/utils/useResponsive';
import { setOpenCreate } from '@/store/status/status';

const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    return (
        <div>
                <PageHeader title='Holatlar' >
                <Button view='outlined-info' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>
            </PageHeader>
            <SettingsMain />
        </div>
    );
};


export default SettingsPage
