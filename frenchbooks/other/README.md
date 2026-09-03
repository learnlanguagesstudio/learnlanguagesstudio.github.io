# FrenchBooks 產品落地頁

靜態站：品牌 + 商店大鈕 + 賣點 + **Privacy／Terms／Data deletion**（四語）。

部署路徑：本目錄 → 主機 **`/frenchbooks/`**（整站說明見 [`../../README.md`](../../README.md)）。

| 檔案 | 用途 |
|------|------|
| `../index.html` | 產品簡介／商店入口 |
| `../privacy.html` | 隱私權政策（英文為準） |
| `../terms.html` | 使用條款（英文為準） |
| `../data-deletion.html` | 用戶資料刪除指示（Meta／GDPR） |
| `firebase.json` | 舊草稿／參考（不一定上線） |

上線網址：

- https://learnlanguagesstudio.com/frenchbooks/
- https://learnlanguagesstudio.com/frenchbooks/privacy.html
- https://learnlanguagesstudio.com/frenchbooks/terms.html
- https://learnlanguagesstudio.com/frenchbooks/data-deletion.html

聯絡：`support@learnlanguagesstudio.com`

## 商店連結

編輯 [`../app.js`](../app.js) 頂部：

```js
const PLAY_URL = "https://play.google.com/store/apps/details?id=…";
const APP_STORE_URL = "https://apps.apple.com/app/id…";
```

留空字串時按鈕顯示「即將上架」且不可點。

## App 內連結

- [`lib/core/legal/legal_links.dart`](../../../lib/core/legal/legal_links.dart) → `…/frenchbooks/privacy.html`／`terms.html`／`data-deletion.html`
- [`lib/features/vocabulary/anki/export_branding.dart`](../../../lib/features/vocabulary/anki/export_branding.dart) → `kEbookExportPromoUrl`
