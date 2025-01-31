
import { useGetStatsQuery, useGetYearlyQuery } from '@/store/dashboard/dashboardApi';
import CardWidgetsWeeklyOverview from './card-statistics-live-visitors';
import StatsPaymentMethods from './chart-graph';
import { Skeleton } from '@gravity-ui/uikit';
import useResponsive from '@/utils/useResponsive';

const DashboardOrderGraph = ({ }) => {
    const { data, isFetching } = useGetStatsQuery(``, { refetchOnMountOrArgChange: true })
    const { data: yearly, isFetching: yearlyLoad } = useGetYearlyQuery({ year: 2024 }, { refetchOnMountOrArgChange: true })
    const { isMobile } = useResponsive()

    return (
        <div>
            <div>
                <div className='d-flex row'>
                    <div className='col-md-4'>
                        {isFetching ? <div className='d-flex flex-column px-2 py-1'>
                            <Skeleton style={{ height: '24px', width: '150px' }} />
                            <div className='d-flex ps-4 gap-5'>
                                <Skeleton style={{ height: isMobile ? '160px' : '232px', width: isMobile ? '160px' : '232px', borderRadius: '50%', marginTop: '7px' }} />
                                <div className='d-flex pt-2 flex-column gap-2'>
                                    <Skeleton style={{ height: '20px', width: '120px' }} />
                                    <Skeleton style={{ height: '20px', width: '130px' }} />
                                    <Skeleton style={{ height: '20px', width: '120px' }} />
                                    <Skeleton style={{ height: '20px', width: '110px' }} />
                                    <Skeleton style={{ height: '20px', width: '100px' }} />
                                </div>
                            </div>
                        </div> : <StatsPaymentMethods data={data} />}
                    </div>
                    <div className='col-md-8'>
                        {
                            yearlyLoad ? <div className='px-4'>
                                <Skeleton style={{ height: `23px`, width: '200px' }} />
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                                    {
                                        [10, 25, 7, 20, 30, 13, 45, 33, 12, 41, 18, 9, 21, 30].map((el, i) => <Skeleton key={i} style={{ height: `${el * 5}px`, width: '50px' }} />)
                                    }
                                </div>
                            </div> : yearly ? <CardWidgetsWeeklyOverview data={yearly} /> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardOrderGraph;
