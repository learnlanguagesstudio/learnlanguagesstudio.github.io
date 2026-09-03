# 官網靜態站（learnlanguagesstudio.com）

本機目錄對齊線上路徑，避免根站與產品站混在一起。

```
website/
  index.html / styles.css / app.js   → 網域根 /
  frenchbooks/                       → /frenchbooks/
  README.md                          ← 本說明
```

| 本機 | 上線網址 |
|------|----------|
| `website/index.html` | https://learnlanguagesstudio.com/ |
| `website/frenchbooks/` | https://learnlanguagesstudio.com/frenchbooks/ |

聯絡：`support@learnlanguagesstudio.com`  
© 2026 Learn Languages Studio Limited. All rights reserved.

## 部署

**根站**（覆蓋簡陋首頁；**不要**蓋掉主機上的 `frenchbooks/`）：

上傳 `website/index.html`、`styles.css`、`app.js` 到網站根目錄。

**產品站**：

上傳 `website/frenchbooks/` 內檔案（可略過 `other/`）到主機 `/frenchbooks/`。

## 本機預覽

```bash
# 整站（根 + /frenchbooks/）
cd website && npx --yes serve .

# 只預覽產品站
cd website/frenchbooks && npx --yes serve .
```

## Meta 後台建議填法

| 欄位 | 值 |
|------|-----|
| App Domains | `learnlanguagesstudio.com` |
| Privacy Policy URL | `https://learnlanguagesstudio.com/frenchbooks/privacy.html` |
| User Data Deletion | `https://learnlanguagesstudio.com/frenchbooks/data-deletion.html` |
| Terms of Service URL | `https://learnlanguagesstudio.com/frenchbooks/terms.html` |
| Contact Email | `support@learnlanguagesstudio.com` |

## Meta App ID（App 內 Instagram Stories）

```bash
flutter run --dart-define=META_APP_ID=你的數字ID
```

或改 [`lib/core/config/meta_app_config.dart`](../lib/core/config/meta_app_config.dart)。

## 產品站說明

細節（商店連結、法律頁、App 內 URL）見 [`frenchbooks/other/README.md`](frenchbooks/other/README.md)。
