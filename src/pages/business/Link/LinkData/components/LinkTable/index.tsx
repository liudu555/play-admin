import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import LinkDetail from '../LinkDetail';


const expandedRowRender = (record: any,index: number,indent: any,expanded: boolean) => {
  
  if(expanded){
    return <LinkDetail recordDetail={record} />
  }else{
    return null;
  }
};


interface LinkTableProps {
  data: any[]; /** 数据 */
  pageTotal: number; /** 总页数 */
  currentPageSize: number; /** 当前页大小 */
  changePageTotal: (page: number, pageSize: number) => void; /** 改变页大小 */
  columns: ProColumns<any>[]; /** 列 */
}


const LinkTable: React.FC<LinkTableProps> = ({ 
  data, 
  pageTotal, 
  currentPageSize, 
  changePageTotal,
  columns
}) => {
  return (
    <ProTable<any>
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.drama_id}
      pagination={{
        showQuickJumper: true,
        pageSize: currentPageSize,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        showSizeChanger: true,
        total: pageTotal,
        onChange: (page, pageSize) => {
          changePageTotal(page, pageSize);
        }
      }}
      expandable={{ 
        expandedRowRender,
        // 确保每行有唯一的key，防止一个展开全部展开的问题
        rowExpandable: (record) => true,
        // 可以添加以下属性来控制展开行为
        expandRowByClick: false,
        // 默认不展开任何行
        defaultExpandAllRows: false,
      }}
      search={false}
      dateFormatter="string"
      options={false}
    />
  );
};

export default LinkTable;