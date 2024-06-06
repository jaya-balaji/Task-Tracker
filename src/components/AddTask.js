import React, { useState } from 'react';
import Style from './TaskTrackerStyle.module.css';


const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text) {
      alert('Please add a task')
      return
    }
    if (!day) {
      alert('please add day and time')
      return
    }

    onAdd({ text, day, reminder })
    setText('')
    setDay('')
    setReminder(false)
  }
  return (
    <form className={Style.addform} onSubmit={onSubmit}>
      <div className={Style.formcontrol}>
        <label>Task</label>
        <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}></input>
      </div>
      <div className={Style.formcontrol}>
        <label>Day & Time</label>
        <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)}></input>
      </div>
      <div className={Style.formcontrolcheck}>
        <label>Set reminder</label>
        <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}></input>
      </div>
      <input type='submit' value='Save Task' className={Style.btn}></input>
    </form>
  );
}

export default AddTask;
