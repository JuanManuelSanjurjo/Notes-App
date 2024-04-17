/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard"

function NoteList({tabSelected, filter= ""}) {
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])

  function handleNoteDelete(noteId) {
    let filteredNotes = notes.filter(note => note.id !== noteId)
    setNotes(filteredNotes);
    setActiveNotes(filteredNotes.filter(note => note.archived === false))
    setArchivedNotes(filteredNotes.filter(note => note.archived === true))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/notes`)

        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setNotes(data);
        setActiveNotes(data.filter(note => note.archived === false))
        setArchivedNotes(data.filter(note => note.archived === true))

        if(filter){
          setFilteredNotes(data.filter(note => note.categories.some(category => category.id === filter)));
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
}, [filter]);


  return (
    <div className="note-list">
    {tabSelected === "active-notes" && 
      activeNotes.map((note) => 
            (<NoteCard key={note.id} note={note}  handleNoteDelete={handleNoteDelete}/>)
        )
    }
    {tabSelected === "archived-notes" && 
    archivedNotes.map((note) => 
       (<NoteCard key={note.id} note={note}  handleNoteDelete={handleNoteDelete}/>)
    )
    }
    {tabSelected === "filtered" && 
    filteredNotes.map((note) => 
       (<NoteCard key={note.id} note={note}  handleNoteDelete={handleNoteDelete}/>)
    )
    }
    </div>
  )
}

export default NoteList