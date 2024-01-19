'use client';

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const tanstackQueryClient = new QueryClient({
    // defaultOptions: {
    //     queries: {
    //         retry: false,
    //         refetchOnWindowFocus: false,
    //         cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
    //         staleTime: 1000 * 60 * 60 * 2, // 1 hour
    //     },
    // },
});

const localStoragePersister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

const ReactQueryProvider = ({ children }: any) => {
    return (
        <PersistQueryClientProvider
            client={tanstackQueryClient}
            persistOptions={{
                persister: localStoragePersister,
                // maxAge: Infinity, // 1 minute
                // hydrateOptions: {},
            }}
        >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
    );
};

export default ReactQueryProvider;
