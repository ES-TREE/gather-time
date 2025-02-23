import FixedBottomButton from "../components/button/FixedBottomButton"
import DateRangeCalendar from "../components/calendar/DateRangeCalendar"
import Input from "../components/common/Input"

export default function CreateEventPage() {
  /**
   * 구현 로직
   * 1. 이벤트 이름 상태와 선택한 날짜 상태로 이벤트 생성
   * 2. 이벤트 생성 후 이벤트 페이지(/uid)로 이동
   */

  return (
    <form className="space-y-5">
      <Input label="이벤트 이름" placeholder="이벤트 이름을 입력해주세요." />

      <section>
        <div className="space-y-1">
          <h2 className="font-bold">일정 선택</h2>
          <p className="text-sm text-stone-500">
            이벤트를 생성할 일정을 선택해주세요.
          </p>
        </div>

        <DateRangeCalendar />
      </section>

      <FixedBottomButton>이벤트 생성하기</FixedBottomButton>
    </form>
  )
}
