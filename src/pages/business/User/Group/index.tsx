import { ProTable, ProColumns } from '@ant-design/pro-components';
import CardContainer from "@/components/CardContainer";
import { Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface GroupRecord {
  id: number;
  groupName: string;
  description: string;
  memberCount: number;
  status: string;
  createTime: string;
}

const Group: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<GroupRecord | null>(null);
  const [tableData, setTableData] = useState<GroupRecord[]>([]);

  useEffect(() => {
    // 初始化表格数据
    setTableData(data);
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingRecord(null);
    setModalVisible(true);
  };

  const handleEdit = (record: GroupRecord) => {
    form.setFieldsValue(record);
    setEditingRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record: GroupRecord) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除小组 ${record.groupName} 吗？`,
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
          id: tableData.length > 0 ? Math.max(...tableData.map(item => item.id)) + 1 : 1,
          createTime: new Date().toLocaleString(),
          memberCount: 0
        };
        setTableData([...tableData, newRecord]);
        message.success('添加成功');
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
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '成员数量',
      dataIndex: 'memberCount',
      key: 'memberCount',
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

  const data: GroupRecord[] = [
    {
      id: 1,
      groupName: '管理员组',
      description: '系统管理员小组，拥有最高权限',
      memberCount: 3,
      status: '正常',
      createTime: '2023-10-01 08:00',
    },
    {
      id: 2,
      groupName: '运营组',
      description: '负责日常运营和内容管理',
      memberCount: 8,
      status: '正常',
      createTime: '2023-10-02 09:15',
    },
    {
      id: 3,
      groupName: '开发组',
      description: '负责系统开发和维护',
      memberCount: 12,
      status: '正常',
      createTime: '2023-10-03 10:30',
    },
    {
      id: 4,
      groupName: '测试组',
      description: '负责系统测试和质量保证',
      memberCount: 5,
      status: '禁用',
      createTime: '2023-10-04 11:45',
    },
  ];

  return (
    <CardContainer title="小组管理">
      <ProTable<GroupRecord>
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            新增小组
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
        title={editingRecord ? '编辑小组' : '新增小组'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="groupName"
            label="小组名称"
            rules={[{ required: true, message: '请输入小组名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入小组描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入小组描述" />
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

export default Group;
