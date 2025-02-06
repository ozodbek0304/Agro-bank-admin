import { setAdminData } from '@/store/admins/admins';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useUpdateAdminMutation } from '@/store/admins/adminsApi';
import PasswordInput from '@/components/elements/passwordInput';
import PageLoader from '@/components/elements/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { regionsData } from '../mfo/create-mfo-modal';


const EditAdminModal = () => {
    const { adminData } = useAppSelector(state => state.admins)
    const dispatch = useAppDispatch()

    const [updateAdmin, { isLoading }] = useUpdateAdminMutation()

    const closeModal = () => {
        formik.resetForm()
        dispatch(setAdminData(null))
    }

    const formik = useFormik({
        initialValues: {
            full_name: '',
            username: '',
            password: '',
            region: ''
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required("Maydonni to'ldiring"),
            username: Yup.string().required("Maydonni to'ldiring"),
            region: Yup.string().required("Maydonni to'ldiring"),
            password: Yup.string(),
        }),

        onSubmit: async (values) => {
            const data: any = {
                username: values?.username,
                full_name: values?.full_name,
                region: values?.region,
                ...(values?.password && {
                    password: values?.password
                })
            }
            try {
                await updateAdmin({ id: adminData?.id, ...data }).unwrap();
                closeModal()
                toast.success("O'zgarishlar muvaffaqiyatli saqlandi")
                formik.resetForm()
            } catch (error: any) {
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

    useEffect(() => {
        if (adminData) {
            formik.setValues({
                full_name: adminData?.full_name,
                username: (adminData?.username),
                region: (adminData?.region),
                password: '',
            })
        }
    }, [adminData])


    return (
        <div>
            <Modal open={!!adminData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Adminni tahrirlash
                    </h4>
                    {adminData ? <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
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
                        <Select
                            placeholder={"Viloyat nomi"}
                            options={regionsData}
                            renderOption={(op) => <div>
                                {op.content}
                            </div>}
                            size='l'
                            name='region'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('region', e[0])}
                            value={[formik.values.region]}
                            error={!!formik.errors.region && formik.touched.region}
                            view='clear'
                        />
                        {formik.errors.region && <span className='m-0 text-danger'>{formik.errors.region}</span>}


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

                        <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-4'>Saqlash</Button>

                    </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditAdminModal;
