import React, { useState } from 'react'
import AddCategory from './AddCategory'

function NewNote({setEditMode = ()=>{}, note}) {
    const [title, setTitle] = useState(note?.title || "")
    const [content, setContent] = useState(note?.content || "")
    const [categories, setCategories] = useState(note?.categories || [])
    const [archived, setArchived] = useState(note?.archived || false)

    async function handleSave(e){
        try{
            const response = await fetch(`http://localhost:3000/api/notes`, {
                method: note ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    id: note?.id, title, content,categories, archived
                })
            })
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setEditMode(false)
        }catch (error) {
            console.log(error)
            setEditMode(false)
        }

    }
   

    
  return (
    <form action="" className='new-note'>
        <input type='text' placeholder='Note title'  value={title} onChange={(e)=> setTitle(e.target.value)} required/>
        <textarea placeholder='Write your note here' value={content}  onChange={(e)=> setContent(e.target.value)} required></textarea>
        <div className='card-footer'>
        {
            categories?.map( (cat,i) => (
                <div key={i} className='category'>{cat.name} 
                <button className='delete-category' type='button' onClick={()=> setCategories(categories.filter((c,j)=> i!==j))} >&#10005;</button>
                </div>
             
                )          
            )
        }
        </div>
        <AddCategory categories={categories} setCategories={setCategories}/>
        <div className='add-category'>
            <button onClick={(e)=> handleSave(e)}>Save &#10004;</button>
            <button onClick={()=> setEditMode(false)}>Cancel</button>
            {note && (archived ? 
                <button type="button" className='arcIcon' onClick={()=> setArchived(false)}>Unarchive</button>
                :
                <button type="button" onClick={()=> setArchived(true)}>Archive</button>)

            }
        </div>
    </form>
    
  )
}

export default NewNote