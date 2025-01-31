import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Modal, TextInput } from '@gravity-ui/uikit';
import { useFormik } from 'formik';
import './style.scss'
import * as Yup from 'yup'
import { useCreateOrderMutation, useGetOrdersQuery } from '@/store/orders/ordersApi';
import { setOpenCreate } from '@/store/orders/orders';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from '@/utils/helpers';
import CreatableSelect from 'react-select/creatable';
import { api } from '@/utils/http';


const CreateOrderModal = () => {
    const { openCreate, queryParams } = useAppSelector(state => state.orders)
    const [search, setSearch] = useState('')
    const searchval = useDebounce(search, 1000)
    const { refetch } = useGetOrdersQuery(queryParams, { refetchOnMountOrArgChange: true })
    const dispatch = useAppDispatch()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [createOrder, { isLoading }] = useCreateOrderMutation()

    const closeModal = () => {
        dispatch(setOpenCreate(false))
    }

    const handleSearch = async () => {
        setLoading(true)
        const resp = await api.get(`admin-all-user/?search=${searchval}&limit=5`)
        setUsers(resp.data?.results);
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            tao_bao: '',
            user_id: '',
            weight: '',
            image_id: '',
        },
        validationSchema: Yup.object({
            tao_bao: Yup.string().required('Trek kodi majburiy'),
            weight: Yup.string(),
            user_id: Yup.string(),
            image_id: Yup.string(),
        }),
        onSubmit: async (values) => {

            const formData = new FormData()

            Object.entries(values).map((key: any[]) => formData.append(key[0], `${key[1]}`?.replace(',', '.')))

            try {
                await createOrder(formData).unwrap();
                closeModal()
                toast.success("Buyurtma muvaffaqiyatli yaratildi")
                formik.resetForm()
                refetch();
            } catch (error: any) {
                if (error?.data) {
                    return formik.setErrors(error?.data?.detail)
                } else toast.error(JSON.stringify(error?.data))
            }
        }
    })


    const handleChangeId = (v: string) => {
        setSearch(v)
        // setTimeout(() => {
        //     handleSearch(v)
        // }, 800);
    }

    useEffect(() => {
        if (openCreate) {
            formik.setValues({
                image_id: openCreate?.image_id,
                user_id: openCreate?.user_id,
                tao_bao: openCreate?.tao_bao,
                weight: ''
            })
        }
    }, [openCreate])

    useEffect(() => {
        handleSearch()
    }, [searchval])

    return (
        <div>
            <Modal open={!!openCreate} onClose={closeModal} >
                <div className='create-admin-modal'>
                    <h4>
                        Buyurtma yaratish
                    </h4>
                    <form onSubmit={formik.handleSubmit} className="create-admin-form mt-3 d-flex flex-column gap-2">
                        <CreatableSelect
                            isClearable
                            options={
                                users.map(el => ({ value: el.user_id, label: el.user_id }))
                            }
                            placeholder="Foydalanuvchi ID"
                            createOptionPosition="first"
                            isLoading={loading}
                            onCreateOption={e => {
                                if (e) {
                                    formik.setFieldValue('user_id', e.toUpperCase())
                                }
                            }}
                            formatCreateLabel={v => {
                                if (v) {
                                    return v.toUpperCase()
                                } else return v
                            }}
                            value={formik.values?.user_id ? { value: formik.values?.user_id || '', label: formik.values.user_id } : null}
                            onInputChange={(e) => handleChangeId(e)}
                            onChange={e => formik.setFieldValue('user_id', e?.value?.toUpperCase() || '')}
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
                            error={!!formik.errors.weight && !!formik.touched.weight}
                            rightContent={<span className='pe-2'>kg</span>}
                        />

                        <Button loading={isLoading} size='l' view='outlined-info' type='submit' className='mt-4'>Yaratish</Button>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default CreateOrderModal;
