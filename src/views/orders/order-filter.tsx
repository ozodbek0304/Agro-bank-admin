import { updateOrderParams } from "@/store/orders/orders";
import { useAppSelector } from "@/store/store";
import { useDebounce } from "@/utils/helpers";
import { api } from "@/utils/http";
import { RadioButtonOption, Select, Skeleton, TextInput } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const filterKeys = {
    ARRIVED_WHEREHOUSE: "Agro Bank omborida",
    WAITING_FOR_PAYMENT: "To'lov qilingan",
    TO_COUNTRY: "UZB ga yuborildi",
    IN_COUNTRY_WAREHOUSE: "UZB ga yetib keldi",
    DELIVERED: "Topshirilgan",
    CANCELED: "Bekor qilingan",
    TOTAL_ORDERS: "Barchasi"
}

const OrderFilter = () => {
    const [options, setOptions] = useState<RadioButtonOption[]>([])
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const searchVal = useDebounce(search, 800)

    const {
        queryParams
    } = useAppSelector(state => state.orders)

    const getStatus = async () => {
        const resp = await api.get(`order-status-list/`)
        setOptions([{ value: '', content: 'Barchasi' }, ...resp.data.map((item: string) => ({ value: item, content: filterKeys[item.toUpperCase()] }))])
    }

    const handleStatusChange = (status: string) => {
        dispatch(updateOrderParams({ status }))
    }

    useEffect(() => {
        getStatus()
    }, [])

    useEffect(() => {
        dispatch(updateOrderParams({ search: searchVal }))
    }, [searchVal])

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <TextInput onChange={e => setSearch(e.target.value)} style={{ maxWidth: '300px' }} placeholder="Qdirish, ID,Ism, Telefon.." />
            {options.length ? <Select
                onUpdate={e => handleStatusChange(e[0])}
                options={options}
                defaultValue={queryParams?.status ? [queryParams?.status] : ['']} />
                :
                <Skeleton style={{ height: '28px', maxWidth: '180px' }} />
            }
        </div>
    );
}

export default OrderFilter;
