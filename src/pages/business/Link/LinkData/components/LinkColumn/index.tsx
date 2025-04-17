import { ProColumns } from "@ant-design/pro-components";

interface LinkReportItem {
    drama_id: string; /** 推广链接id */
    drama_name: string; /** 推广系列名称 */
    ju_name: string; /** 剧名 */
    spend: number /** 消耗 */
    recharge: number /** 充值 */
    week_subscription: number /** 周订阅金额 */
    month_subscription: number /** 月订阅金额 */
    year_subscription: number /** 年订阅金额 */
    total_subscription: number /** 总订阅金额 */
    recharge_user_count: number /** 充值人数 */
    week_subscription_users: number /** 周订阅人数 */
    month_subscription_users: number /** 月订阅人数 */
    year_subscription_users: number /** 年订阅人数 */
    total_subscription_users: number /** 总订阅人数 */
    total_income: number /** 单链接总付费 */
    roi: number /** 单链接总付费ROI */
}


const linkReportColumns: ProColumns<LinkReportItem>[] = [
    {
        title: 'ID',
        dataIndex: 'drama_id',
        align: 'left',
        width: 100
    },
    {
        title: '基本信息',
        dataIndex: 'drama_na',
        align: 'left',
        width: 180,
    },{
        title: '总收入',
        dataIndex: 'total_income',
        align: 'left',
        width: 100,
        render: (text: any, record: any) => {
            return <div>
                <div>总收入：{'$' + record.total_income}</div>
            </div>
        }
    },{
        title: '消耗',
        dataIndex: 'spend',
        align: 'left',
        width: 100,
        render: (text: any, record: any) => {
            return <div>
                <div>投放成本：{'$' + record.spend}</div>
            </div>
        }
    },{
        title: '充值',
        dataIndex: 'recharge',
        align: 'left',
        width: 100,
        render: (text: any, record: any) => {
            return <div>
                <div>充值：{'$' + record.recharge}</div>
            </div>
        }
    },{
        title: '订阅',
        align: 'left',
        width: 100,
        render: (text: any, record: any) => {
            return <div>
                <div>周订阅：{record.week_subscription} / {record.week_subscription_users}人</div>
                <div>月订阅：{record.month_subscription} / {record.month_subscription_users}人</div>
                <div>年订阅：{record.year_subscription} / {record.year_subscription_users}人</div>
                <div>总订阅：{record.total_subscription} / {record.total_subscription_users}人</div>
            </div>
        }
    },{
        title: 'ROI',
        dataIndex: 'roi',
        align: 'left',
        width: 100,
        render: (text: any, record: any) => {
            return <div>
                <div>ROI：{record.roi + '%'}</div>
            </div>
        }
    }
]

export {
    linkReportColumns
}
