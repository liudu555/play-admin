import { Button, DatePicker, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {  forwardRef, useImperativeHandle, useState } from 'react';
import dayjs from 'dayjs';

/**
 * 广告账户搜索组件
 * @param param0 
 * @returns 
 */
const FaceBookSearch: React.FC<{
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
      <Input 
        allowClear
        placeholder="请输入ID或名称搜索"
        className="max-w-[200px]"
        value={searchParams.search}
        onChange={(e) => setSearchParams({
          ...searchParams,
          search: e.target.value,
        })}
      />
      <DatePicker.RangePicker 
        value={searchParams.start_time && searchParams.end_time ? [dayjs(searchParams.start_time), dayjs(searchParams.end_time)] : undefined}
        placeholder={['开始日期', '结束日期']}
        onChange={(dates) => setSearchParams({
          ...searchParams,
          start_time: dates?.[0]?.format('YYYY-MM-DD'),
          end_time: dates?.[1]?.format('YYYY-MM-DD'),
        })}
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={() => changeSearchParams({
        ...searchParams,
        search: searchParams.search,
        start_time: searchParams.start_time,
        end_time: searchParams.end_time,
      })}>
        应用
      </Button>
      <Button onClick={() => {
        setSearchParams({});
        changeSearchParams(undefined);
      }}>
        重置
      </Button>
    </div>
  );
});

export default FaceBookSearch;
