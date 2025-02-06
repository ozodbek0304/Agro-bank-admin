import PaymentsList from "./payments-list";
import EditPaymentModal from "./edit-payments-modal";
import { updateBlankParams } from "@/store/payments/payments";
import FilterSearch from "../filter/blank-filter";


export default function PaymentsMain() {
    return (
        <div>
            <FilterSearch updateSearchParams={updateBlankParams} mfoHidden />
            <PaymentsList />
            <EditPaymentModal />
        </div>
    )
}