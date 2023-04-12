import React, { useEffect, useState } from "react";
import cx, { APP_CONTAINER_HEIGHT, APP_CONTAINER_WIDTH, DRAGGABLE_BOX_SIZE } from "../utils";

export interface DraggableElementProps extends React.HTMLProps<HTMLDivElement> {
    x: number;
    y: number;
    circle?: boolean;
    onUpdate?: (id: string, pos: Position) => void;
}

export type Position = Pick<DraggableElementProps, 'x' | 'y'>;

type StartPosition = Position & {
    pageX: number;
    pageY: number;
};

const grabbingCls = 'cursor-grabbing';

const getMinMax = (value: number, axis: 'x' | 'y') => {
    const appSize = axis === 'x' ? APP_CONTAINER_WIDTH : APP_CONTAINER_HEIGHT;
    return Math.min(appSize - DRAGGABLE_BOX_SIZE, Math.max(0, value));
}

export default function DraggableElement({ x = 0, y = 0, circle, onUpdate, ...rest }: DraggableElementProps) {
    const [startPos, setStartPos] = useState<StartPosition>();
    const [currentPos, setCurrentPos] = useState<Position>({ x, y });
    const xValue = currentPos.x;
    const YValue = currentPos.y;

    useEffect(() => {
        const onMouseMove = (ev: MouseEvent) => {
            if (!startPos) return;
            const deltaPageX = ev.pageX - startPos.pageX;
            const deltaPageY = ev.pageY - startPos.pageY;
            const newCurrentPos = {
                x: getMinMax(startPos.x + deltaPageX, 'x'),
                y: getMinMax(startPos.y + deltaPageY, 'y'),
            }
            setCurrentPos(newCurrentPos);
            onUpdate?.(rest.id!, newCurrentPos);
        }

        const onMouseUp = () => {
            if (!startPos) return;
            setStartPos(undefined);
        }

        if (startPos) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.body.classList.add(grabbingCls)
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove(grabbingCls)
        }
    }, [startPos]);

    const onStart = (props: StartPosition) => setStartPos(props);
    const onMouseDown = (ev: React.MouseEvent) => {
        const { button, pageX, pageY } = ev;
        if (button !== 0) return
        onStart({ ...currentPos, pageX, pageY })
    }

    const className = cx(
        'bg-blue-500 absolute select-none text-xs',
        circle && 'rounded-full',
        startPos ? grabbingCls : 'cursor-grab'
    );
    const elStyle = {
        left: xValue,
        top: YValue,
        width: DRAGGABLE_BOX_SIZE,
        height: DRAGGABLE_BOX_SIZE,
    };

    return (
        <div className={className} style={elStyle} onMouseDown={onMouseDown}/>
    )
}