
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import PaymentsMain from '@/views/payments/payments-main';

const PaymentsPage: React.FC = () => {

    return (
        <div>
            <PageHeader title="Anketalar" />
            <PaymentsMain />
        </div>
    );
};


export default PaymentsPage
