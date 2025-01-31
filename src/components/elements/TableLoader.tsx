import { Skeleton } from "@gravity-ui/uikit";

const TableLoader = () => {
    return (
        <div style={{ width: '100%', padding: '3px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="d-flex gap-4">
                {[1, 2, 3, 4, 5, 6].map(el => <Skeleton key={el} style={{ height: '36px', display: 'block' }} />)}
            </div>
            {
                [1, 2, 3, 4, 5].map(el => <Skeleton key={el} style={{ width: '100%', height: '30px', display: 'block' }} />)
            }
        </div>
    );
}

export default TableLoader;
