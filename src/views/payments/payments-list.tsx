import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime, formatPhone } from '@/utils/helpers';
import { Label, Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
// import { PencilToSquare, TrashBin } from '@gravity-ui/icons';
// import { useAppDispatch } from '@/store/store';
// import { setDeleteId } from '@/store/admins/admins';
import TableLoader from '@/components/elements/TableLoader';
import { useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import { PaymentItemType } from '@/interfaces/payments';
import { useAppSelector } from '@/store/store';
import { PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { useDispatch } from 'react-redux';
import { setDeleteId, setPaymentData } from '@/store/payments/payments';
import UserPagination from './user-pagination';
import { Link } from 'react-router-dom';





const PaymentsList = () => {
     const { queryParams } = useAppSelector(state => state.payments)
    const { data, isFetching, isError } = useGetPaymentsQuery(queryParams)
    const dispatch= useDispatch();
    const MyTable: any = withTableActions(Table);

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
                        <img src={item?.photo} alt={item?.employee} width={40} height={40} className='rounded' />
                    </div>
                )
            },
        },
        {
            id: 'employee',
            name: "Xodim",
            width: '16%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '12%',
        },
        {
            id: 'location',
            name: "Joylashuv",
            width: '8%',
            template(item) {
                return <Link to={item.location}>
                   Link
                </Link>
            },
        },
        {
            id: 'payment_amount',
            name: "To'lov summa",
            width: '15%',
            template(item) {
                return formatAmount(item.payment_amount)
            },
        },
        {
            id: 'payment_date',
            name: "To'lov vaqti",
            width: '12%',
            template(item) {
                return formatDateTime(item.payment_date)
            },
        },
        {
            id: 'comment',
            name: "Izoh",
            width: '19%',
        },
        {
            id: 'status',
            name: 'Holati',
            width: '15%',
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
            },
            {
                text: "O'chirish",
                icon: <TrashBin />,
                theme: 'danger',
                handler: (item: PaymentItemType) => dispatch(setDeleteId(item.id))
            },
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && data?.count>10 && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default PaymentsList;
