import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { router } from './utils/router';
import { Provider } from 'react-redux';
import { ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import { Suspense } from 'react';
import PageLoad from './components/partials/page-load';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const browserRouter = createBrowserRouter(router);

root.render(
    <Provider store={store}>
        <Suspense fallback={<PageLoad/>}>
            <ToasterProvider>
                <RouterProvider router={browserRouter} />
                <ToasterComponent className="optional additional classes" />
                <Toaster position={'top-center'} toastOptions={{ className: 'react-hot-toast' }} />
            </ToasterProvider>
        </Suspense>
    </Provider>
);
