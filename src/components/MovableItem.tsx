import React, { useRef } from 'react'
import { useDrag, useDrop } from "react-dnd"
import styled from 'styled-components'
import { ColumnValues, COLUMN_NAMES, Menu } from '../constants'
import food from '../images/food.jpg'

interface IMovableItemProps {
  name: string,
  index: number,
  currentColumnName: string,
  moveCardHandler(dragIndex: number, hoverIndex: number): void,
  setItems: React.Dispatch<any>,
  id: number
};


const MovableItem: React.FC<IMovableItemProps> = ({ name, id, index, currentColumnName, moveCardHandler, setItems }) => {
  const changeItemColumn = (currentItem: any, columnName: ColumnValues) => {
    setItems((prevState: Menu[]) => {
        return prevState.map(menu => {
            return {
                ...menu,
                column: menu.name === currentItem.name ? columnName : menu.column,
            }
        })
    });
}

  const ref = useRef(null);

  const [, drop] = useDrop({
      accept: 'any',
      hover(item: any, monitor) {
          if (!ref.current) {
              return;
          }

          const dragId = item.id;
          const hoverId = id;
          // Don't replace items with themselves
          if (dragId === hoverId) {
              return;
          }
          // Determine rectangle on screen
          const hoverBoundingRect = (ref.current as any).getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (hoverClientY) {
            if (dragId < hoverId && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragId > hoverId && hoverClientY > hoverMiddleY) {
                return;
            }
          }
          
          // Time to actually perform the action
          if (currentColumnName === item.currentColumnName) {
            moveCardHandler(dragId, hoverId);
          }
          
      },
  });

  const [{isDragging}, drag] = useDrag({
      item: {index, name, id, currentColumnName, type: 'any'},
      end: (item, monitor) => {
          const dropResult = monitor.getDropResult();

          if (dropResult) {
              const { name } = dropResult as any;
              const { BREAKFAST, MORNING_SNACK, LUNCH, AFTERNOON_SNACK, DINNER } = COLUMN_NAMES;
              switch (name) {
                  case BREAKFAST:
                      changeItemColumn(item, BREAKFAST);
                      break;
                  case LUNCH:
                      changeItemColumn(item, LUNCH);
                      break;
                  case MORNING_SNACK:
                      changeItemColumn(item, MORNING_SNACK);
                      break;
                  case AFTERNOON_SNACK:
                      changeItemColumn(item, AFTERNOON_SNACK);
                      break;
                  case DINNER:
                      changeItemColumn(item, DINNER);
                      break;
                  default:
                      break;
              }
          }
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
      type: 'any',
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
      <Container ref={ref} style={{  opacity }}>
        <FoodName>{name}</FoodName>
        {/* <FoodImage /> */}
        <Frame>
          <FoodImage src={food} alt={`food-${name}`} />
        </Frame>
      </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  height: 100px;
  width: 100px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FoodName = styled.div`
  font-size: 12px;
`;

const FoodImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px;
  background: #fff;
`;

const Frame = styled.div`
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%) inset, 0 5px 10px 5px rgb(0 0 0 / 10%);
`;

export default MovableItem;
