
import React, { useRef, useState } from 'react';
import PageHeader from '@/components/partials/page-header';
import OrdersMain from '@/views/orders/orders-main';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import { setOpenCreate } from '@/store/orders/orders';
import { api } from '@/utils/http';
import useResponsive from '@/utils/useResponsive';
import PageLoad from '@/components/partials/page-load';

const OrdersPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const fileChek: any = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { isMobile } = useResponsive()

    const handlePic = async () => {
        const formdata = new FormData()
        setLoading(true)

        formdata.append('check_img', fileChek?.current?.files?.[0])

        try {
            const resp = await api.post(`order-image-create/`, formdata)
            fileChek.current.value = null
            dispatch(setOpenCreate(resp.data))
        } catch {
            // console.log(error);
        }

        setLoading(false)
    }

    return (
        <div>
            <PageHeader title='Buyurtmalar' >
                <Button view='outlined-info' size={isMobile ? 'm' : 'l'} onClick={() => fileChek.current?.click()} >
                    <Icon data={Plus} size={18} />
                    Yangi yaratish

                    <input ref={fileChek} type="file" className='visually-hidden' onChange={handlePic} />
                </Button>
            </PageHeader>
            <OrdersMain />
            {loading ? <PageLoad /> : ''}
        </div>
    );
};


export default OrdersPage
