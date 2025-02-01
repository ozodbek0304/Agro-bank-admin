import { Breadcrumbs, FirstDisplayedItemsCount, LastDisplayedItemsCount } from "@gravity-ui/uikit";
import CreateStatusModal from "./create-status-modal";
import EditStatusModal from "./edit-status-modal";
import StatusLists from "./status-list";
import { RootState, useAppSelector } from "@/store/store";

const SettingsMain = () => {

  const parentList = useAppSelector((state: RootState) => state.status.queryParams.parent);
 console.log(parentList);
 

    return (
        <div>
          <Breadcrumbs
           className="my-3 text-primary"
    items={[
        {
            text: 'Region',
            action: () => {},
        },
        {
            text: 'Country',
            action: () => {},
        },
        {
            text: 'City',
            action: () => {},
        },
        {
            text: 'District',
            action: () => {},
        },
        {
            text: 'Street',
            action: () => {},
        },
    ]}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
/>
          <StatusLists />
          <EditStatusModal/>
          <CreateStatusModal/>
        </div>
    );
}

export default SettingsMain;
