// === Configure marked renderer ===
const renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  const html = marked.Renderer.prototype.link.call(this, href, title, text);
  return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
};

marked.setOptions({ renderer });

const dropZone = document.getElementById('drop-zone');
const tabContainer = document.getElementById('tab-container');
const tabContentContainer = document.getElementById('tab-content-container');
const errorMsgEl = document.getElementById('url-error-msg');

// === Feature 1: Load from URL ===
document.getElementById('load-url-btn').addEventListener('click', async () => {
  const url = document.getElementById('markdown-url').value.trim();
  errorMsgEl.innerText = ''; // Clear previous error
  if (!url) {
    errorMsgEl.innerText = langData[currentLanguage].errorEmptyURL;
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Request failed");
  const text = await res.text();
  createTabFromMarkdown(url.split('/').pop() || 'Remote File', marked.parse(text), false, text);
  } catch (err) {
    errorMsgEl.innerText = langData[currentLanguage].errorLoadFail;
  }
});

// === Feature 2: Drag & Drop local files ===
const dropErrorMsgEl = document.getElementById('drop-error-msg');
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const files = Array.from(e.dataTransfer.files).filter(file => file.name.endsWith('.md'));
  dropErrorMsgEl.innerText = ''; // Clear previous error

  if (files.length === 0) {
    dropErrorMsgEl.innerText = langData[currentLanguage].errorInvalidFile;
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      createTabFromMarkdown(file.name, marked.parse(reader.result), false, reader.result);
    };
    reader.readAsText(file);
  });
});
// === Global drag-and-drop prevent default outside drop-zone ===
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => e.preventDefault());

const dragOverlay = document.getElementById('drag-overlay');

window.addEventListener('dragenter', () => {
  dragOverlay.classList.add('active');
});

window.addEventListener('dragleave', (e) => {
  // Only remove overlay when mouse leaves viewport
  if (e.clientX === 0 && e.clientY === 0) {
    dragOverlay.classList.remove('active');
  }
});

window.addEventListener('drop', () => {
  dragOverlay.classList.remove('active');
});

const fileInput = document.getElementById('file-input');
const filePickerBtn = document.getElementById('file-picker-btn');

filePickerBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files).filter(file => file.name.endsWith('.md'));
  if (files.length === 0) {
    dropErrorMsgEl.innerText = langData[currentLanguage].errorInvalidFile;
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      createTabFromMarkdown(file.name, marked.parse(reader.result), file.name);
    };
    reader.readAsText(file);
  });

  // Reset input to allow re-uploading the same file
  fileInput.value = '';
});

// === Paste .md ===
const pasteError = document.getElementById('paste-error-msg');
document.getElementById('render-paste-btn').addEventListener('click', () => {
  const rawText = document.getElementById('markdown-input').value.trim();
  pasteError.innerText = '';

  if (!rawText) {
    pasteError.innerText = langData[currentLanguage].errorEmptyPaste;
    return;
  }

  const title = langData[currentLanguage].pastedTabTitle;
  createTabFromMarkdown(title, marked.parse(rawText), false, rawText);
  document.getElementById('markdown-input').value = '';
});



