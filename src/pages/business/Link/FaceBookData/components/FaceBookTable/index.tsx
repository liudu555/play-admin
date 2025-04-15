import { ProColumns, ProTable } from "@ant-design/pro-components";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";


interface FaceBookTableProps {
    data: any[];
    bannerType: string;
}

interface TableListItem {
    index: number;
    createdAt: string;
    accountId: string;
    accountName: string;
    status: string;
    currency: string;
    timezone: string;
    balance: string;
    consumption: string;
    recycle: string;
    roi: string;
}

const columnData: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      initialValue: 'TradeCode 1',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'date',
      initialValue: '2022-08-10',
    },
    {
        title: '广告账户ID',
        dataIndex: 'accountId',
    },
    {
        title: '账户名称',
        dataIndex: 'accountName',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '货币',
        dataIndex: 'currency',
    },
    {
        title: '时区',
        dataIndex: 'timezone',
    },
    {
        title: '账户余额',
        dataIndex: 'balance',
    },
    {
        title: '消费金额',
        dataIndex: 'consumption',
    },
    {
        title: '回收金额',
        dataIndex: 'recycle',
    },
    {
        title: 'ROI',
        dataIndex: 'roi',
    },
  
];

const FaceBookTable: React.FC<FaceBookTableProps> = ({  data, bannerType }) => {
    useEffect(() => {
        console.log(bannerType);
    }, [bannerType]);
    return (
        <div>
            <ProTable<TableListItem>
             columns={columnData}
             dataSource={data}
             rowKey="id"
             search={false}
             toolBarRender={false}
             pagination={{
                pageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                showSizeChanger: true,
                showQuickJumper: true,
             }}
             />
        </div>
    )
}

export default FaceBookTable;