import { Table, Space } from 'antd';
import { PageSection } from '@/components/common/page-section';
import { formatDateTime, formatFileSize } from '@/utils/format';

const dataSource = [
  {
    id: 1,
    fileName: 'banner-home.jpg',
    fileUrl: '/uploads/banner-home.jpg',
    mimeType: 'image/jpeg',
    fileSize: 204800,
    uploadedBy: 'admin',
    createdAt: '2026-04-20T18:00:00',
  },
  {
    id: 2,
    fileName: 'logo.png',
    fileUrl: '/uploads/logo.png',
    mimeType: 'image/png',
    fileSize: 10240,
    uploadedBy: 'editor01',
    createdAt: '2026-04-18T11:20:00',
  },
];

export default function UploadsPage() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <PageSection
        title="上传记录"
        description="上传模块可以先作为辅助页面存在，方便追溯资源来源和回收无效文件。"
      >
        图片上传建议统一走一个上传组件和一个上传接口，避免内容模块各自维护上传逻辑。
      </PageSection>

      <div className="page-card">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={[
            { title: '文件名', dataIndex: 'fileName' },
            { title: '文件类型', dataIndex: 'mimeType', width: 160 },
            {
              title: '大小',
              dataIndex: 'fileSize',
              width: 120,
              render: formatFileSize,
            },
            { title: '上传人', dataIndex: 'uploadedBy', width: 120 },
            {
              title: '上传时间',
              dataIndex: 'createdAt',
              width: 180,
              render: formatDateTime,
            },
            {
              title: 'URL',
              dataIndex: 'fileUrl',
              render: (value: string) => <a href={value}>{value}</a>,
            },
          ]}
        />
      </div>
    </Space>
  );
}
