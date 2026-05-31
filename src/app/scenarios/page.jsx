import Link from 'next/link'
import { SCENARIOS } from '../../data/scenarios'

export const metadata = {
  title: 'ETF 투자 시나리오 모음 — S&P500·나스닥·SCHD 수익률 계산',
  description:
    'S&P500 30년, 월 50만원 20년, 은퇴자금 준비 등 실제 투자 시나리오별 시뮬레이션 결과를 확인하세요.',
}

export default function ScenariosPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.4px' }}>
          투자 시나리오
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          자주 묻는 시나리오별 시뮬레이션 결과를 미리 계산해뒀습니다.
        </p>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {SCENARIOS.map(s => {
          const r = s.results
          return (
            <Link key={s.slug} href={`/scenarios/${s.slug}`} style={{ textDecoration: 'none' }}>
              <div className="metric-card" style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}>
                <div className="label" style={{ marginBottom: '8px' }}>{s.headline}</div>
                <div className="value" style={{ fontSize: '18px', color: r.assetColor, marginBottom: '4px' }}>
                  {r.finalFmt}
                </div>
                <div style={{ fontSize: '12px', color: '#1D9E75' }}>+{r.pct}%</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  자세히 보기 →
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
