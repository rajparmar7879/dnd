import React, { useState } from 'react'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styled from 'styled-components'
import Column from './components/Column'
import MovableItem from './components/MovableItem'
import { COLUMN_NAMES, menus } from './constants'


const Columns = () => {
  const [items, setItems] = useState(menus);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
      const dragItem = items[dragIndex];
      console.log({ dragItem });
      if (dragItem) {
          setItems((prevState => {
              const coppiedStateArray = [...prevState];

              // remove item by "hoverIndex" and put "dragItem" instead
              const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

              // remove item by "dragIndex" and put "prevItem" instead
              coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

              return coppiedStateArray;
          }));
      }
  };

  const returnItemsForColumn = (columnName: string) => {
      return items
          .filter((item) => item.column === columnName)
          .map((item, index) => (
              <MovableItem key={item.id}
                name={item.name}
                currentColumnName={item.column}
                setItems={setItems}
                index={index}
                moveCardHandler={moveCardHandler}
              />
          ))
  }

  const {BREAKFAST: DO_IT, MORNING_SNACK: IN_PROGRESS, LUNCH: AWAITING_REVIEW, AFTERNOON_SNACK: DONE} = COLUMN_NAMES;
  return (
    <ColumnContainer>
      <DndProvider backend={HTML5Backend}>
        <Column title={DO_IT}>
          {returnItemsForColumn(DO_IT)}
        </Column>
        <Column title={IN_PROGRESS}>
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column title={AWAITING_REVIEW}>
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE}>
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
    </ColumnContainer>
  )
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default Columns;
