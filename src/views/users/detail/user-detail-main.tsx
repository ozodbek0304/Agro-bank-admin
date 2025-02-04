import { useState } from "react";
import MapComponents from "../map-container";
import { useGetBlankDetailsQuery } from "@/store/payments/paymentsApi";
import { Link } from "react-router-dom";
import { formatAmount, formatDateTime } from "@/utils/helpers";
import { Table, TableColumnConfig, withTableActions } from "@gravity-ui/uikit";
import { useAppSelector } from "@/store/store";
import { PaymentItemType } from "@/interfaces/payments";
import TableLoader from "@/components/elements/TableLoader";
import UserPagination from "../user-pagination";
import ErrorBox from "@/components/elements/ErrorBox";
import FilterSearch from "@/views/filter/blank-filter";
import { updateBlankParams } from "@/store/payments/payments";
import { Image, Modal } from "antd";
import { regionsTitle } from "@/views/mfo/mfos-list";

const UserDetailMain = () => {
    const { queryParams } = useAppSelector(state => state.payments);
    const { data: dataBlank, isLoading: isFetching, isError } = useGetBlankDetailsQuery(queryParams);
    const [mapPosition, setMapPosition] = useState({ lat: '', lng: "" });
    const MyTable = withTableActions(Table);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commet, setCommet] = useState('');


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
                        <Image preview={{ mask: false }} src={item?.photo} alt={item?.employee} width={40} height={40} className='rounded' />
                    </div>
                )
            },
        },
        {
            id: 'mfo',
            name: "MFO",
            width: '10%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '10%',
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
            name: 'Viloyat',
            width: '8%',
            template: (item) => (
                <span>{regionsTitle[item?.region]}</span>
            ),
        },
        {
            id: 'location',
            name: "Joylashuv",
            width: '8%',
            template(item) {
                return <Link to={item.location} target="_blank">
                    Link
                </Link>
            },
        },
        {
            id: 'payment_amount',
            name: "To'lov summa",
            width: '12%',
            template(item) {
                return item.payment_amount ? formatAmount(item.payment_amount) : 0
            },
        },
        {
            id: 'payment_date',
            name: "To'lov vaqti",
            width: '12%',
            template(item) {
                return item?.payment_date ? formatDateTime(item.payment_date) : "---"
            },
        },
        {
            id: 'comment',
            name: "Izoh",
            width: '8%',
            template(item) {
                return (
                    <span className='text-primary' onClick={() => { setIsModalOpen(true), setCommet(item?.comment) }} style={{ cursor: "pointer" }}>Batafsil</span>
                )
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



    return (
        <div>

            <div className="mb-4">

                <h5>Anketalar</h5>
                <FilterSearch updateSearchParams={updateBlankParams} dateHidden={true} />
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

            <Modal footer={null} title="Batafsil ma'lumot" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                <p>
                    {commet}
                </p>
            </Modal>
        </div>
    );
}

export default UserDetailMain;
