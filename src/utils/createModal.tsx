import { ComponentType, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useLockedBody } from "usehooks-ts";
import { useWindowResolution } from "./useWindowResolution";
import { isNumber } from "lodash";

export function CreateModal<T>(
  Component: ComponentType<T>,
  ComponentProps: Omit<T, "isActive" | "setActive">,
  isPortal: boolean,
  isActive: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  overlayClassName: string,
  animationDuration?: number,
  maxWidth: number | "unset" = "unset"
) {
  const [animationIsRunning, setAnimationIsRunning] = useState(false);
  const windowResolution = useWindowResolution();

  useEffect(() => {
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
      {isPortal ? (
        isActive ||
        (animationIsRunning &&
          createPortal(
            <>
              <div
                className={overlayClassName}
                data-active={isActive}
                onClick={() => setActive(false)}
              ></div>
              <Component
                isActive={isActive}
                setActive={setActive}
                {...(ComponentProps as T)}
              />
            </>,
            document.body
          ))
      ) : (
        <>
          <div
            className={overlayClassName}
            data-active={isActive}
            onClick={() => setActive(false)}
          ></div>
          <Component
            isActive={isActive}
            setActive={setActive}
            {...(ComponentProps as T)}
          />
        </>
      )}
    </>
  );
}
