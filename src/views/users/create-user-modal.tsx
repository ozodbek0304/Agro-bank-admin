import { setOpenCreate } from '@/store/user/user';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useCreateUserMutation } from '@/store/user/userApi';
import toast from 'react-hot-toast';


const CreateUserModal = () => {
    const { openCreate } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [createUser, { isLoading }] = useCreateUserMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            mfo: '',
            tab_number: '',
            crm_id: '',
            telegram_id: '',
        },
        validationSchema: Yup.object({
            mfo: Yup.string().required("Maydonni to'ldiring"),
            tab_number: Yup.string().required("Maydonni to'ldiring"),
            crm_id: Yup.string().required("Maydonni to'ldiring"),
            telegram_id: Yup.string().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createUser({ ...values }).unwrap();
                closeModal()
                formik.resetForm()
                toast.success('Foydalanuvchi muvaffaqiyatli yaratildi')
            }catch (error: any) {
                if (error?.data) {
                    const errors = error?.data;
                    const formikErrors: Record<string, string> = {};
        
                    Object.keys(errors).forEach(key => {
                        formikErrors[key] = errors[key];
                    });
        
                    formik.setErrors(formikErrors);
                } else {
                    toast.error("Xatolik yuz berdi.");
                }
            }
        }
    })

    return (
        <div>
            <Modal open={openCreate} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5>
                        Xodim yaratish
                    </h5>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <TextInput
                            size='l'
                            name='tab_number'
                             placeholder='Tab Number'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tab_number}
                            errorMessage={formik.errors.tab_number}
                            error={!!formik.errors.tab_number && formik.touched.tab_number}
                        />
                         <TextInput
                            size='l'
                            name='mfo'
                             placeholder='MFO'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mfo}
                            errorMessage={formik.errors.mfo}
                            error={!!formik.errors.mfo && formik.touched.mfo}
                        />

<TextInput
                            size='l'
                            name='crm_id'
                             placeholder='CRM ID'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.crm_id}
                            errorMessage={formik.errors.crm_id}
                            error={!!formik.errors.crm_id && formik.touched.crm_id}
                        />

<TextInput
                            size='l'
                            name='telegram_id'
                             placeholder='Telegram ID'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.telegram_id}
                            errorMessage={formik.errors.telegram_id}
                            error={!!formik.errors.telegram_id && formik.touched.telegram_id}
                        />


                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-2'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateUserModal;
