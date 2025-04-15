import { ProCard } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { baseMock } from './baseMock';
import './index.less';
const BaseItem: React.FC<{item: any}> = ({item}) => {
    return (
       <div className='base-item'>
        <div className={`base-content`} style={{borderLeft: `5px solid ${item.themeColor} `}}>
        <div className='base-item-title text-left'>{item.name}</div>
        <div className='item-list'>
            {
                item.list.map((item: any) => (
                    <div className='item-list-item bg-blue-50'>
                        <div className='item-list-item-title'>{item.name}</div>
                        <div className='item-list-item-value font-bold pt-1'>{item.value}</div>
                    </div>
                ))
            }
        </div>
        </div>
       </div>
    )
}

const FaceBookBase: React.FC = () => {

    const [baseData, setBaseData] = useState<any[]>([]);
    const loadBaseData = async () => {
        const res = await baseMock();
        setBaseData(res);
    }
    useEffect(() => {
        loadBaseData();
    }, [])
  return (
    <div className='flex mt-10 gap-[10px]'>
        {
            baseData.map((item) => (
                <BaseItem key={item.id} item={item} />
            ))
        }
    </div>
  );
};

export default FaceBookBase;
