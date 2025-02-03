import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Modal } from "@gravity-ui/uikit";
import './style.scss'
import { setDeleteId } from "@/store/admins/admins";
import { useDeleteAdminMutation } from "@/store/admins/adminsApi";
import toast from "react-hot-toast";

const DeletePaymentModal = () => {
    const { deleteId } = useAppSelector(state => state.admins)
    const dispatch = useAppDispatch()
    const [deleteAdmin, { isLoading }] = useDeleteAdminMutation()

    const closeModal = () => dispatch(setDeleteId(null))

    const handleDelete = async () => {
        if (deleteId) {
            await deleteAdmin(deleteId)
            toast.success("Adminstrator muvaffaqiyatli o'chirildi")
            closeModal()
        }
    }

    return (
        <div>
            <Modal open={!!deleteId} onClose={closeModal}>
                <div className='create-admin-modal'>
                    <h5 className="text-center">
                        Rostdan ham bu adminni o'chirmoqchimisiz?
                    </h5>

                    <div className="mt-3 mb-3 d-flex justify-content-evenly">
                        <Button onClick={closeModal} size="l">Bekor qilish</Button>
                        <Button onClick={handleDelete} loading={isLoading} size="l" view='outlined-danger'>Ha, o'chirish</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeletePaymentModal;
