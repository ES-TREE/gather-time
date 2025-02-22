import { useState } from "react"
import Tab from "../components/common/Tab"

export default {
  title: "Common/Tab",
  component: Tab,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

const TabWithHooks = () => {
  const [currentTab, setCurrentTab] = useState("input")

  return <Tab currentTab={currentTab} onChangeTab={setCurrentTab} />
}

export const Default = {
  render: (args) => <TabWithHooks {...args} />,
}
