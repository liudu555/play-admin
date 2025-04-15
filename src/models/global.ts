// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};

const useToken = () => {
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  return {
    token,
    setToken,
  };
};
export { useUser, useToken };
