'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Line } from 'react-chartjs-2'
import { ASSETS } from '../data/assets.js'
import { calcSeries, calcInvested, fmt } from '../utils/finance.js'
import { generateShareCard, downloadOrShare } from '../utils/shareCard.js'
import '../chartSetup.js'

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: 'index' },
  animation: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + '만원',
      },
    },
  },
  scales: {
    x: {
      ticks: { maxTicksLimit: 8, color: '#888780', font: { size: 11 } },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: '#888780',
        font: { size: 11 },
        callback: v => v >= 10000 ? (v / 10000).toFixed(0) + '억' : v.toLocaleString() + '만',
      },
      grid: { color: 'rgba(136,135,128,0.12)' },
      border: { display: false },
    },
  },
}

const ASSET_OPTS = Object.entries(ASSETS).map(([k, v]) => ({ value: k, label: `${v.name}  (~${v.rate}%/yr)`, tag: v.tag }))

function AssetSelect({ value, onChange, includeNone }) {
  const groups = ['지수', '배당', '안전', '레버리지']
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {includeNone && <option value="none">없음</option>}
      {!includeNone && <option value="custom">직접 입력</option>}
      {groups.map(g => {
        const opts = ASSET_OPTS.filter(o => o.tag === g)
        return (
          <optgroup key={g} label={g}>
            {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </optgroup>
        )
      })}
    </select>
  )
}

