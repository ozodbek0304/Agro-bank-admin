import { NavigationTypes } from "@/interfaces/app"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { collepseMenu } from "@/store/theme"
import useResponsive from "@/utils/useResponsive"
import { Button, Icon, Tooltip } from "@gravity-ui/uikit"
import { useLocation, useNavigate } from "react-router-dom"

export default function MenuItem({ menuItem }: { menuItem: NavigationTypes }) {

    const { menuType } = useAppSelector(state => state.theme)
    const { isMobile } = useResponsive()
    const dispatch = useAppDispatch()

    const collapse = menuType === 'collepse'
    const navigate = useNavigate()
    const location = useLocation()


    const handleClick = () => {
        if (isMobile) {
            dispatch(collepseMenu())
        }
        navigate(menuItem.path)
    }

    const isActive: boolean = location.pathname === menuItem.path || menuItem.path.split('/').includes(location.pathname?.split('/')?.[1])


    if (collapse) {
        return (
            <Tooltip content={menuItem.name} placement='right'>
                <div tabIndex={0}>
                    <Button
                        size='l'
                        view={isActive ? 'outlined-success' : 'flat-success'}
                        onClick={handleClick}
                    >
                        <Icon data={menuItem.icon} size={18} />
                    </Button>
                </div>
            </Tooltip>
        )
    }

    return (
        <Button
            size='l'
            view={isActive ? 'outlined-success' : 'flat-success'}
            width='max'
            className="menu-item"
            onClick={handleClick}
        >
            <span>
                <Icon data={menuItem.icon} size={18} />
                {menuItem.name}
            </span>
        </Button>
    )
}