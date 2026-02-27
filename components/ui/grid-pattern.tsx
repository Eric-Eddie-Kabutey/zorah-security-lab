"use client";

import { useId, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string;
    className?: string;
    [key: string]: any;
}

export function GridPattern({
    width = 100,
    height = 100,
    x = -1,
    y = -1,
    strokeDasharray,
    className,
    ...props
}: GridPatternProps) {
    const id = useId();
    const [squares, setSquares] = useState<{ x: number; y: number; type: number }[]>([]);

    // Generate random squares on mount to avoid hydration mismatch
    useEffect(() => {
        const newSquares = [];
        const cols = Math.ceil(window.innerWidth / width);
        const rows = Math.ceil(window.innerHeight / height);

        for (let i = 0; i < (cols * rows) / 4; i++) {
            const sx = Math.floor(Math.random() * cols);
            const sy = Math.floor(Math.random() * rows);
            // type 0: border, type 1: scanlines, type 2: solid
            const type = Math.floor(Math.random() * 3);
            newSquares.push({ x: sx, y: sy, type });
        }
        setSquares(newSquares);
    }, [width, height]);

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full stroke-neutral-400/20",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M ${width} 0 L 0 0 0 ${height}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>

                {/* Scanline pattern for certain cells */}
                <pattern
                    id={`${id}-scanlines`}
                    width={width}
                    height={6}
                    patternUnits="userSpaceOnUse"
                >
                    <path d={`M 0 3 H ${width}`} stroke="currentColor" strokeWidth="0.5" className="opacity-10" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

            {squares.map(({ x: sx, y: sy, type }, index) => (
                <g key={`${index}-${sx}-${sy}`} transform={`translate(${sx * width + x}, ${sy * height + y})`}>
                    {type === 0 && (
                        <rect
                            width={width - 2}
                            height={height - 2}
                            rx={12}
                            ry={12}
                            x={1}
                            y={1}
                            fill="none"
                            stroke="currentColor"
                            className="opacity-20"
                            strokeWidth="1"
                        />
                    )}
                    {type === 1 && (
                        <rect
                            width={width - 4}
                            height={height - 4}
                            x={2}
                            y={2}
                            fill={`url(#${id}-scanlines)`}
                            className="opacity-90"
                        />
                    )}
                    {type === 2 && (
                        <rect
                            width={width - 2}
                            height={height - 2}
                            rx={12}
                            ry={12}
                            x={1}
                            y={1}
                            fill="currentColor"
                            className="opacity-[0.03] text-neutral-900"
                        />
                    )}
                </g>
            ))}
        </svg>
    );
}
