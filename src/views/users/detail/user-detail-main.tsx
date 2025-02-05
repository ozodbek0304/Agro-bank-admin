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
import toast from "react-hot-toast";
import { Copy, Eye } from "@gravity-ui/icons";


export const copyToClipboard = (text: string) => {
    if (typeof document === "undefined") {
        console.error("Clipboard API faqat brauzerda ishlaydi");
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => toast.success("Havola nusxalandi! 📋"))
            .catch(err => toast.error("Nusxalashda xatolik: " + err.message));
    } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();

        try {
            const successful = document.execCommand("copy");
            if (successful) {
                toast.success("Havola nusxalandi! 📋");
            } else {
                toast.error("Nusxalashda xatolik!");
            }
        } catch (err) {
            toast.error("Nusxalashda xatolik: " + err);
        }

        document.body.removeChild(textarea);
    }
};

const UserDetailMain = () => {
    const { queryParams } = useAppSelector(state => state.payments);
    const { data: dataBlank, isLoading: isFetching, isError } = useGetBlankDetailsQuery(queryParams);
    const [mapPosition, setMapPosition] = useState({ lat: '', lng: "" });
    const MyTable = withTableActions(Table);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectItem, setSelectItem] = useState(null)


    const columns: TableColumnConfig<PaymentItemType>[] = [
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
            id: 'photo',
            name: "Rasm",
            width: '10%',
            template(item) {
                return (
                    <div>
                        <Image preview={{ mask: false }} src={item?.photo} alt={item?.employee} width={40} height={40} className='rounded' />
                    </div>
                )
            },
        },
        {
            id: 'employee',
            name: "Xodim",
            width: '15%',
        },
        {
            id: 'telegram_id',
            name: "Telegram ID",
            width: '15%',
        },
        {
            id: 'crm_id',
            name: "CRM ID",
            width: '15%',
        },
        {
            id: 'location',
            name: "Joylashuv",
            width: '8%',
            template(item) {
                const copyData = item?.latitude && item?.longitude
                    ? `${item.latitude} , ${item.longitude}`
                    : null;
                return (
                    <div className="w-100 d-flex align-items-center gap-2">
                        <Link to={item.location}
                            target="_blank">
                            Link
                        </Link>
                        <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => copyToClipboard(copyData)} ><Copy /></span>
                    </div>
                )
            },
        },
        {
            id: 'created_at',
            name: "Yaratilgan vaqti",
            width: '15%',
            template(item) {
                return item?.created_at ? formatDateTime(item.created_at) : "---"
            },
        },
        {
            id: 'status',
            name: 'Holati',
            width: "15%",
            template(item) {
                return (item.status?.name)
            },
        },

    ];

    const getRowActions: any = () => {
        return [
            {
                text: "Ko'rish",
                icon: <Eye />,
                handler: (item: PaymentItemType) => { setSelectItem(item), setIsModalOpen(true) }
            },
        ];
    };


    return (
        <div>

            <div className="mb-4">

                <h5>Anketalar</h5>
                <FilterSearch updateSearchParams={updateBlankParams} dateHidden={true} />
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <div style={{ minWidth: '1100px' }}>
                        {isError ? <ErrorBox /> : isFetching ? <TableLoader /> : <MyTable rowActionsSize='l'
                            data={dataBlank?.results} columns={columns}
                            onRowClick={(item) => { setMapPosition({ lat: item?.latitude, lng: item?.longitude }) }}
                            getRowActions={getRowActions} />}
                        {!isFetching && dataBlank?.count > 10 && <UserPagination total={dataBlank?.count} />}
                    </div>
                </div>
            </div>

            {mapPosition?.lat && mapPosition?.lng && <MapComponents
                setMapPosition={setMapPosition}
                mapPosition={mapPosition} />}

            <Modal footer={null} title="Batafsil ma'lumot" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                <ul className='pl-1 d-flex flex-column gap-1'>
                    <li>
                        <strong>ID:</strong> {selectItem?.id}
                    </li>
                    <li>
                        <strong>Xodim:</strong> {selectItem?.employee}
                    </li>
                    <li>
                        <strong>MFO:</strong> {selectItem?.mfo}
                    </li>
                    <li className='d-flex gap-2 align-items-center'>
                        <strong>Joylashuv:</strong> <div className="w-100 d-flex align-items-center gap-2">
                            <Link to={selectItem?.location}
                                target="_blank">
                                Link
                            </Link>
                            <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => {
                                const copyData = selectItem?.latitude && selectItem?.longitude
                                    ? `${selectItem.latitude} , ${selectItem.longitude}`
                                    : null;
                                copyToClipboard(copyData)
                            }} ><Copy /></span>
                        </div>
                    </li>
                    <li>
                        <strong>CRM ID:</strong> {selectItem?.crm_id}
                    </li>
                    <li>
                        <strong>To'lov summasi:</strong> {formatAmount(selectItem?.payment_amount || 0)}
                    </li>
                    <li>
                        <strong>Viloyat:</strong> {regionsTitle[selectItem?.region]}
                    </li>
                    <li>
                        <strong>To'lov vaqti:</strong> {selectItem?.payment_date ? formatDateTime(selectItem.payment_date) : "---"}
                    </li>
                    <li>
                        <strong>Yaratilgan vaqti:</strong> {selectItem?.created_at ? formatDateTime(selectItem.created_at) : "---"}
                    </li>
                    <li>
                        <strong>Kenglik:</strong> {selectItem?.latitude ? selectItem?.latitude : "---"}
                    </li>
                    <li>
                        <strong>Uzunlik:</strong> {selectItem?.longitude ? (selectItem.longitude) : "---"}
                    </li>
                    <li>
                        <strong>Holati:</strong> {selectItem?.status?.name}
                    </li>
                    <li>
                        <strong>Izoh:</strong> {selectItem?.comment}
                    </li>


                </ul>
            </Modal>
        </div>
    );
}

export default UserDetailMain;
