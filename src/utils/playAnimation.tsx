export function playAnimation(
  elementRef: React.RefObject<HTMLElement>,
  animation: string
) {
  if (elementRef.current === null) return;

  const element = elementRef.current;

  element.dataset.animation = animation;
  element.addEventListener(
    "animationend",
    () => {
      element.dataset.animation = "";
    },
    { once: true }
  );
}
