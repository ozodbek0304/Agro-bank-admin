import ErrorBox from '@/components/elements/ErrorBox';
import { Table, TableColumnConfig, withTableActions } from '@gravity-ui/uikit';
import { PencilToSquare } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TableLoader from '@/components/elements/TableLoader';
import { useGetMfoQuery } from '@/store/mfo/mfosApi';
import { MfoItemType } from '@/interfaces/mfo';
import { setAdminData } from '@/store/mfo/mfo';
import UserPagination from './user-pagination';



export const regionsTitle = {
    toshkent_region: 'Toshkent viloyati',
    samarqand: 'Samarqand',
    buxoro: 'Buxoro',
    fargona: 'Fargʻona',
    andijon: 'Andijon',
    namangan: 'Namangan',
    navoiy: 'Navoiy',
    xorazm: 'Xorazm',
    surxondaryo: 'Surxondaryo',
    qashqadaryo: 'Qashqadaryo',
    jizzax: 'Jizzax',
    sirdaryo: 'Sirdaryo',
    qoraqalpogiston: 'Qoraqalpogʻiston',
    toshkent_city: 'Toshkent shahri',
}

const MfoLists = () => {
    const { queryParams } = useAppSelector(state => state.mfos)
    const { data, isFetching, isError } = useGetMfoQuery(queryParams)
    const { role } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<MfoItemType>[] = [
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
            id: 'mfo_code',
            name: "Mfo code",
            width: '30%',
        },
        {
            id: 'branch_name',
            name: "Filial nomi",
            width: '30%',
        },
        {
            id: 'region',
            name: 'Viloyat',
            width: '30%',
            template: (item) => (
                <span>{regionsTitle[item?.region]}</span>
            ),
        }
    ];


    const getRowActions: any = () => {
        return [
            ...(role !== "checker" ? [{
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: MfoItemType) => dispatch(setAdminData(item))
            },] : [])
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '1000px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> :
                    <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && data?.count > 10 && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default MfoLists;
