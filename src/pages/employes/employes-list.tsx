
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import { setOpenCreate } from '@/store/employee/employee';
import UsersMain from '@/views/users/user-main';
import useResponsive from '@/utils/useResponsive';

const UserListPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    return (
        <div>
            <PageHeader title='Xodimlar' >
                <Button view='outlined-info' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>
            </PageHeader>
            <UsersMain />
        </div>
    );
};


export default UserListPage
