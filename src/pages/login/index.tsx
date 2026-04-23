import { Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import type { LoginPayload } from '@/types/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginLoading, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, token]);

  const handleSubmit = (values: LoginPayload) => {
    return login(values)
      .then(() => {
        navigate('/dashboard', { replace: true });
      })
      .catch(() => undefined);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at top, rgba(22, 93, 255, 0.18), transparent 32%), linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 24,
          boxShadow: '0 30px 60px rgba(15, 23, 42, 0.12)',
        }}
      >
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          后台登录
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          使用管理员账号进入企业官网 CMS 管理后台。
        </Typography.Paragraph>

        <Form<LoginPayload> layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input size="large" placeholder="请输入管理员账号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <Checkbox>记住登录状态</Checkbox>
              <Typography.Text type="secondary">请输入真实管理员账号</Typography.Text>
            </div>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loginLoading}
          >
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
}
