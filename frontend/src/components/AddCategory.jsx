import React, { useRef, useState } from 'react'

// eslint-disable-next-line react/prop-types
function AddCategory({categories, setCategories}) {
    const [newCategory, setNewCategory] = useState('')
    const [error, setError] = useState("")
    const inputRef = useRef()

    async function addNewCategory(){
        setError("")
        if(newCategory){
            try{
                const response = await fetch(`http://localhost:3000/api/categories` , {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        name: newCategory
                    })
                })
            const data = await response.json();
            if(response.status === 400){
                setError("Category already added")
            }
            if (categories.every(category => category.name !== newCategory)) {
                setCategories([...categories, data])
            }
            inputRef.current.value = ""
            }catch (error) {
                console.log(error)
            }
        }
    }


  return (
    <div className='add-category'>
            <input type="text" ref={inputRef} placeholder='Category' onChange={(e)=> setNewCategory(e.target.value.trim().toLowerCase())}></input>
            <button type='button' onClick={addNewCategory}>Add</button>
            {
                error && <p className='error'>{error}</p>
            }
     </div>
  )
}

export default AddCategory