import { useParams } from "react-router-dom"

export default function EventPage() {
  const { uid } = useParams()

  /**
   * 구현 로직
   * 1. uid로 이벤트 데이터 조회 후 이름 보여주기
   * 2. 로그인 여부 체크
   *    - 로그인 X: 로그인 컴포넌트 보여주기
   *    - 로그인 O: 이벤트 스케줄 선택 컴포넌트 보여주기
   */

  return <section>{uid}</section>
}
