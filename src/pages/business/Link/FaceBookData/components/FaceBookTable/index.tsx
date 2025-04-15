import { ProColumns, ProTable } from "@ant-design/pro-components";
interface FaceBookTableProps {
    data: any[];
    pageTotal: number;
    currentPageSize: number;
    changePageTotal: (page: number,pageSize: number) => void;
    columns: ProColumns<any>[];
}


const FaceBookTable: React.FC<FaceBookTableProps> = ({  data, columns,pageTotal,currentPageSize,changePageTotal }) => {
    return (
            <ProTable<any>
             scroll={{ x: 1800 }}
             columns={columns}
             bordered
             dataSource={data}
             rowKey="id"
             search={false}
             toolBarRender={false}
             pagination={{
                pageSize: currentPageSize,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                showSizeChanger: true,
                showQuickJumper: true,
                total: pageTotal,
                onChange: (page, pageSize) => {
                    changePageTotal(page, pageSize);
                }
             }}
            />
    )
}

export default FaceBookTable;