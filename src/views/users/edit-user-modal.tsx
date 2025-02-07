import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import PageLoader from '@/components/elements/Loader';
import { useEffect } from 'react';
import { useUpdateUserMutation } from '@/store/employee/employeApi';
import { setUserData } from '@/store/employee/employee';
import toast from 'react-hot-toast';
import { useGetMfoQuery } from '@/store/mfo/mfosApi';


const EditUserModal = () => {
    const { userData } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const { data, isSuccess } = useGetMfoQuery({});

    const selectOptions = isSuccess ? data?.results?.map(item => ({
        value: item.id,
        content: item.mfo_code,
        text: item?.region,
    })) : [];

    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const closeModal = () => {
        formik.resetForm()
        dispatch(setUserData(null))
    }

    const formik = useFormik({
        initialValues: {
            mfo: '',
            tab_number: '',
            crm_id: '',
            telegram_id: '',
            archived: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData()
            if (values?.mfo) {
                formData.append('mfo', values?.mfo)
            }
            if (values?.tab_number) {
                formData.append('tab_number', values?.tab_number)
            }
            if (values?.crm_id) {
                formData.append('crm_id', values?.crm_id)
            }
            if (values?.telegram_id) {
                formData.append('telegram_id', values?.telegram_id)
            }
            if (values?.archived) {
                formData.append('archived', values?.archived)
            }

            try {
                await updateUser({ user_id: userData.id, data: formData }).unwrap();
                closeModal()
                formik.resetForm();
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
        if (userData) {
            formik.setFieldValue('mfo', userData?.mfo?.id)
            formik.setFieldValue('tab_number', userData?.tab_number)
            formik.setFieldValue('crm_id', userData?.crm_id)
            formik.setFieldValue('telegram_id', userData?.telegram_id)
            formik.setFieldValue('archived', userData?.archived === true ? "true" : "false")
        }
    }, [userData]);





    return (
        <div>
            <Modal open={!!userData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5>
                        Foydalanuvchini tahrirlash
                    </h5>
                    {userData ? <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <TextInput
                            size='l'
                            name='tab_number'
                            placeholder='Tab raqami'
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
                        {formik.errors.mfo && <span className='m-0 text-danger'>{formik.errors.mfo}</span>}

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

                        <Select
                            options={[
                                { value: 'false', content: "Aktiv" },
                                { value: 'true', content: 'Aktiv Emas' },
                            ]}
                            renderOption={(op) => <div>
                                {op.content}
                            </div>}
                            size='l'
                            name='archived'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('archived', e[0])}
                            value={[formik.values.archived === "true" ? "Aktiv Emas" : "Aktiv"]}
                            error={!!formik.errors.archived && formik.touched.archived}
                            view='clear'
                        />


                        <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Saqlash</Button>

                    </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditUserModal;
