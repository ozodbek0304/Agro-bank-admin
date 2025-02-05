import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime } from '@/utils/helpers';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import TableLoader from '@/components/elements/TableLoader';
import { useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import { PaymentItemType } from '@/interfaces/payments';
import { useAppSelector } from '@/store/store';
import { Copy, Eye, PencilToSquare } from '@gravity-ui/icons';
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
    const [selectItem, setSelectItem] = useState(null)


    const columns: TableColumnConfig<PaymentItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '7%',
            template(item, index) {
                return <div className='d-flex align-items-center gap-1'>
                    <span>{queryParams.offset + index + 1}</span>
                    {item?.color && <span style={{ minWidth: "10px", minHeight: "10px", backgroundColor: item?.color, borderRadius: "50%", border: "1px solid #333" }}></span>}
                </div>
            },
        },
        {
            id: 'photo',
            name: "Rasm",
            width: '10%',
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
            width: '15%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '15%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '15%',
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
            id: 'created_at',
            name: "Yaratilgan vaqti",
            width: '15%',
            template(item) {
                return item?.created_at ? formatDateTime(item.created_at) : "---"
            },
        },
        {
            id: 'status',
            name: 'Holati',
            width: "15%",
            template(item) {
                return (item.status?.name)
            },
        },

    ];

    const getRowActions: any = () => {
        return [
            {
                text: "Ko'rish",
                icon: <Eye />,
                handler: (item: PaymentItemType) => { setSelectItem(item), setIsModalOpen(true) }
            },
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: PaymentItemType) => dispatch(setPaymentData(item))
            },
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '1100px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && data?.count > 10 && <UserPagination total={data?.count} />}
            </div>
            <Modal footer={null} title="Batafsil ma'lumot" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                <ul className='pl-1 d-flex flex-column gap-1'>
                    <li>
                        <strong>ID:</strong> {selectItem?.id}
                    </li>
                    <li>
                        <strong>Xodim:</strong> {selectItem?.employee}
                    </li>
                    <li>
                        <strong>MFO:</strong> {selectItem?.mfo}
                    </li>
                    <li className='d-flex gap-2 align-items-center'>
                        <strong>Joylashuv:</strong> <div className="w-100 d-flex align-items-center gap-2">
                            <Link to={selectItem?.location}
                                target="_blank">
                                Link
                            </Link>
                            <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => {
                                const copyData = selectItem?.latitude && selectItem?.longitude
                                    ? `${selectItem.latitude} , ${selectItem.longitude}`
                                    : null;
                                copyToClipboard(copyData)
                            }} ><Copy /></span>
                        </div>
                    </li>
                    <li>
                        <strong>CRM ID:</strong> {selectItem?.crm_id}
                    </li>
                    <li>
                        <strong>To'lov summasi:</strong> {formatAmount(selectItem?.payment_amount || 0)}
                    </li>
                    <li>
                        <strong>Viloyat:</strong> {regionsTitle[selectItem?.region]}
                    </li>
                    <li>
                        <strong>To'lov vaqti:</strong> {selectItem?.payment_date ? formatDateTime(selectItem.payment_date) : "---"}
                    </li>
                    <li>
                        <strong>Yaratilgan vaqti:</strong> {selectItem?.created_at ? formatDateTime(selectItem.created_at) : "---"}
                    </li>
                    <li>
                        <strong>Kenglik:</strong> {selectItem?.latitude ? selectItem?.latitude : "---"}
                    </li>
                    <li>
                        <strong>Uzunlik:</strong> {selectItem?.longitude ? (selectItem.longitude) : "---"}
                    </li>
                    <li>
                        <strong>Holati:</strong> {selectItem?.status?.name}
                    </li>
                    <li>
                        <strong>Izoh:</strong> {selectItem?.comment}
                    </li>


                </ul>
            </Modal>

        </div>
    );
}

export default PaymentsList;
