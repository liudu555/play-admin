import { request } from '@@/plugin-request';

/**
 * 登录
 * @param data 
 * @returns 
 */
export const PostLogin = (data: any) => {
  return request('/api/login/', {
    method: 'POST',
    data,
  });
};
