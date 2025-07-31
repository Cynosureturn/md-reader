# 📝 .mdReader

🔗 [Try .mdReader](https://cynosureturn.github.io/md-reader/) 🌐 [Author’s Site](https://cynosureturn.ca)

A lightweight browser-based tool for previewing `.md` (Markdown) files — supporting **drag-and-drop**, **URL loading**, **manual paste**, **multi-tab view**, **PDF printing**, and **multi-language UI**.

---

## ✨ Features

- 🌐 Load and render remote Markdown files from a URL (CORS required)
- 📂 Drag & drop local `.md` files to preview instantly
- 🛡️ Prevents accidental browser file-opening outside the drop zone
- ✏️ Paste Markdown content directly into the interface and render
- 🗂️ Open multiple files in tabs
- 🖨️ Print the active tab as a clean PDF (no header/footer)
- 💾 Download current tab as raw `.md` file
- 🧭 Toggleable sidebar for a distraction-free layout
- 🌐 Switch between English and Simplified Chinese interface

---

## 📦 Usage

### 🔹 Upload `.md` Files
- Drag one or more `.md` files into the **drop zone**
- Or click "Select Files" to choose from your computer

### 🔹 Load from URL
- Paste a raw Markdown file URL into the input field
- Click **"Load and Render"**
- Note: The URL must allow **CORS**

### 🔹 Paste Markdown
- Scroll down to the "Paste Markdown" section in the sidebar
- Paste any `.md` content into the input box
- Click **Render** to preview as a new tab

### 🔹 Save as PDF
- Click **"🖨️ Save active tab as PDF"**
- Make sure to:
  - Disable browser header/footer
  - Use the system’s print dialog

### 🔹 Save as Markdown
- Click **"💾 Save as .md"** to download the current tab's Markdown source
- Useful when content was loaded from URL or pasted manually (no local file available)

### 🔹 Language Toggle
- Use the **radio buttons** at the bottom of the sidebar to switch UI language

---
## 🔍 Why Not Use Other Markdown Tools?

This tool is not an editor — it’s a **reader**, designed for fast and minimalistic consumption of Markdown content.

While there are powerful Markdown editors (like **Typora**, **StackEdit**, or **Dillinger**), this tool serves a different purpose:

| Feature / Tool                         | VSCode Preview | Typora | Dillinger | **This Tool** |
|----------------------------------------|----------------|--------|-----------|---------------|
| Requires installation                  | ✅              | ✅     | ❌        | ❌            |
| Multi-file preview                     | ❌              | ❌     | ❌        | ✅            |
| Drag-and-drop local `.md` files        | ⚠️ Partial      | ✅     | ✅        | ✅            |
| Load Markdown by URL                   | ❌              | ❌     | ❌        | ✅            |
| Paste raw Markdown directly            | ❌              | ✅     | ✅        | ✅            |
| Offline & zero-dependency              | ❌              | ❌     | ❌        | ✅            |
| Multi-language UI                      | ❌              | ❌     | ❌        | ✅            |
| Render-only (non-editable) interface   | ❌              | ❌     | ❌        | ✅            |
| Export clean PDF (print-focused)       | ⚠️ Needs setup  | ✅     | ⚠️        | ✅            |

🧠 This viewer focuses on:

- **Reading, not writing**
- **Quick previews, not formatting**
- **Zero dependencies, instant availability**

---

### 🧩 Dependencies

This project uses the following libraries via CDN:

- [marked.js](https://github.com/markedjs/marked) — Markdown parser
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) — GitHub-style Markdown CSS

They are included directly via `<script>` and `<link>` tags in `index.html`.


## 📄 License

This project is licensed under the MIT License.  
© 2025 Cynosureturn Zenith. All rights reserved.

> This project is shared in the spirit of open learning and creative exploration.  
> You're welcome to use or adapt it.  
> However, proper attribution is expected — especially in any derivative or commercial use.

See the full license text in the [LICENSE](https://cynosureturn.ca/common/md-reader-lite.html?md=/licenses/mit/LICENSE.mit.md&title=MIT+License) file.

---

🛠 This project is open-sourced at [GitHub](https://github.com/Cynosureturn/md-reader).