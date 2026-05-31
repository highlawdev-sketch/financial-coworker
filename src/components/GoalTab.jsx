'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ASSETS } from '../data/assets.js'
import { fmt } from '../utils/finance.js'
import { calcRequiredMonthly, simpleSavingsYears } from '../utils/goalCalc.js'

const GOAL_ANCHORS = [
  { max: 4999,    icon: '🛡️', title: '비상금 완성',        sub: '6개월 생활비 확보, 심리적 안전망' },
  { max: 9999,    icon: '✈️', title: '여유 자금 확보',      sub: '해외여행·자기계발에 여유 있게 쓸 수 있는 자금' },
  { max: 19999,   icon: '🏠', title: '서울 외곽 전세',      sub: '수도권 소형 전세 보증금 수준' },
  { max: 49999,   icon: '🏘️', title: '수도권 빌라 구입',    sub: '연 3% 수익 시 월 75~150만원 현금 흐름' },
  { max: 99999,   icon: '🏙️', title: '서울 아파트 전세',    sub: '연 3% 배당 ETF 시 월 250만원 수입' },
  { max: 199999,  icon: '🏢', title: '수도권 아파트 구입',   sub: '연 3% 배당 ETF 시 월 500만원 수입' },
  { max: Infinity, icon: '🚀', title: '재정적 자유',         sub: '노동 없이 생활 가능, 연 3% 수익 시 월 500만원+' },
]

const ASSET_KEYS_SAFE = ['sp500', 'nasdaq', 'kospi', 'schd', 'bonds', 'gold']

function displayGoal(man) {
  if (man >= 10000) return (man / 10000).toFixed(man % 10000 === 0 ? 0 : 1) + '억원'
  return man.toLocaleString() + '만원'
}

