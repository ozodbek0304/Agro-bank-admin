import ErrorBox from '@/components/elements/ErrorBox';
import { AdminItemType } from '@/interfaces/admins';
import { useGetAdminsQuery } from '@/store/admins/adminsApi';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare, TrashBin } from '@gravity-ui/icons';
import { useAppDispatch } from '@/store/store';
import { setAdminData, setDeleteId } from '@/store/admins/admins';
import TableLoader from '@/components/elements/TableLoader';
import { formatDateTime } from '@/utils/helpers';


const AdminsList = () => {
    const { data, isFetching, isError } = useGetAdminsQuery(``, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<AdminItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '5%',
            template(item, index) {
                item
                return index + 1
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
            id: 'location',
            name: 'Viloyat',
            width: '30%',
            template: () =><img src='/uzbekistan.png' alt='uzbekistan flag' height={24} />,
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
            </div>
        </div>
    );
}

export default AdminsList;
