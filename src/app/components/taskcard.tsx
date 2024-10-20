import React from 'react';

type TaskProps = {
    note: { // Define the structure of the note prop
        id: number;
        title: string;    
    };
};

const TaskCard = ({ note }: TaskProps) => { // Destructure note from props
    return (
        <div className="p-4 bg-gray-700 rounded-lg text-white text-xl">
            <h1 className="font-bold text-2xl">{note.title}</h1> {/* Access title from note */}
        </div>
    );
};

export default TaskCard;
