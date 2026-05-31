import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SCENARIOS } from '../../../data/scenarios'
import ScenarioChartWrapper from '../../../components/ScenarioChartWrapper'

export async function generateStaticParams() {
  return SCENARIOS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const s = SCENARIOS.find(x => x.slug === slug)
  if (!s) return {}
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    openGraph: { title: s.metaTitle, description: s.metaDescription },
  }
}

export default async function ScenarioPage({ params }) {
  const { slug } = await params
  const s = SCENARIOS.find(x => x.slug === slug)
  if (!s) notFound()

  const r = s.results
  const related = SCENARIOS.filter(x => s.related?.includes(x.slug))

  return (
    <article>
      {/* Breadcrumb */}
      <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>홈</Link>
        {' › '}
        <Link href="/scenarios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>시나리오</Link>
        {' › '}
        <span>{s.headline}</span>
      </nav>

      {/* Title */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '4px', lineHeight: 1.3 }}>
        {s.headline}
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{s.subheadline}</p>

      {/* Key metrics */}
      <div className="metric-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="metric-card">
          <div className="label">최종 자산</div>
          <div className="value" style={{ color: r.assetColor }}>{r.finalFmt}</div>
        </div>
        <div className="metric-card">
          <div className="label">납입 총액</div>
          <div className="value">{r.investedFmt}</div>
        </div>
        <div className="metric-card">
          <div className="label">투자 수익</div>
          <div className="value positive">+{r.gainFmt}</div>
        </div>
        <div className="metric-card">
          <div className="label">수익률</div>
          <div className="value positive">+{r.pct}%</div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-wrap" style={{ marginBottom: '1.5rem' }}>
        <ScenarioChartWrapper
          series={r.series}
          invested={r.invested}
          labels={r.labels}
          color={r.assetColor}
          assetName={r.assetName}
        />
      </div>

      {/* Intro + insights */}
      <div className="chart-wrap" style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text)' }}>
          {s.intro}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {s.insight.map((text, i) => (
            <div key={i} style={{
              display: 'flex', gap: '10px', fontSize: '13px',
              color: 'var(--text-muted)', lineHeight: 1.7,
            }}>
              <span style={{ color: r.assetColor, flexShrink: 0, fontWeight: 700 }}>✓</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'var(--surface)', border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          납입금·기간·자산을 바꿔가며 내 조건에 맞는 결과를 확인해보세요.
        </p>
        <Link href={s.cta.href} style={{
          display: 'inline-block', padding: '12px 28px',
          background: r.assetColor, color: '#fff',
          borderRadius: 'var(--radius-sm)', fontSize: '14px',
          fontWeight: 600, textDecoration: 'none',
        }}>
          {s.cta.label}
        </Link>
      </div>

      {/* Related scenarios */}
      {related.length > 0 && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>관련 시나리오</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {related.map(rel => (
              <Link key={rel.slug} href={`/scenarios/${rel.slug}`} style={{
                padding: '12px 16px', background: 'var(--surface)',
                border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
                textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{rel.headline}</span>
                <span style={{ fontSize: '13px', color: rel.results.assetColor, fontWeight: 600 }}>
                  {rel.results.finalFmt}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="notice" style={{ marginTop: '1.5rem' }}>
        ※ 역사적 연평균 수익률을 가정한 단순 복리 시뮬레이션입니다. 세금·수수료·환율 변동은 미반영이며, 과거 성과가 미래를 보장하지 않습니다.
      </p>
    </article>
  )
}
