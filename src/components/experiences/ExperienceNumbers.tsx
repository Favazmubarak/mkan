"use client";

import { useState, useEffect, useRef } from "react";

interface MetricItem {
  id: string;
  index: string;
  eyebrow: string;
  label: string;
  sublabel: string;
}

const METRICS: MetricItem[] = [
  {
    id: "established",
    index: "01",
    eyebrow: "INAUGURATION",
    label: "ESTABLISHED",
    sublabel: "UAE",
  },
  {
    id: "domains",
    index: "02",
    eyebrow: "DOMAINS",
    label: "EXPERTISE AREAS",
    sublabel: "DOMAINS",
  },
  {
    id: "method",
    index: "03",
    eyebrow: "EXECUTION",
    label: "METHOD STAGES",
    sublabel: "RIGOR",
  },
  {
    id: "headquarters",
    index: "04",
    eyebrow: "HEADQUARTERS",
    label: "BASED · EMIRATI OWNED",
    sublabel: "WASL 51",
  },
];

/**
 * Organic Decelerating Count-Up Hook
 * Mimics human physical momentum: fast energetic start, smooth exponential deceleration
 */
function useSmoothCountUp(delay = 0, triggerKey = 0) {
  const [count, setCount] = useState("00");
  const [isTick, setIsTick] = useState(false);

  useEffect(() => {
    // Deceleration intervals: 110ms -> 150ms -> 210ms -> 290ms -> 400ms
    const steps = [
      { val: "00", time: 0 },
      { val: "01", time: delay + 110 },
      { val: "02", time: delay + 260 },
      { val: "03", time: delay + 470 },
      { val: "04", time: delay + 760 },
      { val: "05", time: delay + 1160 },
    ];

    const timeouts = steps.map(({ val, time }) =>
      setTimeout(() => {
        setCount(val);
        if (val !== "00") {
          setIsTick(true);
          setTimeout(() => setIsTick(false), 140);
        }
      }, time)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [delay, triggerKey]);

  return { count, isTick };
}

/**
 * Mechanical Year Reveal Hook for 2017
 * Staggered masked reveal: 20 | 1 | 7 (with physical click-wheel lock)
 */
function useYearReveal(triggerKey = 0) {
  const [show20, setShow20] = useState(false);
  const [show1, setShow1] = useState(false);
  const [digit7, setDigit7] = useState("0");
  const [isTick7, setIsTick7] = useState(false);

  useEffect(() => {
    const tReset = setTimeout(() => {
      setShow20(false);
      setShow1(false);
      setDigit7("0");
    }, 0);

    const t1 = setTimeout(() => setShow20(true), 60);
    const t2 = setTimeout(() => setShow1(true), 200);

    // Digit 7 rolls with decelerating mechanical clicks: 0 -> 2 -> 4 -> 6 -> 7
    const steps7 = [
      { val: "2", time: 340 },
      { val: "4", time: 510 },
      { val: "6", time: 720 },
      { val: "7", time: 1000 },
    ];

    const timeouts7 = steps7.map(({ val, time }) =>
      setTimeout(() => {
        setDigit7(val);
        setIsTick7(true);
        setTimeout(() => setIsTick7(false), 140);
      }, time)
    );

    return () => {
      clearTimeout(tReset);
      clearTimeout(t1);
      clearTimeout(t2);
      timeouts7.forEach(clearTimeout);
    };
  }, [triggerKey]);

  return { show20, show1, digit7, isTick7 };
}

/**
 * Letter-by-Letter Typographic Reveal for DUBAI
 */
function useDubaiReveal(triggerKey = 0) {
  const [text, setText] = useState("");

  useEffect(() => {
    const sequence = ["", "D", "DU", "DUB", "DUBA", "DUBAI"];
    const timeouts = sequence.map((str, i) =>
      setTimeout(() => {
        setText(str);
      }, i === 0 ? 0 : 140 + (i - 1) * 90)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [triggerKey]);

  return text;
}

export function ExperienceNumbers({ embedded = false }: { embedded?: boolean }) {
  const [cycleKey, setCycleKey] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronized counts with humanized, musical timing offsets
  const yearState = useYearReveal(cycleKey);
  const domainsCount = useSmoothCountUp(140, cycleKey);
  const methodCount = useSmoothCountUp(380, cycleKey);
  const dubaiText = useDubaiReveal(cycleKey);

  // Infinite Kinetic Horizon: Seamlessly repeats the physical count-up every 5.8s
  useEffect(() => {
    if (hoveredIdx !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCycleKey((k) => k + 1);
    }, 5800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hoveredIdx]);

  return (
    <div
      id="experience-numbers"
      className={`relative text-[#FAF3EE] select-none ${
        embedded
          ? "w-full border-t border-[#DDB78A]/15 bg-[#0D0105]/75 backdrop-blur-md py-4 sm:py-5 lg:py-5 px-6 sm:px-10 lg:px-16"
          : "bg-[#0E0105] border-y border-[#DDB78A]/15 py-6 sm:py-8 lg:py-9 px-6 sm:px-10 lg:px-16"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-[#DDB78A]/12">
          {METRICS.map((metric, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={metric.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative flex flex-col justify-between px-0 sm:px-5 lg:px-7 py-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  isHovered
                    ? "opacity-100 -translate-y-1"
                    : "opacity-75 hover:opacity-100 translate-y-0"
                }`}
              >
                <div>
                  {/* Eyebrow Label */}
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span
                      className={`text-[0.58rem] sm:text-[0.62rem] font-mono tracking-[0.25em] uppercase transition-colors duration-400 ${
                        isHovered ? "text-[#DDB78A]" : "text-[#DDB78A]/65"
                      }`}
                    >
                      {metric.index} · {metric.eyebrow}
                    </span>
                  </div>

                  {/* High-Precision Organic Numerical Animation */}
                  <div className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight leading-none my-1 flex items-baseline">
                    {/* STAT 01: 2017 */}
                    {metric.id === "established" && (
                      <span className="flex items-baseline text-[#FAF3EE]">
                        <span
                          className={`inline-block transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            yearState.show20 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                        >
                          20
                        </span>
                        <span
                          className={`inline-block transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            yearState.show1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                        >
                          1
                        </span>
                        <span
                          className={`inline-block text-[#DDB78A] font-normal transition-all duration-300 ease-out ${
                            yearState.isTick7 ? "scale-105" : "scale-100"
                          }`}
                        >
                          {yearState.digit7}
                        </span>
                      </span>
                    )}

                    {/* STAT 02: 05 EXPERTISE AREAS */}
                    {metric.id === "domains" && (
                      <span className="flex items-baseline tabular-nums">
                        <span className="text-[#FAF3EE]/50">0</span>
                        <span
                          className={`inline-block text-[#DDB78A] font-normal transition-all duration-200 ease-out ${
                            domainsCount.isTick ? "translate-y-[-2px] text-white" : "translate-y-0"
                          }`}
                        >
                          {domainsCount.count.slice(1)}
                        </span>
                      </span>
                    )}

                    {/* STAT 03: 05 METHOD STAGES */}
                    {metric.id === "method" && (
                      <span className="flex items-baseline tabular-nums">
                        <span className="text-[#FAF3EE]/50">0</span>
                        <span
                          className={`inline-block text-[#DDB78A] font-normal transition-all duration-200 ease-out ${
                            methodCount.isTick ? "translate-y-[-2px] text-white" : "translate-y-0"
                          }`}
                        >
                          {methodCount.count.slice(1)}
                        </span>
                      </span>
                    )}

                    {/* STAT 04: DUBAI */}
                    {metric.id === "headquarters" && (
                      <span className="text-[#DDB78A] font-normal tracking-wide">
                        {dubaiText || "D"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Verified Metadata */}
                <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#DDB78A]/12 flex items-center justify-between">
                  <span
                    className={`font-sans text-[0.64rem] sm:text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors duration-400 ${
                      isHovered ? "text-[#FAF3EE]" : "text-[#FAF3EE]/80"
                    }`}
                  >
                    {metric.label}
                  </span>
                  <span
                    className={`text-[0.56rem] sm:text-[0.58rem] font-mono tracking-widest uppercase transition-colors duration-400 ${
                      isHovered ? "text-[#DDB78A]" : "text-[#DDB78A]/50"
                    }`}
                  >
                    {metric.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
