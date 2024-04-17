import React, { useEffect, useState } from 'react'
import NoteList from './NoteList';

function Categories({setTabSelected}) {
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(()=> {
        async function getCategories(){
            try{
            const response = await fetch(`http://localhost:3000/api/categories`)
            const data = await response.json();
            setCategories(data)
            }catch (error) {
                console.log(error)
            }
        }
        getCategories()
    },[])

    function filterNotes(id){
        setFilter(id)
    }
    


  return (
    <div className='category-page'>
        <div className='category-container'>
            {
                categories.map((cat) => (
                    <div className='category' key={cat.id} style={{backgroundColor: filter === cat.id ? "maroon" : ""}} onClick={()=> filterNotes(cat.id)}>
                        <h3>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</h3>
                    </div>
                ))
            }
        </div>
        {
            <NoteList tabSelected={"filtered"} filter={filter} />
        }
    </div>
  )
}

export default Categories