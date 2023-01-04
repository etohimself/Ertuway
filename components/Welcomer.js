import styles from "../styles/Welcomer.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ScrollArrow from "./ScrollArrow";
import Image from "next/image";

function Welcomer(props) {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);
  const [dataFetched, setDataFetched] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [topImageVisible, setTopImageVisible] = useState(1);
  const [bottomImageVisible, setBottomImageVisible] = useState(0);
  const [topImageSrc, setTopImageSrc] = useState();
  const [bottomImageSrc, setBottomImageSrc] = useState();
  const [WelcomerStyle, setWelcomerStyle] = useState({});

  const switchToEvent = (targetEvent) => {
    if (topImageVisible) {
      setBottomImageSrc(eventList[targetEvent].image);
      setBottomImageVisible(1);
      setTopImageVisible(0);
    } else {
      setTopImageSrc(eventList[targetEvent].image);
      setBottomImageVisible(0);
      setTopImageVisible(1);
    }
    setCurrentEvent(targetEvent);
  };

  const nextEvent = () => {
    if (!dataFetched) return;
    currentEvent + 1 > eventList.length - 1
      ? switchToEvent(0)
      : switchToEvent(currentEvent + 1);
  };

  const previousEvent = () => {
    if (!dataFetched) return;
    currentEvent == 0
      ? switchToEvent(eventList.length - 1)
      : switchToEvent(currentEvent - 1);
  };

  function handleEventClick() {
    if (!dataFetched) return;
    router.push("/special/" + eventList[currentEvent].eventName);
  }

  useEffect(() => {
    let eventlistAPI = `${location.protocol}//${location.hostname}:27469/eventlist`;
    fetch(eventlistAPI)
      .then((res) => res.json())
      .then((data) => {
        setEventList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (eventList.length && eventList[0].eventName) {
      //data seems valid
      setTopImageSrc(eventList[0].image);
      setBottomImageSrc(eventList[0].image);
      setDataFetched(1);
    }
  }, [eventList]);

  useEffect(() => {
    let styleObj = {};
    styleObj.backgroundImage =
      "url('/images/welcomerbg.png'), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)";
    styleObj.backgroundColor = dataFetched
      ? eventList[currentEvent].bgColor
      : "lightgray";
    setWelcomerStyle(styleObj);
  }, [eventList, currentEvent, dataFetched]);

  return (
    <div className={styles.welcomerContainer} style={WelcomerStyle}>
      <div className={styles.leftContainer}>
        <ScrollArrow
          backgroundColor={
            dataFetched ? eventList[currentEvent].buttonColor : "lightgray"
          }
          arrowColor="white"
          onClick={previousEvent}
        />
      </div>

      <div className={styles.middleContainer} onClick={handleEventClick}>
        {dataFetched ? (
          <>
            <Image
              src={topImageSrc}
              width={1000}
              height={425}
              priority
              alt={"Welcomer Image"}
              className={`${styles.topImage} ${
                topImageVisible && styles.isVisible
              }`}
            />
            <Image
              src={bottomImageSrc}
              width={1000}
              height={425}
              priority
              alt={"Welcomer Image"}
              className={`${styles.bottomImage} ${
                bottomImageVisible && styles.isVisible
              }`}
            />
          </>
        ) : (
          <>
            <div className={styles.imageSkeleton} />
          </>
        )}
      </div>

      <div className={styles.rightContainer}>
        <ScrollArrow
          direction="right"
          backgroundColor={
            dataFetched ? eventList[currentEvent].buttonColor : "lightgray"
          }
          arrowColor="white"
          onClick={nextEvent}
        />
      </div>
    </div>
  );
}

export default Welcomer;
