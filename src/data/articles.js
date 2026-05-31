import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'

// Article body components — pure static JSX, no hooks, safe as server or client
function WhyDiversificationBody() {
  return (
    <div className="article-body">
      <p>2000년 닷컴 버블 붕괴 당시, 나스닥 100은 고점 대비 <strong>-83%</strong> 폭락했습니다. 100만원을 투자했다면 17만원만 남습니다. 하지만 같은 기간 미국 채권은 <strong>오히려 상승</strong>했습니다.</p>
      <div className="article-callout">
        <strong>📌 핵심 개념 — 상관계수(Correlation)</strong>
        <p>두 자산이 얼마나 같이 움직이는지를 -1 ~ 1로 표현합니다.</p>
        <ul>
          <li><strong>+1</strong> : 항상 같이 오르고 같이 내린다</li>
          <li><strong>0</strong> : 서로 독립적으로 움직인다</li>
          <li><strong>-1</strong> : 한쪽이 오르면 반드시 내린다</li>
        </ul>
        <p>S&P500과 미국 채권의 상관계수는 약 <strong>-0.15</strong>입니다. 주식이 폭락할 때 채권이 완충재가 되는 이유입니다.</p>
      </div>
      <p>분산투자는 수익을 극대화하는 전략이 아닙니다. <strong>같은 수익을 더 낮은 위험으로 달성하는 전략</strong>입니다. 폭락장에서 손절하지 않고 버틸 수 있도록 심리적 안정도 줍니다.</p>
      <div className="article-callout callout-tip">
        <strong>✅ 실천 가이드</strong>
        <p>「효율적 투자선」 탭에서 자산 조합별 위험 대비 수익을 직접 확인해보세요. 채권이나 금을 섞었을 때 더 효율적인 포트폴리오를 찾을 수 있습니다.</p>
      </div>
    </div>
  )
}

function LeverageETFBody() {
  return (
    <div className="article-body">
      <p>QLD는 나스닥100의 <strong>일간 수익률 2배</strong>, TQQQ는 <strong>3배</strong>를 추종합니다. "나스닥이 10% 오르면 QLD는 20% 오른다"는 말은 맞습니다. 하지만 <strong>장기적으로는 2배 수익이 보장되지 않습니다.</strong></p>
      <div className="article-callout callout-danger">
        <strong>⚡ 변동성 감쇄(Volatility Decay)</strong>
        <p>100만원으로 시작해 이틀을 가정해봅니다.</p>
        <ul>
          <li>1일: 나스닥 -10% → QLD -20% → 80만원</li>
          <li>2일: 나스닥 +11.1% → QLD +22.2% → 97.8만원</li>
        </ul>
        <p>나스닥은 제자리인데, <strong>QLD는 -2.2%</strong>입니다. 변동성이 클수록 이 손실이 누적됩니다.</p>
      </div>
      <p>2000년 닷컴 버블 붕괴가 발생했다면 나스닥 100이 -83% 하락하는 동안 QLD는 <strong>약 -97%</strong>, TQQQ는 이론상 <strong>-99% 이상</strong> 손실을 봤을 것입니다.</p>
      <div className="article-callout callout-tip">
        <strong>✅ 이런 분에게만 적합</strong>
        <ul>
          <li>손실 전체를 감수할 수 있는 소액만 배분</li>
          <li>1~2년 이하 단기 방향성 베팅</li>
          <li>포트폴리오의 5~10% 이하로 제한</li>
        </ul>
        <p>은퇴 자금, 10년 이상 장기 투자금에는 적합하지 않습니다.</p>
      </div>
    </div>
  )
}

