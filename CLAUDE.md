# CLAUDE.md — ClaudeCode 引き継ぎ情報

このファイルはClaudeCode/TeamAgentが本プロジェクトを継続開発するための引き継ぎ情報です。

---

## 🏢 プロジェクト概要

**Client Partners（クライアントパートナーズ）英語サイト**

- 女性スタッフのみによる便利屋・家族代行・友人代行サービス
- 日本全国展開（東京・大阪・神戸・福岡など）
- 英語サイトURL: `https://www.clientpartners.jp/english/`
- CMS: **Movable Type（MT）**
- MT管理画面: `https://cms.clientpartners.jp/mt/admin`

---

## 📋 サービス一覧

| サービス名 | 説明 |
|---|---|
| Daily Life Support | 日常生活サポート |
| Mental Health Support | メンタルヘルスサポート |
| Cardiovascular Support | 心臓血管サポート |
| Communication Support | コミュニケーションサポート |
| Business Support | ビジネスサポート |
| Rental Friend | 友人代行（Rent-a-Friend） |
| Rental Family | 家族代行（Rent-a-Family） |
| OK Grandma | おばあちゃん代行サービス |

---

## 🗂️ Movable Type テンプレート構成

### テンプレートモジュール
| テンプレート名 | 役割 |
|---|---|
| `En 共通レイアウト` | ヘッダー・フッター・HTML共通部分 |
| `En 料金` | 料金セクション（各サービスページから読み込み） |

### インデックステンプレート
| テンプレート名 | 出力ファイル | 説明 |
|---|---|---|
| `[CSS] style.css` | `english/assets/css/style.css` | メインCSS |
| `En トップページ` | `english/index.html` | トップページ |
| `About Us` | `english/about.html` | 会社紹介・ビジョン |
| `Contact` | `english/contact.html` | お問い合わせ |
| `Access` | `english/access.html` | アクセス |
| `Rent-a-Family` | `english/rent-a-family.html` | 家族代行 |
| `Rent-a-Friend` | `english/rent-a-friend.html` | 友人代行 |
| `OK Grandma` | `english/ok-grandma.html` | おばあちゃん代行 |
| `Privacy Policy` | `english/privacy-policy.html` | プライバシーポリシー |
| `News` | `english/news.html` | ニュース・お知らせ |
| `Terms of Service` | `english/terms.html` | 利用規約 |

---

## 🎨 デザインシステム

### カラーパレット
```css
--primary-orange: #FFAB00;   /* メインオレンジ（STUDIO サイトに合わせた） */
--text-dark: #333333;
--text-gray: #666;
--bg-cream: #F9F5F3;          /* Pick Up セクション背景 */
--bg-white: #ffffff;
```

### フォント
```css
/* 本文 */
font-family: 'Noto Sans JP', sans-serif;

/* セクションタイトル（h2.section-title） */
font-family: 'Noto Sans JP', sans-serif;
font-weight: 700;

/* 装飾用（筆記体なので注意！） */
font-family: 'grandam';
/* ※ grandam は筆記体フォント。セクションタイトルには使わないこと */
```

### フォントの注意点
- `grandam` フォントは**筆記体**です
- セクションタイトルには `Noto Sans JP` を使用すること
- `@font-face` で定義してから `font-family` で使用すること
- `font-family` の中に `src:` を書いてはいけない（`@font-face` の中だけ）

---

## 📝 MTテンプレートの書き方

### テンプレートモジュール（En 共通レイアウト）の構造
```html
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <mt:IndexLink template="[CSS] style.css">
  ...
</head>
<body>
  <!-- ヘッダー -->
  <header class="site-header">...</header>
  
  <!-- コンテンツ -->
  <$mt:var name="contents"$>
  
  <!-- フッター -->
  <footer class="site-footer">...</footer>
</body>
</html>
```

### インデックステンプレートの構造
```html
<$mt:setvar name="title" value="ページタイトル | Client Partners"$>
<$mt:setvar name="description" value="ページの説明文"$>
<$mt:setvar name="canonical" value="https://www.clientpartners.jp/english/ページ名.html"$>

<$mt:setvar name="contents"$>
<!-- ここにページのHTMLを書く -->
</$mt:setvar$>

<mt:include module="En 共通レイアウト">
```

---

## ⚠️ CSS管理の注意事項

### 問題の経緯
- 新しいページ用のCSSを追加したとき、既存のクラス名（`.btn--primary` など）を上書きしてしまい、TOPページのデザインが崩れた
- **必ず既存のCSSを確認してから、重複しないクラス名を使うこと**

