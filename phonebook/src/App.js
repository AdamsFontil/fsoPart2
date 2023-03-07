import { useState } from 'react'
import Input from './components/Filter'
import FilteredSearch from './FilteredSearch'
import Header from './components/Header'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  // const [showAll, setShowAll] = useState(true)

// functions
const addNameAndNumber = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    important: Math.random() < 0.5,
    id: persons.length + 1,
    number: newNumber
  }
  if (persons.some(person => person.name === nameObject.name)) {
    console.log('duplicate', nameObject.name);
    alert (`${nameObject.name} is already added to phonebook`)
  } else {
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
  console.log(nameObject)
  console.log(persons)
  console.log(nameObject.name)
  }
}


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // const namesToShow = showAll
  // ? notes
  // : notes.filter(note => note.important === true)

  const handleSearch = (event) => {
    // console.log(event.target.value)
    setNewSearch(event.target.value)
    console.log('searching for ...' , newSearch)
    console.log('list of ppl in book', persons)
  }
  const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));
  console.log('filtered list', filteredSearch)

  return (
    <div>
      <Header type='h1' text='Phonebook' />
      <Input label='filter shown with' newType={newSearch} handleType ={handleSearch} />
      <Form addNameAndNumber={addNameAndNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Header type='h2' text='Number' />
     <FilteredSearch filter={filteredSearch} />
    </div>
  )
}

export default App
