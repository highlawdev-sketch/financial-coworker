import '../index.css'
import Nav from '../components/Nav'

export const metadata = {
  metadataBase: new URL('https://financial-coworker.vercel.app'),
  title: {
    default: 'ETF 수익률 계산기 — 복리 투자 시뮬레이터',
    template: '%s | ETF 수익률 계산기',
  },
  description:
    'S&P500·나스닥·SCHD 등 ETF에 적립식 투자했을 때 복리 수익을 계산하세요. 목표 역산, 자산 상관계수, 효율적 투자선까지 한 곳에서.',
  keywords: ['ETF 계산기', '적립식 투자 계산기', '복리 계산기', 'S&P500 수익률', '나스닥 투자', '1억 모으기'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'ETF 수익률 계산기',
    title: 'ETF 수익률 계산기 — 복리 투자 시뮬레이터',
    description: 'S&P500·나스닥·SCHD 등 ETF 복리 수익을 계산하세요.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <div className="header-inner">
            <h1>ETF 수익률 계산기</h1>
            <p>복리 투자 시뮬레이터</p>
          </div>
        </header>

        <main>
          <Nav />
          {children}
        </main>

        <footer>
          © 2025 ETF 수익률 계산기 · 투자에는 항상 위험이 따릅니다
        </footer>
      </body>
    </html>
  )
}
