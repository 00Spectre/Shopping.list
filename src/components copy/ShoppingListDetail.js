import React, { useState } from 'react';

const ShoppingListDetail = ({ list, onEditListName, onAddRemoveMember, onLeaveList, onAddRemoveItem, onSetItemResolved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list.name);
  const [showAddRemoveItemPopup, setShowAddRemoveItemPopup] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleEditListName = () => {
    setIsEditing(true);
  };

  const handleSaveListName = () => {
    onEditListName(newListName);
    setIsEditing(false);
  };

  const handleAddRemoveItemClick = () => {
    setShowAddRemoveItemPopup(true);
  };

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      onAddRemoveItem(newItemName, 'add');
      setNewItemName('');
    }
  };

  const handleRemoveItem = (itemId) => {
    onAddRemoveItem(itemId, 'remove');
  };

  return (
    <div>
      <h2>
        {isEditing ? (
          <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
        ) : (
          list.name
        )}
      </h2>
      {isEditing ? (
        <button onClick={handleSaveListName}>Save List Name</button>
      ) : (
        <button onClick={handleEditListName}>Edit List Name</button>
      )}

      <button onClick={handleAddRemoveItemClick}>Add/Remove Item</button>

      {showAddRemoveItemPopup && (
        <div className="modal">
          <h3>Add/Remove Item</h3>
          <input
            type="text"
            placeholder="Enter Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
          <button onClick={() => setShowAddRemoveItemPopup(false)}>Cancel</button>
          <ul>
            {list.items.map((item) => (
              <li key={item.id}>
                {item.name} <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h3>Items</h3>
        <ul>
          {list.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingListDetail;
