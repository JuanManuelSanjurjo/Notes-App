import React from 'react'

function Nav({onCategorySelect, tabSelected }) {

  return (
        <nav className='main-nav'>
            <h1 className='app-title'>&#10096; &#8469; &#10097; My notes </h1>
            <ul className='nav-list'>
                <li><button style={{ backgroundColor: tabSelected === 'add-note' ? '#010411' : '', textWrap: "nowrap" }} onClick={() => onCategorySelect('add-note')}>Add note</button></li>
                <li><button style={{ backgroundColor: tabSelected === 'active-notes' ? '#010411' : '' }} onClick={() => onCategorySelect('active-notes')}>Notes</button></li>
                <li><button style={{ backgroundColor: tabSelected === 'archived-notes' ? '#010411' : '' }} onClick={() => onCategorySelect('archived-notes')}>Archived</button></li>
                <li><button style={{ backgroundColor: tabSelected === 'categories' ? '#010411' : '' }} onClick={() => onCategorySelect('categories')}>Categories</button></li>
            </ul>
        </nav>
  )
}

export default Nav