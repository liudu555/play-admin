import { Tabs ,TabsProps} from "antd";
import LinkCard from "../LinkCard";
import LinkTable from "../LinkTable";
import { useEffect } from "react";
import { linkReportColumns } from "../LinkColumn";
interface LinkTabsProps {
    linkDataList: any[];
    currentPageSize: number;
    pageTotal: number;
    changeSearchParams: (params: any) => void;
    changePageTotal: (page: number, pageSize: number) => void;
}

const LinkTabs: React.FC<LinkTabsProps> = ({ 
    linkDataList,
    currentPageSize,
    pageTotal, 
    changeSearchParams,
    changePageTotal,
}) => {
    useEffect(() => {
        console.log('linkDataList', linkDataList);
        
    }, [linkDataList]);
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '投放链接数据',
            children: <div>
                    <LinkCard />
                <LinkTable 
                    data={linkDataList}
                    pageTotal={pageTotal}
                    currentPageSize={currentPageSize}
                    changePageTotal={changePageTotal}
                    columns={linkReportColumns}
                />
            </div>,
        },
        {
            key: '2',
            label: '投放剧名数据',
            children: <div>
                <LinkCard />
                <LinkTable 
                    data={linkDataList}
                    pageTotal={pageTotal}
                    currentPageSize={currentPageSize}
                    changePageTotal={changePageTotal}
                    columns={linkReportColumns}
                />
            </div>,
        },
    ];
    return (
        <div>
            <Tabs items={items} />
        </div>
    )
}
export default LinkTabs;