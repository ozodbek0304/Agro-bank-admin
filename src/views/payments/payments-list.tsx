import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime } from '@/utils/helpers';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import TableLoader from '@/components/elements/TableLoader';
import { useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import { PaymentItemType } from '@/interfaces/payments';
import { useAppSelector } from '@/store/store';
import { Copy, PencilToSquare } from '@gravity-ui/icons';
import { useDispatch } from 'react-redux';
import { setPaymentData } from '@/store/payments/payments';
import UserPagination from './user-pagination';
import { Link } from 'react-router-dom';
import { Image, Modal } from 'antd';
import { useState } from 'react';
import { regionsTitle } from '../mfo/mfos-list';
import { copyToClipboard } from '../users/detail/user-detail-main';





const PaymentsList = () => {
    const { queryParams } = useAppSelector(state => state.payments)
    const { data, isFetching, isError } = useGetPaymentsQuery(queryParams)
    const dispatch = useDispatch();
    const MyTable: any = withTableActions(Table);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commet, setCommet] = useState('');

    const columns: TableColumnConfig<PaymentItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '5%',
            template(item, index) {
                item
                return queryParams.offset + index + 1
            },
        },
        {
            id: 'photo',
            name: "Rasm",
            width: '5%',
            template(item) {
                return (
                    <div>
                        <Image preview={{ mask: false }} src={item?.photo} alt={item?.employee} width={40} height={40} className='rounded' />
                    </div>
                )
            },
        },
        {
            id: 'employee',
            name: "Xodim",
            width: '12%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '10%',
        },
        {
            id: 'region',
            name: 'Viloyat',
            width: '8%',
            template: (item) => (
                <span>{regionsTitle[item?.region]}</span>
            ),
        },
        {
            id: 'mfo',
            name: "MFO",
            width: '10%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '10%',
        },
        {
            id: 'location',
            name: "Joylashuv",
            width: '8%',
            template(item) {
                const copyData = item?.latitude && item?.longitude
                    ? `${item.latitude} , ${item.longitude}`
                    : null;
                return (
                    <div className="w-100 d-flex align-items-center gap-2">
                        <Link to={item.location}
                            target="_blank">
                            Link
                        </Link>
                        <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => copyToClipboard(copyData)} ><Copy /></span>
                    </div>
                )
            },
        },
        {
            id: 'payment_amount',
            name: "To'lov summa",
            width: '10%',
            template(item) {
                return formatAmount(item.payment_amount || 0)
            },
        },
        {
            id: 'payment_date',
            name: "To'lov vaqti",
            width: '10%',
            template(item) {
                return item?.payment_date ? formatDateTime(item.payment_date) : "---"
            },
        },
        {
            id: 'comment',
            name: "Izoh",
            width: '8%',
            template(item) {
                return (
                    <span className='text-primary' onClick={() => { setIsModalOpen(true), setCommet(item?.comment) }} style={{ cursor: "pointer" }}>Batafsil</span>
                )
            },
        },
        {
            id: 'status',
            name: 'Holati',
            width: 50,
            template(item) {
                return (item.status?.name)
            },
        },

    ];

    const getRowActions: any = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: PaymentItemType) => dispatch(setPaymentData(item))
            }
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '1100px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && data?.count > 10 && <UserPagination total={data?.count} />}
            </div>
            <Modal footer={null} title="Batafsil ma'lumot" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                <p>
                    {commet}
                </p>
            </Modal>

        </div>
    );
}

export default PaymentsList;
