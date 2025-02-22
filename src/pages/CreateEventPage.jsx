import Button from "../components/common/Button"
import Input from "../components/common/Input"

export default function CreateEventPage() {
  /**
   * 구현 로직
   * 1. 이벤트 이름 상태와 선택한 날짜 상태로 이벤트 생성
   * 2. 이벤트 생성 후 이벤트 페이지(/uid)로 이동
   */

  return (
    <section>
      <Input label="이벤트 이름" placeholder="이벤트 이름을 입력해주세요." />

      <div className="fixed bottom-0 left-1/2 w-full max-w-screen-sm -translate-x-1/2 transform bg-white p-5">
        <Button>이벤트 생성하기</Button>
      </div>
    </section>
  )
}
