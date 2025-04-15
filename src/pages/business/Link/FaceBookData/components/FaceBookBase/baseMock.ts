export const baseMock = async () => [
    {
        id: 1,
        name: '基础数据',
        themeColor: '#ff9a9e',
        list: [
            {
                id: 1,
                name: '总余额',
                value: '$38,233.52',
            },
            {
                id: 2,
                name: '总消耗',
                value: '$12,454',
            },
            {
                id: 3,
                name: '总回收',
                value: '$12,454',
            },
            {
                id: 4,
                name: '总ROI',
                value: '1.23',
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
                value: '12',
            },
            {
                id: 2,
                name: '总注册成本',
                value: '$12,454',
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
                value: '12',
            },
            {
                id: 2,
                name: '总支付率',
                value: '0.0%',
            },
            {
                id: 3,
                name: '总订阅人数',
                value: '66',
            },{
                id: 4,
                name: '总订阅率',
                value: '0.0%',
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
                value: '12',
            },
            {
                id: 2,
                name: '总支付率',
                value: '0.0%',
            },
            {
                id: 3,
                name: '总人均支付',
                value: '$30',
            },{
                id: 4,
                name: '付费成本',
                value: '$12,454',
            }
        ]
    }
]