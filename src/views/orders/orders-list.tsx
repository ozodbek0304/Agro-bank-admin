import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime } from '@/utils/helpers';
import { Label, RadioButtonOption, Select, Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetOrdersQuery, useUpdateOrderMutation } from '@/store/orders/ordersApi';
import { OrderItemType } from '@/interfaces/order';
import { setOrderData, updateOrderParams } from '@/store/orders/orders';
import { Link } from 'react-router-dom';
import useResponsive from '@/utils/useResponsive';
import TableLoader from '@/components/elements/TableLoader';
import { useEffect, useState } from 'react';
import OrderPagination from './order-pagination';
import { filterKeys } from './order-filter';
import { api } from '@/utils/http';


export const pageSizes = [
    { value: '10', content: '10' },
    { value: '20', content: '20' },
    { value: '50', content: '50' },
    { value: '100', content: '100' },
]


const OrdersList = () => {
    const { queryParams } = useAppSelector(state => state.orders)
    const { data, isError, isFetching, refetch } = useGetOrdersQuery(queryParams, { refetchOnMountOrArgChange: true })
    const [updateOrder] = useUpdateOrderMutation()
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    const [options, setOptions] = useState<RadioButtonOption[]>([])

    const getStatus = async () => {
        const resp = await api.get(`order-status-list/`)
        setOptions(resp.data.map((item: string) => ({ value: item, content: filterKeys[item.toUpperCase()] })))
    }

    const handleStatusChange = async (id: number, status: string, user_id: string) => {
        try {
            await updateOrder({ id, status, user_id })
            await refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const MyTable = withTableActions(Table);

    const columns: TableColumnConfig<OrderItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '3%',
            template(item, index) {
                item
                return queryParams.offset + index + 1
            },
        },
        {
            id: 'status',
            name: "Holati",
            width: '13%',
            template(item) {
                if (item.status === 'canceled') {
                    return (
                        <Label theme='danger' size='s'>Bekor qilingan</Label>
                    )
                } else if (item.status === 'delivered') {
                    return (
                        <Label theme='success' size='s'>Topshirilgan</Label>
                    )
                } else return (
                    <Select onUpdate={e => handleStatusChange(item.id, e[0], item.user_id)} size='s' value={[item.status]} options={options} />
                )
            },
        },
        {
            id: 'tao_bao',
            name: "Trek kodi",
            width: '12%',
            template(item) {
                return `${item.tao_bao}`
            },
        },
        {
            id: 'check_img',
            name: "Check rasmi",
            width: '10%',
            template(item) {
                return <Link to={item.check_img} target='_blank'>ko'rish</Link>
            },
        },
        {
            id: 'user_id',
            name: "Buyurtmachi ID",
            width: '10%'
        },
        {
            id: 'full_name',
            name: "Qabul qiluvchi",
            width: '10%',
        },
        {
            id: 'username',
            name: "Kontakt",
            width: isMobile ? '14%' : '12%',
        },
        {
            id: 'total_amount',
            name: "Yetkazish narxi",
            width: '10%',
            template(item) {
                return item.total_amount ? formatAmount(item.total_amount) : ''
            },
        },
        {
            id: 'wight',
            name: "Og'irligi",
            width: '10%',
            template: (item) => item.weight ? `${item.weight} kg` : ``,
        },
        {
            id: 'created_at',
            name: 'Yaratilgan sana',
            width: '14%',
            template(item) {
                return formatDateTime(item.created_at)
            },
        }
    ];

    const getRowActions: any = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: OrderItemType) => dispatch(setOrderData(item))
            }
        ];
    };

    useEffect(() => {
        getStatus()

        return () => {
            dispatch(updateOrderParams({ offset: 0 }))
        }
    }, [])


    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '1000px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}

                {!isFetching && <OrderPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default OrdersList;
