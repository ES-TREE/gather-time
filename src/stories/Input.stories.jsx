import Input from "../components/common/Input"

export default {
  title: "Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export const Default = {
  args: {
    placeholder: "플레이스홀더를 입력해주세요.",
    label: "",
  },
}

export const Label = {
  args: {
    placeholder: "이름을 입력해주세요.",
    label: "이름",
  },
}
