import { request } from "@umijs/max";

export const GetFacebookKeys = () => {
    return request('/api/facebook_keys/', {
        method: 'GET',
    });
}