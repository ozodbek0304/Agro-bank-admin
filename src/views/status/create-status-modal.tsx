import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useCreateStatusMutation } from '@/store/status/statusApi';
import { setOpenCreate } from '@/store/status/status';
import { StatusResponseType } from '@/interfaces/status';

interface Props {
    data: StatusResponseType,
    isSuccess: boolean,
}

const CreateStatusModal = ({ data, isSuccess }: Props) => {
    const { openCreate } = useAppSelector(state => state.status)
    const dispatch = useAppDispatch();

    const selectOptions = isSuccess ? data?.results?.map(item => ({
        value: item.id,
        content: item.name,
        text: item?.status_id,
    })) : [];

    const [createAdmin, { isLoading }] = useCreateStatusMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            status_id: '',
            parent: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Maydonni to'ldiring"),
            status_id: Yup.string().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createAdmin({ ...values }).unwrap();
                closeModal()
                toast.success("Holat muvaffaqiyatli yaratildi")
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

    return (
        <div>
            <Modal open={openCreate} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5>
                        Holat yaratish
                    </h5>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-2 d-flex flex-column gap-2">

                        <Select
                            placeholder={"Holat "}
                            options={selectOptions}
                            renderOption={(op) => <div>
                                {op.content}
                            </div>}
                            size='l'
                            name='parent'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('parent', e[0])}
                            value={[formik.values.parent]}
                            error={!!formik.errors.parent && formik.touched.parent}
                            view='clear'
                        />
                        {formik.errors.parent && <span className='m-0 text-danger'>{formik.errors.parent}</span>}

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

                        <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateStatusModal;
