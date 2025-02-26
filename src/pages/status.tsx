
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import SettingsMain from '@/views/status/settings-main';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import useResponsive from '@/utils/useResponsive';
import { setOpenCreate } from '@/store/status/status';
import { useGetStatusSelectQuery } from '@/store/status/statusApi';

const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive();
    const { queryParams } = useAppSelector(state => state.status)
    const { role } = useAppSelector(state => state.auth)
    const { data: dataBreadCrumbs, isSuccess: isSuccessBread } = useGetStatusSelectQuery(queryParams);


    return (
        <div>
            <PageHeader title='Holatlar' >
                {isSuccessBread && dataBreadCrumbs?.length < 3 && role !== "checker" && <Button view='outlined-success' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>}
            </PageHeader>
            <SettingsMain />
        </div>
    );
};


export default SettingsPage
