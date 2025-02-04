import { useDebounce } from "@/utils/helpers";
import { Select, TextInput } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { regionsData } from "../mfo/create-mfo-modal";


interface Props {
    updateSearchParams: any,
    searchHidden?: boolean,
    regionHidden?: boolean,
}
const FilterSearch = ({ updateSearchParams, searchHidden = true, regionHidden = true }: Props) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const searchVal = useDebounce(search, 800);

    useEffect(() => {
        dispatch(updateSearchParams({ search: searchVal }))
    }, [searchVal])

    return (
        <div className="filter_container">
            {searchHidden && <TextInput onChange={e => setSearch(e.target.value)}
                className="filter_input"
                style={{ maxWidth: regionHidden ? '100%' : "500px" }}
                size="l" placeholder="Qdirish" />}
              {regionHidden && <Select
                placeholder={"Viloyat nomi"}
                options={regionsData}
                renderOption={(op) => <div>
                    {op.content}
                </div>}
                size='l'
                name='region'
                onUpdate={(e) => dispatch(updateSearchParams({ region: e?.[0] }))}
                view='clear'
                className="filter_select"

            />}
        </div>
    );
}

export default FilterSearch;