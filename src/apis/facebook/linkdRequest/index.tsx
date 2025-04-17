import { request } from "@umijs/max";

export const GetFacebookKeys = () => {
    return request('/api/facebook_keys/', {
        method: 'GET',
    });
}

/**
 * 获取投放链接列表
 */
export const GetLinkReportList = (params: any) => {
    return request('/api/link_report/', {
        method: 'GET',
        params,
    });
}

/**
 * 获取投放链接详情
 */
export const GetLinkReportDetail = (params: any) => {
    return request(`/api/link_report_detail/${params.id}/`, {
        method: 'GET',
        params,
    });
}