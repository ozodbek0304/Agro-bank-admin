import ReactApexcharts from "@/components/elements/ReactApexCharts";
import { formatAmount } from "@/utils/helpers";

export default function StatsPaymentMethods({ data }) {

    const props: any = {
        series: [data?.order_status_counts.arrived_warehouse, data?.order_status_counts.waiting_for_payment, data?.order_status_counts.to_country, data?.order_status_counts.in_country_warehouse, data?.order_status_counts?.delivered],
        options: {
            chart: {
                width: 450, // Increase the chart width
                type: 'pie',
            },
            labels: ['Xitoy omborida', 'Yuborishga tayyor', 'UZB ga yuborilgan', 'UZB omborida', 'Topshirilgan'],
            responsive: [{
                breakpoint: 576,
                options: {
                    chart: {
                        width: 360
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            }],
            title: {
                text: 'Buyurtmalar',
                style: {
                    fontSize: '20px',
                    fontWeight: 500,
                    opacity: 0.6,
                },
            },
            dataLabels: {
                formatter: (val: number, opts: any) => {
                    return `${formatAmount(opts.w.config.series[opts.seriesIndex])}`;
                    console.log(val)
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                }
            },
            tooltip: {
                y: {
                    formatter: (value: number) => `${formatAmount(value)} so'm`,
                },
                custom: ({ series, seriesIndex, w }: any) => {
                    const value = series[seriesIndex];
                    const label = w.globals.labels[seriesIndex];
                    return `<div class="arrow_box">
                        <span>${label}: ${formatAmount(value)} so'm</span>
                    </div>`;
                },
            },
        },
    };
    return (
        <div>
            <div id="chart-circle">
                {props?.series?.some((el: number) => Number(el) > 0)
                    ? <ReactApexcharts options={props.options} series={props.series} type="pie" width={450} />
                    : "Buyurtmalar mavjud emas"}
            </div>
            <div id="html-dist"></div>
        </div>
    );
}
