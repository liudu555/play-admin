import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { GetDepartMentList, PostAddDepartMent } from '@/apis/user/groupRequest';
import { GetUserList } from '@/apis/user/mangerRequest';
interface GroupRecord {
  id: number;
  name: string;
  leader: any;
  users: Array<any>;
}

const Group: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<GroupRecord | null>(null);
  const [departMentList, setDepartMentList] = useState<GroupRecord[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [searchParams, setSearchParams] = useState<{
    page_size: number | undefined; /** 每页条数 */
    page: number | undefined; /** 页码 */
  }>({
    page_size: 10,
    page: 1,
  });
  useEffect(() => {
    // 初始化表格数据
    loadDepartMentList();
    loadUserList();
  }, []);

  /**
   * 获取用户列表
   */
  const loadUserList = async () => {
    const {code,data} = await GetUserList({
      page_size: 1000,
      page: 1,
    });
    if(code === 200) {
      setUserList(data.results);
    } else {
      message.error('获取用户列表失败');
    }
  }

  /**
   * 获取小组列表
   */
  const loadDepartMentList = async () => {
    const {code,data} = await GetDepartMentList();
    if(code === 200) {
      setDepartMentList(data.results);
      setPageTotal(data.pagination.total_items);
      setCurrentPageSize(data.pagination.current_page_size);
    } else {
      message.error('获取小组列表失败');
    }
  }

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };


  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('values',values);
      
      if (values.id) {
      
        console.log('编辑',values);
        
      } else {
        // 新增
        const {code,data} = await PostAddDepartMent({
          name: values.name,
          leader_id: values.leader_id,
          user_ids: values.user_ids,
        })
        if(code === 200) {
          message.success('新增成功');
          loadDepartMentList();
        } else {
          message.error('新增失败');
        }
      }
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns: ProColumns<GroupRecord>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '小组名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '组长',
      dataIndex: 'leader',
      key: 'leader',
      ellipsis: true,
      render: (_,record) => {
        if(record?.leader?.username) {
          return <span>{record?.leader?.username}</span>
        } else {
          return <span>暂无组长</span>
        }
      }
    },
    {
      title: '组员',
      dataIndex: 'users',
      key: 'users',
      render: (_,record) => {
        if(record?.users?.length > 0) {
          return <div className='flex flex-wrap gap-2'> 
            {
              record?.users?.map((item:any) => {
                return <Tag key={item.id} color='blue'>{item.username}</Tag>
              })
            }
          </div>
        } else {
          return <Tag color='blue'>暂无组员</Tag>
        }
      }
    },
  ];


  return (
    <CardContainer title="小组管理">
      <ProTable<GroupRecord>
        columns={columns}
        dataSource={departMentList}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            新增小组
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
        title={editingRecord ? '编辑小组' : '新增小组'}
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
            name="name"
            label="小组名称"
            rules={[{ required: true, message: '请输入小组名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="leader_id"
            label="组长"
            rules={[{ required: true, message: '请选择组长' }]}
          >
            <Select placeholder="请选择">
              {
                userList.map((item:any) => {
                  return <Select.Option value={item.id}>{item.username}</Select.Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="user_ids"
            label="组员"
            rules={[{ required: true, message: '请选择组员' }]}
          >
            <Select 
              mode="multiple"
              placeholder="请选择"
            > 
              {
                userList.map((item:any) => {
                  return <Select.Option value={item.id}>{item.username}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </CardContainer>
  );
};

export default Group;
