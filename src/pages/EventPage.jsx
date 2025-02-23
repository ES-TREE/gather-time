import { useState } from "react"
import { useParams } from "react-router-dom"
import FixedBottomButton from "../components/button/FixedBottomButton"
import DateRangeCalendar from "../components/calendar/DateRangeCalendar"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import Tab from "../components/common/Tab"

/**
 * 구현 로직
 * 1. uid로 이벤트 데이터 조회 후 이름 보여주기
 * 2. 로그인 여부 체크
 *    - 로그인 X: 로그인 컴포넌트 보여주기
 *    - 로그인 O: 이벤트 스케줄 선택 컴포넌트 보여주기
 */

export default function EventPage() {
  const tabs = [
    {
      id: "input",
      label: "입력",
      jsx: (
        <>
          <section>
            <div className="space-y-1">
              <h2 className="font-bold">일정 선택</h2>
              <p className="text-sm text-stone-500">
                참여 가능한 일정을 선택해주세요.
              </p>
            </div>

            <DateRangeCalendar />
          </section>

          <FixedBottomButton>초기화</FixedBottomButton>
        </>
      ),
    },
    {
      id: "view",
      label: "조회",
      jsx: (
        <>
          <DateRangeCalendar />
        </>
      ),
    },
  ]

  const { uid } = useParams()
  const [currentTab, setCurrentTab] = useState(tabs[0].id)
  const isLoggedIn = true

  return isLoggedIn ? (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">이벤트 아이디: {uid}</h2>

      <Tab tabs={tabs} currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  ) : (
    <>
      <div className="flex h-[calc(100vh-96px)] flex-col justify-center gap-8">
        <section className="text-center">
          <h2 className="text-lg font-bold">이벤트 아이디: {uid}</h2>
          <p className="text-sm text-stone-500">
            로그인 안내와 이름, 비밀번호 찾기 불가능한점 안내
          </p>
        </section>

        <form className="space-y-5">
          <Input label="이름" type="text" placeholder="이름을 입력해주세요." />
          <Input
            label="비밀번호 "
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <Button fill={false}>로그인</Button>
        </form>
      </div>

      <FixedBottomButton>링크 복사하기</FixedBottomButton>
    </>
  )
}
