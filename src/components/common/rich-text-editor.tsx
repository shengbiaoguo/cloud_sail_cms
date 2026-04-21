import { Card, Typography } from 'antd';

export function RichTextEditorPlaceholder() {
  return (
    <Card
      style={{
        borderRadius: 12,
        background:
          'linear-gradient(180deg, rgba(22, 93, 255, 0.04) 0%, rgba(255, 255, 255, 1) 100%)',
      }}
    >
      <Typography.Text strong>富文本编辑器占位</Typography.Text>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 0, marginTop: 8 }}>
        建议后续接入 `@wangeditor/editor-for-react` 或
        `react-quill`，保持与图片上传模块共用上传能力。
      </Typography.Paragraph>
    </Card>
  );
}
