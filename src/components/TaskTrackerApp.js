import React from 'react';
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import Style from './TaskTrackerStyle.module.css';
import { useState, useEffect } from 'react';

const TaskTrackerApp = () => {
  const [showAddTask, setshowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [endpointtocall, setendpointtocall] = useState('')

  useEffect(() => {
    fetchPosts();
  });
  
  const fetchPosts = async () => {
    setendpointtocall(sessionStorage.getItem('myvalue'))
    try {
      const response = await fetch(`http://localhost:5000/${endpointtocall}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addTask = async (task) => {
    const url = `http://localhost:5000/${endpointtocall}`
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(url)
    fetchPosts();
  }

  const deleteTask = async (id) => {
    const url = `http://localhost:5000/${endpointtocall}/${id}`
    try {
      await fetch(url, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error:', error);
    }
    fetchPosts();
  }

  const changeReminderValue = async (id) => {

    const url = `http://localhost:5000/${endpointtocall}/${id}`
    try {
      const response = await fetch(url)
      const responseData = await response.json()
      const newData = {
        ...responseData,
        reminder: !responseData.reminder
      }
      updateJson(newData, id)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const updateJson = async (passedJson, id) => {
    const url = `http://localhost:5000/${endpointtocall}/${id}`
    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passedJson)
      })
    } catch (error) {
      console.error('Error:', error);
    }
    fetchPosts();
  }

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <Header onclick={() => setshowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
        {showAddTask && <AddTask onAdd={addTask}></AddTask>}
        {tasks?.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={changeReminderValue}></Tasks> : 'No tasks to show'}
      </div>
    </div>
  );
}

export default TaskTrackerApp;
