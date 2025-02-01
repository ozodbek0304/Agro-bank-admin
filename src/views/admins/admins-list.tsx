import ErrorBox from '@/components/elements/ErrorBox';
import { AdminItemType } from '@/interfaces/admins';
import { useGetAdminsQuery } from '@/store/admins/adminsApi';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAdminData, setDeleteId } from '@/store/admins/admins';
import TableLoader from '@/components/elements/TableLoader';
import { formatDateTime } from '@/utils/helpers';
import { regionsTitle } from '../mfo/mfos-list';
import UserPagination from './user-pagination';


const AdminsList = () => {
     const { queryParams } = useAppSelector(state => state.admins)
    const { data, isFetching, isError } = useGetAdminsQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<AdminItemType>[] = [
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
            id: 'full_name',
            name: "To'liq ismi",
            width: '30%',
        },
        {
            id: 'username',
            name: "Login",
            width: '30%',
        },
        {
                    id: 'created_at',
                    name: "Yaratilgan sanasi",
                    width: '19%',
                    template(item) {
                        return formatDateTime(item.created_at)
                    },
                },
          {
                   id: 'region',
                   name: 'Viloyat',
                   width: '30%',
                   template: (item) =>(
                    <span>{regionsTitle[item?.region]}</span>
                   ),
               }
    ];

     

    const getRowActions: any = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: AdminItemType) => dispatch(setAdminData(item))
            },
            {
                text: "O'chirish",
                icon: <TrashBin />,
                theme: 'danger',
                handler: (item: AdminItemType) => dispatch(setDeleteId(item.id))
            },
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default AdminsList;