function CompoundInterestBody() {
  return (
    <div className="article-body">
      <div className="article-callout">
        <strong>📐 72의 법칙</strong>
        <p><code>72 ÷ 연수익률(%)</code> = 원금이 2배가 되는 데 걸리는 연수</p>
        <ul>
          <li>연 6% 수익률 → 72 ÷ 6 = <strong>12년</strong>마다 2배</li>
          <li>연 10% 수익률 → 72 ÷ 10 = <strong>7.2년</strong>마다 2배</li>
          <li>연 13% 수익률 → 72 ÷ 13 = <strong>5.5년</strong>마다 2배</li>
        </ul>
      </div>
      <p>25세에 월 30만원씩 S&P500(연 10%)에 투자를 시작한 A씨와, 35세에 시작한 B씨를 비교합니다. 65세 은퇴 시점에서 A씨는 <strong>약 2억원 더 많은</strong> 자산을 보유합니다. 투자 원금 차이는 3,600만원에 불과한데 말이죠.</p>
      <p>이것이 "시작이 빠를수록 유리하다"고 말하는 이유입니다. 복리는 초반에는 느리게, 후반에는 <strong>기하급수적으로</strong> 불어납니다. 30년 차트를 보면 마지막 5년에 자산의 절반이 불어나는 것을 볼 수 있습니다.</p>
      <div className="article-callout callout-tip">
        <strong>✅ 오늘 당장 할 수 있는 것</strong>
        <p>시뮬레이터에서 투자 기간을 20년 → 25년으로 5년만 늘려보세요. 수익률보다 <strong>기간</strong>이 더 큰 영향을 미칩니다.</p>
      </div>
    </div>
  )
}

function InvestorProfileBody() {
  return (
    <div className="article-body">
      <p>투자에서 가장 큰 실수는 <strong>자신의 리스크 허용 범위를 과대평가</strong>하는 것입니다. 상승장에서는 누구나 공격적 투자자입니다. 하지만 자산이 40~50% 폭락한 상황에서 패닉셀 없이 버틸 수 있는 사람은 많지 않습니다.</p>
      <div className="article-callout">
        <strong>🛏 수면 테스트</strong>
        <p>"내 투자 자산이 갑자기 <strong>반토막</strong>이 났습니다. 오늘 밤 잘 잘 수 있나요?"</p>
        <ul>
          <li><strong>네, 흔들리지 않을 것 같다</strong> → 공격형 투자자</li>
          <li><strong>조금 걱정되지만 버틸 수 있다</strong> → 균형형 투자자</li>
          <li><strong>너무 불안해서 팔 것 같다</strong> → 안정형 투자자</li>
        </ul>
      </div>
      <p>성향은 고정된 것이 아닙니다. 투자 금액이 커질수록, 은퇴 시점이 가까워질수록 <strong>보수적으로 조정</strong>하는 것이 일반적입니다.</p>
      <div className="article-callout callout-tip">
        <strong>✅ 실천 팁</strong>
        <p>자신이 감내할 수 있는 MDD(최대 낙폭)를 먼저 결정하세요. 시뮬레이터에서 자산을 선택하면 역사적 최대 낙폭이 표시됩니다.</p>
      </div>
    </div>
  )
}

function SCHDGuideBody() {
  return (
    <div className="article-body">
      <p>SCHD(Schwab US Dividend Equity ETF)는 배당을 10년 이상 연속 지급한 미국 우량 기업 100개를 담은 ETF입니다. 단순히 배당수익률이 높은 종목을 모은 게 아니라, <strong>배당 성장 능력</strong>이 있는 기업을 선별합니다.</p>
      <div className="article-callout">
        <strong>💰 배당 재투자의 효과</strong>
        <ul>
          <li>주가 상승분 : 약 7~8%/년</li>
          <li>배당 재투자 : 약 3~4%/년</li>
          <li>합산 총수익률 : <strong>약 10~11%/년</strong></li>
        </ul>
      </div>
      <p>S&P500과 비교했을 때 SCHD의 강점은 <strong>낮은 변동성</strong>입니다. 역사적 최대 낙폭이 약 -32%로, 나스닥(-83%)이나 S&P500(-56%)보다 훨씬 안정적입니다.</p>
      <div className="article-callout callout-tip">
        <strong>✅ 어떤 분께 추천</strong>
        <ul>
          <li>은퇴 후 현금흐름을 원하는 분</li>
          <li>주가 변동이 불안하지만 수익도 원하는 균형형</li>
          <li>S&P500과 함께 포트폴리오 변동성을 낮추고 싶은 분</li>
        </ul>
      </div>
    </div>
  )
}

