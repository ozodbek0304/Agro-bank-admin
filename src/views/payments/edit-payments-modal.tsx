import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextArea, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useUpdateAdminMutation } from '@/store/payments/paymentsApi';
import { useEffect } from 'react';
import { setPaymentData } from '@/store/payments/payments';
import { useGetUsersQuery } from '@/store/employee/employeApi';
import PageLoader from '@/components/elements/Loader';


const EditPaymentModal = () => {
    const { paymentData } = useAppSelector(state => state.payments)
    const { data: dataEmployee, isSuccess } = useGetUsersQuery({})
    const dispatch = useAppDispatch()

    const selectOptions = isSuccess ? dataEmployee?.results?.map(item => ({
        value: item.id,
        content: item.mfo?.mfo_code,
        text: item?.mfo?.region,
    })) : [];


    const [updatePayment, { isLoading }] = useUpdateAdminMutation()

    const closeModal = () => {
        dispatch(setPaymentData(false))
    }

    const formik = useFormik({
        initialValues: {
            latitude: '',
            longitude: '',
            payment_amount: '',
            comment: '',
            employee: '',
        },
        validationSchema: Yup.object({
            latitude: Yup.string().required("Maydonni to'ldiring"),
            payment_amount: Yup.string().required("Maydonni to'ldiring"),
            longitude: Yup.string().required("Maydonni to'ldiring"),
            comment: Yup.string().required("Maydonni to'ldiring"),
            employee: Yup.string().required("Maydonni to'ldiring"),
        }),

        onSubmit: async (values) => {
            try {
                await updatePayment({ id: paymentData?.id, values }).unwrap();
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


    

    useEffect(() => {
        if (paymentData) {
            formik.setFieldValue('comment', paymentData?.comment);
            formik.setFieldValue('employee', paymentData?.employee);
            formik.setFieldValue('payment_amount', paymentData?.payment_amount);
            formik.setFieldValue('latitude', paymentData?.latitude);
            formik.setFieldValue('longitude', paymentData?.longitude);
        }
    }, [paymentData])

    return (
        <div>
            <Modal open={!!paymentData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5>
                        Anketa tahrirlash
                    </h5>
                    {paymentData ? <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">

                        <Select
                            placeholder={"Xodim"}
                            filterable={true}
                            options={selectOptions}
                            renderOption={(op) => <div>
                                {op.content} {" - "} {op.text}
                            </div>}
                            size='l'
                            name='employee'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('employee', e[0])}
                            value={[formik.values.employee]}
                            error={!!formik.errors.employee && formik.touched.employee}
                            view='clear'
                        />



                        <TextInput
                            placeholder="To'lov summasi"
                            size='l'
                            name='payment_amount'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.payment_amount}
                            errorMessage={formik.errors.payment_amount}
                            error={!!formik.errors.payment_amount && formik.touched.payment_amount}
                        />

                        <TextInput
                            placeholder="Latitude"
                            size='l'
                            name='latitude'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.latitude}
                            errorMessage={formik.errors.latitude}
                            error={!!formik.errors.latitude && formik.touched.latitude}
                        />
                        <TextInput
                            placeholder="Longitude"
                            size='l'
                            name='longitude'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.longitude}
                            errorMessage={formik.errors.longitude}
                            error={!!formik.errors.longitude && formik.touched.longitude}
                        />

                        <TextArea
                            rows={5}
                            placeholder="Izoh"
                            size='l'
                            name='comment'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            errorMessage={formik.errors.comment}
                            error={!!formik.errors.comment && formik.touched.comment}
                        />
                        <Button loading={isLoading} size='l' view='outlined-success' type='submit' className='mt-2'>Saqlash</Button>

                    </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default EditPaymentModal;
