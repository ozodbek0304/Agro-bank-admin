import { updateMfoParams } from "@/store/mfo/mfo";
import CreateMfoModal from "./create-mfo-modal";
import EditMfoModal from "./edit-mfo-modal";
import MfoLists from "./mfos-list";
import FilterSearch from "../filter/blank-filter";


export default function MfosMain() {
    return (
        <div>  
            <FilterSearch updateSearchParams={updateMfoParams}/>
            <MfoLists/>
            <CreateMfoModal />
            <EditMfoModal />
        </div>
    )
}