import OrdersList from "./orders-list";
import CreateOrderModal from "./create-order-modal";
import UpdateOrderModal from "./edit-order-modal";
import OrderFilter from "./order-filter";


export default function OrdersMain() {
    return (
        <div>
            <OrderFilter />
            <OrdersList />

            <CreateOrderModal />
            <UpdateOrderModal />
        </div>
    )
}