import CreateEventPage from "../pages/CreateEventPage"
import EventPage from "../pages/EventPage"

const routes = [
  {
    id: "create-event-page",
    name: "이벤트 생성",
    path: "/",
    element: <CreateEventPage />,
  },
  {
    id: "event-page",
    name: "이벤트",
    path: "/:uid",
    element: <EventPage />,
  },
]

export default routes
