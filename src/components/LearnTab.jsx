'use client'
import { useState } from 'react'
import Link from 'next/link'

// ── Persona data ──────────────────────────────────────────────────
const PERSONAS = [
  {
    key: 'beginner',
    icon: '🌱',
    title: '투자가 처음이에요',
    desc: '아직 시작 전이거나, 기초부터 차근차근 이해하고 싶은 분',
    accentColor: '#1D9E75',
  },
  {
    key: 'investor',
    icon: '📊',
    title: '이미 투자하고 있어요',
    desc: '포트폴리오를 최적화하고 전략적 자산 배분을 고민하는 분',
    accentColor: '#378ADD',
  },
]

// ── Calc preview component ─────────────────────────────────────────
function CalcPreview({ label, rows, cta }) {
  return (
    <div className="calc-preview">
      <div className="calc-preview-label">{label}</div>
      <div className="calc-preview-rows">
        {rows.map((row, i) => (
          <div key={i} className={`calc-preview-row${row.highlight ? ' highlight' : ''}`}>
            <span className="calc-preview-desc">{row.desc}</span>
            <span className="calc-preview-val" style={row.color ? { color: row.color } : {}}>
              {row.val}
            </span>
          </div>
        ))}
      </div>
      <Link href={cta.href} className="calc-preview-cta">
        {cta.label} →
      </Link>
    </div>
  )
}

// ── Article card component ─────────────────────────────────────────
function GuideArticle({ guide, accentColor }) {
  return (
    <article className="guide-article" style={{ borderLeftColor: guide.badgeColor }}>
      <div className="guide-article-header">
        <span className="article-badge" style={{ background: guide.badgeColor + '18', color: guide.badgeColor }}>
          {guide.badge}
        </span>
        <span className="article-readtime">{guide.readTime}</span>
      </div>
      <h3 className="guide-article-title">{guide.title}</h3>
      <p className="guide-article-teaser">{guide.teaser}</p>

      <CalcPreview {...guide.preview} />

      <div className="guide-article-footer">
        {guide.readMore && (
          <Link href={guide.readMore} className="guide-more-link">
            자세히 읽기
          </Link>
        )}
      </div>
    </article>
  )
}

