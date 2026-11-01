# Svenska Hub

一个奶油色风格的瑞典语学习资源站，包含课程申请、播客、视频、影视、书籍、音乐与跟读练习。

## 打开网站

下载仓库后，在浏览器中打开 `index.html`。主页面是独立 HTML 文件。外部音视频与网站链接需要联网。

## 数据与隐私

收藏、自己添加的资源和笔记只保存在当前浏览器，不会自动上传 GitHub，也不会跨设备同步。换设备或从本地文件切换到在线网站前，使用“数据备份 → 保存备份文件”，再在新浏览器中恢复。恢复会替换当前资源库。

## 修改与构建

源文件位于 `assets/`。使用 Python 3 构建：

```sh
python3 assets/build.py
```

运行功能检查（需要 Node.js）：

```sh
npm install
npm test
```

YouTube 热门视频、播客近期节目和市镇入口是核对时的快照，不保证实时更新。图片与节目内容归各自权利人所有，本仓库未对第三方素材授予再使用许可。

## 发布到 GitHub Pages

在仓库 Settings → Pages 中选择 Deploy from a branch，分支选 main，目录选 / (root)，保存。部署完成后访问 https://mantfly.github.io/svenska-hub/ 。
