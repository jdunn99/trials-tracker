import React from "react";

export const useObserver = (
  target: React.MutableRefObject<any>,
  callback: () => void,
  enabled: boolean
) => {
  const intersectionOptions = React.useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }),
    []
  );

  React.useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && callback()),
      intersectionOptions
    );
    const targetNode = target && target.current;

    if (!targetNode) return;

    observer.observe(targetNode);

    return () => {
      observer.unobserve(targetNode);
    };
  }, [target, enabled, intersectionOptions, callback]);
};
