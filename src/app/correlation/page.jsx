import CorrelationTab from '../../components/CorrelationTab'

export const metadata = {
  title: '자산 상관계수 매트릭스 — S&P500·나스닥·채권·금 분산 분석',
  description:
    'S&P500·나스닥·코스피·SCHD·채권·금의 상관계수를 히트맵으로 확인하세요. 분산투자 효과를 수치로 이해합니다.',
}

export default function CorrelationPage() {
  return <CorrelationTab />
}
