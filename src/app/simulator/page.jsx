import { Suspense } from 'react'
import SimulatorTab from '../../components/SimulatorTab'

export const metadata = {
  title: 'ETF 복리 시뮬레이터 — S&P500·나스닥·SCHD 수익률 계산',
  description:
    '초기 투자금·월 납입금·투자 기간·자산을 설정하면 최종 자산과 CAGR을 즉시 계산합니다. S&P500·나스닥·SCHD·레버리지 ETF 지원.',
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div style={{ height: '400px' }} />}>
      <SimulatorTab />
    </Suspense>
  )
}
