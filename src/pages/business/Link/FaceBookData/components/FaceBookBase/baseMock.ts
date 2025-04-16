export const baseMock = async (summaryData: any) => {
    console.log('summaryData', summaryData);
    return [
        {
            id: 1,
            name: '基础数据',
            themeColor: '#ff9a9e',
            list: [
            {
                id: 1,
                name: '总余额',
                value: summaryData?.basic?.available_spent ? Number(summaryData.basic.available_spent).toFixed(2) : '0.00',
            },
            {
                id: 2,
                name: '总消耗',
                value: summaryData?.basic?.spend ? Number(summaryData.basic.spend).toFixed(2) : '0.00',
            },
            {
                id: 3,
                name: '总回收',
                value: summaryData?.basic?.order_amount ? Number(summaryData.basic.order_amount).toFixed(2) : '0.00',
            },
            {
                id: 4,
                name: '总ROI',
                value: summaryData?.basic?.roi ? Number(summaryData.basic.roi).toFixed(2) : '0.00',
            },
        ]
    },
    {
        id: 2,
        name: '注册数据',
        themeColor: '#a18cd1',
        list: [
            {
                id: 1,
                name: '总注册人数',
                value: summaryData?.registration?.registration_count ? Number(summaryData.registration.registration_count).toFixed(2) : '0.00',
            },
            {
                id: 2,
                name: '总注册成本',
                value: summaryData?.registration?.registration_cost ? Number(summaryData.registration.registration_cost).toFixed(2) : '0.00',
            }
        ]
    },{
        id: 3,
        name: '充值订阅',
        themeColor: '#fad0c4',
        list: [
            {
                id: 1,
                name: '总充值人数',
                value: summaryData?.subscription?.paying_users ? Number(summaryData.subscription.paying_users).toFixed(2) : '0.00',
            },
            {
                id: 2,
                name: '总支付率',
                value: summaryData?.subscription?.payment_rate ? Number(summaryData.subscription.payment_rate).toFixed(2) : '0.00',
            },
            {
                id: 3,
                name: '总订阅人数',
                value: summaryData?.subscription?.total_subscribers ? Number(summaryData.subscription.total_subscribers).toFixed(2) : '0.00',
            },{
                id: 4,
                name: '总订阅率',
                value: summaryData?.subscription?.subscription_rate ? Number(summaryData.subscription.subscription_rate).toFixed(2) : '0.00',
            }
        ]
    },{
        id: 4,
        name: '首日付费',
        themeColor: '#ff9a9e',
        list: [
            {
                id: 1,
                name: '总首日人数',
                value: summaryData?.first_day?.first_day_users ? Number(summaryData.first_day.first_day_users).toFixed(2) : '0.00',
            },
            {
                id: 2,
                name: '总支付率',
                value: summaryData?.first_day?.first_day_rate ? Number(summaryData.first_day.first_day_rate).toFixed(2) : '0.00',
            },
            {
                id: 3,
                name: '总人均支付',
                value: summaryData?.first_day?.per_capita ? Number(summaryData.first_day.per_capita).toFixed(2) : '0.00',
            },{
                id: 4,
                name: '付费成本',
                value: summaryData?.first_day?.pay_cost ? Number(summaryData.first_day.pay_cost).toFixed(2) : '0.00',
            }
        ]
    }       
    ]
}