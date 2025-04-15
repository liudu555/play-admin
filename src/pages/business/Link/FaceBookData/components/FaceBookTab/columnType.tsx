import { ProColumns } from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { useState } from "react";

/**
 * 按钮2抽屉loading
 */ 
const Button2DrawerLoading = ({record}: {record: any}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(record);
    return (
        <div>
            <Button type="primary" size="small" onClick={() => {
                setShowDrawer(true);
                setCurrentRecord(record);
            }}>
                分配用户
            </Button>    
            <Drawer title="分配用户" open={showDrawer} onClose={() => {
                setShowDrawer(false);
            }}
            placement={'right'}
            width={500}
            >
                <div>
                    <p>{currentRecord.name}</p>
                </div>
            </Drawer>   
        </div>
    )
}

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
const advertisingAccountColumns: ProColumns<AdvertisingAccountItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 80
    },
    {
      title: '日期',
      dataIndex: 'data_date',
      valueType: 'date',
      align: 'center',
      width: 120
    },
    {
        title: '广告账户ID',
        dataIndex: 'obj_id',
        align: 'center',
        width: 120
    },
    {
        title: '账户名称',
        dataIndex: 'name',
        align: 'center',
        width: 120
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 120
    },
    {
        title: '货币',
        dataIndex: 'currency',
        align: 'center',
        width: 120
    },
    {
        title: '时区',
        dataIndex: 'timezone_name',
        align: 'center',
        width: 120
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>账户余额</span>
                    <span className="text-xs text-gray-400 color-[#ccc]">总计: ${1884123.66}</span>
                </div>
            )
        },
        dataIndex: 'available_spent',
        align: 'center',
        width: 180
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>消费金额</span>
                    <span className="text-xs text-gray-400 color-[#ccc]">总计: ${1884123.66}</span>
                </div>
            )
        },
        dataIndex: 'spend',
        align: 'center',
        width: 180
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>回收金额</span>
                    <span className="text-xs text-gray-400 color-[#ccc]">总计: ${0.00}</span>
                </div>
            )
        },
        dataIndex: 'order_amount',
        align: 'center',
        width: 180
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>ROI</span>
                    <span className="text-xs text-gray-400 color-[#ccc]">总计: 0.00%</span>
                </div>
            )
        },
        dataIndex: 'roi',
        align: 'center',
        width: 180
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>注册数据</span>
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册成本</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                        </div>
                    </div>
                </div>
            )
        },
        render: ({resister_people, resister_cost}: any) => {   
            return (
                <div className="flex items-center flex-col">
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{resister_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{resister_cost || '0.00'}</span>
                        </div>
                    </div>
                </div>
            )
        },
        align: 'center',
        className: 'replacecolor',
        width: 200
    },{
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>充值订阅</span>
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>支付人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>总支付率</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>周订阅人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>月订阅人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 100</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>年订阅人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 100</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>总订阅率</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 100%</span>
                        </div>
                    </div>
                </div>
            )
        },
        render: ({pay_people, 
                total_pay_rate,
                weekly_subscribers_people,
                month_subscribers_people, 
                year_subscribers_people,
                subscribers_rate}: any) => {   
            return (
                
                <div className="flex items-center flex-col">
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{pay_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{total_pay_rate + '%' }</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{weekly_subscribers_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{month_subscribers_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{year_subscribers_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{subscribers_rate + '%'}</span>
                        </div>
                    </div>
                </div>
            )
        },
        align: 'center',
        width: 650
    },
    {
        title: () => {
            return (
                <div className="flex items-center flex-col">
                    <span>每日付费</span>
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册人数</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: 0</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册成本</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册成本</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>注册成本</span>
                            <span className="text-xs text-gray-400 color-[#ccc]">总计: $0.00</span>
                        </div>
                    </div>
                </div>
            )
        },
        render: ({first_day_people, first_day_pay_rate, per_capita_rate, pay_cost}: any) => {   
            return (
                <div className="flex items-center flex-col">
                    <div className="flex gap-8 pt-5">
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{first_day_people}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{first_day_pay_rate}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{per_capita_rate}</span>
                        </div>
                        <div className="flex flex-col items-center justify-between w-[80px]">
                            <span>{pay_cost}</span>
                        </div>
                    </div>
                </div>
            )

        },
        align: 'center',
        className: 'replacecolor',
        width: 500
    },
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

interface CampaignItem {
    id: number; /** 广告系列ID */
    name: string; /** 广告系列名称 */
    obj_id: string; /** 广告系列ID */
    status: string; /** 广告系列状态 */
    currency: string; /** 广告系列货币 */
    type: string; /** 广告系列类型 */

}

const campaignColumns: ProColumns<CampaignItem>[] = [

]


export {
    advertisingAccountColumns,
    campaignColumns
}  