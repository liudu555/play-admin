import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { GetUserList, PostAddUser,PutEditUser,DeleteUser } from '@/apis/user/mangerRequest';
import { GetDepartMentList } from '@/apis/user/groupRequest';
const md5 = require('md5');
interface BusinessUserRecord {
  id: number;
  name: string;
  username: string;
  state: string;
  accounts: Array<any>;
  dept: any;
  is_deleted: boolean;
  addtime: string;
}

const UserState = {
  '1': {
    color: 'blue',
    text: '管理员'
  },
  '2': {
    color: 'green',
    text: '组长'
  },
  '3': {
    color: 'red',
    text: '运营'
  },
}



const BusinessUser: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BusinessUserRecord | null>(null);
  const [userList, setUserList] = useState<BusinessUserRecord[]>([]);
  const [departMentList, setDepartMentList] = useState<any[]>([]);
  /** 总页数 */
  const [pageTotal, setPageTotal] = useState<number>(0);
  /** 每页条数 */
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  useEffect(() => {
    console.log('form',form.getFieldsValue());
    
  }, [form]);
  const [searchParams, setSearchParams] = useState<{
    ordering: string | undefined; /** 排序 */
    search: string | undefined; /** 搜索 */
    state: string | undefined; /** 状态 */
    page_size: number | undefined; /** 每页条数 */
    page: number | undefined; /** 页码 */
    accounts: number | undefined; /** 账户 */
   }>({
    ordering: undefined,
    state: undefined,
    page_size: 10,
    page: 1,
    accounts: undefined,
    search: undefined,
   });
  /** 获取用户列表 */
  const loadUserList = async () => {
   try {
    const {code,data} = await GetUserList(searchParams);
    if(code === 200) {
      setUserList(data.results);
      setPageTotal(data.pagination.total_items);
      setCurrentPageSize(data.pagination.current_page_size);
    }
   } catch (error) {
    console.error('获取用户列表失败:', error);
   }
  }
  /** 获取小组列表 */
  const loadDepartMentList = async () => {
    const {code,data} = await GetDepartMentList();
    if(code === 200) {
      console.log('小组列表',data.results);
      
      setDepartMentList(data.results);
    } else {
      message.error('获取小组列表失败');
    }
  }
  useEffect(() => {
    // 初始化表格数据
    loadUserList();
    loadDepartMentList();
  }, [searchParams]);

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: BusinessUserRecord) => {
    console.log('编辑',record);
    const {dept} = record;
    form.setFieldsValue({
      id: record.id,
      username: record.username,
      state: record.state,
      password: undefined,
      confirmPassword: undefined,
      dept_id: dept?.id,
      dept: dept?.name,
    });
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record: BusinessUserRecord) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${record.username} 吗？`,
      onOk: async () => {
            const {code} = await DeleteUser(record.id);
            if(code === 200) {
              message.success('删除成功');
              loadUserList();
            } else {
              message.error('删除失败');
            }
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields(); 
      let md5Password = '';
      if (values.password) {
        md5Password = md5(values.password);
        const md5ConfirmPassword = md5(values.confirmPassword);
        //两次密码一致
        if(md5Password !== md5ConfirmPassword) {
          message.error('两次密码不一致');
          return;
        }
      }
      if (values.id) {
        const {code} = await PutEditUser(values);
        if(code === 200) {
          message.success('编辑成功');
          loadUserList();
        } else {
          message.error('编辑失败');
        }
      } else {
        console.log('新增',values);
        let postData = {
          ...values,
          password: md5Password,
        }
        const {code} = await PostAddUser(postData);
        if(code === 200) {
          message.success('添加成功');
          loadUserList();
        } else {
          message.error('添加失败');
        }
      }
      setModalVisible(false);
      form.resetFields();
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
      title: '角色',
      dataIndex: 'state',
      key: 'state',
      render: (_, record) => {
        const {color,text} = UserState[record.state as keyof typeof UserState];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '小组',
      dataIndex: 'dept',
      key: 'dept',
      render: (_, record) => { 
        if(record.dept?.name) {
          return <span>{record.dept?.name}</span>
        } else {
          return <span>暂无小组</span>
        }
      }
    },
    {
      title: '广告账户',
      dataIndex: 'accounts',
      key: 'accounts',
      render: (_, record) => {
        const {accounts} = record;
        return <div className='flex flex-wrap gap-2'>
          {
            accounts.length > 0 ? accounts.map((item:any) => {
              return <Tag color='blue' key={item.id}>{item.name}</Tag>
            }) : <Tag color='blue'>暂无广告账户</Tag>
          }
        </div>
      },
      width: 280,
    },
    {
      title: '添加时间',
      dataIndex: 'addtime',
      key: 'addtime',
    },
    {
      title: '是否有效',
      dataIndex: 'is_deleted',
      key: 'is_deleted',
      render: (_, record) => {
        return record.is_deleted ? <Tag color='red'>已删除</Tag> : <Tag color='green'>正常</Tag>;
      }
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



  return (
    <CardContainer title="用户管理">
      <ProTable<BusinessUserRecord>
        columns={columns}
        dataSource={userList}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            新增用户
          </Button>
        ]}
        pagination={{
          pageSize: currentPageSize,
          total: pageTotal,
          onChange: (page, pageSize) => {
            setSearchParams({...searchParams, page, page_size: pageSize});
          },
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
            name="id"
            hidden
          >
            <Input value={editingRecord?.id} />
          </Form.Item>
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
            rules={[{ required: !editingRecord, message: '请输入密码' }]}
          >
            <Input.Password 
              placeholder={editingRecord ? '留空则不修改密码' : '请输入'} 
              iconRender={visible => (visible ? <span>👁️</span> : <span>👁️‍🗨️</span>)}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            rules={[{ required: !editingRecord, message: '请输入密码' }]}
          >
            <Input.Password 
              placeholder={editingRecord ? '留空则不修改密码' : '请输入'} 
              iconRender={visible => (visible ? <span>👁️</span> : <span>👁️‍🗨️</span>)}
              autoComplete="new-password"
            />
          </Form.Item>
          
          <Form.Item
            name="state"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择">
              <Select.Option value="1">管理员</Select.Option>
              <Select.Option value="2">组长</Select.Option>
              <Select.Option value="3">运营</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="dept_id"
            label="所属小组"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择">
              {
                departMentList.map((item:any) => {
                  return <Select.Option value={item.id}>{item.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </CardContainer>
  );
};

export default BusinessUser;
