import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime, formatPhone } from '@/utils/helpers';
import { Label, Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
// import { PencilToSquare, TrashBin } from '@gravity-ui/icons';
// import { useAppDispatch } from '@/store/store';
// import { setDeleteId } from '@/store/admins/admins';
import TableLoader from '@/components/elements/TableLoader';
import { useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import { PaymentItemType } from '@/interfaces/payments';
// import { setPaymentData } from '@/store/payments/payments';

export const PaymentStatus: any = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
}

export const PaymentMethodName: any = {
    cache: 'Naqd',
    by_card: 'Karta',
    click: 'Click',
    payme: 'PayMe'
}

export const PaymentStatusTitle: any = {
    pending: 'Kutilmoqda',
    approved: "To'langan",
    rejected: "Bekor qilingan"
}


const PaymentsList = () => {
    const { data, isFetching, isError } = useGetPaymentsQuery(``, { refetchOnMountOrArgChange: true })
    // const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<PaymentItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '4%',
            template(item, index) {
                item
                return index + 1
            },
        },
        {
            id: 'amount',
            name: "Summa",
            width: '16%',
            template(item) {
                return formatAmount(item.amount)
            },
        },
        {
            id: 'order_tao_bao',
            name: "Trek kodi",
            width: '16%',
        },
        {
            id: 'username',
            name: "To'lovchi",
            width: '16%',
            template(item) {
                return formatPhone(item.username)
            },
        },
        {
            id: 'provider',
            name: "To'lov turi",
            width: '16%',
            template: (item) => <Label theme={'info'}>{PaymentMethodName[item.provider]}</Label>,
        },
        {
            id: 'status',
            name: 'Holati',
            width: '16%',
            template: (item) => <Label theme={PaymentStatus[item.status]}>{PaymentStatusTitle[item.status]}</Label>,
        },
        {
            id: 'update_at',
            name: "Yangilangan sana",
            width: '16%',
            template(item) {
                return formatDateTime(item.update_at)
            },
        },
    ];

    const getRowActions: any = () => {
        return [
            // {
            //     text: 'Tahrirlash',
            //     icon: <PencilToSquare />,
            //     handler: (item: PaymentItemType) => dispatch(setPaymentData(item))
            // },
            // {
            //     text: "O'chirish",
            //     icon: <TrashBin />,
            //     theme: 'danger',
            //     handler: (item: PaymentItemType) => dispatch(setDeleteId(item.payment_id))
            // },
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data} columns={columns} getRowActions={getRowActions} />}
            </div>
        </div>
    );
}

export default PaymentsList;
