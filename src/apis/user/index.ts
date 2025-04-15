import { request } from '@@/plugin-request';

/**
 * 获取用户信息
 * @returns 
 */
export const GetUserInfo = () => {
  return request('/api/user_info/', {
    method: 'GET',
  });
};