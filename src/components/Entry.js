import React, { useState, useContext } from 'react';
import { TrackerContext } from '../context/TrackerContext';

const EntryList = () => {
  const { state, dispatch } = useContext(TrackerContext);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ description: '', amount: 0 });

  const handleEdit = (entry) => {
    setEditId(entry.id);
    setEditForm({ description: entry.description, amount: entry.amount });
  };

  const handleSave = (id) => {
    dispatch({
      type: 'EDIT_ENTRY',
      payload: { id, ...editForm },
    });
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null); 
  };

  return (
    <div className="entry-list">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.entries.map((entry) =>
            editId === entry.id ? (
              <tr key={entry.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: Number(e.target.value) })
                    }
                  />
                </td>
                <td>{entry.type}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSave(entry.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={entry.id}>
                <td>{entry.description}</td>
                <td>{entry.amount}</td>
                <td>{entry.type}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      dispatch({ type: 'DELETE_ENTRY', payload: entry.id })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EntryList;
