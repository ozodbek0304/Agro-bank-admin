import { adminNavigation, ceoNavigation } from "@/utils/navigation"
import MenuItem from "./MenuItem"
import { useAppSelector } from "@/store/store"

type Props = {}

export default function Menu({ }: Props) {

    const { role } = useAppSelector(state => state.auth)

    const navItems = (role === 'admin' || role === "checker") ? [...adminNavigation] : [...ceoNavigation]

    return (
        <div className='menu'>
            {
                navItems.map((menuItem, key) => <MenuItem menuItem={menuItem} key={key} />)
            }
        </div>
    )
}