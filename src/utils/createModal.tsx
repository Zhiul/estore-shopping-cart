import { ComponentType } from "react";
import { createPortal } from "react-dom";
import { useLockedBody } from "usehooks-ts";

export function CreateModal<T>(
  Component: ComponentType<T>,
  ComponentProps: Omit<T, "isActive" | "setActive">,
  isPortal: boolean,
  isActive: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  overlayClassName: string
) {
  useLockedBody(isActive);

  return (
    <>
      {isPortal ? (
        isActive &&
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
        )
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
