import { useEffect, useRef } from "react";
import { playAnimation } from "./playAnimation";

export const useModalAnimation = (
  element: React.RefObject<HTMLElement>,
  isActive: boolean
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      return;
    }
    const animation = isActive ? "opening" : "closing";
    playAnimation(element, animation);
  }, [isActive]);
};
