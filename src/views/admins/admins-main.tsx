import AdminsList from "./admins-list";
import CreateAdminModal from "./create-admin-modal";
import DeleteAdminModal from "./delete-admin-modal";
import EditAdminModal from "./edit-admin-modal";


export default function AdminsMain() {
    return (
        <div>
            <AdminsList />

            <CreateAdminModal />
            <EditAdminModal />
            <DeleteAdminModal/>
        </div>
    )
}