import { Button, DatePicker, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { forwardRef, useImperativeHandle, useState } from 'react';  
import dayjs from 'dayjs';
const LinkSearch: React.FC<{
  changeSearchParams: (params: any) => void;
}> = forwardRef(({ changeSearchParams }, ref) => {
  const [searchParams, setSearchParams] = useState<any>({});
  useImperativeHandle(ref, () => ({
    clearSearchParams: () => {
      setSearchParams({});
      changeSearchParams(undefined);
    },
  }));
  return (
    <div className="flex items-center gap-4">
      <DatePicker.RangePicker 
        placeholder={['开始日期', '结束日期']}
        value={searchParams.start_time && searchParams.end_time ? [dayjs(searchParams.start_time), dayjs(searchParams.end_time)] : undefined}
        onChange={(dates) => setSearchParams({
          ...searchParams,
          start_time: dates?.[0]?.format('YYYY-MM-DD'),
          end_time: dates?.[1]?.format('YYYY-MM-DD'),
        })}
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={() => changeSearchParams({
        ...searchParams,
        start_time: searchParams.start_time,
        end_time: searchParams.end_time,
      })}>
        应用时间筛选
      </Button>
      <Button onClick={() => {
        setSearchParams({});
        changeSearchParams(undefined);
      }}>
        清除时间
      </Button>
    </div>
  );
});

export default LinkSearch;