### 既存の主要クラス名（上書き禁止）
```
.btn--primary, .btn--outline, .btn--hero, .btn--phone, .btn--pricing
.section-title
.container
.hero, .hero--small
.service-card
.office-card
.site-header, .site-footer
.pickup-section
.pricing-section
.access-section
```

### 新しいページ用のCSSを追加するとき
1. 既存の `style.css` を必ず確認する
2. 新しいクラス名を使う（例: `.contact-section`, `.ok-grandma-intro`）
3. 既存のクラスを継承・拡張する場合は `.existing-class .new-modifier` の形で

---

## 🖼️ 画像管理

- 画像は後から追加予定
- 現在はプレースホルダー（`/english/ページ名-hero.webp` など）
- WebP形式を推奨
- 画像パス: `/english/画像名.webp`

---

## 📞 連絡先情報（機密情報）

**⚠️ このリポジトリは公開されているため、実際の連絡先情報はここに記載しない**

実際の電話番号・メールアドレス・住所はMT管理画面で直接確認・編集すること。

---

## 🔄 開発フロー

1. このリポジトリでHTMLとCSSを編集
2. MT管理画面の対応するテンプレートに貼り付け
3. 「保存」→「サイトを再構築」
4. `Cmd+Shift+R` で強制リロードして確認
5. 確認後、このリポジトリにコミット

---

## 🌐 関連サイトURL

| サイト | URL | 備考 |
|---|---|---|
| 英語サイト（新） | `https://www.clientpartners.jp/english/` | MT上で運用中（未一般公開） |
| 英語サイト（旧） | `http://clientpartners.planet.bindcloud.jp/index.html` | かなり古い。移行元の参考用 |
| 日本語サイト | `https://www.clientpartners.jp/` | 本体HP。英語版の翻訳元 |
| STUDIOデザイン参考 | `https://violet871175.studio.site/` | カラー・レイアウトの参考 |
| MT管理画面 | `https://cms.clientpartners.jp/mt/admin` | テンプレート編集・再構築 |

---

## 🤖 TeamAgent 運用ルール

### ブランチ運用
- `main` ブランチに直接プッシュしない
- 作業は必ずフィーチャーブランチで行い、PRベースで管理する
- ブランチ名: `feature/変更内容` または指定されたブランチ名

### 作業前の必須手順
1. **CLAUDE.md の内容を全部読む**
2. **assets/css/style.css の内容を確認する**
3. **templates/ の各ファイルを確認する**

### 作業後の必須手順
1. 変更内容をコミット（明確なコミットメッセージ）
2. リモートにプッシュ
3. 必要に応じてPR作成

### やっていいこと
- テンプレートHTMLの修正・新規作成
- CSSの追加（既存クラスと重複しない新しいクラス名で）
- CLAUDE.md の未完了タスクの消化
- コンテンツのタイポ修正・翻訳改善

### やってはいけないこと
- 既存CSSクラスの上書き（⚠️ CSS管理の注意事項セクション参照）
- `grandam` フォントをセクションタイトルに使う（筆記体のため）
- 機密情報のコミット（ただし公式サイト掲載済みの公開情報は可）
- MTテンプレート構文の変更（`<$mt:setvar...>` の書き方を守る）
- main ブランチへの直接プッシュ

---

## 📋 作業指示パターン

### CSS修正を頼む場合
```
CLAUDE.md を読んだ上で、
assets/css/style.css の .section-title のフォントを
Noto Sans JP に変更してください。
変更後はコミット・プッシュしてください。
```

### 新しいページを作る場合
```
CLAUDE.md を読んだ上で、
templates/ に新しい terms.html（利用規約ページ）を作成してください。
既存の privacy-policy.html のスタイルに合わせてください。
作成後はコミット・プッシュしてください。
```

### リポジトリのクローン方法
ClaudeCodeが自動でクローンしますが、手動で指示する場合：
```
git clone https://github.com/clientpartners-ai/CP-English.git
```

---

## 📌 未完了タスク

- [ ] 全ページに実際の画像を追加
- [ ] フォームの送信先設定（Contact ページ）
- [ ] 各ページのOGP画像設定
- [ ] Rent-a-Family ページの詳細コンテンツ確認
- [ ] Rent-a-Friend ページの詳細コンテンツ確認
- [ ] Access ページの地図埋め込み
- [ ] モバイル表示の最終確認
- [x] ニュースページ作成済み（コンテンツは後日追加）
- [x] 利用規約ページ作成済み
- [x] トップページ（index.html）テンプレート作成済み
- [ ] リポジトリの公開設定見直し（Public → Private の検討）
