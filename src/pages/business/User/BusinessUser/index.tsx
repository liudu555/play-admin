import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface BusinessUserRecord {
  id: number;
  username: string;
  status: string;
  role: string;
  registerTime: string;
}

const BusinessUser: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BusinessUserRecord | null>(null);
  const [tableData, setTableData] = useState<BusinessUserRecord[]>([]);

  useEffect(() => {
    // 初始化表格数据
    setTableData(data);
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: BusinessUserRecord) => {
    form.setFieldsValue(record);
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record: BusinessUserRecord) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${record.username} 吗？`,
      onOk: () => {
        setTableData(tableData.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        // 编辑
        setTableData(tableData.map(item => 
          item.id === editingRecord.id ? { ...item, ...values } : item
        ));
        message.success('编辑成功');
      } else {
        // 新增
        const newRecord = {
          ...values,
          id: tableData.length ? Math.max(...tableData.map(item => item.id)) + 1 : 1,
          registerTime: new Date().toLocaleString()
        };
        setTableData([...tableData, newRecord]);
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns: ProColumns<BusinessUserRecord>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username', 
      key: 'username',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => {
        let color = 'blue';
        if (record.role === '管理员') {
          color = 'red';
        } else if (record.role === '普通用户') {
          color = 'green';
        }
        return <Tag color={color}>{record.role}</Tag>;
      }
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a style={{ marginLeft: 8, color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</a>
        </>
      ),
    },
  ];

  const data: BusinessUserRecord[] = [
    {
      id: 1,
      username: 'admin',
      status: '正常',
      role: '管理员',
      registerTime: '2023-10-18 10:45',
    },
    {
      id: 2,
      username: 'user1',
      status: '正常', 
      role: '普通用户',
      registerTime: '2023-10-17 14:30',
    },
    {
      id: 3,
      username: 'editor',
      status: '禁用',
      role: '编辑',
      registerTime: '2023-10-16 09:15',
    },
    {
      id: 4,
      username: 'manager',
      status: '正常',
      role: '管理员',
      registerTime: '2023-10-15 16:20',
    },
    {
      id: 5,
      username: 'user2',
      status: '正常',
      role: '普通用户',
      registerTime: '2023-10-14 11:35',
    },
    {
      id: 6,
      username: 'reviewer',
      status: '正常',
      role: '审核员',
      registerTime: '2023-10-13 13:25',
    },
    {
      id: 7,
      username: 'user3',
      status: '禁用',
      role: '普通用户',
      registerTime: '2023-10-12 15:40',
    },
    {
      id: 8,
      username: 'operator',
      status: '正常',
      role: '运营',
      registerTime: '2023-10-11 10:55',
    },
    {
      id: 9,
      username: 'user4',
      status: '正常',
      role: '普通用户',
      registerTime: '2023-10-10 17:15',
    },
    {
      id: 10,
      username: 'analyst',
      status: '正常',
      role: '分析师',
      registerTime: '2023-10-09 12:30',
    }
  ];

  return (
    <CardContainer title="用户管理">
      <ProTable<BusinessUserRecord>
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            新增用户
          </Button>
        ]}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingRecord ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="用户名称"
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入" iconRender={visible => (visible ? <span>👁️</span> : <span>👁️‍🗨️</span>)} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入" iconRender={visible => (visible ? <span>👁️</span> : <span>👁️‍🗨️</span>)} />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择">
              <Select.Option value="正常">正常</Select.Option>
              <Select.Option value="禁用">禁用</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="role"
            label="所属小组"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择">
              <Select.Option value="管理员">管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
              <Select.Option value="编辑">编辑</Select.Option>
              <Select.Option value="审核员">审核员</Select.Option>
              <Select.Option value="运营">运营</Select.Option>
              <Select.Option value="分析师">分析师</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </CardContainer>
  );
};

export default BusinessUser;
