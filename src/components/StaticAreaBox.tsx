import React, { useEffect, useRef, useState } from "react";
import { APP_CONTAINER_HEIGHT, APP_CONTAINER_WIDTH, DRAGGABLE_BOX_SIZE, STATIC_BOX_SIZE } from "../utils";
import { Position } from "./DraggableBox";

export interface StaticAreaBoxProps extends React.HTMLProps<HTMLDivElement> {
    x: number;
    y: number;
    boxPositions: Record<string, Position>;
}

const getRectArea = (width: number, height: number) => width * height;

export default function StaticAreaBox({ x = 0, y = 0, boxPositions }: StaticAreaBoxProps) {
    const ref = useRef<HTMLCanvasElement>(null);
    const [visibleArea, setVisibleArea] = useState(getRectArea(STATIC_BOX_SIZE, STATIC_BOX_SIZE));
    const staticBoxStyle = {
        top: y,
        left: x,
        width: STATIC_BOX_SIZE,
        height: STATIC_BOX_SIZE,
    };

    useEffect(() => {
        const canvasEl = ref.current;
        if (canvasEl) {
            const ctx = canvasEl.getContext('2d', { willReadFrequently: true })!;
            ctx.clearRect(0, 0, 800, 500);

            // Draw the static area
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, STATIC_BOX_SIZE, STATIC_BOX_SIZE);

            // Draw draggable elements
            for (const pos of Object.values(boxPositions)) {
                ctx.clearRect(pos.x, pos.y, DRAGGABLE_BOX_SIZE, DRAGGABLE_BOX_SIZE);
            }

            const { data } = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
            let visiblePixels = 0;

            // Counte the number of visible pixels by alpha channel
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha) visiblePixels++
            }

            setVisibleArea(visiblePixels);
        }

    }, [ref.current, boxPositions]);

    return (
        <>
            <div className="bg-red-500 absolute" style={staticBoxStyle}>
                <div className="absolute left-0 bottom-[-25px]">
                    Visible area: {visibleArea}
                </div>
            </div>
            <canvas
                ref={ref}
                className="absolute top-[500px]"
                width={APP_CONTAINER_WIDTH}
                height={APP_CONTAINER_HEIGHT}
            />
        </>
    )
}