import { ASSETS, CORR } from '../data/assets.js'

function portfolioStats(weights, keys) {
  let ret = 0
  for (let i = 0; i < keys.length; i++) ret += weights[i] * ASSETS[keys[i]].rate

  let variance = 0
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      variance +=
        weights[i] * weights[j] *
        CORR[keys[i]][keys[j]] *
        ASSETS[keys[i]].stddev * ASSETS[keys[j]].stddev
    }
  }
  return { ret, risk: Math.sqrt(variance) }
}

export function generatePortfolios(keys, n = 3000) {
  if (keys.length < 2) return []
  const portfolios = []
  for (let i = 0; i < n; i++) {
    const raw    = Array.from({ length: keys.length }, () => Math.random())
    const sum    = raw.reduce((a, b) => a + b, 0)
    const weights = raw.map(w => w / sum)
    portfolios.push({ ...portfolioStats(weights, keys), weights })
  }
  return portfolios
}

export function getEfficientFrontier(portfolios) {
  const sorted = [...portfolios].sort((a, b) => b.ret - a.ret)
  const front  = []
  let minRisk  = Infinity
  for (const p of sorted) {
    if (p.risk <= minRisk) { front.push(p); minRisk = p.risk }
  }
  return front
}

export function minVariancePortfolio(portfolios) {
  return portfolios.reduce((best, p) => (p.risk < best.risk ? p : best))
}

export function maxSharpePortfolio(portfolios, rf = 3) {
  return portfolios.reduce((best, p) =>
    (p.ret - rf) / p.risk > (best.ret - rf) / best.risk ? p : best
  )
}
