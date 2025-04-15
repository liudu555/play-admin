import { Button, DatePicker, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const FaceBookSearch: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Input 
        placeholder="请输入ID或名称搜索"
        className="max-w-[200px]"
      />
      <DatePicker.RangePicker 
        placeholder={['开始日期', '结束日期']}
      />
      <Button type="primary" icon={<SearchOutlined />}>
        应用
      </Button>
      <Button>
        重置
      </Button>
    </div>
  );
};

export default FaceBookSearch;
