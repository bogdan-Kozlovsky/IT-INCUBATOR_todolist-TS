import { instance } from 'api/config';
import { LoginParamsType, ResponseType } from 'api/types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>('auth/login');
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>(
      'auth/me',
    );
  },
};
