import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Loader, Modal } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import PhoneInput from '@/components/elements/phoneInput';
import { formatPhone, reversePhone } from '@/utils/helpers';
import PageLoader from '@/components/elements/Loader';
import { useEffect, useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation } from '@/store/user/userApi';
import { setUserData } from '@/store/user/user';
import toast from 'react-hot-toast';


const EditUserModal = () => {
    const { userData, queryParams } = useAppSelector(state => state.user)
    const { refetch } = useGetUsersQuery(queryParams)
    const dispatch = useAppDispatch()

    const [view, setView] = useState<any>(false)

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const closeModal = () => {
        formik.resetForm()
        toast.success("O'zgarishlar muvaffaqiyatli saqlandi")
        setView(false)
        setView(false)
        dispatch(setUserData(null))
    }

    const formik = useFormik({
        initialValues: {
            full_name: '',
            username: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Maydonni to'ldiring")
        }),

        onSubmit: async (values) => {
            const formData = new FormData()

            formData.append('username', reversePhone(values.username))

            try {
                await updateUser({ user_id: userData.user_id, data: formData }).unwrap();
                closeModal()
                formik.resetForm()
                refetch();
            } catch (error: any) {
                formik.setErrors(error?.data?.detail)
            }
        }
    })

    useEffect(() => {
        if (userData) {
            formik.setFieldValue('username', formatPhone(userData?.username))
            setTimeout(() => {
                setView(true)
            }, 500);
        }
    }, [userData])


    return (
        <div>
            <Modal open={!!userData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Foydalanuvchini tahrirlash
                    </h4>
                    {userData ? <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        {view ? <PhoneInput
                            size='l'
                            name='username'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values?.username}
                            errorMessage={formik?.errors?.username}
                            error={!!formik?.errors?.username && formik?.touched?.username}
                        /> : <div style={{ width: '100%', textAlign: 'center' }}>
                            <Loader size='s' />
                        </div>}

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Saqlash</Button>

                    </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditUserModal;
