import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetUsersQuery } from '@/store/employee/employeApi';
import { UserItemType } from '@/interfaces/user';
import { formatDateTime } from '@/utils/helpers';
import { setUserData } from '@/store/employee/employee';
import TableLoader from '@/components/elements/TableLoader';
import UserPagination from './user-pagination';
import { useNavigate } from 'react-router-dom';
import { updateBlankParams } from '@/store/payments/payments';
import { regionsTitle } from '../mfo/mfos-list';


const UsersList = () => {
    const { queryParams } = useAppSelector(state => state.user)
    const { data, isFetching, isError } = useGetUsersQuery(queryParams)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const MyTable = withTableActions(Table);

    const columns: TableColumnConfig<UserItemType>[] = [
        {
            id: 'id',
            name: "#",
            width: '7%',
            template(item, index) {
                item
                return queryParams.offset + index + 1
            },
        },
        {
            id: 'mfo',
            name: "MFO",
            width: '15%',
            template(item) {
                return item?.mfo?.mfo_code
            },
        },
        {
            id: 'tab_number',
            name: "Tab Number",
            width: '12%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '12%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '12%',
        },
        {
            id: 'region',
            name: 'Viloyat',
            width: '18%',
            template: (item) => (
                <span>{regionsTitle[item?.region]}</span>
            ),
        },
        {
            id: 'created_at',
            name: "Oxirgi foallik vaqti",
            width: '15%',
            template(item) {
                return item?.created_at ? formatDateTime(item.created_at) : "---"
            },
        },
        {
            id: 'archived',
            name: "Holati",
            width: '10%',
            template(item) {
                return (
                    item?.archived ?
                        <span className='text-success'>{"Aktiv"}</span> :
                        <span className='text-danger'>{"Aktiv Emas"}</span>
                )
            },
        },

    ];

    const getRowActions = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: UserItemType) => dispatch(setUserData(item))
            }
        ];
    };


    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '1000px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> :
                    <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions}
                        onRowClick={(item) => {
                            navigate(`/employes/${item?.id}`)
                            dispatch(updateBlankParams({ search: "", employee: item?.id, region: "", mfo: "" }))
                        }}
                    />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default UsersList;