// ── Beginner guides ───────────────────────────────────────────────
const BEGINNER_GUIDES = [
  {
    badge: '첫 투자',
    badgeColor: '#1D9E75',
    readTime: '3분',
    title: '저축만으로는 은퇴 준비가 안 되는 이유',
    teaser:
      '은행 이자와 ETF 수익률의 차이는 작아 보이지만, 30년이 지나면 결과가 4배 이상 달라집니다. 같은 월 50만원으로 시작했을 때 비교해봤습니다.',
    preview: {
      label: '📊 월 50만원 · 30년 투자 시뮬레이션',
      rows: [
        { desc: '은행 예금 (연 3%)', val: '약 2억 9천만원' },
        { desc: 'S&P500 ETF (연 10%)', val: '약 11억 3천만원', highlight: true },
        { desc: '투자 vs 저축 차이', val: '+8억 4천만원', color: '#1D9E75' },
      ],
      cta: { label: '시뮬레이터에서 직접 비교하기', href: '/simulator?p=0&m=50&y=30&a=sp500' },
    },
    readMore: '/guide/compound-interest',
  },
  {
    badge: '복리',
    badgeColor: '#378ADD',
    readTime: '3분',
    title: '5년만 일찍 시작해도 4억이 달라진다',
    teaser:
      '복리는 처음엔 느리게, 후반엔 기하급수적으로 불어납니다. 지금 당장 시작할 수 없더라도, 1년이라도 앞당기는 게 의미 있는 이유를 숫자로 확인해보세요.',
    preview: {
      label: '📊 월 50만원 · S&P500 기준',
      rows: [
        { desc: '지금 시작 · 30년 투자', val: '약 11억 3천만원', highlight: true },
        { desc: '5년 후 시작 · 25년 투자', val: '약 6억 6천만원' },
        { desc: '5년 미룬 대가', val: '-4억 7천만원', color: '#C0392B' },
      ],
      cta: { label: '목표 금액 역산해보기', href: '/goal' },
    },
    readMore: '/guide/compound-interest',
  },
  {
    badge: '자산 선택',
    badgeColor: '#8E44AD',
    readTime: '4분',
    title: '첫 ETF, 뭘 사야 할까?',
    teaser:
      'S&P500, 나스닥 100, SCHD는 각각 수익률·변동성·배당이 다릅니다. 투자 목표와 리스크 성향에 따라 선택이 달라져야 합니다. 기준이 없다면 S&P500부터 시작하는 이유를 설명합니다.',
    preview: {
      label: '📊 초기 1,000만원 + 월 50만원 · 30년 비교',
      rows: [
        { desc: 'S&P500 (연 10%, MDD -56%)', val: '약 12억 2천만원', highlight: true },
        { desc: '나스닥 100 (연 13%, MDD -83%)', val: '약 21억 4천만원' },
        { desc: 'SCHD 배당 (연 11%, MDD -32%)', val: '약 16억 7천만원' },
      ],
      cta: { label: 'S&P500 30년 시나리오 전체 보기', href: '/scenarios/sp500-30years' },
    },
    readMore: '/guide/investor-profile',
  },
  {
    badge: '소액 투자',
    badgeColor: '#BA7517',
    readTime: '2분',
    title: '월 10만원으로도 충분할까?',
    teaser:
      '목돈이 없어도 됩니다. 소액이어도 꾸준히 투자하면 복리 효과가 쌓입니다. 월 10만원부터 시작할 때 30년 후 어떻게 달라지는지 계산해봤습니다.',
    preview: {
      label: '📊 S&P500(10%) 기준 · 30년',
      rows: [
        { desc: '월 10만원 납입', val: '약 2억 2천만원' },
        { desc: '월 30만원 납입', val: '약 6억 8천만원' },
        { desc: '월 50만원 납입', val: '약 11억 3천만원', highlight: true },
      ],
      cta: { label: '내 납입금으로 계산해보기', href: '/simulator?p=0&m=10&y=30&a=sp500' },
    },
  },
]

