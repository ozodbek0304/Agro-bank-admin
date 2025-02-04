import { useState } from "react";
import MapComponents from "../map-container";
import { useGetBlankDetailsQuery } from "@/store/payments/paymentsApi";
import { Link} from "react-router-dom";
import { formatAmount, formatDateTime } from "@/utils/helpers";
import { Table, TableColumnConfig, withTableActions } from "@gravity-ui/uikit";
import { useAppSelector } from "@/store/store";
import { PaymentItemType } from "@/interfaces/payments";
import TableLoader from "@/components/elements/TableLoader";
import UserPagination from "../user-pagination";
import ErrorBox from "@/components/elements/ErrorBox";
import FilterSearch from "@/views/filter/blank-filter";
import { updateBlankParams } from "@/store/payments/payments";

const UserDetailMain = () => {
    const { queryParams } = useAppSelector(state => state.payments);
    const { data: dataBlank, isLoading: isFetching, isError } = useGetBlankDetailsQuery(queryParams);
    const [mapPosition, setMapPosition] = useState({ lat: '', lng: "" });
    const MyTable = withTableActions(Table)


    const columnsBlank: TableColumnConfig<PaymentItemType>[] = [
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
            id: 'photo',
            name: "Rasm",
            width: '5%',
            template(item) {
                return (
                    <div>
                        <img src={item?.photo} alt={item?.employee} width={40} height={40} className='rounded' />
                    </div>
                )
            },
        },
        {
            id: 'employee',
            name: "Xodim",
            width: '14%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '12%',
        },
        {
            id: 'region',
            name: "Viloyat",
            width: '12%',
        },
        {
            id: 'location',
            name: "Joylashuv",
            width: '8%',
            template(item) {
                return <Link to={item.location}>
                    Link
                </Link>
            },
        },
        {
            id: 'payment_amount',
            name: "To'lov summa",
            width: '12%',
            template(item) {
                return formatAmount(item.payment_amount || 0)
            },
        },
        {
            id: 'payment_date',
            name: "To'lov vaqti",
            width: '12%',
            template(item) {
                return formatDateTime(item.payment_date)
            },
        },
        {
            id: 'comment',
            name: "Izoh",
            width: '19%',
            template(item) {
                return (<div className='w-100' style={{
                    whiteSpace: "wrap"
                }}>
                    {item?.comment}.

                </div>)
            },
        },
        {
            id: 'status',
            name: 'Holati',
            width: '15%',
            template(item) {
                return (item.status?.name)
            },
        },

    ];

    console.log(mapPosition);


    return (
        <div>

            <div className="mb-4">

                <h5>Anketalar</h5>
                <FilterSearch updateSearchParams={updateBlankParams}  dateHidden={true} />
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <div style={{ minWidth: '1100px' }}>
                        {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l'
                            data={dataBlank?.results} columns={columnsBlank}
                            onRowClick={(item) => { setMapPosition({ lat: item?.latitude, lng: item?.longitude }) }}
                            getRowActions={() => []} />}
                        {!isFetching && dataBlank?.count > 10 && <UserPagination total={dataBlank?.count} />}
                    </div>
                </div>
            </div>

            {mapPosition?.lat && mapPosition?.lng && <MapComponents
                setMapPosition={setMapPosition}
                mapPosition={mapPosition} />}
        </div>
    );
}

export default UserDetailMain;
