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


/**
 * 刷新token
 * @param data 
 * @returns 
 */
export const PostRefreshToken = (data: any) => {
  return request('/api/token/refresh/', {
    method: 'POST',
    data,
  });
};
