import { useState } from 'react';
import DraggableElement, { DraggableElementProps } from './components/DraggableElement';
import StaticAreaBox, { StaticAreaBoxProps } from './components/StaticAreaBox';
import { APP_CONTAINER_HEIGHT, APP_CONTAINER_WIDTH, DRAGGABLE_BOXES_COUNT, DRAGGABLE_BOX_SIZE, STATIC_BOX_SIZE } from './utils';

const appContainerStyle = {
  width: APP_CONTAINER_WIDTH,
  height: APP_CONTAINER_HEIGHT,
};

const staticAreaBoxX = APP_CONTAINER_WIDTH / 4 * 3 - STATIC_BOX_SIZE / 2;
const staticAreaBoxY = APP_CONTAINER_HEIGHT / 2 - STATIC_BOX_SIZE / 2;

function getRandomBoxGap() {
  return parseInt(`${Math.random() * 30}`, 10) + 10;
}

const draggableEls: DraggableElementProps[] = [...Array(DRAGGABLE_BOXES_COUNT).keys()]
    .map(id => ({
      id: `i${id}`,
      x: DRAGGABLE_BOX_SIZE * (id % 2) + (id % 2) * 50 + getRandomBoxGap(),
      y: DRAGGABLE_BOX_SIZE * (id % 3) + (id % 3) * 50 + getRandomBoxGap(),
    }));

export default function App() {
  const [circlesEnabled, setCirclesEnabled] = useState(false);
  const [boxPositions, setBoxPositions] = useState<StaticAreaBoxProps['boxPositions']>({});
  const onDraggableUpdate: DraggableElementProps['onUpdate'] = (id, pos) => {
    setBoxPositions({ ...boxPositions, [id]: pos });
  };

  return (
    <div>
      <label className="flex items-center gap-1 select-none cursor-pointer">
        <input type="checkbox" checked={circlesEnabled} onChange={ev => setCirclesEnabled(ev.target.checked)}/>
        <span>Circles</span>
      </label>
      <div className='border border-gray-500 rounded-sm relative' style={appContainerStyle}>
        <StaticAreaBox
          x={staticAreaBoxX}
          y={staticAreaBoxY}
          circle={circlesEnabled}
          boxPositions={boxPositions}
        />
        {
          draggableEls.map((draggableEl) => (
            <DraggableElement
              {...draggableEl}
              key={draggableEl.id}
              circle={circlesEnabled}
              onUpdate={onDraggableUpdate}
            />
          ))
        }
      </div>
    </div>
  )
}
