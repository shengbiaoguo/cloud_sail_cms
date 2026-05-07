import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Space, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function runCommand(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function RichTextEditor({
  value,
  placeholder = '请输入正文内容',
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    if (editorRef.current.innerHTML !== (value ?? '')) {
      editorRef.current.innerHTML = value ?? '';
    }
  }, [value]);

  const syncValue = () => {
    onChange?.(editorRef.current?.innerHTML ?? '');
  };

  return (
    <Card bodyStyle={{ padding: 12 }}>
      <Space size={8} wrap>
        <Tooltip title="加粗">
          <Button icon={<BoldOutlined />} onClick={() => runCommand('bold')} />
        </Tooltip>
        <Tooltip title="斜体">
          <Button icon={<ItalicOutlined />} onClick={() => runCommand('italic')} />
        </Tooltip>
        <Tooltip title="下划线">
          <Button icon={<UnderlineOutlined />} onClick={() => runCommand('underline')} />
        </Tooltip>
        <Button onClick={() => runCommand('formatBlock', '<h2>')}>H2</Button>
        <Button onClick={() => runCommand('formatBlock', '<p>')}>正文</Button>
        <Tooltip title="无序列表">
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => runCommand('insertUnorderedList')}
          />
        </Tooltip>
        <Tooltip title="有序列表">
          <Button
            icon={<OrderedListOutlined />}
            onClick={() => runCommand('insertOrderedList')}
          />
        </Tooltip>
        <Button
          onClick={() => {
            const url = window.prompt('请输入链接 URL');
            if (url) {
              runCommand('createLink', url);
            }
          }}
        >
          链接
        </Button>
        <Button onClick={() => runCommand('removeFormat')}>清除格式</Button>
      </Space>

      <Divider style={{ margin: '12px 0' }} />

      <div
        className="rich-text-content rich-text-editor-area"
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncValue}
        style={{
          minHeight: 280,
          outline: 'none',
          lineHeight: 1.7,
          fontSize: 14,
        }}
        data-placeholder={placeholder}
      />

      <style>{`
        div[data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }
      `}</style>
    </Card>
  );
}
