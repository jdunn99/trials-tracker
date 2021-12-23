import React from "react";

export const useObserver = (callback: () => void) => {
  const target = React.useRef<any>(null);

  const handleIntersection = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && Math.floor(entry.intersectionRatio) === 1)
        callback();
    },
    [callback]
  );

  const intersectionOptions = React.useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }),
    []
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      intersectionOptions
    );
    const targetNode = target.current;
    if (targetNode) observer.observe(targetNode);

    return () => {
      if (targetNode) observer.unobserve(targetNode);
    };
  }, [target, intersectionOptions, handleIntersection]);

  return { target };
};
