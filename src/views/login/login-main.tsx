import LoginForm from "./login-form"
import block from 'bem-cn-lite'

import './style.scss';

type Props = {}

const b = block('login-main')

export default function LoginMain({ }: Props) {
    return (
        <div className={b()}>
            <img src="/logo.svg"  style={{width:"250px", marginBottom:"20px"}} />
            <LoginForm />
        </div>
    )
}