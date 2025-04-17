import { ProColumns } from "@ant-design/pro-components";
import  '../FaceBookTable/index.less'
import PaySubComponent from "../PaySub";
import { Button2DrawerLoading, ButtonRoute } from "../Button2DrawerLoading";
import RegisterComponent from "../Register";
import PayCostComponent from "../PayCost";
import { faceBookAvailableSpentAtom, faceBookOrderAmountAtom, faceBookRoiAtom, faceBookSpendAtom } from "@/models/atomFaceBook";
import { useAtomValue } from "jotai";
/**
 * 广告账户基础列
 */
interface BaseAdvertisingItem {
    spend: string; /** 广告账户消耗 */
    order_amount: string; /** 回收金额 */
    roi: string; /** 广告账户ROI */
    resister_people: number; /** 注册人数 */
    resister_cost: string; /** 注册成本 */
    pay_people: number; /** 支付人数 */
    total_pay_rate: string; /** 总支付率 */
    weekly_subscribers_people: number; /** 周订阅人数 */
    month_subscribers_people: number; /** 月订阅人数 */
    year_subscribers_people: number; /** 年订阅人数 */
    subscribers_rate: string; /** 总订阅率 */
    first_day_people: number; /** 首日人数 */
    first_day_pay_rate: string; /** 支付率 */
    per_capita_rate: string; /** 人均支付 */
    pay_cost: string; /** 付费成本 */
}

/**
 * 账户金额
 */
const AvailableSpentSheet = () => {
    const availableSpent = useAtomValue(faceBookAvailableSpentAtom);
    return (
        <div className="flex items-center flex-col">
            <span>账户余额</span>
             <span className="text-xs text-gray-400 color-[#ccc]">总计: ${availableSpent}</span>
        </div>
    )
}

/**
 * 消费金额
 */
const SpendSheet = () => {
    const spend = useAtomValue(faceBookSpendAtom);
    return (
        <div className="flex items-center flex-col">
            <span>消费金额</span>
            <span className="text-xs text-gray-400 color-[#ccc]">总计: ${spend}</span>
        </div>
    )
}

/**
 * 回收金额
 */
const OrderAmountSheet = () => {
    const orderAmount = useAtomValue(faceBookOrderAmountAtom);
    return (
        <div className="flex items-center flex-col">    
            <span>回收金额</span>
            <span className="text-xs text-gray-400 color-[#ccc]">总计: ${orderAmount}</span>
        </div>
    )
}

/**
 * roi
 */
const RoiSheet = () => {
    const roi: any = useAtomValue(faceBookRoiAtom);
    return (
        <div className="flex items-center flex-col">
            <span>ROI</span>
            <span className="text-xs text-gray-400 color-[#ccc]">
                总计: {roi && roi !== '0' && roi !== '' ? parseFloat(roi).toFixed(2) : '0.00'}%
            </span>
        </div>
    )
}


/**
 * 广告账户基础列
 */
const BaseAdvertisingColumns: ProColumns<BaseAdvertisingItem>[] = [
    {
        title: () => {
            return (
                <SpendSheet />
            )
        },
        dataIndex: 'spend',
        align: 'center',
        width: 130,
        sorter: (a: any, b: any) => {
            return a.spend - b.spend;
        },
    },
    {
        title: () => {
            return (
                <OrderAmountSheet />
            )
        },
        dataIndex: 'order_amount',
        align: 'center',
        width: 130,
        sorter: (a: any, b: any) => {
            return a.order_amount - b.order_amount;
        },
    },
    {
        title: () => {
            return (
                <RoiSheet />
            )
        },
        dataIndex: 'roi',
        align: 'center',
        width: 130,
        sorter: (a: any, b: any) => {
            return a.roi - b.roi;
        },
    },
    {
        title: '注册数据',
        render: (_: any,record: any,index: number) => {   
            const {resister_people, resister_cost} = record
            return (
                <RegisterComponent resister_people={resister_people} resister_cost={resister_cost} index={index} />
            )
        },
        align: 'center',
        className: 'replacecolor',
        width: 180
    },{
        title: '充值订阅',
        render: (_: any,record: any,index: number) => {    
            const {pay_people, total_pay_rate, weekly_subscribers_people, month_subscribers_people, year_subscribers_people, subscribers_rate} = record
            return (
                <PaySubComponent
                    index={index}
                    pay_people={pay_people}
                    total_pay_rate={total_pay_rate}
                    weekly_subscribers_people={weekly_subscribers_people}
                    month_subscribers_people={month_subscribers_people}
                    year_subscribers_people={year_subscribers_people}
                    subscribers_rate={subscribers_rate}
                />
            )
        },
        align: 'center',
        width: 200,
        className: 'replacecolor',
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>首日付费</span>
                </div>
            )
        },
        render: (_,record: any,index: number) => {   

                const {first_day_people, first_day_pay_rate, per_capita_rate, pay_cost} = record
            return (
                <PayCostComponent
                    index={index}
                    first_day_people={first_day_people}
                    first_day_pay_rate={first_day_pay_rate}
                    per_capita_rate={per_capita_rate}
                    pay_cost={pay_cost}
                />
            )

        },
        align: 'center',
        className: 'replacecolor',
        width: 180
    },
]
/** 广告账户 */
interface AdvertisingAccountItem extends BaseAdvertisingItem{
    id: number; /** 主键 */
    data_date: string; /** 数据日期 */
    obj_id: string; /** 广告账户ID */
    name: string; /** 广告账户名称 */
    status: string; /** 广告账户状态 */
    currency: string; /** 广告账户货币 */
    timezone_name: string; /** 时区 */
    type: string; /** 广告账户类型 */
    available_spent: string; /** 账户余额 */
    addtime: string; /** 添加时间 */
    updatetime: string; /** 更新时间 */
    account: any; 
    campaign: any;
    adset: any;
    addata: any
}

