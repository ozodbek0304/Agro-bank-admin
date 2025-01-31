import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { reverseAmount, useDebounce } from '@/utils/helpers';
import toast from 'react-hot-toast';
import { useCreatePaymentMutation, useGetPaymentsQuery } from '@/store/payments/paymentsApi';
import AmountInput from '@/components/elements/AmountInput';
import { ProviderDto } from '@/interfaces/payments';
import { useGetOrdersQuery } from '@/store/orders/ordersApi';
import { useEffect, useState } from 'react';
import { setPaymentData } from '@/store/payments/payments';


const EditPaymentModal = () => {
    const { paymentData } = useAppSelector(state => state.payments)
    const { refetch } = useGetPaymentsQuery('')
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')
    const searchVal = useDebounce(search, 800)
    const { data } = useGetOrdersQuery({ search: searchVal })

    const [createPayment, { isLoading }] = useCreatePaymentMutation()

    const closeModal = () => {
        dispatch(setPaymentData(false))
    }

    const formik = useFormik({
        initialValues: {
            user_id: '',
            order_tao_bao: '',
            amount: 'none',
            provider: ''
        },
        validationSchema: Yup.object({
            user_id: Yup.string().required("Maydonni to'ldiring"),
            order_tao_bao: Yup.string().required("Maydonni to'ldiring"),
            amount: Yup.string().required("Maydonni to'ldiring"),
            provider: Yup.string<ProviderDto>().required("Maydonni to'ldiring"),
        }),
        onSubmit: async (values) => {
            try {
                await createPayment({ ...values, amount: reverseAmount(values.amount), status: 'approved' }).unwrap();
                closeModal()
                toast.success("Adminstrator muvaffaqiyatli yaratildi")
                formik.resetForm()
                refetch();
            } catch (error: any) {
                formik.setErrors(error?.data?.detail)
            }
        }
    })

    const handleChangeId = async (v: string) => {
        formik.setFieldValue('user_id', v)
        setSearch(v)
    }


    useEffect(() => {
        if (paymentData) {
            setSearch(paymentData.user_id)
            formik.setValues({
                user_id: paymentData.user_id,
                order_tao_bao: paymentData.order_tao_bao,
                amount: paymentData.amount,
                provider: paymentData?.provider
            })
        }
    }, [paymentData])

    return (
        <div>
            <Modal open={!!paymentData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        To'lovni tahrirlash
                    </h4>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <TextInput
                            placeholder="Foydalanuvchi ID"
                            size='l'
                            name='user_id'
                            onChange={e => handleChangeId(e.target.value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.user_id}
                            errorMessage={formik.errors.user_id}
                            error={!!formik.errors.user_id && formik.touched.user_id}
                        />

                        <Select
                            label="Trek kodi"
                            filterable={true}
                            options={data?.results ? data.results.map(el => ({ value: el.tao_bao, content: el.tao_bao })) : []}
                            size='l'
                            name='order_tao_bao'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('order_tao_bao', e[0])}
                            value={[formik.values.order_tao_bao]}
                            error={!!formik.errors.order_tao_bao && formik.touched.order_tao_bao}
                            view='clear'
                        />

                        {formik.values?.amount !== 'none' && <AmountInput
                            placeholder="Summa"
                            size='l'
                            name='amount'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                            errorMessage={formik.errors.amount}
                            error={!!formik.errors.amount && formik.touched.amount}
                        />}


                        <Select
                            label="To'lov usuli"
                            options={[
                                { value: 'cache', content: 'Naqd' },
                                { value: 'by_card', content: 'Karta' },
                                { value: 'click', content: "Click" },
                                { value: 'payme', content: 'Payme' },
                            ]}
                            size='l'
                            name='provider'
                            onBlur={formik.handleBlur}
                            onUpdate={(e) => formik.setFieldValue('provider', e[0])}
                            value={[formik.values.provider]}
                            error={!!formik.errors.provider && formik.touched.provider}
                            view='clear'
                        />

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default EditPaymentModal;
