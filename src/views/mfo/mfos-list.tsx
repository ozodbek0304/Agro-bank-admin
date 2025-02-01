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
    toshkent_region:'Toshkent viloyati' ,
    samarqand: 'Samarqand' ,
    buxoro: 'Buxoro' ,
    fargona:'Fargʻona' ,
    andijon:'Andijon' ,
    namangan:'Namangan',
    navoiy:'Navoiy' ,
    xorazm:'Xorazm', 
    surxondaryo:'Surxondaryo', 
    qashqadaryo:'Qashqadaryo', 
    jizzax:'Jizzax' ,
    sirdaryo:'Sirdaryo' ,
    qoraqalpogʻiston:'Qoraqalpogʻiston', 
    toshkent_city:'Toshkent shahri' ,
}

const MfoLists = () => {
      const { queryParams } = useAppSelector(state => state.mfos)
    const { data, isFetching, isError } = useGetMfoQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const MyTable: any = withTableActions(Table);

    const columns: TableColumnConfig<MfoItemType>[] = [
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
            template: (item) =>(
                <div className='d-flex align-items-center gap-2'>
                    <img src='/uzbekistan.png' alt='uzbekistan flag' height={24} />
                    <span>{regionsTitle[item?.region]}</span>
                </div>
            ),
        }
    ];

     

     

    const getRowActions: any = () => {
        return [
            {
                text: 'Tahrirlash',
                icon: <PencilToSquare />,
                handler: (item: MfoItemType) => dispatch(setAdminData(item))
            },
        ];
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '660px' }}>
                {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : 
                <MyTable rowActionsSize='l' data={data?.results} columns={columns} getRowActions={getRowActions} />}
                {!isFetching && <UserPagination total={data?.count} />}
            </div>
        </div>
    );
}

export default MfoLists;
