import { Card, Row, Col, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const LinkCard: React.FC = () => {
    const [data, setData] = useState({
        impressions: '4,838,811 / +0.0%',
        clicks: '0',
        ctr: '0.00%',
        cpc: '0.00',
        totalSpend: '0.00$ / +0.0%',
        registerCount: '0.00$ / +0.0%'
    });

    return (
        <div className="my-4">
            <Row gutter={16}>
                <Col span={4}>
                    <Card  className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">展示量 / 环比</Text>
                            <Text strong className="text-lg">{data.impressions}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card  className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">点击量</Text>
                            <Text strong className="text-lg">{data.clicks}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card  className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">点击率</Text>
                            <Text strong className="text-lg">{data.ctr}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">CPC</Text>
                            <Text strong className="text-lg">{data.cpc}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">总消耗金额 / 环比</Text>
                            <Text strong className="text-lg">{data.totalSpend}</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card  className="h-full">
                        <div className="flex flex-col">
                            <Text type="secondary" className="text-sm mb-2">注册数 / 环比</Text>
                            <Text strong className="text-lg">{data.registerCount}</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LinkCard;