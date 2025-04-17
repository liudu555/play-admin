import { request } from '@@/plugin-request';


/**
 * 获取小组列表
 * @returns 
 */
export const GetDepartMentList = () => {
    return request('/api/departments/', {
      method: 'GET',
    });
};


/**
 * 新增小组
 * @param data 
 * @returns 
 */
export const PostAddDepartMent = (data: any) => {
    return request('/api/departments/', {
      method: 'POST',
      data,
    });
};


/**
 * 编辑小组
 * @param data 
 * @returns 
 */
export const PutEditDepartMent = (data: any) => {
    return request(`/api/departments/${data.id}/`, {
      method: 'PUT',
      data,
    });
};


/**
 * 获取所有用户列表
 * @returns 
 */
export const GetAllUserList = (params: any) => {
    return request('/api/get_all_users/', {
      method: 'GET',
      params,
    });
};

