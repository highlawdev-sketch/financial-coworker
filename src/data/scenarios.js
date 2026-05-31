import { calcSeries, calcInvested, fmt } from '../utils/finance.js'
import { ASSETS } from './assets.js'

function compute({ principal, monthly, years, asset, annualRaise = 0 }) {
  const rate    = ASSETS[asset].rate
  const series  = calcSeries(principal, monthly, years, rate, annualRaise)
  const invested = calcInvested(principal, monthly, years, annualRaise)
  const finalVal  = series[series.length - 1]
  const totalInvested = invested[invested.length - 1]
  const gain  = finalVal - totalInvested
  const pct   = ((finalVal / totalInvested - 1) * 100).toFixed(1)
  const cagr  = ((Math.pow(finalVal / Math.max(principal * 10000, 1), 1 / years) - 1) * 100).toFixed(1)
  const labels = Array.from({ length: years + 1 }, (_, i) => i + '년')
  return {
    series, invested, labels, finalVal, totalInvested, gain, pct, cagr,
    finalFmt: fmt(finalVal), gainFmt: fmt(gain), investedFmt: fmt(totalInvested),
    assetColor: ASSETS[asset].color,
    assetName:  ASSETS[asset].name,
  }
}

export const SCENARIOS = [
  {
    slug: 'sp500-30years',
    metaTitle: 'S&P500 30년 적립식 투자하면 얼마? — 시뮬레이션 결과',
    metaDescription: '초기 1,000만원 + 월 50만원을 S&P500 ETF에 30년 투자했을 때 예상 최종 자산과 수익률을 계산합니다.',
    headline: 'S&P500 · 30년 적립식 투자 시뮬레이션',
    subheadline: '초기 1,000만원 + 월 50만원',
    intro: 'S&P500 ETF는 미국 대형주 500개를 추종하는 세계에서 가장 많이 투자되는 인덱스 펀드입니다. 연평균 수익률 약 10%를 장기적으로 기록해왔습니다. 초기 1,000만원으로 시작해 월 50만원씩 30년간 꾸준히 적립식으로 투자하면 어떤 결과가 나올까요?',
    insight: [
      '납입금 1억 8천만원이 복리 효과로 약 11억 3천만원이 됩니다.',
      '투자 수익이 납입 원금의 5배 이상이 되는 시점은 약 25년차입니다.',
      '30년이라는 기간이 길게 느껴질 수 있지만, 25세에 시작하면 55세에 이 금액을 보유하게 됩니다.',
      '같은 금액을 은행 예금(연 3%)에 넣었다면 최종 자산은 약 2억 8천만원으로 S&P500의 1/4 수준입니다.',
    ],
    params: { principal: 1000, monthly: 50, years: 30, asset: 'sp500' },
    results: compute({ principal: 1000, monthly: 50, years: 30, asset: 'sp500' }),
    cta: { label: '내 조건으로 직접 계산하기', href: '/simulator?p=1000&m=50&y=30&a=sp500' },
    related: ['monthly-50k-20years', 'nasdaq-vs-sp500'],
  },
  {
    slug: 'monthly-50k-20years',
    metaTitle: '월 50만원 20년 투자하면 얼마? — ETF 복리 계산',
    metaDescription: '월 50만원씩 20년간 S&P500 ETF에 투자하면 1억 2천만원 납입금이 얼마로 불어나는지 계산합니다.',
    headline: '월 50만원 · 20년 투자하면?',
    subheadline: '초기 투자금 없이 매달 50만원만',
    intro: '초기 목돈이 없어도 됩니다. 매달 50만원씩 20년간 꾸준히 적립식으로 투자하면 어떤 결과가 나올까요? 20년이면 직장인이 35세에 시작해도 55세에 목표에 도달하는 기간입니다.',
    insight: [
      '총 납입금 1억 2천만원이 약 3억 8천만원이 됩니다.',
      '투자 수익만 2억 6천만원, 수익률 약 217%입니다.',
      '매달 50만원은 부담스러울 수 있습니다. 시뮬레이터에서 30만원, 100만원으로 바꿔보세요.',
      '연봉 인상에 따라 납입금을 매년 3%씩 올리면 최종 자산이 약 4억 5천만원까지 늘어납니다.',
    ],
    params: { principal: 0, monthly: 50, years: 20, asset: 'sp500' },
    results: compute({ principal: 0, monthly: 50, years: 20, asset: 'sp500' }),
    cta: { label: '납입금 바꿔서 계산해보기', href: '/simulator?p=0&m=50&y=20&a=sp500' },
    related: ['sp500-30years', 'retire-fund'],
  },
  {
    slug: 'nasdaq-vs-sp500',
    metaTitle: '나스닥 vs S&P500 — 20년 수익률 비교 시뮬레이션',
    metaDescription: '나스닥 100(QQQ)과 S&P500 ETF에 같은 조건으로 20년 투자했을 때 최종 자산을 비교합니다.',
    headline: '나스닥 vs S&P500 · 20년 비교',
    subheadline: '초기 1,000만원 + 월 50만원 동일 조건',
    intro: '나스닥 100과 S&P500은 한국 투자자들이 가장 많이 선택하는 두 가지 ETF입니다. 같은 돈을 같은 기간 투자했을 때 차이가 얼마나 날까요?',
    insight: [
      '나스닥의 높은 기대수익률(~13%)은 높은 변동성(~20%)을 동반합니다.',
      '나스닥은 2000년 닷컴버블 시 -83%, 2022년에도 -35% 하락했습니다.',
      '20년 장기 시각에서는 나스닥이 유리하지만, 폭락장에서 버틸 수 있는 심리적 준비가 필요합니다.',
      'S&P500은 나스닥보다 안정적이고, 기술주 외 섹터도 포함해 분산 효과가 있습니다.',
    ],
    params: null,
    resultsA: compute({ principal: 1000, monthly: 50, years: 20, asset: 'nasdaq' }),
    resultsB: compute({ principal: 1000, monthly: 50, years: 20, asset: 'sp500' }),
    results:  compute({ principal: 1000, monthly: 50, years: 20, asset: 'nasdaq' }),
    isComparison: true,
    cta: { label: '시뮬레이터에서 직접 비교하기', href: '/simulator?p=1000&m=50&y=20&a=nasdaq' },
    related: ['sp500-30years', 'leverage-etf'],
  },
  {
    slug: 'retire-fund',
    metaTitle: '은퇴자금 계산기 — 60세 은퇴 준비 S&P500 시뮬레이션',
    metaDescription: '35세 직장인이 60세 은퇴를 목표로 월 100만원씩 S&P500에 투자하면 얼마를 모을 수 있는지 계산합니다.',
    headline: '60세 은퇴 준비 시뮬레이션',
    subheadline: '35세 시작 · 초기 2,000만원 + 월 100만원',
    intro: '국민연금만으로는 은퇴 후 생활비가 부족합니다. 35세에 시작해 60세까지 25년간 ETF에 투자하면 노후 준비가 얼마나 될까요?',
    insight: [
      '25년 후 예상 자산으로 연 3% 배당 ETF(SCHD 등)에 재투자하면 월 약 350만원의 수입이 가능합니다.',
      '물가상승률을 감안하면 월 납입금을 매년 2~3%씩 올리는 것이 좋습니다.',
      '은퇴 시점에 가까워질수록 채권·배당ETF 비중을 높여 리스크를 줄이는 전략을 권합니다.',
      '같은 금액을 은행 예금(연 3%)에 넣는다면 약 4억 5천만원으로 S&P500의 절반 수준입니다.',
    ],
    params: { principal: 2000, monthly: 100, years: 25, asset: 'sp500' },
    results: compute({ principal: 2000, monthly: 100, years: 25, asset: 'sp500' }),
    cta: { label: '내 은퇴 계획 계산해보기', href: '/goal' },
    related: ['sp500-30years', 'schd-dividend'],
  },
  {
    slug: 'schd-dividend',
    metaTitle: 'SCHD 배당 ETF 30년 투자 시뮬레이션 — 배당 재투자 효과',
    metaDescription: 'SCHD(Schwab US Dividend Equity ETF)에 30년 배당 재투자 투자하면 얼마가 될까요? S&P500과 비교합니다.',
    headline: 'SCHD 배당 ETF · 30년 시뮬레이션',
    subheadline: '배당 재투자 포함 · 초기 1,000만원 + 월 50만원',
    intro: 'SCHD는 미국 배당 성장주 ETF로, 배당금을 재투자하면 복리 효과가 극대화됩니다. 배당수익률 약 3~4%에 주가 상승을 합산하면 연 10~11%의 총수익률을 기대할 수 있습니다.',
    insight: [
      'S&P500과 비슷한 총수익률이지만 변동성이 낮습니다. 최대 낙폭(MDD)은 약 -32%로 S&P500(-56%)보다 안정적입니다.',
      '배당금이 꾸준히 들어오는 심리적 안정감이 장기 투자를 유지하는 데 도움이 됩니다.',
      '은퇴 후에는 배당금을 재투자하지 않고 생활비로 사용할 수 있습니다.',
      'S&P500과 6:4 또는 7:3 비율로 혼합하면 수익성과 안정성을 동시에 확보할 수 있습니다.',
    ],
    params: { principal: 1000, monthly: 50, years: 30, asset: 'schd' },
    results: compute({ principal: 1000, monthly: 50, years: 30, asset: 'schd' }),
    cta: { label: 'SCHD로 직접 시뮬레이션하기', href: '/simulator?p=1000&m=50&y=30&a=schd' },
    related: ['sp500-30years', 'retire-fund'],
  },
]
