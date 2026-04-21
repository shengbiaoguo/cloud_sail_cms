# Cloud Sail CMS

基于 `Vite + React + TypeScript + Ant Design` 的企业官网管理后台 MVP 骨架。

## 已完成内容

- 登录页与基础鉴权 store
- 后台主布局、菜单、路由守卫
- 控制台、新闻、案例、服务、站点配置、线索、管理员、上传记录、操作日志页面骨架
- Axios 请求封装与模块化 API 目录
- 类型定义、状态枚举、公共组件占位

## 目录结构

```text
src
|-- api
|   |-- modules
|-- components
|   |-- common
|   |-- guards
|   `-- layout
|-- config
|-- constants
|-- pages
|-- router
|-- stores
|-- styles
|-- types
`-- utils
```

## 建议开发顺序

1. 接入真实登录接口与 `/auth/me`
2. 完成新闻、案例、服务三个内容模块的 CRUD 闭环
3. 打通上传接口并接入富文本编辑器
4. 完成线索详情、状态流转与备注保存
5. 补齐站点配置、管理员管理、操作日志接口

## 启动

```bash
npm install
npm run dev
```