export const ARTICLES = [
  {
    slug: 'why-diversification',
    badge: '분산투자',
    badgeColor: '#378ADD',
    title: '왜 분산투자가 필요한가?',
    readTime: '4분',
    summary: '달걀을 한 바구니에 담지 마세요. 자산을 분산하면 수익은 지키면서 위험을 크게 줄일 수 있습니다.',
    metaTitle: '왜 분산투자가 필요한가? ETF 포트폴리오 분산 전략',
    metaDescription: '상관계수를 이용한 분산투자 전략을 알아보세요. 닷컴버블 사례로 분산투자의 효과를 수치로 확인합니다.',
    Body: WhyDiversificationBody,
  },
  {
    slug: 'leverage-etf-risk',
    badge: '레버리지',
    badgeColor: '#C0392B',
    title: 'QLD·TQQQ, 레버리지 ETF의 진실',
    readTime: '5분',
    summary: '2배·3배 수익을 약속하는 것 같지만, 장기 보유 시 생각과 다른 결과가 나올 수 있습니다.',
    metaTitle: 'QLD TQQQ 레버리지 ETF 장기투자 위험성 — 변동성 감쇄 설명',
    metaDescription: 'QLD(2x 나스닥), TQQQ(3x 나스닥) 레버리지 ETF의 변동성 감쇄 현상을 수치로 설명합니다. 장기투자에 적합한지 확인하세요.',
    Body: LeverageETFBody,
  },
  {
    slug: 'compound-interest',
    badge: '복리',
    badgeColor: '#1D9E75',
    title: '복리의 마법 — 시간이 최고의 자산',
    readTime: '3분',
    summary: '아인슈타인이 "인류 최고의 발명"이라 불렀다는 복리. 얼마나 강력한지 숫자로 확인해봅니다.',
    metaTitle: '복리 투자의 힘 — 72의 법칙과 시간의 중요성',
    metaDescription: '72의 법칙으로 원금이 2배 되는 기간을 계산해보세요. 25세 vs 35세 투자 시작의 차이와 복리 투자의 실제 효과를 알아봅니다.',
    Body: CompoundInterestBody,
  },
  {
    slug: 'investor-profile',
    badge: '투자 성향',
    badgeColor: '#8E44AD',
    title: '나는 어떤 투자자인가?',
    readTime: '4분',
    summary: '수익률보다 중요한 것은 내 리스크 성향입니다. 자산이 30% 떨어져도 잘 잘 수 있나요?',
    metaTitle: '투자 성향 파악 — 안정형·균형형·공격형 중 나는?',
    metaDescription: '수면 테스트로 나의 투자 리스크 성향을 파악하세요. 성향별 적합한 ETF 포트폴리오 구성 방법을 알아봅니다.',
    Body: InvestorProfileBody,
  },
  {
    slug: 'schd-guide',
    badge: '배당 투자',
    badgeColor: '#BA7517',
    title: 'SCHD — 배당 ETF는 왜 인기인가?',
    readTime: '3분',
    summary: 'SCHD는 단순히 고배당주를 모은 ETF가 아닙니다. 배당 성장과 주가 상승을 동시에 추구합니다.',
    metaTitle: 'SCHD 배당 ETF 완벽 가이드 — 수익률·위험성·장단점',
    metaDescription: 'SCHD(Schwab US Dividend Equity ETF)의 배당 재투자 효과와 S&P500과의 비교를 알아보세요. 은퇴 포트폴리오에 적합한 이유를 설명합니다.',
    Body: SCHDGuideBody,
  },
]