export default function SimulatorTab() {
  const router      = useRouter()
  const pathname    = usePathname()
  const searchParams = useSearchParams()

  const [principal,   setPrincipal]   = useState(() => Number(searchParams.get('p') || 1000))
  const [monthly,     setMonthly]     = useState(() => Number(searchParams.get('m') || 50))
  const [years,       setYears]       = useState(() => Number(searchParams.get('y') || 20))
  const [asset1,      setAsset1]      = useState(() => {
    const a = searchParams.get('a')
    return (a && (ASSETS[a] || a === 'custom')) ? a : 'sp500'
  })
  const [asset2,      setAsset2]      = useState('none')
  const [customRate,  setCustomRate]  = useState(8)
  const [annualRaise, setAnnualRaise] = useState(() => Number(searchParams.get('r') || 0))
  const [showMilestones, setShowMilestones] = useState(false)
  const [sharing,     setSharing]     = useState(false)
  const [copied,      setCopied]      = useState(false)

  // ── Write URL on state change ──
  useEffect(() => {
    const p = new URLSearchParams()
    p.set('p', principal)
    p.set('m', monthly)
    p.set('y', years)
    p.set('a', asset1)
    if (annualRaise > 0) p.set('r', annualRaise)
    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
  }, [principal, monthly, years, asset1, annualRaise])

  const rate1    = asset1 === 'custom' ? (customRate || 8) : ASSETS[asset1].rate
  const series1  = calcSeries(principal, monthly, years, rate1, annualRaise)
  const invested = calcInvested(principal, monthly, years, annualRaise)

  const finalVal      = series1[series1.length - 1]
  const totalInvested = invested[invested.length - 1]
  const gain  = finalVal - totalInvested
  const pct   = ((finalVal / totalInvested - 1) * 100).toFixed(1)
  const cagr  = ((Math.pow(finalVal / (principal * 10000), 1 / years) - 1) * 100).toFixed(1)

  const a1     = ASSETS[asset1]
  const color1 = asset1 === 'custom' ? '#7F77DD' : a1.color
  const labels = Array.from({ length: years + 1 }, (_, i) => i + '년')

  const datasets = [
    {
      label: '납입금',
      data: invested.map(v => Math.round(v / 10000)),
      borderColor: '#888780',
      backgroundColor: 'transparent',
      borderDash: [4, 4],
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0,
    },
    {
      label: asset1 === 'custom' ? '직접 입력' : a1.name,
      data: series1.map(v => Math.round(v / 10000)),
      borderColor: color1,
      backgroundColor: 'transparent',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
  ]

  if (asset2 !== 'none') {
    const s2 = calcSeries(principal, monthly, years, ASSETS[asset2].rate, annualRaise)
    datasets.push({
      label: ASSETS[asset2].name,
      data: s2.map(v => Math.round(v / 10000)),
      borderColor: ASSETS[asset2].color,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: [6, 3],
      pointRadius: 0,
      tension: 0.3,
    })
  }

  // MDD risk
  const mdd = asset1 !== 'custom' ? a1?.mdd : null
  const worstCase = mdd !== null ? Math.round(finalVal * (1 + mdd / 100)) : null

  // Milestone years
  const milestoneYears = [5, 10, 15, 20, 25, 30].filter(y => y < years)
  if (!milestoneYears.includes(years)) milestoneYears.push(years)

  // ── Share card ──
  async function handleShare() {
    setSharing(true)
    try {
      const canvas = await generateShareCard({
        assetName: asset1 === 'custom' ? '직접 입력' : a1.name,
        assetTag: asset1 === 'custom' ? '커스텀' : a1.tag,
        assetColor: color1,
        years, principal, monthly,
        series: series1,
        finalVal, totalInvested, gain, pct, cagr,
      })
      await downloadOrShare(canvas, {
        assetName: asset1 === 'custom' ? '직접 입력' : a1.name,
        years, finalVal,
      })
    } finally {
      setSharing(false)
    }
  }

  // ── Copy URL ──
  function copyUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="label">최종 자산</div>
          <div className="value">{fmt(finalVal)}</div>
        </div>
        <div className="metric-card">
          <div className="label">총 수익</div>
          <div className="value positive">+{fmt(gain)}</div>
        </div>
        <div className="metric-card">
          <div className="label">수익률</div>
          <div className="value positive">+{pct}%</div>
        </div>
        <div className="metric-card">
          <div className="label">연평균(CAGR)</div>
          <div className="value">{cagr}%/yr</div>
        </div>
      </div>

      <div className="control-card">
        <div className="select-grid">
          <div className="select-group">
            <label>자산 선택</label>
            <AssetSelect value={asset1} onChange={setAsset1} includeNone={false} />
          </div>
          <div className="select-group">
            <label>비교 자산</label>
            <AssetSelect value={asset2} onChange={setAsset2} includeNone={true} />
          </div>
        </div>

        {asset1 === 'custom' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              연 수익률 (%)
            </label>
            <input type="number" value={customRate} min={1} max={100} step={0.1}
              onChange={e => setCustomRate(parseFloat(e.target.value) || 8)} />
          </div>
        )}

        {a1?.leverage && (
          <div className="leverage-warning">
            ⚠ <strong>레버리지 ETF 주의</strong> — 변동성 감쇄(Volatility Decay)로 인해 장기 보유 시 기대수익률이 크게 낮아질 수 있습니다.
          </div>
        )}

        <div className="control-row">
          <span className="control-label">초기 투자금</span>
          <input type="range" min={100} max={10000} step={100} value={principal}
            onChange={e => setPrincipal(Number(e.target.value))} />
          <span className="control-value">{principal.toLocaleString()}만원</span>
        </div>
        <div className="control-row">
          <span className="control-label">월 추가 납입</span>
          <input type="range" min={0} max={500} step={10} value={monthly}
            onChange={e => setMonthly(Number(e.target.value))} />
          <span className="control-value">{monthly}만원</span>
        </div>
        <div className="control-row">
          <span className="control-label">투자 기간</span>
          <input type="range" min={1} max={40} step={1} value={years}
            onChange={e => setYears(Number(e.target.value))} />
          <span className="control-value">{years}년</span>
        </div>
        <div className="control-row">
          <span className="control-label">연 납입 인상률</span>
          <input type="range" min={0} max={10} step={0.5} value={annualRaise}
            onChange={e => setAnnualRaise(Number(e.target.value))} />
          <span className="control-value">{annualRaise === 0 ? '없음' : `+${annualRaise}%/년`}</span>
        </div>
      </div>

      <div className="scenario-bar">
        <span className="scenario-label">빠른 시나리오:</span>
        <button className="scenario-btn" onClick={() => { setPrincipal(500);  setMonthly(0);   setYears(10); }}>500만 · 10년</button>
        <button className="scenario-btn" onClick={() => { setPrincipal(1000); setMonthly(50);  setYears(20); }}>1000만+월50만 · 20년</button>
        <button className="scenario-btn" onClick={() => { setPrincipal(3000); setMonthly(100); setYears(30); }}>3000만+월100만 · 30년</button>
        <button className="scenario-btn url-copy-btn" onClick={copyUrl}>
          {copied ? '✓ 복사됨' : '🔗 이 시나리오 공유'}
        </button>
      </div>

      <div className="chart-wrap">
        <div className="legend">
          {datasets.map(d => (
            <span key={d.label}>
              <span className="dot" style={{ background: d.borderColor }} />
              {d.label}
            </span>
          ))}
        </div>
        <div className="chart-inner">
          <Line data={{ labels, datasets }} options={CHART_OPTS} />
        </div>
      </div>

      {/* ── Share card button ── */}
      <button className="share-card-btn" onClick={handleShare} disabled={sharing}
        style={{ '--accent-color': color1 }}>
        {sharing ? '⏳ 이미지 생성 중...' : '📤 시뮬레이션 결과 이미지로 저장·공유하기'}
      </button>

      {/* ── Milestone table ── */}
      <div className="chart-wrap" style={{ marginTop: '1rem' }}>
        <button
          className="milestone-toggle"
          onClick={() => setShowMilestones(v => !v)}
        >
          <span>연도별 이정표</span>
          <span>{showMilestones ? '▲ 접기' : '▼ 보기'}</span>
        </button>
        {showMilestones && (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="milestone-table">
              <thead>
                <tr>
                  <th>연도</th>
                  <th>예상 자산</th>
                  <th>납입 누계</th>
                  <th>투자 수익</th>
                  <th>수익률</th>
                </tr>
              </thead>
              <tbody>
                {milestoneYears.map(y => {
                  const val  = series1[y]
                  const inv  = invested[y]
                  const prof = val - inv
                  const roi  = ((val / inv - 1) * 100).toFixed(0)
                  return (
                    <tr key={y}>
                      <td style={{ fontWeight: 500 }}>{y}년</td>
                      <td style={{ fontWeight: 600, color: color1 }}>{fmt(val)}</td>
                      <td>{fmt(inv)}</td>
                      <td style={{ color: '#1D9E75' }}>+{fmt(prof)}</td>
                      <td style={{ color: '#1D9E75' }}>+{roi}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── MDD risk box ── */}
      {mdd !== null && (
        <div className="mdd-box">
          <div className="mdd-box-header">
            <span className="mdd-box-title">최대 낙폭(MDD) 기반 리스크 시나리오</span>
            <span className="mdd-badge" style={{ background: a1.color + '22', color: a1.color }}>{a1.tag}</span>
          </div>
          <div className="mdd-grid">
            <div className="mdd-item">
              <div className="mdd-label">역사적 최대 낙폭</div>
              <div className="mdd-value">{mdd}%</div>
              <div className="mdd-sub">과거 최악의 폭락 시</div>
            </div>
            <div className="mdd-item">
              <div className="mdd-label">최악 시나리오 자산</div>
              <div className="mdd-value">{fmt(worstCase)}</div>
              <div className="mdd-sub">{fmt(finalVal)} → {fmt(worstCase)}</div>
            </div>
            <div className="mdd-item">
              <div className="mdd-label">최대 손실 예상액</div>
              <div className="mdd-value">-{fmt(finalVal - worstCase)}</div>
              <div className="mdd-sub">버텨야 하는 금액</div>
            </div>
          </div>
          <p className="mdd-note">
            이 손실이 발생해도 패닉셀 없이 버틸 수 있다면 이 자산이 적합합니다.
          </p>
        </div>
      )}

      <p className="notice">
        ※ 단순 복리 시뮬레이션이며 세금·수수료·환율 변동은 미반영입니다. 레버리지 ETF는 변동성 감쇄로 실제 장기 수익률이 이론치보다 낮을 수 있습니다.
      </p>
    </>
  )
}
