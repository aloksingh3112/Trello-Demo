import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TaskListForm from "./components/TaskListForm";
import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [lists, setLists] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const gen4 = () => {
    return Math.random().toString(16).slice(-4);
  };

  useEffect(()=>{
    const storedLists=getListFromLocalStorage()
    setLists([...storedLists])
  },[])

  const storeListsInLocalStorage=(lists)=>{
    const list=JSON.stringify(lists)
    localStorage.setItem('list',list)
  }

  const getListFromLocalStorage=()=>{
    const storedLists=localStorage.getItem('list')
    return JSON.parse(storedLists) || []

  }

  const addTaskList = (list) => {
    list["id"] = `${gen4()}`;
    list["items"] = [];
    setLists([...lists, list]);
    storeListsInLocalStorage([...lists,list])
    handleClose();
  };

  const addTaskItems = (item, index) => {
    item["id"] = gen4();
    item["created_time"] = new Date().getTime();
    lists[index].items.unshift(item);
    setLists([...lists]);
    storeListsInLocalStorage([...lists])
  };

  const reorder = (listIndex, startIndex, endIndex) => {
    const newLists= [...lists]
    const list = newLists[listIndex]
    const [result] = list.items.splice(startIndex, 1);
    list.items.splice(endIndex, 0, result);
    newLists[listIndex] = list;
    setLists(newLists)
    storeListsInLocalStorage(newLists)
  };

  const move = (
    sourceListIndex,
    destinationListIndex,
    sourceItemIndex,
    destinationItemIndex
  ) => {
    const newLists = [...lists]
    const sourceList = newLists[sourceListIndex];
    const destinationList = newLists[destinationListIndex];

    const [result] = sourceList.items.splice(sourceItemIndex, 1);
    destinationList.items.splice(destinationItemIndex, 0, result);
    destinationList.items=destinationList.items.sort((a,b)=>a.created_time-b.created_time)
    setLists(newLists)
    storeListsInLocalStorage(newLists)

  };

  function onDragEnd(item) {
    const { source, destination } = item;
    if (!destination) {
      return;
    }

    const sourceListIndex = +source.droppableId;
    const destinationListIndex = +destination.droppableId;
    const sourceItemIndex = source.index;
    const destinationItemIndex = destination.index;

    if (sourceListIndex === destinationListIndex) {
      reorder(sourceListIndex, sourceItemIndex, destinationItemIndex);
    } else {
      move(
        sourceListIndex,
        destinationListIndex,
        sourceItemIndex,
        destinationItemIndex
      );
    }
  }

  const deleteTaskList = (index) => {
    const cloneLists = lists;
    cloneLists.splice(index, 1);
    setLists([...cloneLists]);
    storeListsInLocalStorage([...cloneLists])

  };

  const deleteTaskItem = (index, itemIndex) => {
    const list = lists[index];
    list.items.splice(itemIndex, 1);
    lists[index] = { ...list };
    setLists([...lists]);
    storeListsInLocalStorage([...lists])
  };

  return (
    <div className="App">
      <Header />
      <div className="listWrapper">
        <div className='mb-30 text-end'>
          <Button variant="primary" onClick={() => handleShow()}>
            Add List
          </Button>
        </div>
        <TaskListForm
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          addTaskList={addTaskList}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="taskListContainer">
            {lists.map((list, i) => (
              <TaskList
                list={list}
                key={i}
                listIndex={i}
                onDragEnd={onDragEnd}
                addTaskItems={addTaskItems}
                deleteTaskList={deleteTaskList}
                deleteTaskItem={deleteTaskItem}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
