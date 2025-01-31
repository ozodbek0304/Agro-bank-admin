import { setOpenCreate } from '@/store/payments/payments';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextArea, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useCreatePaymentMutation, useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import { ProviderDto } from '@/interfaces/payments';
import { useGetUsersQuery } from '@/store/user/userApi';





const CreatePaymentModal = () => {
    const { openCreate } = useAppSelector(state => state.payments);
        const { data:dataEmployee } = useGetUsersQuery({}, { refetchOnMountOrArgChange: true })
    const { refetch } = useGetPaymentsQuery('')
    const dispatch = useAppDispatch()

    const [createPayment, { isLoading }] = useCreatePaymentMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const formik = useFormik({
        initialValues: {
            latitude: '41.22222',
            longitude: '69.33333',
            payment_amount: '',
            payment_date: '',
            comment: '',
            employee: '',
            telegram_id: '',
        },
        validationSchema: Yup.object({
            payment_amount: Yup.string().required("Maydonni to'ldiring"),
            comment: Yup.string().required("Maydonni to'ldiring"),
            employee: Yup.string().required("Maydonni to'ldiring"),
            telegram_id: Yup.string<ProviderDto>().required("Maydonni to'ldiring"),
            payment_date: Yup.string<ProviderDto>().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                // await createPayment({ ...values }).unwrap();
                closeModal()
                toast.success("Adminstrator muvaffaqiyatli yaratildi")
                formik.resetForm()
                refetch();
            } catch (error: any) {
                formik.setErrors(error?.data?.detail)
            }
        }
    })

    return (
        <div>
            <Modal open={openCreate} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5>
                        To'lov yaratish
                    </h5>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">

                    <Select
                            placeholder={"Xodim"}
                            filterable={true}
                            options={dataEmployee?.results ? dataEmployee.results.map(el => ({ value: el.mfo, content: el.mfo })) : []}
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
                            value={formik.values.payment_amount}
                            errorMessage={formik.errors.payment_amount}
                            error={!!formik.errors.payment_amount && formik.touched.payment_amount}
                        />
                        {/* <DatePicker size='l'/>

                             <TextArea
                            placeholder="Izoh"
                            size='l'
                            rows={5}
                            name='comment'
                            onBlur={formik.handleBlur}
                            value={formik.values.comment}
                            errorMessage={formik.errors.comment}
                            error={!!formik.errors.comment && formik.touched.comment}
                        /> */}


 
                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-2'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreatePaymentModal;
