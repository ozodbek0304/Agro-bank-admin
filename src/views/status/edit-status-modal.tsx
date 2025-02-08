import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import PageLoader from '@/components/elements/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUpdateStatusMutation } from '@/store/status/statusApi';
import { setUserData } from '@/store/status/status';
import { selectChoic } from './create-status-modal';


const EditStatusModal = () => {
    const { userData } = useAppSelector(state => state.status)
    const dispatch = useAppDispatch();



    const [updateAdmin, { isLoading }] = useUpdateStatusMutation()

    const closeModal = () => {
        formik.resetForm()
        dispatch(setUserData(null))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            status_id: '',
            requirement: '',
        },
        onSubmit: async (values) => {
            try {
                await updateAdmin({ id: userData?.id, ...values }).unwrap();
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
        if (userData) {
            formik.setValues({
                name: userData?.name,
                status_id: (userData?.status_id),
                requirement: (userData?.requirement),
            })
        }
    }, [userData])




    return (
        <div>
            <Modal open={!!userData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Holat tahrirlash
                    </h4>
                    {userData ?
                        <form onSubmit={formik.handleSubmit} className="create-admin-form mt-2 d-flex flex-column gap-2">
                            {userData?.children != true && <Select
                                placeholder={"Majburiy qismlar"}
                                options={selectChoic}
                                renderOption={(op) => <div>
                                    {op.content}
                                </div>}
                                size='l'
                                name='requirement'
                                onBlur={formik.handleBlur}
                                onUpdate={(e) => formik.setFieldValue('requirement', e[0])}
                                value={[formik.values.requirement]}
                                error={!!formik.errors.requirement && formik.touched.requirement}
                                view='clear'
                            />}

                            <TextInput
                                placeholder="Holat nomi"
                                size='l'
                                name='name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errorMessage={formik.errors.name}
                                error={!!formik.errors.name && formik.touched.name}
                            />


                            <TextInput
                                placeholder="Holat ID"
                                size='l'
                                name='status_id'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.status_id}
                                errorMessage={formik.errors.status_id}
                                error={!!formik.errors.status_id && formik.touched.status_id}
                            />

                            <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Saqlash</Button>

                        </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditStatusModal;
