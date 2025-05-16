import { useEffect, useState } from "react";

export default function useImageScroll(trackRef) {
  const [trackPercentage, setTrackPercentage] = useState(0);
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [maxScroll, setMaxScroll] = useState(-100);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateMaxScroll = () => {
      const containerWidth = track.offsetWidth;
      const scrollWidth = track.scrollWidth;
      const overflow = scrollWidth - containerWidth;
      const maxPercentScroll = -(overflow / scrollWidth) * 100;
      setMaxScroll(maxPercentScroll || -100);
    };

    const animateScroll = (nextPercentage) => {
      track.animate(
        { transform: `translateX(${nextPercentage}%)` },
        { duration: 600, fill: "forwards" }
      );

      const images = document.getElementsByClassName("image_track");
      for (const image of images) {
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 600, fill: "forwards" }
        );
      }
    };

    const updateScroll = (deltaPercent) => {
      let nextPercentage = trackPercentage + deltaPercent;
      nextPercentage = Math.max(Math.min(nextPercentage, 0), maxScroll);
      animateScroll(nextPercentage);
      setTrackPercentage(nextPercentage);
    };

    const handleMouseDown = (e) => setMouseDownAt(e.clientX);

    const handleMouseMove = (e) => {
      if (mouseDownAt === null) return;
      const mouseDelta = e.clientX - mouseDownAt;
      const deltaPercent = (mouseDelta / (window.innerWidth / 2)) * 100;
      updateScroll(deltaPercent);
      setMouseDownAt(e.clientX);
    };

    const handleMouseUp = () => setMouseDownAt(null);

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        setMouseDownAt(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e) => {
      if (mouseDownAt === null || e.touches.length !== 1) return;
    
      // 🚫 prevent vertical page scroll
      e.preventDefault();
    
      const touchDelta = e.touches[0].clientX - mouseDownAt;
      const deltaPercent = (touchDelta / (window.innerWidth / 2)) * 100;
      updateScroll(deltaPercent);
      setMouseDownAt(e.touches[0].clientX);
    };
    

    const handleTouchEnd = () => setMouseDownAt(null);

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      const deltaPercent = -(delta / window.innerWidth) * 20; // tune this value
      updateScroll(deltaPercent);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") updateScroll(-10); // scroll right
      if (e.key === "ArrowLeft") updateScroll(10); // scroll left
    };

    // Initial setup
    const initializeImagePositions = () => {
      const images = document.getElementsByClassName("image_track");
      for (const image of images) {
        image.style.objectPosition = `100% center`;
      }
    };

    updateMaxScroll();
    initializeImagePositions();

    // Add event listeners
    window.addEventListener("resize", updateMaxScroll);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mouseDownAt, trackPercentage, trackRef, maxScroll]);

  return { trackPercentage };
}
