import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { useAtom } from 'jotai';
import { userAtom } from '@/models/atomUser';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
    },
  };

  return (
    <PageContainer>
      <div className="p-6 bg-gray-50">
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card bordered={false} className="hover:shadow-lg transition-shadow duration-300">
              <Statistic
                title={<span className="flex items-center text-gray-600"><UserOutlined className="mr-2" />活跃用户</span>}
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className="hover:shadow-lg transition-shadow duration-300">
              <Statistic
                title={<span className="flex items-center text-gray-600"><ShoppingCartOutlined className="mr-2" />新增订单</span>}
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322', fontSize: '24px', fontWeight: 'bold' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className="hover:shadow-lg transition-shadow duration-300">
              <Statistic
                title={<span className="flex items-center text-gray-600"><DollarOutlined className="mr-2" />总收入</span>}
                value={112893}
                precision={2}
                valueStyle={{ color: '#3f8600', fontSize: '24px', fontWeight: 'bold' }}
                prefix="¥"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className="hover:shadow-lg transition-shadow duration-300">
              <Statistic
                title={<span className="flex items-center text-gray-600"><RiseOutlined className="mr-2" />转化率</span>}
                value={8.6}
                precision={2}
                valueStyle={{ color: '#3f8600', fontSize: '24px', fontWeight: 'bold' }}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <ProCard split="vertical" className="mb-6 hover:shadow-lg transition-shadow duration-300">
          <StatisticCard
            colSpan="12"
            title={<span className="text-lg font-medium">总销售额</span>}
            statistic={{
              value: 234567,
              prefix: '¥',
              valueStyle: { fontSize: '28px', fontWeight: 'bold' },
              description: <div className="mt-2">较前周期 <span className="text-red-500 font-medium">6.47%</span></div>,
            }}
            chart={
              <div style={{height: 200}} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                图表区域
              </div>
            }
          />
          <StatisticCard.Group colSpan="12" direction="row">
            <StatisticCard
              statistic={{
                title: <span className="text-gray-600">访问量</span>,
                value: 234567,
                valueStyle: { fontSize: '24px', fontWeight: 'bold' },
                description: <div className="mt-2">较前周期 <span className="text-green-500 font-medium">8.23%</span></div>,
              }}
            />
            <StatisticCard
              statistic={{
                title: <span className="text-gray-600">成交额</span>,
                value: 234567,
                valueStyle: { fontSize: '24px', fontWeight: 'bold' },
                description: <div className="mt-2">较前周期 <span className="text-red-500 font-medium">4.12%</span></div>,
              }}
            />
          </StatisticCard.Group>
        </ProCard>

        <Row gutter={16}>
          <Col span={12}>
            <ProCard title={<span className="text-lg font-medium">销售渠道</span>} className="h-96 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center items-center h-full text-gray-400 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                图表区域
              </div>
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard title={<span className="text-lg font-medium">热门商品</span>} className="h-96 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center items-center h-full text-gray-400 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                图表区域
              </div>
            </ProCard>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
