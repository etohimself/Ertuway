import Image from "next/image";
import styles from "../styles/Welcomer.module.css";
import event1img from "../public/images/event1.png";
import event2img from "../public/images/event2.png";
import ArrowIcon from "./Icons/ArrowIcon";
import { useState } from "react";

function Welcomer(props) {
  const eventStyles = [
    { image: "", buttonColor: "", bgColor: "" },
    { image: event1img, buttonColor: "#F72F00", bgColor: "#FB9B77" },
    { image: event2img, buttonColor: "#244292", bgColor: "#A3BFEA" },
  ];

  const [currentEvent, setCurrentEvent] = useState(1);
  const [eventVisibility, setEventVisibility] = useState([1, 0]);
  const [eventImgs, setEventImgs] = useState([
    eventStyles[1].image,
    eventStyles[1].image,
  ]);

  const switchToEvent = (eventNumber) => {
    if (eventVisibility[0]) {
      //First image is currently shown
      let currentEventTemp = currentEvent; //To prevent issues with async process

      setEventVisibility([0, 1]); //Show the second one
      setEventImgs([
        eventStyles[currentEventTemp].image,
        eventStyles[eventNumber].image,
      ]); //Show the other one
    } else {
      //Second image is currently shown
      let currentEventTemp = currentEvent; //To prevent issues with async process
      setEventVisibility([1, 0]); //Show the first one
      setEventImgs([
        eventStyles[eventNumber].image,
        eventStyles[currentEventTemp].image,
      ]);
    }
    setCurrentEvent(eventNumber);
  };

  const nextEvent = () => {
    if (currentEvent > eventStyles.length - 2) {
      //Roll back
      switchToEvent(1);
    } else {
      //Show next
      switchToEvent(currentEvent + 1);
    }
  };

  const previousEvent = () => {
    if (currentEvent == 1) {
      //Go to end
      switchToEvent(eventStyles.length - 1);
    } else {
      //Show previous
      switchToEvent(currentEvent - 1);
    }
  };

  return (
    <div
      className={styles.welcomerContainer}
      style={{
        backgroundImage: `url("/images/welcomerbg.png")`,
        backgroundColor: eventStyles[currentEvent].bgColor,
      }}
    >
      <div
        className={styles.arrowContainer}
        style={{ backgroundColor: `${eventStyles[currentEvent].buttonColor}` }}
        onClick={previousEvent}
      >
        <ArrowIcon className={styles.arrowIcon} />
      </div>

      <div className={styles.eventImgContainer}>
        <Image
          className={`${styles.eventImage} ${
            eventVisibility[0] ? styles.isVisible : ""
          }`}
          src={eventImgs[0]}
          alt="Special Event"
        />

        <Image
          className={`${styles.eventImage} ${
            eventVisibility[1] ? styles.isVisible : ""
          }`}
          src={eventImgs[1]}
          alt="Special Event"
        />
      </div>

      <div
        className={styles.arrowContainer}
        style={{ backgroundColor: `${eventStyles[currentEvent].buttonColor}` }}
        onClick={nextEvent}
      >
        <ArrowIcon className={`${styles.arrowIcon} ${styles.rightArrow}`} />
      </div>
    </div>
  );
}

export default Welcomer;
