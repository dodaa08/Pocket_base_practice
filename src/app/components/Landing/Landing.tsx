'use client';

import React, { useReducer, useEffect } from 'react';
import TaskCard from '../taskcard'; // Ensure this path is correct
import PocketBase from 'pocketbase';

// Define the type for a note
type Note = {
  id: number;
  title: string;
  // Add other fields if needed
};

// Define your state and action types
interface State {
  notes: Note[];
}

type Action = { type: 'set_notes'; payload: Note[] };

const initialState: State = {
  notes: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set_notes':
      return { ...state, notes: action.payload };
    default:
      throw new Error('Unhandled action type');
  }
}

const getNotes = async (): Promise<Note[]> => {
  const pb = new PocketBase('http://127.0.0.1:8090');

  try {
    // Fetch the first record with filter and expand
    const record = await pb.collection('users').getFirstListItem('someField="test"', {
      expand: 'relField1,relField2.subRelField',
    });

    console.log('Fetched record:', record);

    // Ensure record data structure matches Note type
    const note: Note = {
      id: parseInt(record.id, 10), // Ensure ID is a number
      title: record.title,
      // Add other fields if needed
    };

    return [note];
  } catch (error) {
    console.error('Error fetching notes:', error);
    console.error('Error details:', error.response); // Log the full error response
    return [];
  }
};

const Landing: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      dispatch({ type: 'set_notes', payload: notes });
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {state.notes.length > 0 ? (
          state.notes.map((note) => (
            <TaskCard key={note.id} note={note} />
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
