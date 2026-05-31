export const ASSETS = {
  sp500:  { name: 'S&P 500',          rate: 10, stddev: 15, color: '#378ADD', mdd: -56, tag: '지수' },
  nasdaq: { name: '나스닥 100',        rate: 13, stddev: 20, color: '#D4537E', mdd: -83, tag: '지수' },
  kospi:  { name: '코스피',            rate: 7,  stddev: 20, color: '#1D9E75', mdd: -72, tag: '지수' },
  schd:   { name: 'SCHD (배당)',       rate: 11, stddev: 14, color: '#8E44AD', mdd: -32, tag: '배당' },
  bonds:  { name: '미국 채권',         rate: 4,  stddev: 5,  color: '#BA7517', mdd: -18, tag: '안전' },
  gold:   { name: '금',                rate: 6,  stddev: 15, color: '#EF9F27', mdd: -45, tag: '안전' },
  qld:    { name: 'QLD (2× 나스닥)',   rate: 22, stddev: 40, color: '#E67E22', mdd: -97, tag: '레버리지', leverage: true },
  tqqq:   { name: 'TQQQ (3× 나스닥)', rate: 35, stddev: 60, color: '#C0392B', mdd: -99, tag: '레버리지', leverage: true },
}

export const CORR = {
  sp500:  { sp500:  1.00, nasdaq:  0.95, kospi:  0.65, schd:  0.90, bonds: -0.15, gold:  0.05, qld:  0.88, tqqq:  0.85 },
  nasdaq: { sp500:  0.95, nasdaq:  1.00, kospi:  0.60, schd:  0.82, bonds: -0.20, gold:  0.02, qld:  0.97, tqqq:  0.95 },
  kospi:  { sp500:  0.65, nasdaq:  0.60, kospi:  1.00, schd:  0.55, bonds: -0.10, gold:  0.10, qld:  0.58, tqqq:  0.55 },
  schd:   { sp500:  0.90, nasdaq:  0.82, kospi:  0.55, schd:  1.00, bonds: -0.12, gold:  0.05, qld:  0.80, tqqq:  0.78 },
  bonds:  { sp500: -0.15, nasdaq: -0.20, kospi: -0.10, schd: -0.12, bonds:  1.00, gold:  0.20, qld: -0.18, tqqq: -0.18 },
  gold:   { sp500:  0.05, nasdaq:  0.02, kospi:  0.10, schd:  0.05, bonds:  0.20, gold:  1.00, qld:  0.02, tqqq:  0.02 },
  qld:    { sp500:  0.88, nasdaq:  0.97, kospi:  0.58, schd:  0.80, bonds: -0.18, gold:  0.02, qld:  1.00, tqqq:  0.99 },
  tqqq:   { sp500:  0.85, nasdaq:  0.95, kospi:  0.55, schd:  0.78, bonds: -0.18, gold:  0.02, qld:  0.99, tqqq:  1.00 },
}

export const ASSET_KEYS = Object.keys(ASSETS)
