import Nav from "./components/Nav"
import NoteList from "./components/NoteList"
import NewNote from "./components/NewNote"
import { useState } from "react"
import Categories from "./components/Categories"
import Footer from "./components/Footer"

function App() {
  const [tabSelected, setTabSelected] = useState("active-notes")

  const handleCategorySelect = (category) => {
    setTabSelected(category);
  }

  return (
    <div>
      <Nav onCategorySelect={handleCategorySelect} tabSelected={tabSelected} />
      <main>
      {(tabSelected === "active-notes" ||  tabSelected === "archived-notes") &&
        <NoteList tabSelected={tabSelected}/>
      }
      {tabSelected === "add-note" &&
        <NewNote />
      }
      {tabSelected === "categories" &&
        <Categories setTabSelected={setTabSelected}/>
      }
      </main>
      <Footer />
    </div>
  )
}

export default App
