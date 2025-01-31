import UsersList from "./user-list";
import CreateUserModal from "./create-user-modal";
import EditUserModal from "./edit-user-modal";


export default function UsersMain() {
    return (
        <div>
            <UsersList />

            <CreateUserModal />
            <EditUserModal />
        </div>
    )
}