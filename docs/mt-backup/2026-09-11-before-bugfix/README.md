# MTバックアップ（2026-09-11 バグ修正反映前）

バグ修正（コミット `018e3eb`）をMTに反映する**直前のMT側の状態**のスナップショットです。
ユーザーがMT管理画面からコピーした実物を保存しています。

## 収録ファイル

| ファイル | MTテンプレート名 |
|---|---|
| `layout_module.html` | En 共通レイアウト |
| `style.css` | 【CSS】style.css |
| `animations.css` | 【CSS】animations.css |
| `main_enhanced.js` | 【JS】main_enhanced.js |
| `index.html` | English Top Page |
| `access.html` | Access |

## 使い方（ロールバック手順）

バグ修正版を反映して問題が起きた場合、このフォルダの各ファイルを
MT管理画面の対応テンプレートに全文貼り付け → 保存 → サイト再構築で
反映前の状態に戻せます。

## 注意

- この状態には既知のバグが含まれています（steps-grid衝突、フォント
  二重読み込み、#nav-toggle不一致 など）。恒久運用には使わないこと。
- Contact / About Us / Rent-a-Friend / Rent-a-Family / OK Grandma /
  Privacy Policy / En 料金 のバックアップは git履歴のコミット
  `8bd8805` 時点の templates/ を参照。
