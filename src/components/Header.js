import Button from './Button';
import Style from './TaskTrackerStyle.module.css';


const Header = ({showAdd,onclick}) => {

  return (
<header className={Style.header}>
    <h1>Task Tracker</h1>
    <Button color ={showAdd ?'red':'green'} text ={showAdd ?'close':'Add'} onClick={onclick}></Button>
</header>
  );
}

export default Header;
