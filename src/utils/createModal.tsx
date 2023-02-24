import { ComponentType, useLayoutEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useLockedBody } from "usehooks-ts";
import { useWindowResolution } from "./useWindowResolution";
import { isNumber } from "lodash";

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
  const modal = (
    <>
      <div
        className={overlayClassName}
        data-active={isActive}
        onClick={(e) => {
          e.stopPropagation();
          setActive(false);
        }}
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
      }, animationDuration);
    }
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
