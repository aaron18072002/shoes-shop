import http from '@/utils/http';

export const createSalesItem = (data: any) => {
    return http.post('/sales_items/create', data);
};

export const getSalesItemsByOrderId = (order_id: string) => {
    return http.get(`/sales_items/${order_id}`);
};
