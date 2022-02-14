<!--
 * @Date: 2022-02-14 10:12:48
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-02-14 11:06:51
 * @FilePath: \uni-vue3-js-template\README.md
-->

## 项目名称

## 运行项目

```
 # 快速启动-自动安装依赖并编译运行h5
 npm run dev
 # 运行
 npm run dev:%PLATFORM%
 # 打包
 npm run build:%PLATFORM%
```

## 三方库归档

```
# 避免重复造轮子,请将你编写或安装引入的类库列举在此
重点提要:

uview-ui - 内含常用 js 方法(节流防抖,对象克隆, 时间格式化等......),请仔细阅读一次官方文档
```

| 包名     | 路径                     | 功能                                                                    |
| -------- | ------------------------ | ----------------------------------------------------------------------- |
| uview-ui | src\uni_modules\uview-ui | 不仅仅是 UI 库,1.8.3 文档: https://v1.uviewui.com/components/intro.html |

## Vuex 状态管理

## Git 提交规范

```
build: 主要目的是修改项目构建系统(例如 gulp，webpack，rollup 的配置等)的提交
ci: 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
docs: 文档更新
feat: 新增功能
merge: 分支合并 Merge branch ? of ?
fix: bug 修复
perf: 性能, 体验优化
refactor: 重构代码(既没有新增功能，也没有修复 bug)
style: 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test: 新增测试用例或是更新现有测试
revert: 回滚某个更早之前的提交
chore: 不属于以上类型的其他类型
```

## Git 版本管理

遵从 gitflow 规范

-   新需求开发: 从 master 新建业务分支 feature/xxxxx
-   发布预发版本: 从 master 里面拉一个新分支 release/xxxxx 然后再合并当前业务分支 feature/xxxxxx
-   上线: 发布当前 release 分支，发布完成后合并到 master
-   紧急 bug 修复: 基于 master 新建 hotfix/xxx 分支 发布后合并到 master
