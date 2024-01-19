import http from '@/utils/http';

export const getMenProductsByOption = (
    page: number | string | undefined,
    pageSize: number | string | undefined,
    option: string | undefined,
) => {
    return http.get(`products/men`, {
        params: {
            page,
            pageSize,
            option,
        },
    });
};

export const getProductsByOption = (
    pageSize: number | string | undefined,
    option: string | undefined,
) => {
    return http.get(`products/options`, {
        params: {
            option,
            pageSize,
        },
    });
};

export const getWomenProductsByOption = (
    page: number | string | undefined,
    pageSize: number | string | undefined,
    option: string | undefined,
) => {
    return http.get(`products/women`, {
        params: {
            page,
            pageSize,
            option,
        },
    });
};

export const getProductById = (id: string) => {
    return http.get(`/products/${id}`);
};

export const getPromotionById = (id: number) => {
    return http.get(`/promotions/${id}`);
};
