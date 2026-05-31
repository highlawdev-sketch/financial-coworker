import GoalTab from '../../components/GoalTab'

export const metadata = {
  title: '목표 역산 계산기 — 1억 모으려면 월 얼마?',
  description:
    '목표 금액과 기간을 설정하면 필요한 월 납입금을 역산합니다. 저축만 했을 때와 투자했을 때의 기간 차이를 비교하세요.',
}

export default function GoalPage() {
  return <GoalTab />
}
