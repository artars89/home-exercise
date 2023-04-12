import DraggableBox, { DraggableBoxProps } from './components/DraggableBox';
import { APP_CONTAINER_HEIGHT, APP_CONTAINER_WIDTH, DRAGGABLE_BOXES_COUNT, DRAGGABLE_BOX_SIZE } from './utils';

const appContainerStyle = {
  width: APP_CONTAINER_WIDTH,
  height: APP_CONTAINER_HEIGHT,
};

function getRandomBoxGap() {
  return parseInt(`${Math.random() * 30}`, 10) + 10;
}

const draggableBoxes: DraggableBoxProps[] = [...Array(DRAGGABLE_BOXES_COUNT).keys()]
    .map(id => ({
      id: `i${id}`,
      x: DRAGGABLE_BOX_SIZE * (id % 2) + (id % 2) * 50 + getRandomBoxGap(),
      y: DRAGGABLE_BOX_SIZE * (id % 3) + (id % 3) * 50 + getRandomBoxGap(),
    }));

function App() {
  const onDraggableBoxUpdate: DraggableBoxProps['onUpdate'] = (id, pos) => {
  };
  return (
    <div>
      <div className='border border-gray-500 rounded-sm relative' style={appContainerStyle}>
      {
          draggableBoxes.map((draggableBoxe) => (
            <DraggableBox
              {...draggableBoxe}
              key={draggableBoxe.id}
              onUpdate={onDraggableBoxUpdate}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
