'use client'
import { useState, useMemo } from 'react'
import '../chartSetup.js'
import { Scatter } from 'react-chartjs-2'
import { ASSETS, ASSET_KEYS } from '../data/assets.js'
import {
  generatePortfolios,
  getEfficientFrontier,
  minVariancePortfolio,
  maxSharpePortfolio,
} from '../utils/portfolio.js'

const SCATTER_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: true,
      labels: { color: '#888780', font: { size: 11 }, boxWidth: 12, padding: 14 },
    },
    tooltip: {
      callbacks: {
        label: ctx => `수익률 ${ctx.parsed.y.toFixed(1)}%  /  위험 ${ctx.parsed.x.toFixed(1)}%`,
      },
    },
  },
  scales: {
    x: {
      title: { display: true, text: '연 위험 (변동성, %)', color: '#888780', font: { size: 11 } },
      ticks: { color: '#888780', font: { size: 11 } },
      grid: { color: 'rgba(136,135,128,0.12)' },
      border: { display: false },
    },
    y: {
      title: { display: true, text: '연 기대수익률 (%)', color: '#888780', font: { size: 11 } },
      ticks: { color: '#888780', font: { size: 11 } },
      grid: { color: 'rgba(136,135,128,0.12)' },
      border: { display: false },
    },
  },
}

export default function FrontierTab() {
  const [selected, setSelected] = useState(['sp500', 'bonds', 'gold'])

  function toggle(key) {
    setSelected(prev =>
      prev.includes(key)
        ? prev.length > 2 ? prev.filter(k => k !== key) : prev
        : [...prev, key]
    )
  }

  const selKey   = [...selected].sort().join(',')
  const portfolios = useMemo(() => generatePortfolios(selected, 3000), [selKey])
  const frontier  = useMemo(() => getEfficientFrontier(portfolios), [portfolios])
  const mvp       = useMemo(() => portfolios.length ? minVariancePortfolio(portfolios) : null, [portfolios])
  const msp       = useMemo(() => portfolios.length ? maxSharpePortfolio(portfolios)   : null, [portfolios])

  const chartData = {
    datasets: [
      {
        label: '전체 포트폴리오',
        data: portfolios.map(p => ({ x: p.risk, y: p.ret })),
        backgroundColor: 'rgba(136,135,128,0.18)',
        pointRadius: 2,
        pointHoverRadius: 3,
      },
      {
        label: '효율적 투자선',
        data: [...frontier].sort((a, b) => a.risk - b.risk).map(p => ({ x: p.risk, y: p.ret })),
        backgroundColor: '#378ADD',
        borderColor: '#378ADD',
        pointRadius: 3.5,
        pointHoverRadius: 5,
        showLine: true,
        borderWidth: 1.5,
        fill: false,
        tension: 0.4,
      },
      ...(mvp ? [{
        label: '최소 분산',
        data: [{ x: mvp.risk, y: mvp.ret }],
        backgroundColor: '#1D9E75',
        pointRadius: 9,
        pointHoverRadius: 11,
        pointStyle: 'triangle',
      }] : []),
      ...(msp ? [{
        label: '최고 샤프비율',
        data: [{ x: msp.risk, y: msp.ret }],
        backgroundColor: '#D4537E',
        pointRadius: 9,
        pointHoverRadius: 11,
        pointStyle: 'star',
      }] : []),
    ],
  }

  return (
    <>
      <div className="control-card">
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          포트폴리오에 포함할 자산을 2개 이상 선택하세요
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {ASSET_KEYS.map(k => {
            const on = selected.includes(k)
            return (
              <button key={k} onClick={() => toggle(k)} style={{
                padding: '6px 14px',
                fontSize: '13px',
                borderRadius: '100px',
                border: `1.5px solid ${on ? ASSETS[k].color : 'var(--border)'}`,
                background: on ? `${ASSETS[k].color}1a` : 'var(--surface)',
                color: on ? ASSETS[k].color : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: on ? 600 : 400,
                transition: 'all 0.15s',
              }}>
                {ASSETS[k].name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="chart-wrap">
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>효율적 투자선 (Efficient Frontier)</div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          3,000개 랜덤 포트폴리오 중 동일 위험 대비 최고 수익 구간(파란 선)을 표시합니다.
          역사적 기대수익률·변동성·상관계수 기반.
        </p>
        <div className="chart-inner" style={{ height: '340px' }}>
          <Scatter data={chartData} options={SCATTER_OPTS} />
        </div>
      </div>

      {mvp && msp && (
        <div className="metric-grid">
          <div className="metric-card">
            <div className="label">▲ 최소 분산 포트폴리오</div>
            <div className="value" style={{ fontSize: '15px', marginBottom: '8px' }}>
              위험 {mvp.risk.toFixed(1)}% · 수익 {mvp.ret.toFixed(1)}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {selected.map((k, i) => (
                <span key={k} style={{ marginRight: '6px' }}>
                  <span style={{ color: ASSETS[k].color }}>{ASSETS[k].name}</span>{' '}
                  {(mvp.weights[i] * 100).toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
          <div className="metric-card">
            <div className="label">★ 최고 샤프비율 포트폴리오</div>
            <div className="value" style={{ fontSize: '15px', marginBottom: '8px' }}>
              위험 {msp.risk.toFixed(1)}% · 수익 {msp.ret.toFixed(1)}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {selected.map((k, i) => (
                <span key={k} style={{ marginRight: '6px' }}>
                  <span style={{ color: ASSETS[k].color }}>{ASSETS[k].name}</span>{' '}
                  {(msp.weights[i] * 100).toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="notice">
        ※ 역사적 기대수익률과 상관계수를 가정한 이론적 시뮬레이션입니다. 과거 성과가 미래를 보장하지 않으며, 투자 권유가 아닙니다.
      </p>
    </>
  )
}
