import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShoppingLists from './components/ShoppingLists';
import ShoppingListDetail from './components/ShoppingListDetail';
import './App.css';

const App = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Shopping List 1',
      owner: 'Member 1',
      items: [
        { id: 1, name: 'Item 1', resolved: false },
        { id: 2, name: 'Item 2', resolved: false },
      ],
    },
  ]);

  const [selectedList, setSelectedList] = useState(null);

  const handleViewList = (listId) => {
    const selected = lists.find(list => list.id === listId);
    setSelectedList(selected);
  };

  const handleDeleteList = (listId) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
    setSelectedList(null);
  };

  const handleCreateList = (listName) => {
    const newList = {
      id: lists.length + 1,
      name: listName,
      owner: 'Current User',
      items: [],
    };

    setLists(prevLists => [...prevLists, newList]);
  };
  
  const handleEditListName = (listId, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === listId ? { ...list, name: newName } : list))
    );
  };
  const handleAddRemoveItem = (listId, itemName, action) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          if (action === 'add') {
            const newItem = { id: list.items.length + 1, name: itemName, resolved: false };
            return { ...list, items: [...list.items, newItem] };
          } else if (action === 'remove') {
            return { ...list, items: list.items.filter((item) => item.id !== itemName) };
          }
        }
        return list;
      })
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ShoppingLists lists={lists} onDeleteList={handleDeleteList} onViewList={handleViewList} onCreateList={handleCreateList} />
        </Route>
        <Route path="/list/:id">
          {({ match }) => {
            const listId = parseInt(match.params.id, 10);
            const selectedList = lists.find((list) => list.id === listId);
            return selectedList ? (
              <ShoppingListDetail
                list={selectedList}
                onEditListName={(newName) => handleEditListName(selectedList.id, newName)}
                onAddRemoveMember={() => {}}
                onLeaveList={() => {}}
                onAddRemoveItem={(itemName, action) => handleAddRemoveItem(selectedList.id, itemName, action)}
                onSetItemResolved={() => {}}
              />
            ) : (
              <p>List not found</p>
            );
          }}
        </Route>
      </Switch>
    </Router>
  );
  };

export default App;
