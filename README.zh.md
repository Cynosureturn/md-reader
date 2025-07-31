# 📝 .mdReader | Markdown 预览工具

🔗 [在线演示](https://cynosureturn.github.io/md-reader/) 🌐 [个人主页](https://cynosureturn.ca)

一个轻量级的浏览器端工具，用于预览 `.md`（Markdown）文件，支持**拖拽上传**、**通过 URL 加载**、**直接粘贴内容**、**多标签查看**、**导出 PDF**，并支持**中英文界面切换**。


---

## ✨ 功能特点

- 🌐 从 URL 加载远程 Markdown 文件并渲染（需允许 CORS）
- 📂 拖拽本地 `.md` 文件以即时预览
- 🛡️ 阻止在非拖拽区域误触打开本地文件
- ✏️ 可在侧边栏直接粘贴 Markdown 内容并渲染
- 🗂️ 支持多个文件，以标签页方式呈现
- 🖨️ 可将当前标签页打印为干净的 PDF（无页眉页脚）
- 💾 可下载当前标签页的 Markdown 源文件（.md）
- 🧭 可折叠的侧边栏，支持专注阅读模式
- 🌐 支持英文和简体中文界面切换
---

## 📦 使用指南

### 🔹 上传 `.md` 文件
- 将一个或多个 `.md` 文件拖拽至**指定区域**
- 或点击“选择文件”按钮从本地上传

### 🔹 从 URL 加载
- 将 Markdown 原始链接粘贴到输入框中
- 点击 **“加载并渲染”**
- 注意：目标链接必须允许 **CORS**

### 🔹 粘贴 Markdown
- 向下滚动至侧边栏中的“粘贴 Markdown”区域
- 粘贴任何 `.md` 内容到输入框中
- 点击 **渲染**，会以新标签页打开预览

### 🔹 导出为 PDF
- 点击 **“🖨️ 保存当前标签页为 PDF”**
- 请确保：
  - 禁用浏览器默认页眉/页脚
  - 使用系统打印对话框导出

### 🔹 导出为 Markdown 文件
- 点击 **“💾 Save as .md”** 按钮可下载当前标签页对应的 Markdown 原文
- 特别适用于从链接或粘贴方式加载的内容（无原始文件）

### 🔹 切换语言
- 使用侧边栏底部的**语言单选按钮**切换界面语言

---

## 🔍 与其他 Markdown 工具的区别？

本工具不是 Markdown 编辑器，而是一个**专注阅读体验的预览器**。

虽然市面上已有如 **Typora**、**StackEdit**、**Dillinger** 等强大工具，但本项目关注的是另一个方向：

| 功能 / 工具                         | VSCode 预览 | Typora | Dillinger | **本工具** |
|--------------------------------------|-------------|--------|-----------|------------|
| 是否需要安装                         | ✅           | ✅     | ❌        | ❌         |
| 支持多个 Markdown 文件同时预览       | ❌           | ❌     | ❌        | ✅         |
| 拖拽本地 `.md` 文件加载              | ⚠️ 部分支持 | ✅     | ✅        | ✅         |
| 支持通过 URL 加载远程 Markdown 文件  | ❌           | ❌     | ❌        | ✅         |
| 粘贴 Markdown 原文直接渲染          | ❌           | ✅     | ✅        | ✅         |
| 离线使用 / 零依赖                    | ❌           | ❌     | ❌        | ✅         |
| 多语言 UI 支持                       | ❌           | ❌     | ❌        | ✅         |
| 纯预览（不可编辑）界面               | ❌           | ❌     | ❌        | ✅         |
| 可导出干净的 PDF（适合打印）         | ⚠️ 需配置    | ✅     | ⚠️        | ✅         |

🎯 本工具关注的核心价值：

- **阅读，而非写作**
- **快速浏览，而非格式编辑**
- **无需安装，开即使用**

---
### 🧩 外部依赖

本项目通过 CDN 引入以下开源库：

- [marked.js](https://github.com/markedjs/marked)：Markdown 渲染引擎
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)：GitHub 风格的 CSS 样式表

它们通过 `<script>` 和 `<link>` 标签直接嵌入在 `index.html` 中。

---

## 📄 授权许可

本项目采用 MIT 开源许可证。  
© 2025 Cynosureturn Zenith. 保留所有权利。

> 本项目以自由学习和创意探索为目的开放共享，欢迎使用与改编。  
> 但请在任何衍生或商用场景中，**保留原作者署名并注明来源**。

完整授权条款请见 [LICENSE](https://cynosureturn.ca/common/md-reader-lite.html?md=/licenses/mit/LICENSE.mit.md&title=MIT+License) 文件。

---

🛠 本项目已在 [GitHub](https://github.com/Cynosureturn/md-reader) 上以开源形式发布。