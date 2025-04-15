import { Tabs ,TabsProps} from 'antd';
import FaceBookTable from '../FaceBookTable';
import { advertisingAccountColumns, campaignColumns } from './columnType';

const FaceBookTab: React.FC<{
    changeCurrentTab: (tab: string) => void;    
    pageTotal: number;
    currentPageSize: number;
    changePageTotal: (page: number,pageSize: number) => void;
    advertisingAccountList: any[];
    campaignList: any[];
    adsetList: any[];
    adList: any[];
    changeSearchParams: (params: any) => void;
}> = ({changeCurrentTab,advertisingAccountList,
    campaignList,adsetList,adList,changeSearchParams,pageTotal,changePageTotal, currentPageSize}) => {

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '广告账户',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={advertisingAccountList} 
            columns={advertisingAccountColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
        {
          key: '2', 
          label: '广告系列',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={campaignList} 
            columns={campaignColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
        {
          key: '3',
          label: '广告组',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={adsetList} 
            columns={campaignColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
        {
          key: '4',
          label: '广告',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={adList} 
            columns={campaignColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
    ];

    const onChange = (key: string) =>  {
        console.log('key', key);
        changeCurrentTab(key);
    }

    return (
        <div className='mt-5'> 
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default FaceBookTab;