import { setOpenCreate } from '@/store/user/user';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import PhoneInput from '@/components/elements/phoneInput';
import { reversePhone } from '@/utils/helpers';
import { useCreateUserMutation, useGetUsersQuery } from '@/store/user/userApi';
import toast from 'react-hot-toast';


const CreateUserModal = () => {
    const { openCreate, queryParams } = useAppSelector(state => state.user)
    const { refetch } = useGetUsersQuery(queryParams)
    const dispatch = useAppDispatch()

    const [createUser, { isLoading }] = useCreateUserMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createUser({ ...values, username: reversePhone(values.username) }).unwrap();
                closeModal()
                formik.resetForm()
                toast.success('Foydalanuvchi muvaffaqiyatli yaratildi')
                refetch();
            } catch (error: any) {
                formik.setFieldError('username', error?.data?.detail)
            }
        }
    })

    return (
        <div>
            <Modal open={openCreate} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Foydalanuvchi yaratish
                    </h4>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <PhoneInput
                            size='l'
                            name='username'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            errorMessage={formik.errors.username}
                            error={!!formik.errors.username && formik.touched.username}
                        />

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateUserModal;
