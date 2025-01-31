// ** MUI Imports

import ReactApexcharts from "@/components/elements/ReactApexCharts"
import { YearlyResponse } from "@/interfaces/dashboard"
import { formatAmount } from "@/utils/helpers"



const CardWidgetsWeeklyOverview = ({ data }: { data: YearlyResponse }) => {

    const newData = [
        {
            name: 'Buyurtmalar',
            data: data.monthly_data.map(el => el.orders_count),
        }, {
            name: "Tasdiqlangan to'lovlar",
            data: data.monthly_data.map(el => el.approved_payments_sum),
        }
    ]

    const options = {
        chart: {
            offsetY: 3,
            offsetX: 0,
            parentHeightOffset: 0,
            toolbar: { show: true, tools: { zoom: false, zoomin: false, zoomout: false, pan: false, reset: false } },
        },
        plotOptions: {
            bar: {
                borderRadius: 9,
                columnWidth: '0%',
                endingShape: 'rounded',
                startingShape: 'rounded',
                colors: {
                    ranges: [
                        {
                            to: 50,
                            from: 40,
                            color: 'transparent'
                        }
                    ]
                }
            }
        },
        markers: {
            size: 5,
            strokeWidth: 2,
            fillOpacity: 0,
            strokeOpacity: 1
        },
        stroke: {
            width: [2, 2, 2],
            curve: 'smooth'
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        colors: ['#EE6D7A', '#f2b92a', '#72E128'],
        grid: {
            strokeDashArray: 7
        },
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            categories: ['Yan', 'Fev', 'Mart', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'].map(month => month),
            tickPlacement: 'on',
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            show: true,
            tickAmount: 5,
            labels: {
                formatter: (value: string) => `${formatAmount(value)}`,
                style: {
                    fontSize: '0.75rem'
                },
            },
            forceNiceScale: true
        }
    }


    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: '22px' }}>{data.year} yildagi aylanmalar</p>
            </div>
            <div>
                <ReactApexcharts type='line' height={208} series={newData} options={options} />
            </div>
        </div>
    )
}

export default CardWidgetsWeeklyOverview
