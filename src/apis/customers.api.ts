import http from '@/utils/http';

export const createCustomer = (data: any) => {
    return http.post('/customers/create', data);
};

export const getCustomerByUserId = (user_id: string) => {
    return http.get(`/customers/user_id/${user_id}`);
};

export const updateCustomerByUserId = (user_id: string, data: any) => {
    return http.post(`/customers/update/${user_id}`, data);
};
