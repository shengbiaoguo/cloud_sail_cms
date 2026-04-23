import {
  BarChartOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Col, Empty, List, Row, Space, Spin, Statistic, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { dashboardApi } from '@/api/modules/dashboard';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import type {
  DashboardLatestContent,
  DashboardLatestLead,
  DashboardOverview,
} from '@/types/dashboard';
import { formatDateTime } from '@/utils/format';

const initialOverview: DashboardOverview = {
  stats: {
    newsCount: 0,
    caseStudyCount: 0,
    serviceCount: 0,
    leadCount: 0,
  },
  latestLeads: [],
  latestContents: [],
};

const leadStatusColorMap: Record<DashboardLatestLead['status'], string> = {
  pending: 'processing',
  contacted: 'blue',
  converted: 'success',
  invalid: 'error',
};

const leadStatusLabelMap: Record<DashboardLatestLead['status'], string> = {
  pending: '待处理',
  contacted: '已联系',
  converted: '已转化',
  invalid: '无效',
};

const contentTypeLabelMap: Record<DashboardLatestContent['type'], string> = {
  news: '新闻',
  case: '案例',
  service: '服务',
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState<DashboardOverview>(initialOverview);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      setLoading(true);
      try {
        const result = await dashboardApi.getOverview();
        if (isMounted) {
          setOverview(result);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOverview().catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = useMemo(
    () => [
      {
        title: '新闻总数',
        value: overview.stats.newsCount,
        icon: <NotificationOutlined />,
      },
      {
        title: '案例总数',
        value: overview.stats.caseStudyCount,
        icon: <FileDoneOutlined />,
      },
      {
        title: '服务总数',
        value: overview.stats.serviceCount,
        icon: <BarChartOutlined />,
      },
      { title: '线索总数', value: overview.stats.leadCount, icon: <TeamOutlined /> },
    ],
    [overview.stats],
  );

  const contentColumns: ColumnsType<DashboardLatestContent> = [
    { title: '标题', dataIndex: 'title' },
    {
      title: '类型',
      dataIndex: 'type',
      width: 90,
      render: (value: DashboardLatestContent['type']) =>
        contentTypeLabelMap[value] ?? value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 90,
      render: (value) => <StatusTag value={value} />,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 160,
      render: formatDateTime,
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection title="控制台" description="展示内容、服务和线索的核心运营数据。">
        数据已接入 `/admin/dashboard/overview`。
      </PageSection>

      <Spin spinning={loading}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            {statCards.map((item) => (
              <Col span={6} key={item.title}>
                <Card style={{ borderRadius: 16 }}>
                  <Statistic title={item.title} value={item.value} prefix={item.icon} />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="最新线索" style={{ borderRadius: 16 }}>
                <List
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无数据"
                      />
                    ),
                  }}
                  dataSource={overview.latestLeads}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={`${item.name} / ${item.company || '-'}`}
                        description={`提交时间：${formatDateTime(item.createdAt)}`}
                      />
                      <Tag color={leadStatusColorMap[item.status]}>
                        {leadStatusLabelMap[item.status]}
                      </Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="最新内容" style={{ borderRadius: 16 }}>
                <Table
                  size="small"
                  rowKey="id"
                  pagination={false}
                  dataSource={overview.latestContents}
                  columns={contentColumns}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无数据"
                      />
                    ),
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </Spin>
    </Space>
  );
}
