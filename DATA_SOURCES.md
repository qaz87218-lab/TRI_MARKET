# TRI-MARKET v0.1 — Data Source Plan

The app intentionally separates the **UI/research engine** from the **market-data backend**. API secrets must stay on the backend.

## Taiwan

### TWSE OpenAPI
- Base: `https://openapi.twse.com.tw/v1`
- Useful datasets include daily stock trading, valuation (P/E, yield, P/B), margin balances, company profiles, material information, income statements and balance sheets.
- Prototype Worker already includes examples for `STOCK_DAY_ALL` and `BWIBBU_ALL`.

### TPEX
- Use official OTC-market public data endpoints/downloads for OTC price, institutional flows, margin and securities lending.
- Endpoint normalization still needs to be implemented in the backend adapter.

### Fugle
- Use for Taiwan real-time trades/candles/order-book style data after supplying `FUGLE_API_KEY` on the backend.
- Do not expose this key in the browser.

## Japan

### J-Quants V2
- Use API-key authentication from the J-Quants dashboard.
- Intended for listed-company master data, daily prices, financial summaries, forecasts and margin-related datasets depending on plan.
- Data redistribution/licensing rules must be respected; this prototype is designed for personal research use.

### JPX public datasets
- Investor-type trading is primarily market-level weekly data, not a Taiwan-style daily per-stock foreign/investment-trust flow.
- Outstanding short-selling positions are published for reportable positions meeting the public threshold.

## United States

### Alpaca Market Data
- Use for real-time/delayed US stock quotes and WebSocket feeds after adding backend credentials.
- UI is localized to Traditional Chinese; original company names remain as secondary labels.

### SEC EDGAR / data.sec.gov
- No API key required for public submissions and XBRL CompanyFacts.
- `data.sec.gov` does not support browser CORS, so the app must request it through the backend.
- Prototype Worker contains `/api/us/sec/companyfacts?cik=...`.

### FINRA
- Short interest is not the same thing as daily short-sale volume.
- Consolidated short interest and OTC/ATS transparency should be ingested according to their publication cadence and terms.

## Data freshness rule

Every displayed value should eventually carry:
1. source,
2. source period,
3. updated-at time,
4. frequency label (`即時`, `每日`, `每週`, `每月兩次`, `季度` etc.).

The analysis engine should use the latest available observation without pretending all factors are real-time.
