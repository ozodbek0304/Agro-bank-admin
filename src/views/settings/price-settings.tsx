import AmountInput from "@/components/elements/AmountInput";
import { useGetPriceSettingsQuery, useUpdateSettingsMutation } from "@/store/settings/settingsApi";
import { reverseAmount } from "@/utils/helpers";
import { Button, Card, Label, Skeleton } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PriceSettings = () => {
    const { data, refetch } = useGetPriceSettingsQuery(``)
    const [updateSettings, { isLoading: loadingEdit }] = useUpdateSettingsMutation()

    const [priceKg, setPriceKg] = useState<any>(0)
    const [priceToDoor, setPriceToDoor] = useState<any>(0)
    const [visible, setVisible] = useState<boolean>(false)

    const handleUpdate = async () => {
        try {
            await updateSettings({ price_kg: reverseAmount(priceKg), price_to_door: reverseAmount(priceToDoor) })
            await refetch()
            toast.success("Narx muvaffaqiyatli o'zgartirildi")
        } catch (err) {
            toast.error(JSON.stringify(err.reponse?.detail))
        }
    }

    useEffect(() => {
        if (data) {
            setPriceKg(data.price_kg)
            setPriceToDoor(data.price_to_door)
            setTimeout(() => {
                setVisible(true)
            }, 200);
        }
    }, [data])



    return (
        <div>
            {!visible ? <div className="px-4 py-3 d-flex flex-column gap-3 gap-2">
                <Skeleton style={{ width: '100%', height: '30px' }} />
                <Skeleton style={{ width: '100%', height: '30px' }} />
            </div> : (
                <Card view='clear'>
                    <div className="px-4 py-3 d-flex flex-column gap-3">
                        <AmountInput
                            size="l"
                            leftContent={<Label value=" 1 kg/so'm" size='m' className="me-3 ms-1">Yetkazish narxi</Label>}
                            placeholder="0.00"
                            value={priceKg}
                            onChange={e => setPriceKg(e.target.value)}
                        />

                        <AmountInput
                            size="l"
                            leftContent={<Label value=" so'm" size='m' className="me-3 ms-1">Viloyatga yetkazish</Label>}
                            placeholder="0.00"
                            value={priceToDoor}
                            onChange={e => setPriceToDoor(e.target.value)}
                        />
                        <Button onClick={handleUpdate} loading={loadingEdit} view='outlined-info'>Saqlash</Button>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default PriceSettings;
