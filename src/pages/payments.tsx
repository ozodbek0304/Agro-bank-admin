
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import PaymentsMain from '@/views/payments/payments-main';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import { setOpenCreate } from '@/store/payments/payments';
import useResponsive from '@/utils/useResponsive';

const PaymentsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    return (
        <div>
            <PageHeader title="To'lovlar" >
                <Button view='outlined-info' size={isMobile ? 's' : 'l'} onClick={() => dispatch(setOpenCreate(true))} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish
                </Button>
            </PageHeader>
            <PaymentsMain />
        </div>
    );
};


export default PaymentsPage
