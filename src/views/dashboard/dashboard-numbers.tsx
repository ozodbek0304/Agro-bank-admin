import { useGetStatsQuery } from "@/store/dashboard/dashboardApi";
import { formatAmount } from "@/utils/helpers";
import useResponsive from "@/utils/useResponsive";
import { Card, Label, Skeleton, Text } from "@gravity-ui/uikit";
import { CSSProperties } from "react";

export const StatsCard = ({ title = 'Title', data = 0, icon = '', className = '', style = {}, view = 'clear', dataType = 'count' }: { title: string, data: number | undefined, icon: string, className?: string, style?: CSSProperties, view?: 'clear' | 'filled' | 'outlined' | 'raised', dataType?: 'amount' | 'count' }) => {
    return <Card className={`w-100 p-3 d-flex align-items-center justify-content-between ${className}`} view={view} style={{ height: '100px', ...style }}>
        <div className="d-flex flex-column gap-3">
            <Text variant='body-3'>{title}</Text>
            <Label size='m'>{dataType === 'count' ? data : formatAmount(data)}</Label>
        </div>
        <img height={50} src={icon} alt="statis card" />
    </Card>
}

const DashboardNumbers = () => {
    const { isMobile } = useResponsive()
    const { data: apiData, isFetching } = useGetStatsQuery(``, { refetchOnMountOrArgChange: true })

    const data: {
        title: string
        icon: string
        data: number | undefined
    }[] = [
            {
                title: 'Umumiy daromad',
                icon: '/profit.png',
                data: apiData?.total_amount_sum
            },
            {
                title: 'Barcha buyurtmalar',
                icon: '/manifest.png',
                data: apiData?.order_status_counts.total
            },
            {
                title: "To'lovi kutilayotgan buyurtmalar",
                icon: '/box.png',
                data: apiData?.order_status_counts.arrived_warehouse
            },
            {
                title: "To'lov qilingan buyurtmalar",
                icon: '/booking.png',
                data: apiData?.approved_payments_sum
            }
        ]

    return (
        <div className="d-flex gap-4" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
            {
                isFetching ? [1, 2, 3, 4].map(el => <Skeleton key={el} style={{ height: '100px' }} />) :
                    data.map(item => <StatsCard key={item.title} title={item.title} dataType={item.title === 'Umumiy daromad' ? 'amount' : 'count'} data={item.data} icon={item.icon} view='raised' />)
            }
        </div>
    );
}

export default DashboardNumbers;
