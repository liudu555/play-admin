
import { Tabs ,TabsProps} from 'antd';
import FaceBookTable from '../FaceBookTable';



const data =  [{
    index: 1,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 2,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 3,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',    
    timezone: 'UTC+0',  
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 4,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',        
    timezone: 'UTC+0',  
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 5,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',        
    timezone: 'UTC+0',      
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 6,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',      
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 7,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',    
    timezone: 'UTC+0',    
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 8,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 9,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 10,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',    
    timezone: 'UTC+0',  
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
},{
    index: 11,
    createdAt: '2022-08-10',
    accountId: '1234567890',
    accountName: '广告账户',
    status: '正常',
    currency: 'USD',
    timezone: 'UTC+0',
    balance: '1000',
    consumption: '100',
    recycle: '100',
    roi: '100',
}]
const items: TabsProps['items'] = [
    {
      key: '1',
      label: '广告账户',
      children: <FaceBookTable data={data} bannerType='account' />,
    },
    {
      key: '2',
      label: '广告系列',
      children: <FaceBookTable data={data} bannerType='campaign' />,
    },
    {
      key: '3',
      label: '广告组',
      children: <FaceBookTable data={data} bannerType='adset' />,
    },
    {
      key: '4',
      label: '广告',
      children: <FaceBookTable data={data} bannerType='ad' />,
    },
  ];
const FaceBookTab: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <div className='mt-5'> 
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default FaceBookTab;