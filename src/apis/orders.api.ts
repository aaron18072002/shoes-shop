import http from '@/utils/http';

export const createOrder = (data: any) => {
    return http.post('/orders/create', data);
};

export const getOrdersByCustomerId = (status: string, customer_id: string) => {
    return http.get(`/orders/${status}/${customer_id}`);
};