// ── Investor guides ───────────────────────────────────────────────
const INVESTOR_GUIDES = [
  {
    badge: '분산투자',
    badgeColor: '#378ADD',
    readTime: '4분',
    title: '포트폴리오 분산, 왜 수익이 낮아도 의미 있나?',
    teaser:
      '주식 100%보다 주식 70% + 채권 20% + 금 10%가 오히려 더 효율적일 수 있습니다. 수익을 조금 낮추면서 위험을 절반으로 줄이는 것, 상관계수로 설명합니다.',
    preview: {
      label: '📊 주요 자산 간 상관계수 (역사적 평균)',
      rows: [
        { desc: 'S&P500 ↔ 미국채권', val: '-0.15 (음의 상관)', color: '#BA7517' },
        { desc: 'S&P500 ↔ 금', val: '+0.05 (거의 독립)', highlight: true },
        { desc: '나스닥 ↔ S&P500', val: '+0.95 (매우 높은 상관)' },
      ],
      cta: { label: '8개 자산 상관계수 전체 보기', href: '/correlation' },
    },
    readMore: '/guide/why-diversification',
  },
  {
    badge: '포트폴리오 최적화',
    badgeColor: '#D4537E',
    readTime: '5분',
    title: '내 포트폴리오의 최적 비중을 찾는 방법',
    teaser:
      '효율적 투자선(Efficient Frontier)은 "동일한 위험에서 수익이 최대"인 자산 비중 조합을 보여줍니다. S&P500 + 채권 + 금을 섞을 때 어떤 비중이 최선일까요?',
    preview: {
      label: '📊 S&P500 + 미국채권 + 금 조합 시뮬레이션 (예시)',
      rows: [
        { desc: '최소 분산 포트폴리오', val: '위험 7.8% / 수익 7.9%' },
        { desc: '최고 샤프비율 포트폴리오', val: '위험 12.1% / 수익 9.8%', highlight: true },
        { desc: '→ 비중 (예시)', val: 'S&P500 62% · 채권 28% · 금 10%' },
      ],
      cta: { label: '효율적 투자선 직접 시뮬레이션', href: '/frontier' },
    },
  },
  {
    badge: 'SCHD 배당',
    badgeColor: '#BA7517',
    readTime: '3분',
    title: '배당 ETF(SCHD)로 매달 현금이 들어오는 포트폴리오',
    teaser:
      'SCHD는 배당 성장주 ETF입니다. 배당금을 재투자하면 복리 효과가 극대화되고, 은퇴 후에는 배당금만으로 월 수백만원의 현금흐름을 만들 수 있습니다.',
    preview: {
      label: '📊 초기 1,000만원 + 월 50만원 · SCHD(11%) · 30년',
      rows: [
        { desc: '30년 후 예상 자산', val: '약 16억 7천만원', highlight: true },
        { desc: '연 3% 배당 수익 (재투자 중단 시)', val: '월 약 418만원' },
        { desc: 'MDD (역사적 최대 낙폭)', val: '-32% (S&P500 -56%보다 안전)', color: '#1D9E75' },
      ],
      cta: { label: 'SCHD 30년 시나리오 전체 보기', href: '/scenarios/schd-dividend' },
    },
    readMore: '/guide/schd-guide',
  },
  {
    badge: '레버리지 관리',
    badgeColor: '#C0392B',
    readTime: '5분',
    title: 'QLD·TQQQ, 포트폴리오에 몇 % 담는 게 적정한가?',
    teaser:
      '레버리지 ETF는 상승장에서 폭발적인 수익을 주지만, 최악의 경우 원금의 99%가 사라질 수 있습니다. 전체 포트폴리오에서 레버리지 비중에 따른 최대 손실을 직접 계산해보세요.',
    preview: {
      label: '📊 역사적 최대 낙폭(MDD) 기준 위험 시나리오',
      rows: [
        { desc: 'QLD(2x 나스닥) MDD', val: '-97%' },
        { desc: 'TQQQ(3x 나스닥) MDD', val: '-99%+' },
        { desc: '포트폴리오 10% 편입 시 최대 손실', val: '전체의 약 -9.7%', color: '#C0392B' },
      ],
      cta: { label: 'QLD 위험 시나리오 시뮬레이터에서 확인', href: '/simulator?p=0&m=50&y=20&a=qld' },
    },
    readMore: '/guide/leverage-etf-risk',
  },
]

// ── Main component ────────────────────────────────────────────────
export default function LearnTab() {
  const [persona, setPersona] = useState('beginner')

  const guides        = persona === 'beginner' ? BEGINNER_GUIDES : INVESTOR_GUIDES
  const activePersona = PERSONAS.find(p => p.key === persona)

  return (
    <>
      {/* ── Top hook ── */}
      <div className="lp-hook">
        월 50만원 × S&amp;P500 × 30년 ={' '}
        <strong style={{ color: '#378ADD' }}>약 11억 3천만원</strong>
        <span className="lp-hook-sub">— 지금 내 조건으로 계산해보세요</span>
      </div>

      {/* ── Persona selector ── */}
      <p className="lp-persona-label">나에게 맞는 가이드 선택</p>
      <div className="persona-selector">
        {PERSONAS.map(p => (
          <button
            key={p.key}
            className={`persona-card${persona === p.key ? ' active' : ''}`}
            style={persona === p.key ? { borderColor: p.accentColor, background: p.accentColor + '08' } : {}}
            onClick={() => setPersona(p.key)}
          >
            <span className="persona-icon">{p.icon}</span>
            <span className="persona-title">{p.title}</span>
            <span className="persona-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* ── Article flow ── */}
      <div className="guide-articles">
        {guides.map(g => (
          <GuideArticle key={g.title} guide={g} accentColor={activePersona.accentColor} />
        ))}
      </div>

      <p className="notice">
        ※ 수익률 수치는 역사적 연평균 수익률 기반의 단순 복리 시뮬레이션입니다. 세금·수수료·환율 변동은 미반영이며, 미래 수익을 보장하지 않습니다.
      </p>
    </>
  )
}
