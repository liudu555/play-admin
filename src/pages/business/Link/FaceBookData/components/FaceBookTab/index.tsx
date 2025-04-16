import { Tabs ,TabsProps} from 'antd';
import FaceBookTable from '../FaceBookTable';
import { advertisingAccountColumns, campaignColumns, adsetItemColumns, adColumns } from '../FaceBookColumn';
import { useEffect, useState } from 'react';
import AdvertisingType from '../../enum';
import { useAtom } from 'jotai';
import { faceBookConfigQueryAtom } from '@/models/atomFaceBook';
interface FaceBookTabProps {
    changeCurrentTab: (tab: string,queryType: string) => void; /** 切换tab */    
    pageTotal: number; /** 总页数 */
    currentPageSize: number; /** 当前页大小 */
    changePageTotal: (page: number,pageSize: number) => void; /** 改变页大小 */
    advertisingAccountList: any[]; /** 广告账户列表 */
    campaignList: any[]; /** 广告系列列表 */
    adsetList: any[]; /** 广告组列表 */
    adList: any[]; /** 广告列表 */
    changeSearchParams: (params: any) => void; /** 改变搜索参数 */
}


const FaceBookTab: React.FC<FaceBookTabProps> = ({
    changeCurrentTab,
    advertisingAccountList,
    campaignList,
    adsetList,
    adList,
    pageTotal,
    changePageTotal,
    currentPageSize,
    changeSearchParams
}) => {
    const [faceBookConfigQuery] = useAtom(faceBookConfigQueryAtom);
    useEffect(() => {
        console.log('faceBookConfigQuery', faceBookConfigQuery);
        if(faceBookConfigQuery) {
            routeTabQuery(faceBookConfigQuery);
        }
    }, [faceBookConfigQuery]);
    /** 默认广告账户tab */
    const [currentTab, setCurrentTab] = useState(AdvertisingType.ACCOUNT);
     /** tab跳转逻辑 */
    const routeTabQuery = (record: any) => {
        console.log('record', record);
        //广告账户获取系列
        if(currentTab === AdvertisingType.ACCOUNT) {
            changeSearchParams({
                account_id: record.account
            });
            setCurrentTab(AdvertisingType.CAMPAIGN);
            changeCurrentTab(AdvertisingType.CAMPAIGN,'route');
        }
        //广告系列获取广告组
        if(currentTab === AdvertisingType.CAMPAIGN) {
            changeSearchParams({
                campaign_id: record.campaign
            });
            setCurrentTab(AdvertisingType.ADSET);
            changeCurrentTab(AdvertisingType.ADSET,'route');
        }
        //广告组获取广告
        if(currentTab === AdvertisingType.ADSET) {
            changeSearchParams({
                adset_id: record.adset
            });
            setCurrentTab(AdvertisingType.AD);
            changeCurrentTab(AdvertisingType.AD,'route');
        }
    }

    const items: TabsProps['items'] = [
        {
          key: AdvertisingType.ACCOUNT,
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
          key: AdvertisingType.CAMPAIGN, 
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
          key: AdvertisingType.ADSET,
          label: '广告组',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={adsetList} 
            columns={adsetItemColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
        {
          key: AdvertisingType.AD,
          label: '广告',
          children: <FaceBookTable 
            currentPageSize={currentPageSize}
            data={adList} 
            columns={adColumns}
            pageTotal={pageTotal}
            changePageTotal={changePageTotal}
          />,
        },
    ];

    /**
     * 默认切换tab
     * @param key 
     */
    const onChange = (key: string) =>  {
        changeCurrentTab(key,'common');
        setCurrentTab(key);
    }

    return (
        <div className='mt-5'> 
            <Tabs activeKey={currentTab} items={items} onChange={onChange} />
        </div>
    )
}

export default FaceBookTab;