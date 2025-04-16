import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface FacebookAccountRecord {
  id: number;
  accountName: string;
  appSecret: string;
  accessToken: string;
  status: string;
  createTime: string;
}

const FaceBookUser: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FacebookAccountRecord | null>(null);
  const [tableData, setTableData] = useState<FacebookAccountRecord[]>([]);
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 初始化表格数据
    setTableData(data);
  }, []);

  const toggleSecretVisibility = (id: number, field: 'appSecret' | 'accessToken') => {
    const key = `${id}-${field}`;
    setVisibleSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: FacebookAccountRecord) => {
    form.setFieldsValue(record);
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record: FacebookAccountRecord) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除账户 ${record.accountName} 吗？`,
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
          createTime: new Date().toLocaleString()
        };
        setTableData([...tableData, newRecord]);
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns: ProColumns<FacebookAccountRecord>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '账户名称',
      dataIndex: 'accountName', 
      key: 'accountName',
    },
    {
      title: '应用密钥',
      dataIndex: 'appSecret',
      key: 'appSecret',
      render: (text, record) => {
        const key = `${record.id}-appSecret`;
        const isVisible = visibleSecrets[key];
        
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isVisible ? text : '••••••••'}
            <Button 
              type="link" 
              icon={isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />} 
              onClick={() => toggleSecretVisibility(record.id, 'appSecret')}
              style={{ marginLeft: 8 }}
            />
          </div>
        );
      }
    },
    {
      title: 'Access Token',
      dataIndex: 'accessToken',
      key: 'accessToken',
      render: (text, record) => {
        const key = `${record.id}-accessToken`;
        const isVisible = visibleSecrets[key];
        
        if (typeof text === 'string') {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isVisible 
                ? text 
                : <span>{text.substring(0, 8)}...{text.substring(text.length - 8)}</span>
              }
              <Button 
                type="link" 
                icon={isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />} 
                onClick={() => toggleSecretVisibility(record.id, 'accessToken')}
                style={{ marginLeft: 8 }}
              />
            </div>
          );
        }
        return <span>-</span>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const color = text === '正常' ? 'green' : 'red';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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

  const data: FacebookAccountRecord[] = [
    {
      id: 1,
      accountName: 'Facebook主账户',
      appSecret: 'fb_12345678',
      accessToken: 'api_key_12345678901234567890',
      status: '正常',
      createTime: '2023-10-15 09:30',
    },
    {
      id: 2,
      accountName: '营销账户A',
      appSecret: 'fb_23456789',
      accessToken: 'api_key_23456789012345678901',
      status: '正常',
      createTime: '2023-10-14 14:45',
    },
    {
      id: 3,
      accountName: '营销账户B',
      appSecret: 'fb_34567890',
      accessToken: 'api_key_34567890123456789012',
      status: '禁用',
      createTime: '2023-10-13 11:20',
    },
  ];

  return (
    <CardContainer title="Facebook账户管理">
      <ProTable<FacebookAccountRecord>
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            新增账户
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
        title={editingRecord ? '编辑账户' : '新增账户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="accountName"
            label="账户名称"
            rules={[{ required: true, message: '请输入账户名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="appSecret"
            label="应用密钥"
            rules={[{ required: true, message: '请输入应用密钥' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="accessToken"
            label="Access Token"
            rules={[{ required: true, message: '请输入Access Token' }]}
          >
            <Input.Password placeholder="请输入" />
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
        </Form>
      </Modal>
    </CardContainer>
  );
};

export default FaceBookUser;
