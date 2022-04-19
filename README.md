## my-project

## 运行项目

```
 # 快速启动-自动安装依赖并编译运行h5
 npm run dev
 # 运行
 npm run dev:%PLATFORM%
 # 打包
 npm run build:%PLATFORM%
```

## 新建页面

新建页面: 新建.vue 文件,输入 `layout` vscode 会自动联想代码片段
新建组件: 新建.vue 文件,输入 `component` vscode 会自动联想代码片段

## 三方库归档

```
# 避免重复造轮子,请将你编写或安装引入的类库列举在此
重点提要:

uview-ui - 内含常用 js 方法(节流防抖,对象克隆, 时间格式化等......),请仔细阅读一次官方文档
```

| 包名     | 路径                     | 功能                                                                    |
| -------- | ------------------------ | ----------------------------------------------------------------------- |
| uview-ui | src\uni_modules\uview-ui | 不仅仅是 UI 库,1.8.3 文档: https://v1.uviewui.com/components/intro.html |
| tools.js | src\utils\tools.js       | 仅针对当前项目编写的通用的业务方法 已挂载至全局 `$tools` 对象           |
| timer.js | src\utils\timer.js       | 倒计时 js                                                               |

## Vuex 状态管理

```
# 使用方法
  import useCurrentInstance from '@/hooks/useCurrentInstance'
     setup() {
        const { $vuex } = useCurrentInstance()
        // 获取 Vuex 数据：
        $vuex.get('token')
        $vuex.get('$user.userInfo') // 子属性/模块属性

        // 更新 Vuex 数据：
        $vuex.set('$user.userInfo.avatar', avatar); // 简单的逻辑就不用再去写mutation了

        // 获取 Vuex getters 数据：
        $vuex.getters('$user/getUserInfo');

        // 提交 Vuex mutations：
        $vuex.commit('$user/clearUserInfo', data);

        // 触发 Vuex actions：
        $vuex.dispatch('$user/updateUserInfo', data);
     }

# 数据持久化
  // src\store\index.js
    plugins: [
        createPersistedState({
            paths: ['tokens','$order.orderCount'], // 此处配置需要持久化的数据
            ......
        })
    ]

# 命名规范
  公共mutation方法统一前面加"$"以区分
  模块文件名前统一加"$"防止与公共属性名冲突
```

Api 模块命名空间规范[![bU25FA.png](https://s4.ax1x.com/2022/03/04/bU25FA.png)](https://imgtu.com/i/bU25FA)

## 路径别名

```
# uni-app已配置"@"指向src目录 无需重复配置
# 其他路径别名在vite.config.js文件resolve.alias属性添加
```

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
-   发布预发版本: 由于公司上预发，不需要邮件申请，故仍用对应分支 feature/xxxxx，但要合下 master 分支
-   上线: 从对应分支 feature/xxxxx 拉一个新分支 release/xxxxx ，然后再合 master 分支，发布完成后合并到 master
-   紧急 bug 修复: 基于 master 新建 hotfix/xxx 分支 发布后合并到 master

## 补充

script setup 语法糖基本使用 https://weya4pif1g.feishu.cn/docs/doccnRxpEK73uzpdCsBE342fJZf

uni-app 项目推荐安装 vscode 代码片段插件 uni-app-snippets
