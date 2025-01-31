
import React from 'react';
import PageHeader from '@/components/partials/page-header';
import SettingsMain from '@/views/settings/settings-main';

const SettingsPage: React.FC = () => {

    return (
        <div>
            <PageHeader title='Sozlamalar' />
            <SettingsMain />
        </div>
    );
};


export default SettingsPage
