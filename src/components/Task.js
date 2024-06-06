import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Style from './TaskTrackerStyle.module.css';


const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`${Style.task} ${task.reminder ? Style.reminder : ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.text}<FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)}></FaTimes>
      </h3>
      <p>{task.day}</p>
    </div>
  );
}

export default Task;
