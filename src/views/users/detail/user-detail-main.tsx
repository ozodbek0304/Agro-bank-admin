import ErrorBox from '@/components/elements/ErrorBox';
import { formatAmount, formatDateTime } from '@/utils/helpers';
import { Table, TableColumnConfig, Text, withTableActions } from '@gravity-ui/uikit';
import { useGetOrdersQuery } from '@/store/orders/ordersApi';
import { OrderItemType } from '@/interfaces/order';
import { Link, useParams } from 'react-router-dom';
import { filterKeys } from '@/views/orders/order-filter';
import TableLoader from '@/components/elements/TableLoader';
import OrderPagination from '@/views/orders/order-pagination';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { updateOrderParams } from '@/store/orders/orders';


const UserDetailMain = () => {
    const { id } = useParams()
    const { queryParams } = useAppSelector(state => state.orders)
    const { data, isError, isFetching } = useGetOrdersQuery({ ...queryParams, search: id }, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<OrderItemType>[] = [
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
            id: 'tao_bao',
            name: "Trek kodi",
            width: '16%',
            template(item) {
                return `${item.tao_bao}`
            },
        },
        {
            id: 'check_img',
            name: "Check rasmi",
            width: '16%',
            template(item) {
                return <Link to={item.check_img} target='_blank'>ko'rish</Link>
            },
        },
        {
            id: 'status',
            name: "Status",
            width: '16%',
            template(item) {
                return `${filterKeys[item.status.toUpperCase()]}`
            },
        },
        {
            id: 'total_amount',
            name: "Yetkazish narxi",
            width: '16%',
            template(item) {
                return formatAmount(item.total_amount)
            },
        },
        {
            id: 'wight',
            name: "Og'irligi",
            width: '16%',
            template: (item) => `${item.weight} kg`,
        },
        {
            id: 'created_at',
            name: 'Yaratilgan sana',
            width: '16%',
            template(item) {
                return formatDateTime(item.created_at)
            },
        }
    ];

    const getRowActions: any = () => {
        return [];
    };

    useEffect(() => {
        return () => {
            dispatch(updateOrderParams({ offset: 0 }))
        }
    }, [])

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <Text variant='header-1'>
                <Text variant='header-1' color='info' className='me-2'>{id}</Text>
                raqamli foydalanuvchining buyurtmalari
            </Text>
            <div style={{ minWidth: '1000px' }} className='mt-3'>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && data?.results?.length && <OrderPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default UserDetailMain;
