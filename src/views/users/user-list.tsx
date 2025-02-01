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
import MapComponents from './map-container';
import { useState } from 'react';


const defaultCenter = { lat: 39.20501415, lng: 66.48657689750529 };

const UsersList = () => {
    const { queryParams } = useAppSelector(state => state.user)
    const { data, isFetching, isError } = useGetUsersQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch();
    const [curretnLocation, setCurrentLocation] = useState<any>(null);
    const [mapPosition, setMapPosition] = useState(defaultCenter);

    const MyTable = withTableActions(Table);

    const columns: TableColumnConfig<UserItemType>[] = [
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
            id: 'mfo',
            name: "MFO",
            width: '25%',
        },
        {
            id: 'tab_number',
            name: "Tab Number",
            width: '19%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '19%',
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
            id: 'status',
            name: "Holati",
            width: '20%',
            template(item) {
                return (
                    item?.status ? 
                    <span className='text-success'>{"Aktiv" }</span> : 
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
            <div style={{ minWidth: '660px' }}>
            {/* <MapComponents
             setCurrentLocation={setCurrentLocation}
             setMapPosition={setMapPosition}
             mapPosition={mapPosition}
                        /> */}
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default UsersList;
