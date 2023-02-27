import {
  ComponentType,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { useLockedBody } from "usehooks-ts";
import { useWindowResolution } from "./useWindowResolution";
import { isNumber } from "lodash";
import { playAnimation } from "./playAnimation";

export function CreateModal<T>(
  Component: ComponentType<T>,
  ComponentProps: Omit<T, "isActive" | "setActive">,
  isActive: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  overlayClassName: string,
  animationDuration: number = 0,
  isPortal: boolean = false,
  maxWidth: number | "unset" = "unset"
) {
  const overlay = useRef(null);

  const modal = (
    <>
      <div
        className={overlayClassName}
        data-active={isActive}
        onClick={(e) => {
          e.stopPropagation();
          setActive(false);
        }}
        ref={overlay}
      ></div>

      <Component
        isActive={isActive}
        setActive={setActive}
        {...(ComponentProps as T)}
      />
    </>
  );

  const isMounted = useRef(false);
  const [animationIsRunning, setAnimationIsRunning] = useState(false);
  const windowResolution = useWindowResolution();

  useLayoutEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      return;
    }

    if (isActive === false && animationDuration) {
      setAnimationIsRunning(true);

      setTimeout(() => {
        setAnimationIsRunning(false);
      }, animationDuration + 200);
    }
  }, [isActive, animationDuration]);

  useEffect(() => {
    playAnimation(overlay, isActive ? "appearing" : "disappearing");
  }, [isActive]);

  if (isNumber(maxWidth) && isActive && windowResolution.width > maxWidth)
    setActive(false);

  useLockedBody(isActive);

  return (
    <>
      {isPortal
        ? (isActive || animationIsRunning) && createPortal(modal, document.body)
        : modal}
    </>
  );
}
