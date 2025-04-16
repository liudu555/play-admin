import { faceBookConfigQueryAtom } from "@/models/atomFaceBook";
import { useState } from "react";
import { useAtom } from "jotai";
import { Button, Card, Drawer, Select, Space, Tag, Typography } from "antd";


const DrawerContent = ({record}: {record: any}) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    
    const handleChange = (value: string) => {
        if (value && !selectedUsers.includes(value)) {
            setSelectedUsers([...selectedUsers, value]);
        }
    };
    
    const handleRemove = (user: string) => {
        setSelectedUsers(selectedUsers.filter(item => item !== user));
    };
    
    return (
        <div>
            <Card
                className="mb-4"
                style={{ backgroundColor: '#f0f7ff' }}
                bordered={false}
            >
                <Typography.Title level={4}>分配用户到广告账户</Typography.Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <Typography.Text type="primary" strong>当前账户:</Typography.Text>
                        <Typography.Text style={{ marginLeft: 8 }}>
                            {record.name || 'Be-hzjz-填单-dj02'}
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text type="primary" strong>账户ID:</Typography.Text>
                        <Typography.Text style={{ marginLeft: 8 }}>
                            {record.obj_id || 'act_6257821602622223'}
                        </Typography.Text>
                    </div>
                </Space>
            </Card>
            
            <div className="mb-4">
                <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
                    分配用户
                </Typography.Text>
                <Select
                    placeholder="请选择用户..."
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    value=""
                >
                    <Select.Option value="user1">用户1</Select.Option>
                    <Select.Option value="user2">用户2</Select.Option>
                    <Select.Option value="user3">用户3</Select.Option>
                </Select>
                <Typography.Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
                    选择结果将在下方显示，点击框中的"x"可移除
                </Typography.Text>
                
                {selectedUsers.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                        {selectedUsers.map(user => (
                            <Tag 
                                key={user} 
                                closable 
                                onClose={() => handleRemove(user)}
                                style={{ marginBottom: 8 }}
                            >
                                {user}
                            </Tag>
                        ))}
                    </div>
                )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Space>
                    <Button>取消</Button>
                    <Button type="primary">保存</Button>
                </Space>
            </div>
        </div>
    );
};
/**
 * 按钮2抽屉loading
 */ 
const Button2DrawerLoading = ({record}: {record: any}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(record);
    const [faceBookConfigQuery, setFaceBookConfigQuery] = useAtom(faceBookConfigQueryAtom);
    return (
        <div className="flex flex-col gap-2">
            <Button type="primary" size="small" onClick={() => {
                setShowDrawer(true);
                setCurrentRecord(record);
            }}>
                分配用户
            </Button>    
            <Button type="primary" size="small" onClick={() => {
                setFaceBookConfigQuery(record);
            }}>
                查看广告系列
            </Button>    
            <Drawer title="分配用户" open={showDrawer} onClose={() => {
                setShowDrawer(false);
            }}
            placement={'right'}
            width={500}
            >
               <DrawerContent record={currentRecord} />
            </Drawer>   
        </div>
    )
}

/**
 * 按钮路由
 */
const ButtonRoute = ({record,buttonName}: {record: any,buttonName: string}) => {
    const [faceBookConfigQuery, setFaceBookConfigQuery] = useAtom(faceBookConfigQueryAtom);
    return (
        <div>
            <Button type="primary" size="small" onClick={() => {
                setFaceBookConfigQuery(record);
            }}>
                {buttonName}
            </Button>
        </div>
    )
}

export {
    Button2DrawerLoading,
    ButtonRoute
}