import { Loader } from '@gravity-ui/uikit';

const PageLoad = () => {
    return (
        <div style={{
            position: 'fixed',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            height: '100vh', width: '100vw',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Loader size='l' />
        </div>
    );
}

export default PageLoad;
