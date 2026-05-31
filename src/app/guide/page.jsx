import Link from 'next/link'
import { ARTICLES } from '../../data/articles'

export const metadata = {
  title: 'ETF 투자 가이드 — 분산투자·복리·레버리지 ETF 완벽 정리',
  description:
    '처음 투자를 시작하는 분을 위한 ETF 투자 가이드. 분산투자의 필요성, 복리의 힘, 레버리지 ETF 위험성 등을 쉽게 설명합니다.',
}

export default function GuidePage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.4px' }}>
          ETF 투자 가이드
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          처음 투자를 시작하거나 개념을 정리하고 싶다면 아래 아티클을 읽어보세요.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ARTICLES.map(a => (
          <Link key={a.slug} href={`/guide/${a.slug}`} style={{ textDecoration: 'none' }}>
            <div className="article-card" style={{ cursor: 'pointer' }}>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px', fontWeight: 600, padding: '3px 9px',
                      borderRadius: '100px',
                      background: a.badgeColor + '1a', color: a.badgeColor,
                    }}
                  >
                    {a.badge}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>읽는 시간 {a.readTime}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', letterSpacing: '-0.2px', color: 'var(--text)' }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