export default function GoalTab() {
  const router = useRouter()
  const [goalMan,   setGoalMan]   = useState(10000)   // 1억
  const [years,     setYears]     = useState(20)
  const [assetKey,  setAssetKey]  = useState('sp500')
  const [initialMan, setInitialMan] = useState(0)

  const asset    = ASSETS[assetKey]
  const rate     = asset.rate
  const goalWon  = goalMan * 10000
  const initWon  = initialMan * 10000

  const reqMonthlyWon = useMemo(
    () => calcRequiredMonthly(initWon, goalWon, years, rate),
    [initWon, goalWon, years, rate]
  )
  const reqMonthlyMan = Math.ceil(reqMonthlyWon / 10000)
  const isAlreadyReached = reqMonthlyWon <= 0

  // Savings comparison: how long would pure saving take at the same monthly?
  const savingsYrs = useMemo(
    () => isAlreadyReached ? 0 : simpleSavingsYears(initWon, reqMonthlyWon, goalWon),
    [initWon, reqMonthlyWon, goalWon, isAlreadyReached]
  )
  const savedYears = Math.max(0, savingsYrs - years)

  // Delay cost: 5 years later
  const delayYears = Math.max(1, years - 5)
  const delayMonthlyWon = useMemo(
    () => calcRequiredMonthly(initWon, goalWon, delayYears, rate),
    [initWon, goalWon, delayYears, rate]
  )
  const delayMonthlyMan = Math.ceil(delayMonthlyWon / 10000)
  const delayExtra      = delayMonthlyMan - reqMonthlyMan
  const showDelay       = years >= 8 && delayExtra > 0

  // Total contributions comparison
  const totalNow   = reqMonthlyMan * years * 12
  const totalDelay = delayMonthlyMan * delayYears * 12

  const anchor = GOAL_ANCHORS.find(a => goalMan <= a.max) || GOAL_ANCHORS[GOAL_ANCHORS.length - 1]

  // Comparison bar widths
  const barMaxYears = Math.max(years, Math.min(savingsYrs, 80))
  const investPct   = Math.min(100, (years / barMaxYears) * 100)
  const savingsPct  = Math.min(100, (savingsYrs / barMaxYears) * 100)

  function goToSimulator() {
    const p = new URLSearchParams()
    p.set('p', Math.max(100, Math.round(initialMan / 100) * 100))
    p.set('m', Math.min(500, Math.max(0, reqMonthlyMan)))
    p.set('y', years)
    p.set('a', assetKey)
    router.push(`/simulator?${p.toString()}`)
  }

  return (
    <>
      <p className="goal-intro">
        목표 금액을 설정하면 <strong>매달 얼마를 투자해야 하는지</strong> 역산합니다.
        저축만 했을 때와 비교해 투자의 효과를 확인하세요.
      </p>

      {/* ── Inputs ── */}
      <div className="control-card">
        <div className="control-row">
          <span className="control-label">목표 금액</span>
          <input type="range" min={1000} max={300000} step={1000} value={goalMan}
            onChange={e => setGoalMan(Number(e.target.value))} />
          <span className="control-value" style={{ minWidth: '72px' }}>{displayGoal(goalMan)}</span>
        </div>
        <div className="control-row">
          <span className="control-label">달성 기간</span>
          <input type="range" min={3} max={40} step={1} value={years}
            onChange={e => setYears(Number(e.target.value))} />
          <span className="control-value">{years}년</span>
        </div>
        <div className="control-row">
          <span className="control-label">자산 선택</span>
          <select value={assetKey} onChange={e => setAssetKey(e.target.value)}
            style={{ flex: 1, marginRight: 0 }}>
            {ASSET_KEYS_SAFE.map(k => (
              <option key={k} value={k}>{ASSETS[k].name} (~{ASSETS[k].rate}%/yr)</option>
            ))}
          </select>
          <span className="control-value" style={{ color: asset.color }}>{asset.rate}%</span>
        </div>
        <div className="control-row">
          <span className="control-label">초기 투자금</span>
          <input type="range" min={0} max={10000} step={100} value={initialMan}
            onChange={e => setInitialMan(Number(e.target.value))} />
          <span className="control-value">{initialMan.toLocaleString()}만원</span>
        </div>
      </div>

      {/* ── Main result ── */}
      <div className="goal-result-card" style={{ borderColor: isAlreadyReached ? '#1D9E75' : asset.color + '55' }}>
        {isAlreadyReached ? (
          <>
            <div className="goal-result-label">초기 투자금만으로도 달성 가능</div>
            <div className="goal-result-amount" style={{ color: '#1D9E75', fontSize: '28px' }}>
              {initialMan.toLocaleString()}만원 → {displayGoal(goalMan)} 달성 ({years}년 후)
            </div>
          </>
        ) : (
          <>
            <div className="goal-result-label">{displayGoal(goalMan)} 달성을 위한 월 납입금</div>
            <div className="goal-result-amount" style={{ color: asset.color }}>
              {reqMonthlyMan.toLocaleString()}
              <span className="goal-result-unit">만원 / 월</span>
            </div>
            <div className="goal-result-sub">
              {initialMan > 0 ? `초기 ${initialMan.toLocaleString()}만원 + ` : ''}
              매월 {reqMonthlyMan.toLocaleString()}만원 × {years}년
              &nbsp;·&nbsp; 총 납입 약 {Math.round((initialMan + reqMonthlyMan * years * 12) / 10000 * 10) / 10}억원
            </div>
          </>
        )}
      </div>

      {/* ── Investment vs Savings comparison ── */}
      {!isAlreadyReached && savingsYrs < 80 && (
        <div className="chart-wrap">
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1rem' }}>투자 vs 단순 저축 비교</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            같은 월 {reqMonthlyMan.toLocaleString()}만원을 납입했을 때 걸리는 기간 차이입니다.
          </p>

          <div className="compare-bar-row">
            <div className="compare-bar-label">
              <span style={{ color: asset.color, fontWeight: 600 }}>투자</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>({asset.name})</span>
            </div>
            <div className="compare-bar-track">
              <div className="compare-bar-fill" style={{ width: investPct + '%', background: asset.color }} />
            </div>
            <span className="compare-bar-years">{years}년</span>
          </div>

          <div className="compare-bar-row" style={{ marginTop: '10px' }}>
            <div className="compare-bar-label">
              <span style={{ color: '#888780', fontWeight: 500 }}>저축만</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>(0% 이자)</span>
            </div>
            <div className="compare-bar-track">
              <div className="compare-bar-fill" style={{ width: savingsPct + '%', background: '#555553' }} />
            </div>
            <span className="compare-bar-years">{savingsYrs.toFixed(1)}년</span>
          </div>

          {savedYears >= 1 && (
            <div className="compare-highlight" style={{ borderColor: asset.color + '44', color: asset.color }}>
              🚀 투자로 <strong>{Math.round(savedYears)}년 단축!</strong>
              &nbsp;저축만 했다면 {savingsYrs.toFixed(0)}년 걸릴 것을 {years}년 만에 달성합니다.
            </div>
          )}
        </div>
      )}

      {/* ── Delay cost ── */}
      {showDelay && (
        <div className="chart-wrap">
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>5년 미루면 얼마나 손해일까?</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            동일 목표를 5년 후 시작하면 달성 기간이 {delayYears}년으로 짧아져 월 납입금이 늘어납니다.
          </p>

          <div className="delay-grid">
            <div className="delay-item">
              <div className="delay-label">지금 시작</div>
              <div className="delay-amount" style={{ color: '#1D9E75' }}>
                {reqMonthlyMan.toLocaleString()}만원<span style={{ fontSize: '13px' }}>/월</span>
              </div>
              <div className="delay-sub">{years}년 투자 · 총 납입 {totalNow.toLocaleString()}만원</div>
            </div>
            <div className="delay-vs">VS</div>
            <div className="delay-item">
              <div className="delay-label">5년 후 시작</div>
              <div className="delay-amount" style={{ color: '#C0392B' }}>
                {delayMonthlyMan.toLocaleString()}만원<span style={{ fontSize: '13px' }}>/월</span>
              </div>
              <div className="delay-sub">{delayYears}년 투자 · 총 납입 {totalDelay.toLocaleString()}만원</div>
            </div>
          </div>

          <div className="compare-highlight" style={{ borderColor: '#C0392B44', color: '#C0392B' }}>
            ⏰ 5년 미루면 <strong>매달 {delayExtra.toLocaleString()}만원 더</strong> 납입해야 합니다.
            &nbsp;총 납입 차이 약 {Math.round((totalDelay - totalNow) / 10000 * 10) / 10}억원.
          </div>
        </div>
      )}

      {/* ── Goal anchor ── */}
      <div className="goal-anchor-card">
        <span className="goal-anchor-icon">{anchor.icon}</span>
        <div>
          <div className="goal-anchor-title">{displayGoal(goalMan)} = {anchor.title}</div>
          <div className="goal-anchor-sub">{anchor.sub}</div>
        </div>
      </div>

      {/* ── CTA ── */}
      <button className="goto-sim-btn" style={{ background: asset.color }} onClick={goToSimulator}>
        시뮬레이터에서 {years}년 성장 차트 보기 →
      </button>

      <p className="notice">
        ※ 목표 역산 계산기는 고정 연수익률을 가정한 단순 시뮬레이션입니다. 실제 투자 수익률은 시장 상황에 따라 달라집니다.
      </p>
    </>
  )
}
