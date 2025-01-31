import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, RadioButtonOption, Select, Skeleton, TextArea, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useGetOrdersQuery, useUpdateOrderMutation } from '@/store/orders/ordersApi';
import { setOrderData } from '@/store/orders/orders';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/elements/Loader';
import { api } from '@/utils/http';
import { filterKeys } from './order-filter';
import toast from 'react-hot-toast';


const UpdateOrderModal = () => {
    const { orderData, queryParams } = useAppSelector(state => state.orders)
    const { refetch } = useGetOrdersQuery(queryParams)
    const dispatch = useAppDispatch()

    const [updateOrder, { isLoading }] = useUpdateOrderMutation()

    const closeModal = () => {
        dispatch(setOrderData(null))
    }

    const [options, setOptions] = useState<RadioButtonOption[]>([])


    const getStatus = async () => {
        const resp = await api.get(`order-status-list/`)
        setOptions(resp.data.map((item: string) => ({ value: item, content: filterKeys[item.toUpperCase()] })))
    }

    const formik = useFormik({
        initialValues: {
            tao_bao: '',
            user_id: '',
            weight: '',
            status: '',
            feedback: ''
        },
        validationSchema: Yup.object({
            tao_bao: Yup.string().required('Trek kodi majburiy'),
            user_id: Yup.string(),
            weight: Yup.string(),
            status: Yup.string().required("Biror qiymat tanlang"),
            feedback: Yup.string()
        }),
        onSubmit: async (values) => {
            try {
                if (orderData) {
                    await updateOrder({ id: orderData?.id, ...values }).unwrap();
                    closeModal()
                    toast.success("O'zgarishlar muvaffaqiyatli saqlandi")
                    formik.resetForm()
                    refetch();
                }
            } catch (error: any) {
                formik.setErrors(error?.data?.detail)
            }
        }
    })

    const handleStatusChange = (status: string) => {
        formik.setFieldValue('status', status)
    }

    useEffect(() => {
        if (orderData) {
            formik.setValues({
                user_id: orderData.user_id,
                weight: orderData.weight,
                tao_bao: orderData.tao_bao,
                status: orderData.status,
                feedback: orderData.feedback
            })
        }
        if (orderData && !options?.length) {
            getStatus()
        }
    }, [orderData])

    return (
        <div>
            <Modal open={!!orderData} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h4>
                        Buyurtmani tahrirlash
                    </h4>
                    {orderData ? <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        {options.length ? <Select
                            onUpdate={e => handleStatusChange(e[0])}
                            options={options}
                            size='l'
                            value={[formik.values.status]} />
                            :
                            <Skeleton style={{ height: '35px', maxWidth: '100%' }} />
                        }

                        {formik.values.status === 'canceled' && < TextArea
                            placeholder="Bekor qilish sababi"
                            size='l'
                            minRows={5}
                            name='feedback'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.feedback}
                            errorMessage={formik.errors.feedback}
                            error={!!formik.errors.feedback && formik.touched.feedback}
                        />}


                        <TextInput
                            placeholder="Buyurtmachi ID raqami"
                            size='l'
                            name='user_id'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.user_id}
                            errorMessage={formik.errors.user_id}
                            error={!!formik.errors.user_id && formik.touched.user_id}
                        />


                        <TextInput
                            placeholder="Trek kodi"
                            size='l'
                            name='tao_bao'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tao_bao}
                            errorMessage={formik.errors.tao_bao}
                            error={!!formik.errors.tao_bao && formik.touched.tao_bao}
                        />


                        <TextInput
                            placeholder="Og'irligi"
                            size='l'
                            name='weight'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.weight}
                            errorMessage={formik.errors.weight}
                            error={!!formik.errors.weight && formik.touched.weight}
                            rightContent={<span className='pe-2'>kg</span>}
                        />

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Saqlash</Button>

                    </form> : <PageLoader loading />}
                </div>
            </Modal>
        </div>
    );
}

export default UpdateOrderModal;
