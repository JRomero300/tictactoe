import { useState } from "react";

export default function Player({ initialName, symbol, isActivePlayer, onNameChange}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, updatePlayerName] = useState(initialName);

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
    if(isEditing)
    {
      onNameChange(symbol, playerName)
    }
  }

  function handleChange(event) {
    updatePlayerName(event.target.value);
  }

  return (
    <li className={isActivePlayer?'active':undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
