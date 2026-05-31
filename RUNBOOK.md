# 운영 가이드 (RUNBOOK)

## 목차
1. [환경 요구사항](#1-환경-요구사항)
2. [개발 서버 기동·중지](#2-개발-서버-기동중지)
3. [프로덕션 빌드](#3-프로덕션-빌드)
4. [Vercel 배포](#4-vercel-배포)
5. [디렉토리 구조](#5-디렉토리-구조)

---

## 1. 환경 요구사항

| 항목 | 최소 버전 | 확인 명령 |
|------|-----------|-----------|
| Node.js | 18.x 이상 | `node -v` |
| npm | 9.x 이상 | `npm -v` |

**최초 1회 — 의존성 설치**

```bash
npm install
```

> ⚠️ 사내 네트워크 또는 SSL 인터셉트 환경이라면 아래 명령 후 재시도
> ```bash
> npm config set strict-ssl false
> npm install
> ```

---

## 2. 개발 서버 기동·중지

### 기동

```bash
npm run dev
```

- 브라우저에서 `http://localhost:3000` 접속
- 파일 저장 시 자동으로 핫 리로드됨
- 콘솔에 `✓ Ready in Xs` 메시지가 나오면 정상

### 중지

터미널에서 `Ctrl + C`

> **Windows에서 포트가 이미 사용 중이라는 오류가 나오면**
> ```bash
> # 3000 포트를 점유한 프로세스 확인
> netstat -ano | findstr :3000
>
> # PID로 프로세스 종료 (예: PID가 12345인 경우)
> taskkill /PID 12345 /F
> ```

---

## 3. 프로덕션 빌드

### 빌드

```bash
npm run build
```

- `Next.js`가 모든 페이지를 정적(SSG)으로 사전 렌더링
- 빌드 결과물은 `.next/` 폴더에 생성됨
- 완료 시 각 라우트의 크기와 타입(`○ Static` / `● SSG`)이 출력됨

### 빌드 결과 로컬 미리보기

```bash
npm run build   # 빌드 먼저
npm start       # 프로덕션 서버 실행 (http://localhost:3000)
```

> `npm run dev`와 달리 핫 리로드 없음. 배포 전 최종 확인 용도.

### 빌드 오류 시 체크리스트

```
□ node_modules 폴더가 있는가?          → npm install 재실행
□ .next 폴더가 잠겨 있는가?            → 실행 중인 서버 중지 후 재시도
□ 특정 파일에서 import 오류가 나는가?  → 오류 메시지의 파일명·줄 번호 확인
```

---

## 4. Vercel 배포

### 방법 A — GitHub 자동 배포 (권장)

가장 간단한 방법. **push만 하면 자동 배포됩니다.**

#### 초기 설정 (최초 1회)

```bash
# 1. Git 저장소 초기화
git init
git add .
git commit -m "initial commit"

# 2. GitHub에 레포지토리 생성 후 연결
git remote add origin https://github.com/YOUR_ID/financial-coworker.git
git push -u origin main
```

GitHub에 push 후 Vercel 대시보드에서 해당 레포지토리를 Import하면 설정 완료.

#### 이후 배포

```bash
git add .
git commit -m "변경 내용 요약"
git push
```

push 완료 후 약 1~2분 내 자동 배포됨.

| 브랜치 | 배포 환경 |
|--------|-----------|
| `main` | 프로덕션 (`yoursite.vercel.app`) |
| 그 외 브랜치 | 프리뷰 URL (PR마다 별도 URL 생성) |

---

### 방법 B — Vercel CLI 수동 배포

Git 없이 직접 배포할 때 사용.

#### 설치 (최초 1회)

```bash
npm install -g vercel
vercel login   # 브라우저에서 Vercel 계정 인증
```

#### 배포

```bash
# 프리뷰 배포 (테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

#### Vercel CLI 로컬 개발 서버 (API 포함)

```bash
vercel dev
```

> `npm run dev`와 달리 Vercel 환경과 동일하게 실행됨.

---

### Vercel 프로젝트 설정 확인

`vercel.json` 파일에 설정이 저장되어 있습니다.

```json
{
  "framework": "nextjs"
}
```

Vercel 대시보드에서 별도 빌드 설정을 바꿀 필요 없음.
Next.js 프레임워크를 자동 감지해 `npm run build` → `.next` 배포를 처리합니다.

---

## 5. 디렉토리 구조

```
financial-coworker/
│
├── src/
│   ├── app/                    # Next.js App Router (각 폴더 = URL)
│   │   ├── layout.jsx          # 공통 레이아웃 (헤더·푸터·Nav)
│   │   ├── page.jsx            # / (랜딩·투자 가이드)
│   │   ├── simulator/page.jsx  # /simulator
│   │   ├── goal/page.jsx       # /goal
│   │   ├── correlation/page.jsx
│   │   ├── frontier/page.jsx
│   │   ├── guide/
│   │   │   ├── page.jsx        # /guide (아티클 목록)
│   │   │   └── [slug]/page.jsx # /guide/why-diversification 등
│   │   ├── scenarios/
│   │   │   ├── page.jsx        # /scenarios (시나리오 목록)
│   │   │   └── [slug]/page.jsx # /scenarios/sp500-30years 등
│   │   ├── sitemap.js          # /sitemap.xml 자동 생성
│   │   └── robots.js           # /robots.txt 자동 생성
│   │
│   ├── components/             # 재사용 UI 컴포넌트
│   │   ├── Nav.jsx             # 탭 네비게이션
│   │   ├── SimulatorTab.jsx    # 복리 시뮬레이터
│   │   ├── GoalTab.jsx         # 목표 역산 계산기
│   │   ├── CorrelationTab.jsx  # 자산 상관계수 매트릭스
│   │   ├── FrontierTab.jsx     # 효율적 투자선
│   │   ├── LearnTab.jsx        # 랜딩·투자 가이드
│   │   └── ScenarioMiniChart.jsx
│   │
│   ├── data/
│   │   ├── assets.js           # 자산 기대수익률·변동성·상관계수 상수
│   │   ├── articles.js         # 가이드 아티클 데이터
│   │   └── scenarios.js        # 시나리오 사전 계산 데이터
│   │
│   ├── utils/
│   │   ├── finance.js          # 복리 계산 함수
│   │   ├── portfolio.js        # 포트폴리오 최적화 함수
│   │   ├── goalCalc.js         # 목표 역산 함수
│   │   └── shareCard.js        # 결과 이미지 공유 카드 생성
│   │
│   ├── chartSetup.js           # Chart.js 컴포넌트 전역 등록
│   └── index.css               # 전역 스타일
│
├── next.config.js              # Next.js 설정
├── vercel.json                 # Vercel 배포 설정
├── package.json
├── RUNBOOK.md                  # 이 문서
└── STRATEGY.md                 # 트래픽 전략 문서
```

---

## 빠른 참조

```bash
npm run dev      # 개발 서버 시작 (localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과물 로컬 실행
npm run lint     # 코드 린트 검사

git add . && git commit -m "내용" && git push   # 배포
```
