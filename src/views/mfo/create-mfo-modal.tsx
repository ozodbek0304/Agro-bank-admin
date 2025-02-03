import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useCreateMfoMutation } from '@/store/mfo/mfosApi';
import { setOpenCreate } from '@/store/mfo/mfo';

 export const regionsData = [
    { value: 'toshkent_region', content: 'Toshkent viloyati' },
    { value: 'samarqand', content: 'Samarqand' },
    { value: 'buxoro', content: 'Buxoro' },
    { value: 'fargona', content: 'Fargʻona' },
    { value: 'andijon', content: 'Andijon' },
    { value: 'namangan', content: 'Namangan' },
    { value: 'navoiy', content: 'Navoiy' },
    { value: 'xorazm', content: 'Xorazm' },
    { value: 'surxondaryo', content: 'Surxondaryo' },
    { value: 'qashqadaryo', content: 'Qashqadaryo' },
    { value: 'jizzax', content: 'Jizzax' },
    { value: 'sirdaryo', content: 'Sirdaryo' },
    { value: 'qoraqalpogʻiston', content: 'Qoraqalpogʻiston' },
    { value: 'toshkent_city', content: 'Toshkent shahri' }
]



const CreateMfoModal = () => {
    const { openCreate } = useAppSelector(state => state.mfos)
    const dispatch = useAppDispatch()

    const [createAdmin, { isLoading }] = useCreateMfoMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            mfo_code: '',
            branch_name: '',
            region: ''
        },
        validationSchema: Yup.object({
            mfo_code: Yup.string().required("Maydonni to'ldiring"),
            branch_name: Yup.string().required("Maydonni to'ldiring"),
            region: Yup.string().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createAdmin({ ...values }).unwrap();
                closeModal()
                toast.success("Adminstrator muvaffaqiyatli yaratildi")
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
                        MFO yaratish
                    </h5>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-2 d-flex flex-column gap-2">
                        <TextInput
                            placeholder="MFO code"
                            size='l'
                            name='mfo_code'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mfo_code}
                            errorMessage={formik.errors.mfo_code}
                            error={!!formik.errors.mfo_code && formik.touched.mfo_code}
                        />


                        <TextInput
                            placeholder="Filial nomi"
                            size='l'
                            name='branch_name'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.branch_name}
                            errorMessage={formik.errors.branch_name}
                            error={!!formik.errors.branch_name && formik.touched.branch_name}
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

                        <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateMfoModal;
