import { Form, Modal, Table, Input, Select, message } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GetAllUserList } from "@/apis/user/groupRequest";

interface FormSubProps {
  editingRecord: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleModalOk: () => void;
  handelSubmit: (values: any) => void;
}
interface FormSubRef {
    clearForm: () => void;
}
const FormSub: React.FC<FormSubProps> = forwardRef<FormSubRef, FormSubProps>((props,ref) => {
    const {editingRecord, modalVisible, setModalVisible, handleModalOk, handelSubmit} = props;
    const [form] = Form.useForm();
    //组员列表
    const [groupList, setGroupList] = useState<any[]>([]);
    //组长列表
    const [leaderList, setLeaderList] = useState<any[]>([]);

    //组长列表分页
    const [leaderPageTotal, setLeaderPageTotal] = useState<number>(0);
    const [leaderCurrentPageSize, setLeaderCurrentPageSize] = useState<number>(8);
    //组员列表分页
    const [groupPageTotal, setGroupPageTotal] = useState<number>(0);
    const [groupCurrentPageSize, setGroupCurrentPageSize] = useState<number>(8);
    const [groupSearchParams, setGroupSearchParams] = useState({
      page_size: 8,
      page: 1,
    });
    const [leaderSearchParams, setLeaderSearchParams] = useState({
      page_size: 8,
      page: 1,
    });
    const [selectedUserIds, setSelectedUserIds] = useState<React.Key[]>([]);

    useEffect(() => {
      if(modalVisible) {
        loadGroupList();
        loadLeaderList();
      }
    }, [modalVisible]);
  /**
   * 获取用户列表
   */
  const loadGroupList = async () => {
    const {code,data} = await GetAllUserList({...groupSearchParams, state: '2'}); 
    if(code === 200) {
      setGroupList(data.results);      
      setGroupPageTotal(data.pagination.total_items);
      setGroupCurrentPageSize(data.pagination.current_page_size);
    } else {
      message.error('获取用户列表失败');
    }
  }

  const loadLeaderList = async () => {
    const {code,data} = await GetAllUserList({...leaderSearchParams, state: '1'}); 
    if(code === 200) {
      setLeaderList(data.results);
      setLeaderPageTotal(data.pagination.total_items);
      setLeaderCurrentPageSize(data.pagination.current_page_size);
    } else {
      message.error('获取组长列表失败');
    }
  }
    const submit = async () => {
        const values = await form.validateFields();
        console.log(values);

        // handelSubmit(values);
    }
    useImperativeHandle(ref, () => ({
        clearForm: () => {
            form.resetFields();
            setSelectedUserIds([]);
        }
    }));
    useEffect(() => {
      form.setFieldsValue({ user_ids: selectedUserIds });
    }, [selectedUserIds]);

    useEffect(() => {
      loadGroupList();
    }, [groupSearchParams]);

    useEffect(() => {
      loadLeaderList();
    }, [leaderSearchParams]);

    // 当Select值变化时同步到表格选择
    const handleSelectChange = (value: React.Key[]) => {
      setSelectedUserIds(value);
    };
    return (
    <Modal
      width={800}
      title={editingRecord ? '编辑小组' : '新增小组'}
      open={modalVisible}
      onOk={submit}
      onCancel={() => setModalVisible(false)}
      destroyOnClose

    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="id"
          hidden
        >
          <Input value={editingRecord?.id}/>
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
          <Select
            placeholder="请选择组长"
            style={{ width: '100%' }}
            fieldNames={{ label: 'username', value: 'id' }}
            options={leaderList.map((user: any) => ({
              label: user.username,
              value: user.id,
              username: user.username,
              id: user.id
            }))}
            dropdownRender={(menu: any) => (
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 200px' }}>
                  {menu}
                </div>
                <div style={{ flex: '1', marginLeft: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  <Table
                    dataSource={leaderList}
                    scroll={{ x: 500 }}
                    columns={[
                      {
                        title: '姓名',
                        dataIndex: 'name',
                        key: 'name'
                      },
                      {
                        title: '用户名',
                        dataIndex: 'username',
                        key: 'username'
                      }
                    ]}
                    rowKey="id"
                    pagination={{
                      total: leaderPageTotal,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      pageSize: leaderCurrentPageSize,
                      onChange: (page, pageSize) => {
                        setLeaderSearchParams({ ...leaderSearchParams, page, page_size: pageSize });
                      }
                    }}
                    size="small"
                    rowSelection={{
                      type: 'radio',
                      selectedRowKeys: form.getFieldValue('leader_id') ? [form.getFieldValue('leader_id')] : [],
                      onChange: (selectedRowKeys) => {
                        if (selectedRowKeys.length > 0) {
                          form.setFieldsValue({ leader_id: selectedRowKeys[0] });
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          name="user_ids"
          label="组员"
          rules={[{ required: true, message: '请选择组员' }]}
        >
          <Select
            mode="multiple"
            placeholder="点击选择组员"
            style={{ width: '100%' }}
            onChange={handleSelectChange}
            value={selectedUserIds}
            fieldNames={{ label: 'username', value: 'id' }}
            options={groupList.map((user: any) => ({
              label: user.username,
              value: user.id,
              username: user.username,
              id: user.id
            }))}
            dropdownRender={(menu: any) => (
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 200px' }}>
                  {menu}
                </div>
                <div style={{ flex: '1', marginLeft: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                  <Table
                    scroll={{ x: 500 }}
                    dataSource={groupList}
                    columns={[
                      {
                        title: '姓名',
                        dataIndex: 'name',
                        key: 'name'
                      },
                      {
                        title: '用户名',
                        dataIndex: 'username',
                        key: 'username'
                      }
                    ]}
                    rowKey="id"
                    pagination={{
                      total: groupPageTotal,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      pageSize: groupCurrentPageSize,
                      onChange: (page, pageSize) => {
                        setGroupSearchParams({ ...groupSearchParams, page, page_size: pageSize });
                      }
                    }}
                    size="small"
                    rowSelection={{
                      type: 'checkbox',
                      selectedRowKeys: selectedUserIds,
                      onChange: (selectedRowKeys) => setSelectedUserIds(selectedRowKeys)
                    }}
                  />
                </div>
              </div>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
    )
}
);

export  {
  FormSub,
  FormSubRef
};