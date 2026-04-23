import { Button, Form, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { operationLogsApi } from '@/api/modules/operation-logs';
import { PageSection } from '@/components/common/page-section';
import type { OperationLogItem, OperationLogListParams } from '@/types/log';
import { formatDateTime } from '@/utils/format';

export default function OperationLogsPage() {
  const [form] = Form.useForm<OperationLogListParams>();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<OperationLogItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<OperationLogListParams>({
    current: 1,
    pageSize: 10,
  });

  const loadList = async (nextQuery: OperationLogListParams) => {
    setLoading(true);
    try {
      const result = await operationLogsApi.getList(nextQuery);
      setItems(result.items);
      setPagination({
        current: result.current,
        pageSize: result.pageSize,
        total: result.total,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadList(query).catch(() => undefined);
  }, [query]);

  const handleSearch = (values: OperationLogListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
      module: values.module?.trim() || undefined,
      action: values.action?.trim() || undefined,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const columns: ColumnsType<OperationLogItem> = [
    { title: '操作人', dataIndex: 'adminUserName', width: 120 },
    { title: '模块', dataIndex: 'module', width: 120 },
    { title: '动作', dataIndex: 'action', width: 120 },
    { title: '内容', dataIndex: 'content', render: (value?: string) => value ?? '-' },
    {
      title: 'IP',
      dataIndex: 'ip',
      width: 140,
      render: (value?: string) => value ?? '-',
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      width: 180,
      render: formatDateTime,
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="操作日志"
        description="操作日志模块已接入真实接口，支持分页与按关键词、模块、动作筛选。"
      >
        建议优先覆盖登录、增删改与状态流转等关键动作的审计记录。
      </PageSection>

      <div className="page-card">
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 16 }}
          >
            <Form.Item<OperationLogListParams>
              label="关键词"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="请输入操作人、内容关键词" />
            </Form.Item>
            <Form.Item<OperationLogListParams>
              label="模块"
              name="module"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="例如 news" />
            </Form.Item>
            <Form.Item<OperationLogListParams>
              label="动作"
              name="action"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="例如 create" />
            </Form.Item>
            <Form.Item label=" " style={{ marginBottom: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>

      <div className="page-card">
        <Table
          loading={loading}
          rowKey="id"
          dataSource={items}
          columns={columns}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            onChange: (current, pageSize) =>
              setQuery((prev) => ({ ...prev, current, pageSize })),
          }}
        />
      </div>
    </Space>
  );
}
