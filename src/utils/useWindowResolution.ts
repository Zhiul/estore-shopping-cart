import { useEffect, useState } from "react";
import { debounce } from "lodash";

class WindowDimensions {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export const useWindowResolution = () => {
  const [resolution, setResolution] = useState(
    new WindowDimensions(window.innerWidth, window.innerHeight)
  );

  useEffect(() => {
    const setWindowResolution = debounce(() => {
      console.log(window.innerWidth);
      setResolution(
        new WindowDimensions(window.innerWidth, window.innerHeight)
      );
    }, 1000);

    window.addEventListener("resize", setWindowResolution);

    return () => {
      window.removeEventListener("resize", setWindowResolution);
    };
  }, []);

  return resolution;
};
