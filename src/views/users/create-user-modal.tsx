import { setOpenCreate } from '@/store/employee/employee';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useCreateUserMutation } from '@/store/employee/employeApi';
import toast from 'react-hot-toast';
import { useGetMfoQuery } from '@/store/mfo/mfosApi';



const CreateUserModal = () => {
    const { openCreate } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const {data,isSuccess}= useGetMfoQuery({});

    const selectOptions =isSuccess ? data?.results?.map(item => ({
        value: item.id,
        content: item.mfo_code,
        text:item?.region,
    })):[];
    

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
                    if (errors?.error) {
                        toast.error(errors?.error);
                     }
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
                         <Select
                        filterable={true}
                                                     placeholder={"MFO"}
                                                    options={selectOptions}
                                                    renderOption={(op) => <div>
                                                       {op.content} {" - "} {op.text}
                                                    </div>}
                                                    size='l'
                                                    name='mfo'
                                                    onBlur={formik.handleBlur}
                                                    onUpdate={(e) => formik.setFieldValue('mfo', e[0])}
                                                    value={[formik.values.mfo]}
                                                    error={!!formik.errors.mfo && formik.touched.mfo}
                                                    view='clear'
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
