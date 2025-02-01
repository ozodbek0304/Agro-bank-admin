import PaymentsList from "./payments-list";
import EditPaymentModal from "./edit-payments-modal";


export default function PaymentsMain() {
    return (
        <div>
            <PaymentsList />
            <EditPaymentModal />
        </div>
    )
}