import DashboardOrderGraph from "./dashboard-order-graph";
import DashboardNumbers from "./dashboard-numbers";
import { Card } from "@gravity-ui/uikit";


export default function DashboardMain() {

    return (
        <div>
            <div className="mb-4 mt-3">
                <DashboardNumbers />
            </div>
            <Card view='raised' className="p-1 py-2">
                <DashboardOrderGraph />
            </Card>
        </div>
    )
}