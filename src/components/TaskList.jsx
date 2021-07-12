import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { useState } from "react";
import TaskItemForm from "./TaskItemForm";
import {Button} from 'react-bootstrap'

const TaskList = ({
  list,
  listIndex,
  addTaskItems,
  deleteTaskItem,
  deleteTaskList,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTaskItem = (item) => {
    handleClose();
    addTaskItems(item, listIndex);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    padding: '10px',
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#ebecf0",
    minHeight:'450px'
  });

  return (
    <div className="taskList">
      <div className="taskListHeader">
        <span>{list.title}</span>
        <span className='listDeleteIcon'
          onClick={() => {
            deleteTaskList(listIndex);
          }}
        >
          x
        </span>
      </div>
      <Droppable key={listIndex} droppableId={`${listIndex}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {list.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <TaskItem
                      item={item}
                      deleteTaskItem={() => deleteTaskItem(listIndex, index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>

      <TaskItemForm
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        addTaskItem={addTaskItem}
      />
      <div className='text-center'>
      <Button onClick={() => handleShow()} className='mb-2 addItemButton'>+</Button>

      </div>
    </div>
  );
};

export default TaskList;
