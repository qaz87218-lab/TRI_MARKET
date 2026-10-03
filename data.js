/* TRI-MARKET v0.1 demo dataset
 * IMPORTANT: All numeric values in this file are synthetic demo values.
 * They are NOT current market quotes and must not be used for trading decisions.
 */
window.TRI_DATA = (() => {
  const factorLabels = {
    flow:'籌碼 / 資金流', trend:'價格趨勢', fundamental:'基本面',
    valuation:'估值', technical:'技術面', event:'事件 / 催化劑'
  };
  const defaultWeights = {flow:25, trend:20, fundamental:25, valuation:15, technical:10, event:5};
  const marketDefaults = {
    TW:{flow:30,trend:20,fundamental:20,valuation:10,technical:10,event:10},
    JP:{flow:25,trend:20,fundamental:25,valuation:15,technical:10,event:5},
    US:{flow:20,trend:20,fundamental:25,valuation:15,technical:10,event:10}
  };
  const marketMeta = {
    TW:{flag:'🇹🇼',label:'台股',currency:'NT$',flowTitle:'法人 / 信用籌碼'},
    JP:{flag:'🇯🇵',label:'日股',currency:'¥',flowTitle:'需給 / 信用 / 空売り'},
    US:{flag:'🇺🇸',label:'美股',currency:'$',flowTitle:'機構 / 放空 / 內部人'}
  };
  const indices = [
    {market:'TW',name:'加權指數',symbol:'TAIEX',value:'—',change:null,source:'TWSE / Fugle',fresh:'等待資料源'},
    {market:'TW',name:'櫃買指數',symbol:'TPEX',value:'—',change:null,source:'TPEX',fresh:'等待資料源'},
    {market:'JP',name:'日經 225',symbol:'N225',value:'—',change:null,source:'JPX / 行情供應商',fresh:'等待資料源'},
    {market:'JP',name:'TOPIX',symbol:'TOPIX',value:'—',change:null,source:'JPX / 行情供應商',fresh:'等待資料源'},
    {market:'US',name:'NASDAQ',symbol:'IXIC',value:'—',change:null,source:'Alpaca / SIP-IEX',fresh:'等待資料源'},
    {market:'US',name:'SOX',symbol:'SOX',value:'—',change:null,source:'行情供應商',fresh:'等待資料源'}
  ];
  const directory = [
    {market:'TW',symbol:'2330',name:'台積電',subName:'Taiwan Semiconductor Manufacturing',exchange:'TWSE',sector:'半導體'},
    {market:'TW',symbol:'6510',name:'精測',subName:'Chunghwa Precision Test Tech.',exchange:'TWSE',sector:'半導體測試'},
    {market:'TW',symbol:'6223',name:'旺矽',subName:'MPI Corporation',exchange:'TWSE',sector:'半導體測試'},
    {market:'TW',symbol:'3661',name:'世芯-KY',subName:'Alchip Technologies',exchange:'TWSE',sector:'ASIC'},
    {market:'JP',symbol:'285A',name:'キオクシアHD',subName:'Kioxia Holdings',exchange:'TSE',sector:'半導體 / Memory'},
    {market:'JP',symbol:'6857',name:'アドバンテスト',subName:'Advantest',exchange:'TSE',sector:'半導體設備'},
    {market:'JP',symbol:'8035',name:'東京エレクトロン',subName:'Tokyo Electron',exchange:'TSE',sector:'半導體設備'},
    {market:'JP',symbol:'5803',name:'フジクラ',subName:'Fujikura',exchange:'TSE',sector:'電纜 / AI Infrastructure'},
    {market:'US',symbol:'MU',name:'美光科技',subName:'Micron Technology',exchange:'NASDAQ',sector:'半導體 / Memory'},
    {market:'US',symbol:'AMD',name:'超微半導體',subName:'Advanced Micro Devices',exchange:'NASDAQ',sector:'半導體 / AI'},
    {market:'US',symbol:'ASML',name:'艾司摩爾',subName:'ASML Holding',exchange:'NASDAQ',sector:'半導體設備'},
    {market:'US',symbol:'NVDA',name:'輝達',subName:'NVIDIA',exchange:'NASDAQ',sector:'半導體 / AI'},
    {market:'US',symbol:'ARM',name:'安謀',subName:'Arm Holdings',exchange:'NASDAQ',sector:'半導體 IP'}
  ];

  const seed = {
    'TW:6510':{
      profileTags:['籌碼型','成長型','高波動','半導體'],
      factorScores:{flow:82,trend:72,fundamental:86,valuation:48,technical:69,event:76},
      quote:{price:null,change:null,changePct:null,volume:null,unit:'NT$',updated:'等待即時行情'},
      spark:[42,45,44,48,52,50,57,59,58,63,66,65,70,72],
      snapshot:{marketCap:'等待資料',pe:'等待資料',pb:'等待資料',rsi:'—',ma50:'—',avgVol:'—'},
      flow:[
        ['外資','等待資料','每日'],['投信','等待資料','每日'],['自營商','等待資料','每日'],
        ['融資餘額','等待資料','每日'],['融券餘額','等待資料','每日'],['借券賣出','等待資料','每日']
      ],
      fundamentals:[['營收 YoY','等待資料'],['EPS YoY','等待資料'],['毛利率','等待資料'],['營益率','等待資料'],['ROE','等待資料'],['營業現金流','等待資料']],
      catalysts:['財報與月營收變化','法人連續性','先進測試需求'],
      risks:['估值擴張過快','籌碼轉弱','終端需求低於預期'],
      freshness:{flow:'今日收盤',trend:'即時 / 日線',fundamental:'最新財報',valuation:'每日',technical:'即時 / 日線',event:'事件更新'}
    },
    'JP:285A':{
      profileTags:['景氣循環','成長型','AI','高波動'],
      factorScores:{flow:66,trend:78,fundamental:81,valuation:54,technical:73,event:88},
      quote:{price:null,change:null,changePct:null,volume:null,unit:'¥',updated:'等待行情資料'},
      spark:[38,41,39,44,47,51,49,56,61,64,62,68,73,77],
      snapshot:{marketCap:'等待資料',pe:'等待資料',pb:'等待資料',rsi:'—',ma50:'—',avgVol:'—'},
      flow:[['信用買残','等待資料','日 / 週'],['信用売残','等待資料','日 / 週'],['信用倍率','等待資料','日 / 週'],['空売り残高','等待資料','營業日'],['海外投資家','市場級資料','每週']],
      fundamentals:[['売上高 YoY','等待資料'],['営業利益率','等待資料'],['EPS','等待資料'],['ROE','等待資料'],['営業CF','等待資料'],['会社予想','等待資料']],
      catalysts:['NAND / Enterprise SSD 報價','AI 儲存需求','資本支出循環'],
      risks:['Memory cycle 反轉','資本支出增加','日圓與景氣波動'],
      freshness:{flow:'JPX / J-Quants 更新頻率',trend:'日線 / 即時源',fundamental:'最新財報',valuation:'每日',technical:'日線 / 即時源',event:'事件更新'}
    },
    'US:MU':{
      profileTags:['景氣循環','成長型','AI','高波動'],
      factorScores:{flow:61,trend:75,fundamental:84,valuation:58,technical:71,event:90},
      quote:{price:null,change:null,changePct:null,volume:null,unit:'$',updated:'等待 Alpaca'},
      spark:[47,45,48,50,53,57,55,60,64,63,68,70,74,76],
      snapshot:{marketCap:'等待資料',pe:'等待資料',pb:'等待資料',rsi:'—',ma50:'—',avgVol:'—'},
      flow:[['機構持股（13F）','等待資料','季度 / 落後'],['內部人交易（Form 4）','等待資料','申報更新'],['放空部位','等待資料','每月兩次'],['場外 / ATS','等待資料','延遲週資料'],['成交量','等待資料','即時']],
      fundamentals:[['營收 YoY','等待 SEC / 財報源'],['毛利率','等待 SEC / 財報源'],['營益率','等待 SEC / 財報源'],['EPS','等待 SEC / 財報源'],['自由現金流','等待 SEC / 財報源'],['淨現金 / 負債','等待 SEC / 財報源']],
      catalysts:['HBM / DRAM / NAND 價格','AI 伺服器需求','財測與資本支出'],
      risks:['Memory 報價反轉','高估值壓縮','供給恢復過快'],
      freshness:{flow:'依資料集',trend:'即時',fundamental:'最新 SEC / 財報',valuation:'即時 / 每日',technical:'即時',event:'事件更新'}
    }
  };

  const macro = [
    {name:'美國 CPI',when:'待連接行事曆',impact:'NASDAQ / SOX / USDJPY'},
    {name:'美國 PCE',when:'待連接行事曆',impact:'美債 / 美股'},
    {name:'FOMC',when:'待連接行事曆',impact:'全球風險資產'},
    {name:'BOJ',when:'待連接行事曆',impact:'日圓 / 日股'},
    {name:'美國 10Y',when:'即時資料源',impact:'成長股估值'},
    {name:'Brent / WTI',when:'即時資料源',impact:'通膨 / 能源股'}
  ];

  return {factorLabels,defaultWeights,marketDefaults,marketMeta,indices,directory,seed,macro};
})();
