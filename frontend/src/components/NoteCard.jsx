import React, { useState } from 'react'
import NewNote from './NewNote'


function NoteCard({note, handleNoteDelete}) {
    const [editMode, setEditMode] = useState(false)
    async function handleDelete(){
        try{
            const response = await fetch(`http://localhost:3000/api/notes`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    id: note.id
                })
            })
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        handleNoteDelete(note.id)
        }catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    { editMode ? 
        <NewNote setEditMode={setEditMode} note={note}/>
        :
        <div className={`${note.archived ? "note-card archivedNote" :  "note-card"}`}>  
            <nav className='card-nav'>
                <h3> {note?.title} </h3>
                <i> -{new Date(note.createdAt).toLocaleDateString()}-</i> 
                <ul >
                    <li><button onClick={()=> setEditMode(!editMode)}>Edit</button></li>
                    <li><button onClick={handleDelete}>Delete</button></li>
                    {note.archived && <li><button className='arcIcon'>Arc</button></li>}
                </ul>
            </nav> 
            <pre className='card-content'>
            {note?.content}
            </pre>
            <div className='card-footer'>
            {
                note.categories?.map( (cat,i) =>   (
                    <div key={i} className='category'>{cat.name}</div>
                )          
                )
            }
            </div>
        </div>
    }
    </>
  )
}

export default NoteCard