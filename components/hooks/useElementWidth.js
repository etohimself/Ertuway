import { useLayoutEffect, useState } from "react";

function useElementWidth(elementRef) {
  const [width, setWidth] = useState([0, 0]); //This elements width, first childs width
  useLayoutEffect(() => {
    function updateWidth() {
      let myStyle = window.getComputedStyle(elementRef.current);
      let childStyle = window.getComputedStyle(elementRef.current.children[0]);
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
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
}

export default useElementWidth;
