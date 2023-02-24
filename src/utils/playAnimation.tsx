export function playAnimation(
  elementRef: React.RefObject<HTMLElement>,
  animation: string
) {
  const element = elementRef.current;
  if (element === null) return;

  element.dataset.animation = animation;
  element.addEventListener(
    "animationend",
    () => {
      element.dataset.animation = "";
    },
    { once: true }
  );
}
