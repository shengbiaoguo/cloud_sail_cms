import {
  Button,
  Descriptions,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { leadsApi } from '@/api/modules/leads';
import { PageSection } from '@/components/common/page-section';
import { StatusTag } from '@/components/common/status-tag';
import { leadStatusOptions } from '@/constants/enums';
import type { LeadItem, LeadListParams } from '@/types/lead';
import { formatDateTime } from '@/utils/format';
import { showSuccessMessage } from '@/utils/feedback';

interface LeadFollowupFormValues {
  status: LeadItem['status'];
  remark?: string;
}

export default function LeadsPage() {
  const [listForm] = Form.useForm<LeadListParams>();
  const [drawerForm] = Form.useForm<LeadFollowupFormValues>();
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [followupSaving, setFollowupSaving] = useState(false);
  const [items, setItems] = useState<LeadItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<LeadListParams>({ current: 1, pageSize: 10 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<LeadItem | null>(null);

  const loadList = async (nextQuery: LeadListParams) => {
    setListLoading(true);
    try {
      const result = await leadsApi.getList(nextQuery);
      setItems(result.items);
      setPagination({
        current: result.current,
        pageSize: result.pageSize,
        total: result.total,
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    void loadList(query).catch(() => undefined);
  }, [query]);

  const handleSearch = (values: LeadListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
      status: values.status,
    });
  };

  const handleReset = () => {
    listForm.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const handleOpenDetail = async (id: LeadItem['id']) => {
    setDrawerOpen(true);
    setDetailLoading(true);
    try {
      const detail = await leadsApi.getDetail(String(id));
      setActiveItem(detail);
      drawerForm.setFieldsValue({
        status: detail.status,
        remark: detail.remark,
      });
    } catch {
      setDrawerOpen(false);
      setActiveItem(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSaveFollowup = async () => {
    if (!activeItem) {
      return;
    }
    const values = await drawerForm.validateFields();
    const nextRemark = values.remark?.trim() || '';
    const currentRemark = activeItem.remark?.trim() || '';

    if (values.status === activeItem.status && nextRemark === currentRemark) {
      return;
    }

    setFollowupSaving(true);
    try {
      if (values.status !== activeItem.status) {
        await leadsApi.updateStatus(String(activeItem.id), values.status);
      }
      if (nextRemark !== currentRemark) {
        await leadsApi.updateRemark(String(activeItem.id), nextRemark);
      }
      const latest = await leadsApi.getDetail(String(activeItem.id));
      setActiveItem(latest);
      drawerForm.setFieldsValue({
        status: latest.status,
        remark: latest.remark,
      });
      await loadList(query);
      showSuccessMessage('线索已更新');
    } finally {
      setFollowupSaving(false);
    }
  };

  const columns: ColumnsType<LeadItem> = [
    { title: '姓名', dataIndex: 'name', width: 120 },
    { title: '公司', dataIndex: 'company', render: (value?: string) => value ?? '-' },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 160,
      render: (value?: string) => value ?? '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (value) => <StatusTag value={value} />,
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      width: 180,
      render: formatDateTime,
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Button type="link" onClick={() => void handleOpenDetail(record.id)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="线索管理"
        description="线索模块已接入真实接口，支持筛选、详情查看、状态流转与备注更新。"
      >
        当前以处理效率优先，后续可以按需补充负责人分配与导出能力。
      </PageSection>

      <div className="page-card">
        <Form form={listForm} layout="vertical" onFinish={handleSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 16 }}>
            <Form.Item<LeadListParams>
              label="关键词"
              name="keyword"
              style={{ marginBottom: 0 }}
            >
              <Input allowClear placeholder="请输入姓名、手机号或公司关键词" />
            </Form.Item>
            <Form.Item<LeadListParams>
              label="状态"
              name="status"
              style={{ marginBottom: 0 }}
            >
              <Select allowClear placeholder="全部状态" options={leadStatusOptions} />
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
          loading={listLoading}
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

      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setActiveItem(null);
          drawerForm.resetFields();
        }}
        title="线索详情"
        width={640}
        loading={detailLoading}
      >
        {activeItem ? (
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Descriptions
              title="基础信息"
              column={1}
              items={[
                { key: 'name', label: '姓名', children: activeItem.name },
                { key: 'phone', label: '电话', children: activeItem.phone || '-' },
                { key: 'email', label: '邮箱', children: activeItem.email || '-' },
                { key: 'company', label: '公司', children: activeItem.company || '-' },
                {
                  key: 'sourcePage',
                  label: '来源页面',
                  children: activeItem.sourcePage || '-',
                },
                {
                  key: 'createdAt',
                  label: '提交时间',
                  children: formatDateTime(activeItem.createdAt),
                },
              ]}
            />

            <Descriptions
              title="留言内容"
              column={1}
              items={[
                {
                  key: 'message',
                  label: '内容',
                  children: (
                    <Typography.Paragraph
                      style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}
                    >
                      {activeItem.message || '-'}
                    </Typography.Paragraph>
                  ),
                },
              ]}
            />

            <Form form={drawerForm} layout="vertical">
              <Form.Item<LeadFollowupFormValues>
                label="状态"
                name="status"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select options={leadStatusOptions} />
              </Form.Item>
              <Form.Item<LeadFollowupFormValues> label="跟进备注" name="remark">
                <Input.TextArea rows={4} placeholder="请输入跟进记录" />
              </Form.Item>
            </Form>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                loading={followupSaving}
                onClick={() => void handleSaveFollowup().catch(() => undefined)}
              >
                保存跟进
              </Button>
            </div>
          </Space>
        ) : null}
      </Drawer>
    </Space>
  );
}
