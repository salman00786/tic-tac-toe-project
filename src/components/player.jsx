import { useState } from "react"


export default function Player({initialName, symbol}){

const [IsEditing, setIsEditing] = useState(false);
const [playerName, setPlayerName] = useState(initialName);

const handleClick = () => {
    setIsEditing(editing => !editing);
  
    }

    function handleChange(){
        setPlayerName();
    }

    let editableName = <span className="player-name">{initialName}</span>;
    let buttonName = "Edit" ;

    if(IsEditing){
        editableName = <input type="text" required value={initialName}/>;
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