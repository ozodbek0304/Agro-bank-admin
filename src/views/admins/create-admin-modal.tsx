import { setOpenCreate } from '@/store/admins/admins';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useCreateAdminMutation } from '@/store/admins/adminsApi';
import PasswordInput from '@/components/elements/passwordInput';
import toast from 'react-hot-toast';


const CreateAdminModal = () => {
    const { openCreate } = useAppSelector(state => state.admins)
    const dispatch = useAppDispatch()

    const [createAdmin, { isLoading }] = useCreateAdminMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            full_name: '',
            username: '',
            location: 'uz',
            password: ''
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required("Maydonni to'ldiring"),
            username: Yup.string().required("Maydonni to'ldiring"),
            // location: Yup.string().required("Variantlardan birini tanlang"),
            password: Yup.string().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createAdmin({ ...values }).unwrap();
                closeModal()
                toast.success("Adminstrator muvaffaqiyatli yaratildi")
                formik.resetForm()
            } catch (error: any) {
                formik.setErrors(error?.data?.detail)
            }
        }
    })

    return (
        <div>
            <Modal open={openCreate} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Adminstator yaratish
                    </h4>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <TextInput
                            placeholder="To'liq ism"
                            size='l'
                            name='full_name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.full_name}
                            errorMessage={formik.errors.full_name}
                            error={!!formik.errors.full_name && formik.touched.full_name}
                        />


                        <TextInput
                            placeholder="Login"
                            size='l'
                            name='username'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            errorMessage={formik.errors.username}
                            error={!!formik.errors.username && formik.touched.username}
                        />

                        <PasswordInput
                            placeholder="Parol"
                            size='l'
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            errorMessage={formik.errors.password}
                            error={!!formik.errors.password && formik.touched.password}
                        />


                        {/* <Select
                            label='Ombor'
                            options={[
                                { value: 'uz', content: "O'zbekiston", text: '/uzbekistan.png' },
                                { value: 'china', content: 'Xitoy', text: '/china.png' },
                            ]}
                            renderOption={(op) => <div>
                                <img src={op.text} alt='uzbekistan flag' height={20} className='me-2' />
                                {op.content}
                            </div>}
                            size='l'
                            name='location'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('location', e[0])}
                            value={[formik.values.location]}
                            error={!!formik.errors.location && formik.touched.location}
                            view='clear'
                        /> */}

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateAdminModal;
