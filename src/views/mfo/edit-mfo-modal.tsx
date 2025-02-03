import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal,Select,TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import PageLoader from '@/components/elements/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { regionsData } from './create-mfo-modal';
import { setAdminData } from '@/store/mfo/mfo';
import { useUpdateMfoMutation } from '@/store/mfo/mfosApi';


const EditMfoModal = () => {
    const { adminData } = useAppSelector(state => state.mfos)
    const dispatch = useAppDispatch()

    const [updateAdmin, { isLoading }] = useUpdateMfoMutation()

    const closeModal = () => {
        formik.resetForm()
        dispatch(setAdminData(null))
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
                await updateAdmin({ id: adminData?.id, ...values}).unwrap();
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
                branch_name: adminData?.branch_name,
                mfo_code: (adminData?.mfo_code),
                region: (adminData?.region),
            })
        }
    }, [adminData])


    return (
        <div>
            <Modal open={!!adminData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        MFO tahrirlash
                    </h4>
                    {adminData ?
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
                    
                                            <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Saqlash</Button>
                    
                                        </form>: <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditMfoModal;
