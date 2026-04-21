import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

export function UploadField() {
  return (
    <Upload.Dragger listType="picture-card" maxCount={1} beforeUpload={() => false}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽上传图片</p>
      <p className="ant-upload-hint">MVP 阶段先接入上传接口返回 URL，再回填表单字段。</p>
    </Upload.Dragger>
  );
}
