import FrontierTab from '../../components/FrontierTab'

export const metadata = {
  title: '효율적 투자선 — 최적 포트폴리오 비중 시뮬레이션',
  description:
    '선택한 자산들로 3,000개 랜덤 포트폴리오를 시뮬레이션해 효율적 투자선을 시각화합니다. 최소 분산·최고 샤프비율 포트폴리오를 찾아보세요.',
}

export default function FrontierPage() {
  return <FrontierTab />
}
