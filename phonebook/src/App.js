import { useState, useEffect } from 'react'
import Input from './components/Input'
import FilteredSearch from './components/FilteredSearch'
import Header from './components/Header'
import Form from './components/Form'
import axios from 'axios'
import personService from './services/person'
import Notification from './components/Notification'


axios
  .get('http://localhost:3001/persons')
  .then(response => {
    const persons = response.data
    console.log(persons)
  })

  console.log(personService)
  console.log(personService.getAll())


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('success')
  // const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    console.log('effect')
    console.log('effective')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'people')

// functions
const addNameAndNumber = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    important: Math.random() < 0.5,
    number: newNumber
  }

  const person = persons.find(p => p.name === nameObject.name);

  if (person) {
    console.log('duplicate', nameObject.name);
    if (window.confirm (`${person.name} is already added to phonebook`)) {
      console.log('replace old value')
      console.log('newinfo', nameObject)
      console.log('newNumber', nameObject.number)
      console.log('target', person)
      console.log('id', person.id)
      console.log('oldNumber', person.number)

      personService
        .update(person.id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewMessage(`${nameObject.name}'s number has been updated to ${nameObject.number} it used to be ${person.number}`)
          setMessageClass('success') // set the class to 'success'
          setTimeout(() => {
            setNewMessage(null)
            setMessageClass(null) // reset the class
          }, 5000)
        })
        .catch(error => {
          setMessageClass('error') // set the class to 'error'
          setNewMessage(`${person.name} has already been removed from the server`)
          setTimeout(() => {
            setNewMessage(null)
            setMessageClass(null) // reset the class
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  } else {
    personService
      .create(nameObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        setNewMessage(`${nameObject.name} has been added to the list`)
        setMessageClass('success') // set the class to 'success'
        setTimeout(() => {
          setNewMessage(null)
          setMessageClass(null) // reset the class
        }, 5000)
      })
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

  const handleSearch = (event) => {
    // console.log(event.target.value)
    setNewSearch(event.target.value)
    console.log('searching for ...' , newSearch)
    console.log('list of ppl in book', persons)
  }
  const handleDelete = (id) => {
    console.log('this person, id:' + id + ' needs to be deleted')

    const person = persons.find(n => n.id === id)
    console.log(person)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNewMessage(`${person.name} has been removed from the list`)
        setMessageClass('success') // set the class to 'success'
        setTimeout(() => {
          setNewMessage(null)
          setMessageClass(null) // reset the class
        }, 5000)
      })
  }
}

  const filteredSearch = persons.filter(person => person.name?.toLowerCase().includes(newSearch.toLowerCase()));

  console.log('filtered list', filteredSearch)

  return (
    <div>
      <Header type='h1' text='Phonebook' />
      <Notification message={newMessage} messageClass={messageClass} />
      <Input label='filter shown with' newType={newSearch} handleType ={handleSearch} />
      <Form addNameAndNumber={addNameAndNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Header type='h2' text='Number' />
     <FilteredSearch filter={filteredSearch} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
