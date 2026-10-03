/**
 * TRI-MARKET v0.1 - Cloudflare Worker backend skeleton
 * Secrets stay in Worker environment variables. Never put them in app.js.
 *
 * Suggested env vars:
 * FUGLE_API_KEY
 * JQUANTS_API_KEY
 * ALPACA_KEY_ID
 * ALPACA_SECRET_KEY
 * SEC_USER_AGENT   e.g. "TRI-MARKET your-email@example.com"
 */

const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*',...headers}});

export default {
 async fetch(req,env){
  const u=new URL(req.url);
  if(req.method==='OPTIONS')return new Response(null,{headers:{'access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type'}});
  if(u.pathname==='/health')return json({status:'ok',version:'0.1.0',providers:{twse:true,fugle:!!env.FUGLE_API_KEY,jquants:!!env.JQUANTS_API_KEY,alpaca:!!(env.ALPACA_KEY_ID&&env.ALPACA_SECRET_KEY),sec:true}});
  if(u.pathname==='/api/tw/stock-day')return twseStockDay(u.searchParams.get('symbol'));
  if(u.pathname==='/api/tw/valuation')return twseValuation(u.searchParams.get('symbol'));
  if(u.pathname==='/api/us/sec/companyfacts')return secCompanyFacts(u.searchParams.get('cik'),env);
  if(u.pathname==='/api/us/quote')return alpacaLatest(u.searchParams.get('symbol'),env);
  if(u.pathname==='/api/jp/status')return json({configured:!!env.JQUANTS_API_KEY,note:'J-Quants V2 uses API-key authentication. Add endpoint mappings after confirming your subscribed plan/data entitlements.'});
  return json({error:'not_found'},404);
 }
};

async function twseStockDay(symbol){
 if(!symbol)return json({error:'symbol_required'},400);
 const r=await fetch('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL',{headers:{accept:'application/json'}});
 if(!r.ok)return json({error:'twse_error',status:r.status},502);
 const all=await r.json();
 const row=all.find(x=>String(x.Code||x['證券代號']||'').trim()===String(symbol).trim());
 return json({source:'TWSE OpenAPI',symbol,data:row||null});
}
async function twseValuation(symbol){
 if(!symbol)return json({error:'symbol_required'},400);
 const r=await fetch('https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL',{headers:{accept:'application/json'}});
 if(!r.ok)return json({error:'twse_error',status:r.status},502);
 const all=await r.json();
 const row=all.find(x=>String(x.Code||x['證券代號']||'').trim()===String(symbol).trim());
 return json({source:'TWSE OpenAPI',symbol,data:row||null});
}
async function secCompanyFacts(cik,env){
 if(!cik)return json({error:'cik_required'},400);
 const c=String(cik).replace(/\D/g,'').padStart(10,'0');
 const headers={'User-Agent':env.SEC_USER_AGENT||'TRI-MARKET prototype contact@example.com','Accept-Encoding':'gzip, deflate','Host':'data.sec.gov'};
 const r=await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${c}.json`,{headers});
 if(!r.ok)return json({error:'sec_error',status:r.status},502);
 return json({source:'SEC EDGAR CompanyFacts',data:await r.json()});
}
async function alpacaLatest(symbol,env){
 if(!symbol)return json({error:'symbol_required'},400);
 if(!env.ALPACA_KEY_ID||!env.ALPACA_SECRET_KEY)return json({error:'alpaca_not_configured'},503);
 const r=await fetch(`https://data.alpaca.markets/v2/stocks/${encodeURIComponent(symbol)}/snapshot`,{headers:{'APCA-API-KEY-ID':env.ALPACA_KEY_ID,'APCA-API-SECRET-KEY':env.ALPACA_SECRET_KEY}});
 if(!r.ok)return json({error:'alpaca_error',status:r.status},502);
 return json({source:'Alpaca Market Data',symbol,data:await r.json()});
}
