import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EventPage(props) {
  const router = useRouter();
  const { event } = router.query;
  const [currentEvent, setCurrentEvent] = useState("");

  const eventList = ["momsday", "saturdaysale"];

  useEffect(() => {
    if (!router.isReady) return;

    if (eventList.includes(event)) {
      setCurrentEvent(event);
    } else {
      router.push("/"); //unrecognized event
    }
  }, [router.isReady, event]);

  return <h1>Welcome To Special Event : {currentEvent}</h1>;
}

export default EventPage;
