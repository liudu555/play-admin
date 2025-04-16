import { request } from "@umijs/max";

/**
 * 获取用户列表
 * @param params 
 * @returns 
 */
export const GetUserList = (params: any) => {
  return request('/api/users/', {
    method: 'GET',
    params,
  });
};

/**
 * 新增用户
 * @param data 
 * @returns 
 */
export const PostAddUser = (data: any) => {
  return request('/api/user/add/', {
    method: 'POST',
    data,
  });
};

/**
 * 编辑用户
 * @param data 
 * @returns 
 */
export const PutEditUser = (data: any) => {
  return request(`/api/user/${data.id}/`, {
    method: 'PUT',
    data,
  });
};


/**
 * 删除用户
 * @param id 
 * @returns 
 */
export const DeleteUser = (id: number) => {
  return request(`/api/user/${id}/`, {
    method: 'DELETE',
  });
};