// === Core: Create a tab and its content ===
function createTabFromMarkdown(filename, htmlContent, isReadme = false, rawMarkdown = '') {
  const tabId = `tab-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  // Create tab with close button
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.dataset.target = tabId;

  if (isReadme) {
    tab.dataset.readme = "true";
  }

  const titleSpan = document.createElement('span');
  titleSpan.textContent = filename;
  titleSpan.className = 'tab-title';

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  closeBtn.className = 'tab-close';
  closeBtn.title = 'Close this tab';

  tab.appendChild(titleSpan);
  tab.appendChild(closeBtn);
  tabContainer.appendChild(tab);

  // Create content container
  const contentEl = document.createElement('article');
  contentEl.className = 'markdown-body';
  contentEl.id = tabId;
  contentEl.innerHTML = htmlContent;
    contentEl.querySelectorAll('a[href]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  // Store raw markdown as data attribute
  contentEl.dataset.rawMarkdown = rawMarkdown;

  tabContentContainer.appendChild(contentEl);

  // Tab click handler
  titleSpan.addEventListener('click', () => {
    activateTab(tabId);
  });

  // Close button handler
  closeBtn.addEventListener('click', e => {
    e.stopPropagation(); // Prevent tab activation
    tab.remove();
    contentEl.remove();

    // If the closed tab is active, switch to the last remaining tab
    if (tab.classList.contains('active')) {
      const remainingTabs = tabContainer.querySelectorAll('.tab');
      if (remainingTabs.length) {
        const lastTabId = remainingTabs[remainingTabs.length - 1].dataset.target;
        activateTab(lastTabId);
      }
    }
  });

  // Auto-activate new tab
  activateTab(tabId);
}

// === Activate Tab ===
function activateTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content-container article').forEach(c => c.classList.remove('active'));

  const tab = tabContainer.querySelector(`[data-target="${tabId}"]`);
  const content = document.getElementById(tabId);

  if (tab && content) {
    tab.classList.add('active');
    content.classList.add('active');
  }
}

// === Sidebar ===
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  document.body.classList.toggle('sidebar-collapsed');
});

document.getElementById('print-btn').addEventListener('click', () => {
  window.print();
});

// === lang ===
let currentLanguage = 'en';
const langData = {
  en: {
    title: ".mdReader | Cynosureturn.ca",
    urlSectionTitle: "Load from URL",
    urlPlaceholder: "Enter a Markdown file URL",
    urlButton: "Enter",
    uploadTitle: "Upload Markdown",
    dropzone: 'Drag & drop <code>.md</code> files',
    selectFiles: "Select Files",
    pasteSectionTitle: "Paste Markdown",
    pastePlaceholder: "Paste your Markdown content here...",
    pasteButton: "Render",
    errorEmptyPaste: "Please paste some Markdown content first.",
    pastedTabTitle: "Pasted Markdown",
    usageTitle: "Usage Guide",
    usageItems: [
      "🌐 Load Markdown from a URL (CORS must be allowed)",
      "📂 Upload local <code>.md</code> files via drag & drop or “Select Files”",
      "✏️ Paste Markdown content directly into the Paste section and render",
      "📑 Multiple files are supported via tabs",
      "📤 Use “Save as PDF” or “Save as .md” to export the active tab",
      "↔️ Collapse the sidebar with ☰ button",
      "💡 Tip: Disable browser header/footer for clean printing"
    ],
    scrollTopButton: "⏫ Back to Top",
    printButton: "🖨️ Save active tab as PDF",
    downloadMdButton: "💾 Save as .md",
    renderedOutputTitle: "Rendered Output",
    errorInvalidFile: "Only Markdown files ending with \".md\" are supported.",
    errorEmptyURL: "Please enter a valid URL.",
    errorLoadFail: "Failed to load content. The URL may be invalid or blocked by CORS.",
  },
  zh: {
    title: ".mdReader | Cynosureturn.ca",
    urlSectionTitle: "从链接加载",
    urlPlaceholder: "请输入 Markdown 文件链接",
    urlButton: "加载并渲染",
    uploadTitle: "上传 Markdown",
    dropzone: "拖拽 <code>.md</code> 文件到此区域",
    selectFiles: "选择文件",
    pasteSectionTitle: "粘贴 Markdown",
    pastePlaceholder: "请在此粘贴 Markdown 内容...",
    pasteButton: "渲染",
    errorEmptyPaste: "请先粘贴一些 Markdown 内容。",
    pastedTabTitle: "粘贴的内容",
    usageTitle: "使用说明",
    usageItems: [
      "🌐 支持从链接加载（需允许 CORS）",
      "📂 拖拽或点击“选择文件”上传本地 <code>.md</code> 文件",
      "✏️ 直接在“粘贴 Markdown”区域粘贴内容并渲染",
      "📑 多文件将自动以标签页展示",
      "📤 可使用“保存为 PDF”或“另存为 .md”导出当前标签页内容",
      "↔️ 使用 ☰ 按钮折叠侧边栏",
      "💡 提示：可关闭浏览器页眉/页脚获得干净版 PDF"
    ],
    scrollTopButton: "⏫ 返回顶部",
    printButton: "🖨️ 打印当前标签页为 PDF",
    downloadMdButton: "💾 另存为 .md",
    renderedOutputTitle: "渲染结果",
    errorInvalidFile: "仅支持扩展名为 .md 的 Markdown 文件。",
    errorEmptyURL: "请输入有效的链接。",
    errorLoadFail: "加载失败。链接无效或被 CORS 拦截。",
  }
};

document.querySelectorAll('input[name="language"]').forEach(radio => {
  radio.addEventListener('change', e => {
    setLanguage(e.target.value);

    if (errorMsgEl) {
      errorMsgEl.innerText = '';
    }
    if (dropErrorMsgEl) {
      dropErrorMsgEl.innerText = '';
    }
    if (pasteError) {
      pasteError.innerText = '';
    }
  });
});

function setLanguage(lang = 'en') {
  currentLanguage = lang;
  const t = langData[lang];
  if (!t) return;

  document.querySelector('header h1').textContent = t.title;
  document.querySelector('#load-via-url h2').textContent = t.urlSectionTitle;
  document.querySelector('#markdown-url').placeholder = t.urlPlaceholder;
  document.querySelector('#load-url-btn').textContent = t.urlButton;

  document.querySelector('#dropbox h2').textContent = t.uploadTitle;
  document.querySelector('#drop-zone').innerHTML = t.dropzone;
  document.querySelector('#file-picker-btn').textContent = t.selectFiles;

  document.getElementById('paste-title').textContent = t.pasteSectionTitle;
  document.getElementById('markdown-input').placeholder = t.pastePlaceholder;
  document.getElementById('render-paste-btn').textContent = t.pasteButton;

  document.querySelector('#usage-instructions h2').textContent = t.usageTitle;

  const usageList = document.querySelector('#usage-instructions ul');
  usageList.innerHTML = '';
  t.usageItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = item;
    usageList.appendChild(li);
  });

  document.getElementById('scroll-to-top-btn').textContent = t.scrollTopButton;
  document.getElementById('print-btn').textContent = t.printButton;
  document.getElementById('download-md-btn').textContent = t.downloadMdButton;

  const renderedTitle = document.getElementById('rendered-output-title');
  if (renderedTitle) {
    renderedTitle.textContent = t.renderedOutputTitle;
  }
    // === Auto-refresh README tab content ===
  const currentReadmeTab = document.querySelector('.tab[data-readme="true"]');

  if (currentReadmeTab) {
    const tabId = currentReadmeTab.dataset.target;
    document.getElementById(tabId)?.remove();
    currentReadmeTab.remove();
    loadReadme();
  }
}


const defaultLanguage = navigator.language.startsWith('zh') ? 'zh' : 'en';
setLanguage(defaultLanguage);

function loadReadme() {
  const isZh = currentLanguage === 'zh';
  const filename = isZh ? 'README.zh.md' : 'README.md';
  const title = isZh ? 'README 使用说明' : 'README.md';

  const exists = document.querySelector('.tab[data-readme="true"]');
  if (exists) return;

  fetch(filename)
    .then(res => res.ok ? res.text() : Promise.reject('Readme not found'))
    .then(md => {
      const html = marked.parse(md);
      createTabFromMarkdown(title, html, true, md);
    })
    .catch(err => {
      console.error('[README fetch failed]', err);
    });
}


window.addEventListener('DOMContentLoaded', () => {
  loadReadme();
});

document.getElementById('load-readme-btn')?.addEventListener('click', loadReadme);
document.getElementById('scroll-to-top-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('download-md-btn').addEventListener('click', () => {
  const activeTab = tabContainer.querySelector('.tab.active');
  if (!activeTab) return;

  const tabId = activeTab.dataset.target;
  const contentEl = document.getElementById(tabId);
  if (!contentEl || !contentEl.dataset.rawMarkdown) return;

  const raw = contentEl.dataset.rawMarkdown;
  const blob = new Blob([raw], { type: 'text/markdown' });

  const filename = activeTab.querySelector('.tab-title')?.textContent || 'document.md';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  a.click();

  URL.revokeObjectURL(a.href);
});