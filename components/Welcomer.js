import Image from "next/image";
import styles from "../styles/Welcomer.module.css";
import event1img from "../public/images/event1.png";
import event2img from "../public/images/event2.png";
import { useState } from "react";
import ScrollArrow from "./ScrollArrow";
import { useRouter } from "next/router";

function Welcomer(props) {
  const router = useRouter();
  const eventStyles = [
    { image: "", buttonColor: "", bgColor: "", eventName: "" },
    {
      image: event1img,
      buttonColor: "#F72F00",
      bgColor: "#FB9B77",
      eventName: "momsday",
    },
    {
      image: event2img,
      buttonColor: "#244292",
      bgColor: "#A3BFEA",
      eventName: "saturdaysale",
    },
  ];

  const [currentEvent, setCurrentEvent] = useState(1);
  const [topImageVisible, setTopImageVisible] = useState(1);
  const [bottomImageVisible, setBottomImageVisible] = useState(0);
  const [topImageSrc, setTopImageSrc] = useState(eventStyles[1].image);
  const [bottomImageSrc, setBottomImageSrc] = useState(eventStyles[1].image);

  const switchToEvent = (targetEvent) => {
    topImageVisible && setBottomImageSrc(eventStyles[targetEvent].image);
    setTopImageVisible(!topImageVisible);
    setBottomImageVisible(!bottomImageVisible);
    setCurrentEvent(targetEvent);
  };

  const nextEvent = () =>
    currentEvent + 1 > eventStyles.length - 1
      ? switchToEvent(1)
      : switchToEvent(currentEvent + 1);
  const previousEvent = () =>
    currentEvent == 1
      ? switchToEvent(eventStyles.length - 1)
      : switchToEvent(currentEvent - 1);

  function handleEventClick() {
    router.push("/special/" + eventStyles[currentEvent].eventName);
  }

  return (
    <div
      className={styles.welcomerContainer}
      style={{
        backgroundImage: `url("/images/welcomerbg.png"), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%) `,
        backgroundColor: eventStyles[currentEvent].bgColor,
      }}
    >
      <div className={styles.leftContainer}>
        <ScrollArrow
          backgroundColor={eventStyles[currentEvent].buttonColor}
          arrowColor="white"
          onClick={previousEvent}
        />
      </div>

      <div className={styles.middleContainer} onClick={handleEventClick}>
        <Image
          src={topImageSrc}
          alt={"Welcomer Image"}
          className={`${styles.topImage} ${
            topImageVisible && styles.isVisible
          }`}
        />
        <Image
          src={bottomImageSrc}
          alt={"Welcomer Image"}
          className={`${styles.bottomImage} ${
            bottomImageVisible && styles.isVisible
          }`}
        />
      </div>

      <div className={styles.rightContainer}>
        <ScrollArrow
          direction="right"
          backgroundColor={eventStyles[currentEvent].buttonColor}
          arrowColor="white"
          onClick={nextEvent}
        />
      </div>
    </div>
  );
}

export default Welcomer;
