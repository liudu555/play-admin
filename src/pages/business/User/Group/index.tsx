import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button,message, Table } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { GetDepartMentList, PostAddDepartMent, GetAllUserList, PutEditDepartMent } from '@/apis/user/groupRequest';
import { FormSub, FormSubRef } from './components/FormSub';
interface GroupRecord {
  id: number;
  name: string;
  leader: any;
  users: Array<any>;
}

const Group: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<GroupRecord | null>(null);
  const [departMentList, setDepartMentList] = useState<GroupRecord[]>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [searchParams, setSearchParams] = useState<{
    page_size: number | undefined; /** 每页条数 */
    page: number | undefined; /** 页码 */
  }>({
    page_size: 10,
    page: 1,
  });



  const formRef = useRef<FormSubRef>(null);
  
  useEffect(() => {
    // 初始化表格数据
    loadDepartMentList();
  }, []);

 

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
  /**
   * 新增
   */
  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
  };
  /**
   * 编辑
   */
  const handleEdit = (record: GroupRecord) => {    
    setEditingRecord(record);
    setModalVisible(true);
  }

  /**
   * 提交
   */
  const handleSubmit = async (values: any) => {
    try {
      if (values.id) {
        console.log('编辑',values);
        const {code,data} = await PutEditDepartMent({
          id: values.id,
          name: values.name,
          leader_id: values.leader_id,
          user_ids: values.user_ids,
        })
        if(code === 200) {
          message.success('编辑成功');
          loadDepartMentList();
          formRef.current?.clearForm();
        } else {
          message.error('编辑失败');
        }
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
          formRef.current?.clearForm();
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
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_,record) => {
        return <Button type='link' onClick={() => handleEdit(record)}>编辑</Button>
      },
      width: 100,
      align: 'center',
    }
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
      <FormSub
        ref={formRef}
        editingRecord={editingRecord}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handelSubmit={handleSubmit}
      />
    </CardContainer>
  );
};

export default Group;
