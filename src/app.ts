import { history } from "@umijs/max";
import type { RequestConfig }  from '@umijs/max';
import { GetUserInfo } from './apis/login/loginUser';
import { useAtom } from 'jotai';
import {  userAtom} from '@/models/atomUser';
// 运行时配置
const loginPath = '/login';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  const fetchUserInfo = async () => {
    try {
      const {data,code} = await GetUserInfo();
      if(code === 200) {
        return data;
      } else {
        throw new Error('获取用户信息失败')
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  }; 
  // 如果是登录页面，不执行
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
  const {currentUser} = initialState;
  const [user, setUser] = useAtom(userAtom);
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
    //菜单选中颜色
    token: {
      header: {
        colorBgHeader: '#fff',
        colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
      },
      sider: {
        colorTextMenu: '#000',
        colorBgMenuItemHover: '#eef4ff',
        colorTextMenuSelected: '#fff',
        //蓝色
        colorBgMenuItemSelected: '#3875f5',
      },
    },
    //退出登录
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      history.push('/login');
    },
  };
};

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    }
  },
  requestInterceptors: [
    (config: any) => {
      let token = localStorage.getItem('token')?.replace(/"/g, '');   
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  ],
  responseInterceptors: [
    (response: any) => {
      // console.log('response', response);
      // localStorage.setItem('token', response.data.access);
      // localStorage.setItem('refreshToken', response.data.refresh);

      return response;
    }
  ]
};
