# TRI-MARKET v0.1

**台・日・美股研究台**

> PRICE × FLOW × FUNDAMENTALS × VALUATION
>
> 不只追蹤股價。追蹤資金、基本面與市場預期的變化。

## 這版已完成

- 延續 BJT App 的深色側邊欄、白底卡片、圓角與高資訊密度 UI。
- App 操作中可直接新增 / 刪除股票，不需要重新修改程式或部署。
- 研究庫只為你加入的個股建立資料結構；不預先灌入全市場個股資料。
- 台股 / 日股 / 美股使用同一個研究框架，但籌碼欄位依市場制度分開。
- 美股介面以繁體中文為主，英文公司名只作副標。
- 每檔個股有獨立的：
  - 個股特性標籤
  - 六大分析因子
  - 自訂權重
  - 標準模型比較
  - 研究筆記
- 權重可在 App 內滑動模擬；總和 100% 才能儲存。
- 研究設定與筆記存在 `localStorage`，可匯出 / 匯入 JSON。
- PWA / Service Worker 基礎已加入。
- 附 Cloudflare Worker 後端骨架，API secret 不會放在前端。

## 六大分析因子

1. 籌碼 / 資金流
2. 價格趨勢
3. 基本面
4. 估值
5. 技術面
6. 事件 / 催化劑

每個市場有一組標準權重；每檔股票可另外儲存自己的模型。

## 初次使用

直接打開 `index.html` 即可看 UI。建議用 HTTP server：

```bash
python -m http.server 8080
```

再開啟：

```text
http://localhost:8080
```

目前為 **Demo Data mode**。數值不是真實行情。

## 動態新增個股

右上角 `＋ 新增個股`：

1. 選市場：台股 / 日股 / 美股。
2. 輸入代碼或搜尋內建目錄。
3. 找不到時可手動輸入名稱與交易所。
4. 建立後會產生獨立的研究模型、筆記與資料容器。

第一版內建少量常用代碼只為示範搜尋流程；這不是正式股票清單限制。

## 後端

`server/worker.js` 是 Cloudflare Worker 骨架，已示範：

- `/health`
- `/api/tw/stock-day?symbol=2330`
- `/api/tw/valuation?symbol=2330`
- `/api/us/sec/companyfacts?cik=...`
- `/api/us/quote?symbol=MU`

下一階段再把前端各研究欄位正式接到這些 normalized endpoints。

### Secrets

不要把 API key 寫入 `app.js`。

Cloudflare Worker：

```bash
wrangler secret put FUGLE_API_KEY
wrangler secret put JQUANTS_API_KEY
wrangler secret put ALPACA_KEY_ID
wrangler secret put ALPACA_SECRET_KEY
wrangler secret put SEC_USER_AGENT
```

## 建議下一版 v0.2

- 正式接台股 TWSE / TPEX 公開資料。
- 接 Fugle 即時台股。
- 接 J-Quants V2 + JPX 公開空売り / 投資部門別。
- 接 Alpaca 即時美股。
- 接 SEC CompanyFacts / filings 與 FINRA short interest / ATS。
- 建立真正的因子計分函式，而不是 Demo factor score。
- 加入財報日曆、新聞中文摘要、資料更新排程與快取。

## 重要

本 Prototype 只展示 UI、研究流程與資料架構。`data.js` 中所有數字都是合成示範值，不是市場即時數據，也不是投資建議。
