
type Props = {}
import { Button, Icon } from '@gravity-ui/uikit'
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
                   {menuType !== 'collepse' ? <img src="/logo.png" alt="AGROBANK"  style={{width:"100%", height:"50px", objectFit:"cover", margin:"0 auto"}}/>
                    : <img src="/title.png" alt="AGROBANK"  style={{width:"100%", height:"40px", objectFit:"cover", margin:"0 auto"}}/> }
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