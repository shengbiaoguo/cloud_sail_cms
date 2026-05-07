import { Button, Form, Input, Space, Table, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { uploadsApi } from '@/api/modules/uploads';
import { PageSection } from '@/components/common/page-section';
import type { UploadFileItem, UploadFileListParams } from '@/types/upload';
import { showSuccessMessage } from '@/utils/feedback';
import { formatDateTime, formatFileSize } from '@/utils/format';

export default function UploadsPage() {
  const [form] = Form.useForm<UploadFileListParams>();
  const [listLoading, setListLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<UploadFileItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [query, setQuery] = useState<UploadFileListParams>({ current: 1, pageSize: 10 });

  const loadList = async (nextQuery: UploadFileListParams) => {
    setListLoading(true);
    try {
      const result = await uploadsApi.getList(nextQuery);
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

  const handleSearch = (values: UploadFileListParams) => {
    setQuery({
      current: 1,
      pageSize: pagination.pageSize,
      keyword: values.keyword?.trim() || undefined,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ current: 1, pageSize: pagination.pageSize });
  };

  const getNativeFile = (file: RcFile | { originFileObj?: RcFile }) => {
    if (file instanceof File) {
      return file;
    }
    return file.originFileObj;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: async (options) => {
      const file = getNativeFile(options.file as RcFile | { originFileObj?: RcFile });
      if (!file) {
        options.onError?.(new Error('请选择图片文件'));
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true);
      try {
        await uploadsApi.uploadImage(formData);
        showSuccessMessage('上传成功');
        await loadList(query);
        options.onSuccess?.({ uploaded: true });
      } catch (error) {
        options.onError?.(error as Error);
      } finally {
        setUploading(false);
      }
    },
  };

  const columns: ColumnsType<UploadFileItem> = [
    { title: '文件名', dataIndex: 'fileName' },
    { title: '文件类型', dataIndex: 'mimeType', width: 160 },
    {
      title: '大小',
      dataIndex: 'fileSize',
      width: 120,
      render: formatFileSize,
    },
    {
      title: '上传人',
      dataIndex: 'uploadedByName',
      width: 120,
      render: (value?: string) => value ?? '-',
    },
    {
      title: '上传时间',
      dataIndex: 'createdAt',
      width: 180,
      render: formatDateTime,
    },
    {
      title: 'URL',
      dataIndex: 'fileUrl',
      render: (value: string) => (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="上传记录"
        description="上传模块已接入真实接口，支持图片上传和分页记录查询。"
      >
        所有内容模块可复用同一上传能力，减少重复联调成本。
      </PageSection>

      <div className="page-card">
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Form form={form} layout="vertical" onFinish={handleSearch}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr auto', gap: 16 }}>
              <Form.Item<UploadFileListParams>
                label="关键词"
                name="keyword"
                style={{ marginBottom: 0 }}
              >
                <Input allowClear placeholder="请输入文件名关键词" />
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

          <Upload {...uploadProps}>
            <Button loading={uploading}>上传图片</Button>
          </Upload>
        </Space>
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
    </Space>
  );
}
