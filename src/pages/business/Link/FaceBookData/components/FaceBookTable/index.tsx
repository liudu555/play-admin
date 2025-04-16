import { ProColumns, ProTable } from "@ant-design/pro-components";
interface FaceBookTableProps {
    data: any[]; /** 数据 */
    pageTotal: number; /** 总页数 */
    currentPageSize: number; /** 当前页大小 */
    changePageTotal: (page: number,pageSize: number) => void; /** 改变页大小 */
    columns: ProColumns<any>[]; /** 列 */
}


const FaceBookTable: React.FC<FaceBookTableProps> = ({  data, 
    columns,
    pageTotal,
    currentPageSize,
    changePageTotal, 
}) => {
    return (
            <ProTable<any>
             scroll={{ x: 1300 }}
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