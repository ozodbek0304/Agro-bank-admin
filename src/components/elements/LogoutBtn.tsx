import { Button, Icon } from "@gravity-ui/uikit";
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import { useAppDispatch } from "@/store/store";
import { logoutSuccess } from "@/store/auth/auth";

type Props = {}

export default function LogoutBtn({ }: Props) {

    const dispatch = useAppDispatch()

    const toggle = () => {
        dispatch(logoutSuccess())
    }


    return (
        <div>
            <Button
                size="l"
                view="outlined"
                onClick={toggle}
            >
                <Icon data={ArrowRightFromSquare} />
            </Button>
        </div>
    )
}