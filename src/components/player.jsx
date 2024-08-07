import { useState } from "react"


export default function Player({initialName, symbol}){

const [IsEditing, setIsEditing] = useState(false);
const [playerName, setPlayerName] = useState(initialName);

const handleClick = () => {
    setIsEditing(editing => !editing);
  
    }

    function handleChange(e){
        console.log(e.target.value);
        setPlayerName(e.target.value);
    }

    let editableName = <span className="player-name">{playerName}</span>;
    let buttonName = "Edit" ;

    if(IsEditing){
        editableName = <input type="text" required value={playerName} onChange={handleChange}/>;
         buttonName = "Save";
    }
   


    return(
        <li>
        <span className="player">
        {editableName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{buttonName}</button>
        </li>
    )
}