import { InboxOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { uploadsApi } from '@/api/modules/uploads';
import { showSuccessMessage } from '@/utils/feedback';

interface UploadFieldProps {
  currentUrl?: string;
  onUploaded?: (fileUrl: string) => void;
  onClear?: () => void;
}

export function UploadField({ currentUrl, onUploaded, onClear }: UploadFieldProps) {
  const [uploading, setUploading] = useState(false);

  const getNativeFile = (file: RcFile | { originFileObj?: RcFile }) => {
    if (file instanceof File) {
      return file;
    }
    return file.originFileObj;
  };

  const confirmOverwrite = () => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: '确认覆盖当前图片？',
        content: '上传新图片后将用新地址覆盖当前封面图。',
        okText: '覆盖上传',
        cancelText: '取消',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  const uploadProps: UploadProps = {
    name: 'file',
    accept: 'image/*',
    maxCount: 1,
    showUploadList: false,
    customRequest: async (options) => {
      if (currentUrl) {
        const confirmed = await confirmOverwrite();
        if (!confirmed) {
          options.onSuccess?.({ canceled: true });
          return;
        }
      }
      const file = getNativeFile(options.file as RcFile | { originFileObj?: RcFile });
      if (!file) {
        options.onError?.(new Error('请选择图片文件'));
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true);
      try {
        const uploaded = await uploadsApi.uploadImage(formData);
        onUploaded?.(uploaded.fileUrl);
        showSuccessMessage('图片上传成功');
        options.onSuccess?.({ fileUrl: uploaded.fileUrl });
      } catch (error) {
        options.onError?.(error as Error);
      } finally {
        setUploading(false);
      }
    },
  };

  return (
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      {currentUrl ? (
        <div
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 12,
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ marginBottom: 8, color: '#64748b' }}>当前图片预览</div>
          <img
            src={currentUrl}
            alt="current"
            style={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'contain',
              borderRadius: 6,
              backgroundColor: '#fff',
            }}
          />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
            <a href={currentUrl} target="_blank" rel="noreferrer">
              打开原图
            </a>
            {onClear ? (
              <Button type="link" danger onClick={onClear} style={{ padding: 0 }}>
                清空当前图片
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <Upload.Dragger {...uploadProps} listType="picture-card" disabled={uploading}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {uploading
            ? '上传中...'
            : currentUrl
              ? '上传并覆盖当前图片'
              : '点击或拖拽上传图片'}
        </p>
        <p className="ant-upload-hint">上传成功后会自动回填图片 URL。</p>
      </Upload.Dragger>
    </Space>
  );
}
