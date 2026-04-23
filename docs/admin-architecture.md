# 管理后台架构设计

## 1. 项目目录结构建议

```text
cloud_sail_cms
|-- docs
|   `-- admin-architecture.md
|-- public
|-- src
|   |-- api
|   |   |-- index.ts
|   |   `-- modules
|   |       |-- auth.ts
|   |       |-- dashboard.ts
|   |       |-- news.ts
|   |       |-- cases.ts
|   |       |-- services.ts
|   |       |-- leads.ts
|   |       |-- site-config.ts
|   |       |-- admin-users.ts
|   |       |-- uploads.ts
|   |       `-- operation-logs.ts
|   |-- components
|   |   |-- common
|   |   |   |-- filter-bar.tsx
|   |   |   |-- page-section.tsx
|   |   |   |-- rich-text-editor.tsx
|   |   |   |-- status-tag.tsx
|   |   |   `-- upload-field.tsx
|   |   |-- guards
|   |   |   `-- auth-guard.tsx
|   |   `-- layout
|   |       `-- app-shell.tsx
|   |-- config
|   |   `-- menu.tsx
|   |-- constants
|   |   |-- enums.ts
|   |   `-- storage.ts
|   |-- pages
|   |   |-- login
|   |   |-- dashboard
|   |   |-- news
|   |   |-- cases
|   |   |-- services
|   |   |-- site-config
|   |   |-- leads
|   |   |-- admin-users
|   |   |-- uploads
|   |   |-- operation-logs
|   |   `-- not-found
|   |-- router
|   |   `-- index.tsx
|   |-- stores
|   |   `-- auth-store.ts
|   |-- styles
|   |   `-- global.css
|   |-- types
|   |-- utils
|   `-- main.tsx
|-- .env.example
|-- package.json
`-- vite.config.ts
```

结构原则：

- `pages` 只负责页面编排，不直接写请求细节。
- `api/modules` 按后台业务模块拆分，与服务端接口一一对应。
- `components/common` 放后台高复用组件，避免业务页面重复造轮子。
- `types` 集中维护后台实体类型，降低接口联调时的心智负担。
- `stores` 先只放全局状态，例如登录态，避免 MVP 过度状态化。

## 2. 菜单结构设计

建议一级菜单如下：

1. 控制台
2. 新闻管理
3. 案例管理
4. 服务管理
5. 站点配置
6. 线索管理
7. 上传记录
8. 管理员管理
9. 操作日志

菜单可见性建议：

- `super_admin`：可见全部菜单
- `editor`：可见控制台、新闻、案例、服务、站点配置、线索、上传记录

说明：

- `上传记录` 独立成菜单，有利于后台资源治理。
- `站点配置` 先作为单页配置，不拆过细子菜单，减少配置复杂度。
- `管理员管理` 和 `操作日志` 建议只开放给 `super_admin`。

## 3. 路由设计

建议路由如下：

```text
/login
/dashboard
/news
/news/create
/news/edit/:id
/cases
/cases/create
/cases/edit/:id
/services
/services/create
/services/edit/:id
/site-config
/leads
/uploads
/admin-users
/operation-logs
```

路由设计原则：

- 列表页使用固定路径，例如 `/news`
- 新建页和编辑页分开，便于权限、埋点和页面标题管理
- 详情优先用 `Drawer` 或 `Modal`，不用增加单独路由，减少后台跳转层级
- 管理员和日志路由加角色守卫

## 4. 页面拆分建议

### 控制台

- 页面：`/dashboard`
- 组成：
  - 概览统计卡片
  - 最近线索列表
  - 最近发布内容列表

### 新闻管理

- 列表页：筛选区 + 表格 + 分页
- 新建页：表单页
- 编辑页：与新建页复用
- 详情抽屉：查看基础信息、SEO、发布时间、封面图

### 案例管理

- 列表页：关键词、行业、状态筛选
- 新建/编辑页：通用内容表单 + 客户名称 + 行业 + 项目时间
- 详情抽屉：展示案例摘要、项目介绍、封面图

### 服务管理

- 列表页：关键词、状态筛选
- 新建/编辑页：轻量内容表单
- 排序能力：MVP 阶段使用数字排序字段

### 站点配置

- 单页表单：
  - 基础配置
  - 联系方式
  - 页脚备案
  - 社交链接
  - Banner 列表配置

### 线索管理

- 列表页：姓名/电话/公司/状态筛选
- 详情抽屉：
  - 基础信息
  - 来源页面
  - 留言内容
  - 状态修改
  - 跟进备注

### 管理员管理

- 列表页：账号、昵称、角色、状态、最后登录时间
- 新建/编辑抽屉：账号、昵称、角色、状态
- 修改密码弹窗：单独表单，避免和基础信息混在一起

### 上传记录

- 列表页：文件名、URL、文件类型、大小、上传人、上传时间

### 操作日志

- 列表页：操作人、模块、动作、内容、IP、时间
- 不建议做复杂详情页，列表可读即可

## 5. 权限控制最小实现方案

MVP 建议只做两层权限：

1. 登录态权限
2. 角色级权限

具体做法：

- 登录成功后保存 JWT 到本地存储
- 启动时通过 `/auth/profile` 获取当前管理员信息
- 路由守卫判断是否登录
- 菜单根据 `role` 过滤显示
- 对 `admin-users`、`operation-logs` 做路由级角色限制
- 页面内按钮权限先不细分，统一由角色和服务端接口共同兜底

这样做的优点：

- 实现成本低
- 足以满足中小型企业 CMS 的早期后台需求
- 后续可平滑升级为基于 `permission_code` 的按钮级权限

## 6. API 模块拆分建议

建议按照后台业务域划分接口模块：

- `authApi`
  - `login`
  - `getCurrentUser`
  - `logout` 可选
- `dashboardApi`
  - `getStats`
- `newsApi`
  - `getList`
  - `getDetail`
  - `create`
  - `update`
  - `remove`
  - `publish`
  - `offline`
- `casesApi`
  - 同新闻模块
- `servicesApi`
  - 同新闻模块
- `siteConfigApi`
  - `getDetail`
  - `update`
- `leadsApi`
  - `getList`
  - `getDetail`
  - `updateStatus`
  - `updateRemark`
- `adminUsersApi`
  - `getList`
  - `create`
  - `update`
  - `updatePassword`
  - `toggleStatus`
- `uploadsApi`
  - `uploadImage`
  - `getList`
- `operationLogsApi`
  - `getList`

接口约定建议：

- 列表接口统一支持 `page`、`pageSize`、`keyword`、`status`
- 列表返回统一为 `items + total + current + pageSize`
- 单条详情接口返回结构尽量直接贴近表单字段，减少前端转换成本

## 7. 公共组件建议

优先建设这些后台公共组件：

1. `FilterBar`
   统一列表筛选区布局，降低每个列表页的 UI 差异。

2. `StatusTag`
   统一状态颜色和文案映射，避免每个页面自己写枚举判断。

3. `UploadField`
   统一图片上传交互，后续可接入裁剪、预览、大小校验。

4. `RichTextEditor`
   统一新闻、案例、服务正文编辑能力。

5. `PageSection`
   统一页面标题、说明文案和操作区。

6. `ProTableLite` 或列表页组合模板
   后续可封装通用分页、空态、加载态和查询参数同步。

7. `EntityFormLayout`
   针对新闻、案例、服务三类内容模块抽出统一表单骨架。

## 8. 开发顺序建议

建议按下面顺序推进：

1. 登录模块
   打通 `/auth/login`、`/auth/profile`、退出登录。

2. 后台框架层
   完成布局、菜单、路由、鉴权守卫、请求封装。

3. 新闻管理
   先做最完整的一套 CRUD，沉淀列表页和表单页范式。

4. 案例管理、服务管理
   复用新闻模块的结构快速复制，补差异字段。

5. 上传模块 + 富文本编辑器
   统一内容模块素材上传能力。

6. 线索管理
   完成列表、详情、状态流转、备注。

7. 站点配置
   做成单页配置表单，保证官网配置可维护。

8. 管理员管理
   完成账号新增、启停用、改密码。

9. 操作日志
   完成分页展示，配合服务端记录关键行为。

## 9. 当前骨架与后续建议

当前仓库已完成：

- 可运行的 React 管理后台基础工程
- 登录页、主布局、路由守卫
- 所有核心业务模块页面骨架
- API、类型、常量、公共组件基础分层

下一步最值得优先做的是：

1. 接真实接口
2. 把新闻模块做成完整 CRUD 样板
3. 抽象内容表单复用到案例和服务
