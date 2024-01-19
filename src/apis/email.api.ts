import http from '@/utils/http';

export const sendEmail = (email: string) => {
    return http.post(`email/send-email`, email);
};
