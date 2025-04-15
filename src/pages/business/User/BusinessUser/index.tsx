import { ProTable } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag } from 'antd';

const BusinessUser: React.FC = () => {
  const columns = [
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
      render: (role: string) => {
        let color = 'blue';
        if (role === '管理员') {
          color = 'red';
        } else if (role === '普通用户') {
          color = 'green';
        }
        return <Tag color={color}>{role}</Tag>;
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
      render: () => (
        <>
          <a>编辑</a>
          <a style={{ marginLeft: 8, color: '#ff4d4f' }}>删除</a>
        </>
      ),
    },
  ];

  const data = [
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
      <ProTable 
        columns={columns}
        dataSource={data}
        rowKey="id"
        search={false}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </CardContainer>
  );
};

export default BusinessUser;
