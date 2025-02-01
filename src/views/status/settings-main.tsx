import { Breadcrumbs, FirstDisplayedItemsCount, LastDisplayedItemsCount } from "@gravity-ui/uikit";
import CreateStatusModal from "./create-status-modal";
import EditStatusModal from "./edit-status-modal";
import StatusLists from "./status-list";
import { useGetStatusSelectQuery } from "@/store/status/statusApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateStatusParams } from "@/store/status/status";

const SettingsMain = () => {
     const { queryParams } = useAppSelector(state => state.status)
 const {data, isSuccess}= useGetStatusSelectQuery(queryParams);
 const dispatch = useAppDispatch();
 
 const selectOptions = isSuccess && data?.length > 0 ? [
    {
      text: 'Barchasi',
      action: () => {
        dispatch(updateStatusParams({ parent: null }));
      }
    },
    ...data?.map(item => ({
      text: item?.name,
      action: () => {
        dispatch(updateStatusParams({ parent: item?.id }));
      }
    }))
  ] : [];
  
  
  


    return (
        <div>
     { selectOptions?.length>0 && <Breadcrumbs
           className="my-3 text-primary"
    items={selectOptions}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
/>}
          <StatusLists />
          <EditStatusModal/>
          <CreateStatusModal/>
        </div>
    );
}

export default SettingsMain;
