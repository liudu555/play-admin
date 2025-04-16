import { request } from "@umijs/max";


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

