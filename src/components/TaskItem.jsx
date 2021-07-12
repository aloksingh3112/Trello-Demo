const TaskItem = ({ item,deleteTaskItem }) => {
  return (
    <div className="taskItem">
      <div className='taskItemHeader'>
        <h5>{item.title}</h5>
        <span onClick={deleteTaskItem}>x</span>
      </div>
      <div>{item.desc}</div>
    </div>
  );
};

export default TaskItem;
