import { useDebounce } from "@/utils/helpers";
import { Select, TextInput } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { regionsData } from "../mfo/create-mfo-modal";
import { DatePicker } from "antd";
import { useAppSelector } from "@/store/store";
import dayjs from "dayjs";
import { updateUserParams } from "@/store/employee/employee";
import { useGetUsersQuery } from "@/store/employee/employeApi";
const { RangePicker } = DatePicker


interface Props {
    updateSearchParams: any,
    searchHidden?: boolean,
    regionHidden?: boolean,
    dateHidden?: boolean,
    mfoHidden?: boolean,
}
const FilterSearch = ({ updateSearchParams, searchHidden = true, regionHidden = true, dateHidden = false, mfoHidden = false }: Props) => {
    const dispatch = useDispatch();
    const { theme } = useAppSelector((state) => state.theme);
    const [search, setSearch] = useState(null);
    const searchVal = useDebounce(search, 800);
    const [range, setRange] = useState(null);
    const { queryParams } = useAppSelector(state => state.user)
    const { data, isSuccess } = useGetUsersQuery(queryParams);
    const { role } = useAppSelector(state => state.auth)

    const selectOptions = isSuccess ? data?.results?.map(item => ({
        value: item.id,
        content: item.mfo?.mfo_code,
        text: item?.tab_number,
    })) : [];

    useEffect(() => {
        if (search !== null) {
            dispatch(updateSearchParams({ search: searchVal }))
        }
    }, [searchVal])

    const handleRangeChange = (dates: any) => {
        setRange(dates)
        if (dates && dates.length === 2) {
            const payload = {
                start_date: dayjs(dates[0]).format("YYYY-MM-DD"),
                end_date: dayjs(dates[1]).format("YYYY-MM-DD")
            };
            dispatch(updateSearchParams(payload))
        }
    }



    return (
        <div className="filter_container">
            {dateHidden && <RangePicker
                className={theme === "dark" ? "ant-picker-dark" : ""}
                dropdownClassName={theme === "dark" ? "ant-picker-dark" : ""}
                value={range}
                onChange={handleRangeChange}
                placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
            />}

            {searchHidden && <TextInput onChange={e => setSearch(e.target.value)}
                className="filter_input"
                style={{ maxWidth: regionHidden ? '100%' : "500px" }}
                size="l" placeholder="Qdirish" />}
            {
                mfoHidden && <Select
                    placeholder={"Xodimlar"}
                    options={selectOptions}
                    renderOption={(op) => <div>
                        <span>{op.content} {"/"} {op.text}</span>
                    </div>}
                    size='l'
                    onUpdate={(e) => dispatch(updateSearchParams({ employee: e?.[0] }))}
                    view='clear'
                    filterable
                    onFilterChange={(value) => {
                        dispatch(updateUserParams({ search: value || '' }));
                    }}

                />
            }

            {regionHidden && role !== "admin" && <Select
                placeholder={"Viloyat nomi"}
                options={regionsData}
                renderOption={(op) => <div>
                    {op.content}
                </div>}
                size='l'
                name='region'
                onUpdate={(e) => dispatch(updateSearchParams({ region: e?.[0] }))}
                view='clear'
            />}
        </div>
    );
}

export default FilterSearch;