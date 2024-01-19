import { useSearchParams } from 'next/navigation';

export default function useQueryString() {
    const [searchParams] = useSearchParams();

    if (!searchParams) {
        return [1, 1];
    }

    const searchParamsObject = Object.fromEntries([...searchParams.entries()]);

    return searchParamsObject;
}
