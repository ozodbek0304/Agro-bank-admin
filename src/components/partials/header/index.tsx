
import './style.scss'
import LogoutBtn from '@/components/elements/LogoutBtn';
import ThemeToggler from "@/components/elements/themeToggler";
import { useAppDispatch } from '@/store/store';
import { collepseMenu } from '@/store/theme';
import { Bars } from '@gravity-ui/icons';
import { Button, Icon } from '@gravity-ui/uikit';


type Props = {}

export default function Header({ }: Props) {
    const dispatch = useAppDispatch()

    const toggleMenu = () => {
        dispatch(collepseMenu())
    }


    return (
        <div className="header gap-3">
            <Button
                view='flat'
                size="l"
                onClick={toggleMenu}
            >
                <Icon data={Bars} size={18} />
            </Button>

            <div className="header-actions">
                {localStorage.getItem('phone')}
                <ThemeToggler />
                <LogoutBtn />
            </div>
        </div>
    )
}