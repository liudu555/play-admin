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


/**
 * 获取广告系列列表
 * @param params 
 * @returns 
 */
export const GetCampaignList = async (params: any) => {
    return request('/api/facebook/campaign/', {
        method: 'GET',
        params
    });
}

/**
 * 获取广告组列表
 * @param params 
 * @returns 
 */
export const GetAdsetList = async (params: any) => {
    return request('/api/facebook/adset/', {
        method: 'GET',
        params
    });
}

/**
 * 获取广告列表
 * @param params 
 * @returns 
 */ 
export const GetAdList = async (params: any) => {
    return request('/api/facebook/ad/', {
        method: 'GET',
        params
    });
}


/**
 * 获取汇总数据
 * @param params 
 * @returns 
 */
export const GetSummaryData = async (params: any) => {
    return request('/api/facebook/dashboard/', {
        method: 'GET',
        params
    });
}


