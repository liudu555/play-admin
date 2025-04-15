import { Button, DatePicker, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const LinkSearch: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <DatePicker.RangePicker 
        placeholder={['开始日期', '结束日期']}
      />
      <Button type="primary" icon={<SearchOutlined />}>
        应用时间筛选
      </Button>
      <Button>
        清除时间
      </Button>
    </div>
  );
};

export default LinkSearch;
