import { request } from "@umijs/max";


/**
 * 获取广告账户列表
 * @param params 
 * @returns 
 */
export const GetAdvertisingAccountList = async (params: any) => {
    return request('/api/facebook/account/', {
        method: 'GET',
        params
    });
}

           