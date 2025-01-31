import block from 'bem-cn-lite';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '@gravity-ui/uikit';
import PhoneInput from '@/components/elements/phoneInput';
import PasswordInput from '@/components/elements/passwordInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHandleLoginMutation } from '@/store/auth/authApi';
import { LoginProps } from '@/interfaces/auth';
import { loginSuccess } from '@/store/auth/auth';
import { reversePhone } from '@/utils/helpers';

type Props = {};

const b = block('login-form');

export default function LoginForm({ }: Props) {

    const [handleLogin, { isLoading }] = useHandleLoginMutation()

    const dispatch = useDispatch();
    const navigation = useNavigate();

    const validationSchema = Yup.object({
        phone: Yup.string().required('Telefon raqam kiriting'),
        password: Yup.string().required('Parol kiriting'),
    });

    const initialValues: LoginProps = {
        phone: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ phone, password }) => {
            const resp: any = await handleLogin({ phone: reversePhone(phone), password })
            if (resp?.error) {
                formik.setErrors(resp?.error.data?.detail)
            } else {
                localStorage.setItem('phone', phone)
                dispatch(loginSuccess(resp.data));
                navigation('/');
            }
        },
    });

    return (
        <form className={b()} onSubmit={formik.handleSubmit}>
            <PhoneInput
                placeholder="Telefon raqam"
                error={!!formik.errors.phone && formik.touched.phone}
                errorMessage={formik.errors.phone}
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                size="l"
                autoComplete="off"
            />

            <PasswordInput
                placeholder="Parol"
                error={!!formik.errors.password && formik.touched.password}
                errorMessage={formik.errors.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                size="l"
            />

            <Button loading={isLoading} type="submit" size="l">
                Kirish
            </Button>
        </form>
    );
}
