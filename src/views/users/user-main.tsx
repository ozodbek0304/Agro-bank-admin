import UsersList from "./user-list";
import CreateUserModal from "./create-user-modal";
import EditUserModal from "./edit-user-modal";
import { updateUserParams } from "@/store/employee/employee";
import FilterSearch from "../filter/blank-filter";


export default function UsersMain() {
    return (
        <div>
            <FilterSearch updateSearchParams={updateUserParams}/>  
            <UsersList />
            <CreateUserModal />
            <EditUserModal />
        </div>
    )
}