// const LinkTable: React.FC = () => {
//   return <div>LinkTable</div>;
// };

// export default LinkTable;


import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    initialValue: 'TradeCode 1',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: '2022-08-10',
    align: 'center',
    width: 180
  },
  {
      title: '广告账户ID',
      dataIndex: 'accountId',
      align: 'center',
      width: 200
  },
  {
      title: '账户名称',
      dataIndex: 'accountName',
      align: 'center',
      width: 180
  },
  {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 180
  },
  {
      title: '货币',
      dataIndex: 'currency',
      align: 'center',
      width: 180
  },
  {
      title: '时区',
      dataIndex: 'timezone',
      align: 'center',
      width: 180
  },
  {
      title: () => {
          return (
              <div className="flex items-center flex-col">
                  <span>账户余额</span>
                  <span className="text-xs text-gray-400 color-[#ccc]">总计: ${1884123.66}</span>
              </div>
          )
      },
      dataIndex: 'balance',
      align: 'center',
      width: 200
  },
  {
      title: () => {
          return (
              <div className="flex items-center flex-col">
                  <span>消费金额</span>
                  <span className="text-xs text-gray-400 color-[#ccc]">总计: ${1884123.66}</span>
              </div>
          )
      },
      dataIndex: 'consumption',
      align: 'center',
      width: 200
  },
  {
      title: () => {
          return (
              <div className="flex items-center flex-col">
                  <span>回收金额</span>
                  <span className="text-xs text-gray-400 color-[#ccc]">总计: ${0.00}</span>
              </div>
          )
      },
      dataIndex: 'recycle',
      align: 'center',
      width: 200
  },
  {
      title: () => {
          return (
              <div className="flex items-center flex-col">
                  <span>ROI</span>
                  <span className="text-xs text-gray-400 color-[#ccc]">总计: 0.00%</span>
              </div>
          )
      },
      dataIndex: 'roi',
      align: 'center',
      width: 200
  },
  {
    title: () => {
        return (
            <div className="flex items-center flex-col">
                <span>注册数据</span>
                <div className="flex gap-8 pt-5">
                    <div className="flex flex-col items-center justify-between">
                        <span>注册人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>注册成本</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                    </div>
                </div>
            </div>
        )
    },
    render: (item) => {   
        return (
            <div className="flex w-full justify-center gap-10">
                <span>0</span>
                <span>0.00</span>
            </div>
        )
    },
    dataIndex: 'action',
    align: 'center',
    className: 'replacecolor',
    width: 250
},
  {
    title: () => {
        return (
            <div className="flex items-center flex-col">
                <span>充值订阅</span>
                <div className="flex gap-8 pt-5">
                    <div className="flex flex-col items-center justify-between">
                        <span>支付人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>总支付率</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>周订阅人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>月订阅人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 100</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>年订阅人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 100</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>总订阅率</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 100%</span>
                    </div>
                </div>
            </div>
        )
    },
    dataIndex: 'action',
    align: 'center',
    width: 750
},
  {
    title: () => {
        return (
            <div className="flex items-center flex-col">
                <span>每日付费</span>
                <div className="flex gap-8 pt-5">
                    <div className="flex flex-col items-center justify-between">
                        <span>注册人数</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>注册成本</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>注册成本</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                        <span>注册成本</span>
                        <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                    </div>
                </div>
            </div>
        )
    },
    render: (item) => {   
        return (
            <div className="flex w-full justify-center gap-10">
                <span>0</span>
                <span>0.00</span>
            </div>
        )
    },
    dataIndex: 'action',
    align: 'center',
    className: 'replacecolor',
    width: 500
},

  {
    title: '操作',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [<a key="link">链路</a>],
  },
];

const LinkTable: React.FC = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        console.log(selectedRowKeys, selectedRows);
        return (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            <span>{`容器数量: ${selectedRows.reduce(
              (pre, item) => pre + item.containers,
              0,
            )} 个`}</span>
            <span>{`调用量: ${selectedRows.reduce(
              (pre, item) => pre + item.callNumber,
              0,
            )} 次`}</span>
          </Space>
        );
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      dataSource={tableListDataSource}
      scroll={{ x: 1800 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 5,
      }}
      rowKey="key"
      headerTitle="批量操作"
      toolBarRender={() => [<Button key="show">查看日志</Button>]}
    />
  );
};

export default LinkTable;
