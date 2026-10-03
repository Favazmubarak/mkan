/**
 * Luxury Cinematic Smooth Scroll System
 * Provides slow, silky ease-in-out cubic bezier scrolling that lands
 * with the target section standing in the exact vertical center of the viewport.
 */

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Calculates the exact scroll Y position so the target element is vertically centered in the viewport
 */
export function getCenteredScrollPosition(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = rect.top + currentScrollY;
  const elementHeight = rect.height;
  const windowHeight = window.innerHeight;

  // Center the element vertically in the viewport
  const middleOffset = elementTop + elementHeight / 2 - windowHeight / 2;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - windowHeight);

  return Math.max(0, Math.min(middleOffset, maxScroll));
}

interface LenisInstance {
  scrollTo: (
    target: number | HTMLElement,
    options?: {
      duration?: number;
      easing?: (t: number) => number;
      onComplete?: () => void;
      immediate?: boolean;
      lock?: boolean;
    }
  ) => void;
}

/**
 * Performs a slow, cinematic gliding scroll to a target position
 */
export function cinematicScrollTo(
  targetY: number,
  duration = 1400,
  onComplete?: () => void
): void {
  if (typeof window === "undefined") return;

  // Check if Lenis is active on window
  const win = window as unknown as { __lenis?: LenisInstance };
  if (win.__lenis && typeof win.__lenis.scrollTo === "function") {
    win.__lenis.scrollTo(targetY, {
      duration: duration / 1000,
      easing: easeInOutCubic,
      onComplete,
    });
    return;
  }

  // High-precision RAF fallback
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;

  if (Math.abs(distance) < 4) {
    if (onComplete) onComplete();
    return;
  }

  let startTime: number | null = null;

  const step = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (onComplete) onComplete();
    }
  };

  requestAnimationFrame(step);
}

/**
 * Convenience helper to scroll to a target element or selector and center it
 */
export function scrollToElementCenter(
  target: HTMLElement | string,
  duration = 1400,
  hashToPush?: string
): void {
  if (typeof window === "undefined") return;

  if (target === "#home" || target === "#" || target === "/" || target === "#top") {
    cinematicScrollTo(0, duration, () => {
      if (hashToPush && window.history.pushState) {
        window.history.pushState(null, "", " ");
      }
    });
    return;
  }

  const el =
    typeof target === "string"
      ? document.getElementById(target.replace("#", "")) ||
        document.querySelector<HTMLElement>(target)
      : target;

  if (!el) return;

  const targetY = getCenteredScrollPosition(el);
  cinematicScrollTo(targetY, duration, () => {
    if (hashToPush && window.history.pushState) {
      window.history.pushState(null, "", hashToPush);
    }
  });
}
