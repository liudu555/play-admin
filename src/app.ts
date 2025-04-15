import type { RequestConfig } from 'umi';
import { useToken } from './models/global';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ token: string }> {
  const {token} = useToken();
  console.log('token', token);
  
  return { token };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
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
      window.location.href = '/login';
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
  requestInterceptors: [],
  responseInterceptors: []
};
