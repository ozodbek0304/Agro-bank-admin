import PaymentsList from "./payments-list";
import CreatePaymentModal from "./create-payments-modal";
import EditPaymentModal from "./edit-payments-modal";


export default function PaymentsMain() {
    return (
        <div>
            <PaymentsList />

            <CreatePaymentModal />
            <EditPaymentModal />
        </div>
    )
}