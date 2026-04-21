你现在是一个资深的 React 后台系统工程师，请基于以下项目背景，帮助我设计并开发“管理后台”端。

# 一、项目背景
这是一个“企业官网 + CMS 管理后台 + API 服务端”的完整系统，其中你当前只负责“管理后台”端。

项目目标：
1. 让管理员在后台管理新闻、案例、服务、站点配置
2. 管理官网收集到的咨询线索
3. 管理后台管理员账号
4. 查看关键操作日志
5. 与官网前台、API 服务端形成完整闭环

当前项目分为 3 个端：
1. 官网前台
2. 管理后台（当前你负责）
3. API 服务端

请始终围绕“管理后台”职责设计，不要混入官网前台页面逻辑。

# 二、管理后台技术架构
请基于以下技术栈设计：
- Vite
- React
- TypeScript
- Ant Design
- React Router
- Axios
- 可使用 Zustand 或其他轻量状态管理
- 与 API 服务端通过 HTTP 接口通信

要求：
1. 后台管理系统结构清晰，适合中小型企业 CMS 使用
2. 页面以“列表页 + 新建/编辑页 + 详情/抽屉”模式为主
3. 表单、表格、上传、筛选、分页要规范
4. 当前先做 MVP，不做过度复杂的权限系统

# 三、管理后台模块与功能

## 1. 登录模块
最小功能：
- 账号密码登录
- JWT 鉴权
- 退出登录
- 获取当前管理员信息

## 2. 控制台
展示简单概览：
- 新闻总数
- 案例总数
- 服务总数
- 线索总数
- 最近线索
- 最近发布内容

## 3. 新闻管理
功能包括：
- 新闻列表
- 新建新闻
- 编辑新闻
- 删除/软删除
- 发布/下线
- SEO 信息编辑
- 封面图上传

## 4. 案例管理
功能包括：
- 案例列表
- 新建案例
- 编辑案例
- 删除
- 上下线
- 封面图上传
- 项目介绍字段编辑

## 5. 服务管理
功能包括：
- 服务列表
- 新建服务
- 编辑服务
- 删除
- 上下线
- 排序

## 6. 站点配置管理
功能包括：
- 网站名称
- Logo
- 联系电话
- 邮箱
- 地址
- 页脚备案信息
- 社交链接
- 首页 Banner 配置

## 7. 线索管理
功能包括：
- 线索列表
- 查看详情
- 修改状态
- 添加备注
- 后续可扩展导出 CSV

线索状态建议：
- pending（待处理）
- contacted（已联系）
- converted（已转化）
- invalid（无效）

## 8. 管理员管理
功能包括：
- 管理员列表
- 新建管理员
- 修改密码
- 启用/禁用

当前角色先简化为：
- super_admin
- editor

## 9. 上传管理
最小功能：
- 图片上传
- 返回文件 URL
- 记录上传信息

## 10. 操作日志
至少记录：
- 登录
- 新建内容
- 编辑内容
- 删除内容
- 修改线索状态

# 四、后台建议页面结构
建议页面包括：
- /login
- /dashboard
- /news
- /news/create
- /news/edit/:id
- /cases
- /cases/create
- /cases/edit/:id
- /services
- /services/create
- /services/edit/:id
- /site-config
- /leads
- /admin-users
- /operation-logs

你可以在此基础上补充更合理的后台路由和菜单结构。

# 五、与后台强相关的数据表（后台需要理解）
请基于以下表结构来理解后台功能：

## 1. admin_user 管理员表
建议字段：
- id
- username
- password_hash
- nickname
- role
- status
- last_login_at
- created_at
- updated_at

## 2. news 新闻表
建议字段：
- id
- title
- slug
- summary
- cover_image
- content
- seo_title
- seo_keywords
- seo_description
- status
- published_at
- sort_order
- created_by
- updated_by
- created_at
- updated_at
- deleted_at

## 3. case_study 案例表
建议字段：
- id
- title
- slug
- summary
- cover_image
- content
- client_name
- industry
- project_date
- seo_title
- seo_keywords
- seo_description
- status
- sort_order
- created_by
- updated_by
- created_at
- updated_at
- deleted_at

## 4. service 服务表
建议字段：
- id
- title
- slug
- summary
- cover_image
- content
- seo_title
- seo_keywords
- seo_description
- status
- sort_order
- created_by
- updated_by
- created_at
- updated_at
- deleted_at

## 5. lead 线索表
建议字段：
- id
- name
- phone
- email
- company
- source_page
- message
- status
- remark
- assigned_to
- contacted_at
- created_at
- updated_at

## 6. site_config 站点配置表
建议字段：
- id
- config_key
- config_value
- description
- updated_by
- created_at
- updated_at

## 7. upload_file 上传文件表
建议字段：
- id
- file_name
- file_path
- file_url
- mime_type
- file_size
- uploaded_by
- created_at

## 8. operation_log 操作日志表
建议字段：
- id
- admin_user_id
- module
- action
- target_id
- target_type
- content
- ip
- user_agent
- created_at

# 六、你输出时的要求
请你基于以上背景，优先输出以下内容：
1. 管理后台项目目录结构建议
2. 菜单结构设计
3. 路由设计
4. 页面拆分建议（列表页、表单页、详情抽屉等）
5. 权限控制最小实现方案
6. API 模块拆分建议
7. 公共组件建议（表格、表单、上传、富文本、筛选区等）
8. 开发顺序建议

注意：
- 不要输出官网前台代码
- 不要输出服务端实现代码
- 只围绕管理后台职责展开
- 优先考虑“快速开发、易维护、企业 CMS 场景真实可用”
- 先从架构和页面结构设计开始，再逐步进入代码实现
