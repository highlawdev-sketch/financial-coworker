import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES } from '../../../data/articles'

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: { title: article.metaTitle, description: article.metaDescription },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) notFound()

  const others = ARTICLES.filter(a => a.slug !== slug).slice(0, 3)

  return (
    <article>
      {/* Breadcrumb */}
      <nav style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>홈</Link>
        {' › '}
        <Link href="/guide" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>투자 가이드</Link>
        {' › '}
        <span>{article.title}</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{
            fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px',
            background: article.badgeColor + '1a', color: article.badgeColor,
          }}>
            {article.badge}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>읽는 시간 {article.readTime}</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: '8px' }}>
          {article.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{article.summary}</p>
      </div>

      {/* Article body */}
      <div className="chart-wrap">
        <article.Body />
      </div>

      {/* CTA */}
      <div style={{
        background: 'var(--surface)', border: '0.5px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '1.5rem', margin: '1.5rem 0', textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          직접 숫자를 바꿔가며 확인해보세요.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/simulator" style={{
            padding: '10px 20px', background: 'var(--text)', color: 'var(--bg)',
            borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', display: 'inline-block',
          }}>
            복리 시뮬레이터 →
          </Link>
          <Link href="/goal" style={{
            padding: '10px 20px', background: 'var(--surface2)', color: 'var(--text)',
            border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
            fontSize: '14px', textDecoration: 'none', display: 'inline-block',
          }}>
            목표 역산 계산기
          </Link>
        </div>
      </div>

      {/* Other articles */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>다른 가이드 읽기</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {others.map(a => (
            <Link key={a.slug} href={`/guide/${a.slug}`} style={{
              padding: '12px 16px', background: 'var(--surface)', border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none', display: 'block',
            }}>
              <span style={{ fontSize: '11px', color: a.badgeColor, fontWeight: 600, marginRight: '8px' }}>
                {a.badge}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{a.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
