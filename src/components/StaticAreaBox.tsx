import React from "react";
import { STATIC_BOX_SIZE } from "../utils";
import { Position } from "./DraggableBox";

export interface StaticAreaBoxProps extends React.HTMLProps<HTMLDivElement> {
    x: number;
    y: number;
    boxPositions: Record<string, Position>;
}

const getRectArea = (width: number, height: number) => width * height;

export default function StaticAreaBox({ x = 0, y = 0, boxPositions }: StaticAreaBoxProps) {
    const initialArea = getRectArea(STATIC_BOX_SIZE, STATIC_BOX_SIZE);
    const areaToSub = 0;
    const finalArea = initialArea - areaToSub;
    const staticBoxStyle = {
        top: y,
        left: x,
        width: STATIC_BOX_SIZE,
        height: STATIC_BOX_SIZE,
    };

    return (
        <div className="bg-red-500 absolute" style={staticBoxStyle}>
            <div className="absolute left-0 bottom-[-25px]">
                Visible area: {finalArea}
            </div>
        </div>
    )
}