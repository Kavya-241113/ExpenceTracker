import React, { createContext, useReducer } from 'react';

const TrackerContext = createContext();

const initialState = {
  entries: [], // { id, description, amount, type, date }
};

const trackerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== action.payload),
      };
    case 'EDIT_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload.id
            ? { ...entry, ...action.payload }
            : entry
        ),
      };
    default:
      return state;
  }
};


const TrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackerReducer, initialState);

  return (
    <TrackerContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackerContext.Provider>
  );
};

export { TrackerContext, TrackerProvider };
