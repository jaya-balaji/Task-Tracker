import React from 'react';
import PropTypes from 'prop-types';
import Style from './TaskTrackerStyle.module.css';

const Button = ({color,text,onClick}) => {
  return (
    <div>
      <button style={{backgroundColor:color}} className={Style.btn} onClick={onClick}>{text}</button>
    </div>
  );
}

Button.defaultProps ={
    color :'red',
}

Button.propTypes = {
    text : PropTypes.string,
    color: PropTypes.string,
}

export default Button;
