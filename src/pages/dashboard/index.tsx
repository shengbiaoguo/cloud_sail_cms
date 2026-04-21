import {
  BarChartOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Col, List, Row, Space, Statistic, Table, Tag } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { formatDateTime } from '@/utils/format';

const stats = [
  { title: '新闻总数', value: 24, icon: <NotificationOutlined /> },
  { title: '案例总数', value: 12, icon: <FileDoneOutlined /> },
  { title: '服务总数', value: 8, icon: <BarChartOutlined /> },
  { title: '线索总数', value: 57, icon: <TeamOutlined /> },
];

const recentLeads = [
  {
    id: 1001,
    name: '张先生',
    company: '星航科技',
    status: 'pending',
    createdAt: '2026-04-20 10:30',
  },
  {
    id: 1002,
    name: '王女士',
    company: '云数智',
    status: 'contacted',
    createdAt: '2026-04-20 09:20',
  },
  {
    id: 1003,
    name: '陈先生',
    company: '启帆集团',
    status: 'converted',
    createdAt: '2026-04-19 18:10',
  },
];

const recentContents = [
  {
    id: 1,
    title: '企业官网升级发布',
    type: '新闻',
    status: '已发布',
    updatedAt: '2026-04-20 15:00',
  },
  {
    id: 2,
    title: '制造业数字化案例',
    type: '案例',
    status: '草稿',
    updatedAt: '2026-04-20 12:30',
  },
  {
    id: 3,
    title: '品牌咨询服务',
    type: '服务',
    status: '已发布',
    updatedAt: '2026-04-19 17:15',
  },
];

export default function DashboardPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="控制台"
        description="聚合内容、站点和线索数据，让管理员快速了解站点运营状态。"
      >
        这里建议接入 `/dashboard/overview`
        接口，首页只展示最关键的运营概览，避免把控制台做成复杂 BI。
      </PageSection>

      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col span={6} key={item.title}>
            <Card style={{ borderRadius: 16 }}>
              <Statistic title={item.title} value={item.value} prefix={item.icon} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="最近线索" style={{ borderRadius: 16 }}>
            <List
              dataSource={recentLeads}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.name} / ${item.company}`}
                    description={`提交时间：${item.createdAt}`}
                  />
                  <Tag
                    color={
                      item.status === 'pending'
                        ? 'processing'
                        : item.status === 'contacted'
                          ? 'blue'
                          : 'success'
                    }
                  >
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最近发布内容" style={{ borderRadius: 16 }}>
            <Table
              size="small"
              rowKey="id"
              pagination={false}
              dataSource={recentContents}
              columns={[
                { title: '标题', dataIndex: 'title' },
                { title: '类型', dataIndex: 'type', width: 90 },
                { title: '状态', dataIndex: 'status', width: 90 },
                {
                  title: '更新时间',
                  dataIndex: 'updatedAt',
                  width: 150,
                  render: formatDateTime,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
