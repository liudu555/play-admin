import { history } from "@umijs/max";
import type { RequestConfig } from '@umijs/max';
import { GetUserInfo } from './apis/login/loginUser';
import { PostRefreshToken } from './apis/login/login';
import { refreshTokenAtom, tokenAtom, userAtom } from '@/models/atomUser';
import { message } from 'antd';
import { useSetAtom } from 'jotai';
import { request as _request } from '@@/plugin-request';

const loginPath = '/login';
console.warn = () => {};

// Global initialization data configuration for Layout user information and permission initialization
export async function getInitialState(): Promise<any> {
  const fetchUserInfo = async () => {
    try {
      const { data, code } = await GetUserInfo();
      if (code === 200) {
        return data;
      } else {
        throw new Error('Failed to get user information');
      }
    } catch (error) {
      console.log('error', error);
    }
    return undefined;
  };

  // Do not execute if it is the login page
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const layout = ({ initialState }: any) => {
  const { currentUser } = initialState;
  const setUser = useSetAtom(userAtom);
  setUser(currentUser);
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    waterMarkProps: {
      content: '巨准科技',
      fontSize: 12,
      color: '#8a8a8as',
      fontWeight: 'bold',
      fontFamily: 'Arial',
      fontStyle: 'italic',
      fontVariant: 'normal',
      fontStretch: 'normal',
    },
    token: {
      header: {
        colorBgHeader: '#fff',
        colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
      },
      sider: {
        colorTextMenu: '#000',
        colorBgMenuItemHover: '#eef4ff',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemSelected: '#3875f5',
      },
    },
    logout: () => {
      clearAuth('Logout successful');
    },
  };
};

const clearAuth = (msg: string) => {
  localStorage.removeItem('token');
  localStorage.removeItem('accessExpire');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
  message.error(msg);
  history.push(loginPath);
}

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    errorHandler() { },
    errorThrower() { }
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
  },
  responseInterceptors: [
    (response: any) => {
      console.log('response', response.config.url);
      const useResponse = async () => {
        const { code, msg } = response.data;
        if (code === 401) {
          clearAuth('登陆已过期');
        }
        return response;
      }
      return useResponse();
    }
  ],
};
