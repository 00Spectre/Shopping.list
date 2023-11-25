import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingLists = ({ lists, onDeleteList, onViewList, onCreateList }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    onCreateList(newListName);
    setNewListName('');
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setNewListName('');
    setShowCreateForm(false);
  };

  const handleDeleteConfirmation = (listId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this shopping list?");
    if (isConfirmed) {
      onDeleteList(listId);
    }
  };

  return (
    <div>
      <h2>Shopping Lists</h2>
      <div className="list-tiles">
        {lists.map((list) => (
          <div key={list.id} className="list-tile">
            <Link to={`/list/${list.id}`}>
              {list.name}
            </Link>
            {list.owner && <button onClick={() => handleDeleteConfirmation(list.id)}>Delete</button>}
          </div>
        ))}
      </div>
      <button onClick={() => setShowCreateForm(true)}>Create New Shopping List</button>

      {showCreateForm && (
        <div className="modal">
          <h3>Create New Shopping List</h3>
          <input
            type="text"
            placeholder="Enter Shopping List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleCreateList}>Create</button>
          <button onClick={handleCancelCreate}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
