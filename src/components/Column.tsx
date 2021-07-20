import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

interface IColumnProps {
  title: string;
}

const Column: React.FC<IColumnProps> = ({ title, children }) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'any',
    drop: () => ({name: title}),
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
        if (canDrop) {
            return 'rgb(188,251,255)'
        } else if (!canDrop) {
            return 'rgb(255,188,188)'
        }
    } else {
        return '';
    }
  };

  return (
    <Container ref={drop} style={{backgroundColor: getBackgroundColor()}}>
        <Title>{title}</Title>
        {children}
    </Container>
  )
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 200px;
  border-radius: 10px;
  :hover {
    background-color: #f7f6f8;
  }
`;

const Title = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  border-bottom: 2px solid red;
`;

export default Column;
