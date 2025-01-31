
type Props = {}
import { Button, Icon, Text } from '@gravity-ui/uikit'
import './style.scss'
import Menu from './Menu'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { collepseMenu } from '@/store/theme'
import { ChevronsLeft } from '@gravity-ui/icons';
import useResponsive from '@/utils/useResponsive'


export default function Sidebar({ }: Props) {

    const { menuType } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const { isMobile } = useResponsive()

    const toggleMenu = () => {
        dispatch(collepseMenu())
    }

    return (
        <div className={`sidebar ${menuType === 'collepse' ? 'sidebar-close' : ''}`}>
            <div className="sidebar-top">
                <div>
                    <img src="/logo.png" alt="" height={30} />
                    {menuType === 'collepse' ? '' : <Text className='ms-2'>Express Delivery</Text>}
                </div>
                {isMobile && <Button view='flat' size="l" onClick={toggleMenu}>
                    <Icon data={ChevronsLeft} size={22} />
                </Button>}
            </div>
            <div className="sidebar-menu">
                <Menu />
            </div>
        </div>
    )
}