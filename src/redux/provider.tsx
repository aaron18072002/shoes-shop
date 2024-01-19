'use client';

import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingSkeleton />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
