import { useEffect, useState } from "react";

function useElementWidth(elementRef) {
  const [width, setWidth] = useState([0, 0]); //This elements width, first childs width

  useEffect(() => {
    function updateWidth() {
      if (
        elementRef &&
        elementRef.current &&
        elementRef.current.children &&
        elementRef.current.children.length > 0
      ) {
        let myStyle = window.getComputedStyle(elementRef.current);
        let childStyle = window.getComputedStyle(
          elementRef.current.children[0]
        );
        setWidth([
          elementRef.current.offsetWidth +
            parseInt(myStyle.paddingLeft) +
            parseInt(myStyle.paddingRight) +
            parseInt(myStyle.marginLeft) +
            parseInt(myStyle.marginRight),
          elementRef.current.children[0].offsetWidth +
            parseInt(childStyle.paddingLeft) +
            parseInt(childStyle.paddingRight) +
            parseInt(childStyle.marginLeft) +
            parseInt(childStyle.marginRight),
        ]);
      } else {
        setWidth[(0, 0)];
      }
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
}

export default useElementWidth;