/**
 * 广告账户列表
 */
const advertisingAccountColumns: ProColumns<BaseAdvertisingItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        align: 'center',
        fixed: 'left',
        width: 50
    },
    {
      title: '日期',
      dataIndex: 'data_date',
      valueType: 'date',
      align: 'center',
      width: 100
    },
    {
        title: '广告账户ID',
        dataIndex: 'obj_id',
        align: 'center',
        width: 100
    },
    {
        title: '账户名称',
        dataIndex: 'name',
        align: 'center',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100
    },
    {
        title: '货币',
        dataIndex: 'currency',
        align: 'center',
        width: 100
    },
    {
        title: '时区',
        dataIndex: 'timezone_name',
        align: 'center',
        width: 100
    },
    {
        title: () => {
            return (
              <AvailableSpentSheet />
            )
        },
        dataIndex: 'available_spent',
        align: 'center',
        width: 130,
        sorter: true,
    },
    ...BaseAdvertisingColumns,
    {
        title: '操作',
        width: 120,
        key: 'option',
        valueType: 'option',
        align: 'center',
        fixed: 'right',
        render: (_, record) => {
            return (
              <Button2DrawerLoading record={record} />
            )
        }
    },
    
];

/**
 * 广告系列
 */
interface CampaignItem extends BaseAdvertisingItem{
    id: number; /** 广告系列ID */
    data_date: string; /** 数据日期 */
    name: string; /** 广告系列名称 */
    obj_id: string; /** 广告系列ID */
    status: string; /** 广告系列状态 */
    currency: string; /** 广告系列货币 */
    type: string; /** 广告系列类型 */
}
/**
 * 广告系列表
 */
const campaignColumns: ProColumns<BaseAdvertisingItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        align: 'center',
        fixed: 'left',
        width: 50
    },
    {
        title: '广告系列ID',
        dataIndex: 'obj_id',
        align: 'center',
        width: 100
    },
    {
        title: '日期',
        dataIndex: 'data_date',
        valueType: 'date',
        align: 'center',
        width: 100
    },
    {
        title: '系列名称',
        dataIndex: 'name',
        align: 'center',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100
    },
    ...BaseAdvertisingColumns,
    {
        title: '操作',
        width: 120,
        key: 'option',
        valueType: 'option',
        align: 'center',
        fixed: 'right',
        render: (_, record) => {
            return (
                <ButtonRoute record={record} buttonName='查看广告组' />
            )
        }
    }
]

/**
 * 广告组
 */
interface AdsetItem extends BaseAdvertisingItem{
    data_date: string; /** 数据日期 */
    id: number; /** 广告组ID */
    name: string; /** 广告组名称 */
    status: string; /** 状态 */
}

/**
 * 广告组表
 */
const adsetItemColumns: ProColumns<BaseAdvertisingItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        align: 'center',
        fixed: 'left',
        width: 50
    },
    {
        title: '广告组ID',
        dataIndex: 'obj_id',
        align: 'center',
        width: 100
    },
    {   
        title: '日期',
        dataIndex: 'data_date',
        valueType: 'date',
        align: 'center',
        width: 100
    },
    {
        title: '广告组名称',
        dataIndex: 'name',
        align: 'center',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100
    },
    ...BaseAdvertisingColumns,
    {
        title: '操作',
        width: 120,
        key: 'option',
        valueType: 'option',
        align: 'center',
        fixed: 'right',
        render: (_, record) => {
            return (
                <ButtonRoute record={record} buttonName='查看广告' />
            )
        }
    }
]

/**
 * 广告
 */
interface AdItem extends BaseAdvertisingItem{
    data_date: string; /** 数据日期 */
    id: number; /** 广告ID */
    name: string; /** 广告名称 */
    status: string; /** 状态 */
}

/**
 * 广告表
 */
const adColumns: ProColumns<BaseAdvertisingItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        align: 'center',
        fixed: 'left',
        width: 50
    },
    {
        title: '广告ID',
        dataIndex: 'obj_id',
        align: 'center',
        width: 100
    },
    {
        title: '日期',      
        dataIndex: 'data_date',
        valueType: 'date',
        align: 'center',
        width: 100
    },
    {
        title: '广告名称',
        dataIndex: 'name',
        align: 'center',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100
    },
    ...BaseAdvertisingColumns,
]   
export {
    advertisingAccountColumns,
    campaignColumns,
    adsetItemColumns,
    adColumns
}  