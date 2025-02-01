import CreateMfoModal from "./create-mfo-modal";
import EditMfoModal from "./edit-mfo-modal";
import MfoLists from "./mfos-list";


export default function MfosMain() {
    return (
        <div>
            <MfoLists/>
            <CreateMfoModal />
            <EditMfoModal />
        </div>
    )
}