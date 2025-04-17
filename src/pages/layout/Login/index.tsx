import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { PostLogin } from "@/apis/login/login";
import { tokenAtom ,refreshTokenAtom,userAtom,accessExpireAtom} from "@/models/atomUser";
import { useSetAtom } from "jotai";

var md5 = require('md5');

interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录页面
 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const setToken = useSetAtom(tokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setAccessExpire = useSetAtom(accessExpireAtom);
  const handleSubmit = async (values: LoginParams) => {
    try {
      setLoading(true);
      const {code,data,msg} = await PostLogin({
        ...values,
        password: md5(values.password),
      });
      if(code === 200) {
        message.success("登录成功");
        setToken(data.access);
        setRefreshToken(data.refresh);
        setAccessExpire(data.access_expire);
        history.push("/");
        window.location.reload();
      } else {
        message.error(msg);
      }
    } catch (error) {
      message.error("登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">SEM运营系统</h2>
        <Form
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-gray-500 text-sm mt-4">
          SEM运营系统 © 2023 版权所有
        </div>
      </div>
    </div>
  );
};

export default Login;
