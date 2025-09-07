import pbservices from './pb_utilities'
import './index.css'
import { useState, useEffect } from 'react'

const ShowPeople = ({people, filt, deleteHandler}) => {
  //print the names of peope in persons

  people = filt ? people.filter( person => person.name.match(filt)) : people

  return(
    <div>
      {people.map( (person) => 
      <li key={person.id} className='note' >
        {person.name}: {person.number} 
        <button className='deleteButton' onClick={ () => deleteHandler(person.id)} >delete</button>
      </li>
      )}
    </div>
  )

}

const FilterName = (props) => {
  //case-insensitive filtering
  //const toShow = props.personlist.filter( person => person.name.match(props.pattern))

  return(
    <div>
      <label htmlFor="filt">
        Filter: <input type='text' id='filt' onChange={props.filtchangeHandler} />
      </label>
    </div>
  )

}

const AddPersonForm = (props) => {

  return(
    <div>
      <form onSubmit={props.submitHandler}>
        <label htmlFor='name'>
          name: <input type='text' id='name' name='name' value={props.newNameVar} onChange={props.nameChangeHandler} />
        </label>
        <br />
        <label htmlFor='num'>
          number: <input type='text' id='num' name='num' value={props.newNumVar} onChange={props.numChangeHandler} />
        </label>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const ShowErrorMessage = (props) => {

  if(props.message === null){
    return
  }else{
    return(
      <div className='errMsg'>
        {props.message}
      </div>
    )
  }
}

const App_1 = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [nameFilt, setNameFilt] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //retrieve the data from 'server'
  useEffect(() => {
    pbservices.getAll()
    .then(returnedEntries => {
      setPersons(returnedEntries)
    })
  }, []) //second argument to ensure this isn't constantly re-run with each render

  //const handleFilt = (event) => {
  //  
  //  event.preventDefault()
  //  if(nameFilt === '') {
  //    return
  //  }
  //  setNameFilt(nameFilt)
//
  //}

  const addNewName = (event) => {

    //need to disable default behaviour because it refreshes the page
    event.preventDefault()
    if(newName === '' || newNum === '') {
      alert('missing info')
      return
    }

    //check that name doesn't already exist
    if (typeof persons.find(person => person.name === newName) === 'undefined'){
      const newNameObj = {name: newName, number: newNum}
      //setPersons(persons.concat(newNameObj))

      pbservices.addNum(newNameObj)
      .then(returnedEntry => {
        setPersons(persons.concat(returnedEntry))
      })
      .then( () => {
        setErrorMessage(`${newName} added to Phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  
      //reset text field
      setNewName('')
      setNewNum('')
    }else{
      if(window.confirm("Do you want to update this number?")){

        const personToChange = persons.find(person => person.name === newName)
        const changedPerson = {...personToChange, number: newNum}

        pbservices.updateNum(changedPerson)
        .then(returnedObj => {
          setPersons(
            persons.map( person => person.name === newName ? returnedObj : person)
            )
            
        })
        .catch(error => {
          //alert(`the name ${changedPerson.name} was deleted`)
          setErrorMessage(`the name ${changedPerson.name} has been removed from server`)
          setPersons(persons.filter(person => person.id != changedPerson.id))
        })
      }else{
        return
      }
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumInput = (event) => {
    setNewNum(event.target.value)
  }

  const handleFiltInput = (event) => {
    setNameFilt(event.target.value)
  }

  const handleDelete = (id) => {
    // want to delete contact
    //first ask for confirmation
    if(window.confirm("Do you want to delete?")){
      //id is passed
      pbservices.deleteNum(id)
      .then( (returnedObj) => {
        setPersons(persons.filter( person => person.id != returnedObj.id ))
      })
      .catch(error => {
        alert(`the name was deleted"`)
        console.log(error)
      })
    }else {
      return
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ShowErrorMessage message={errorMessage} />
      
      <FilterName pattern={nameFilt} filtchangeHandler={handleFiltInput} />

      <h2>Add new:</h2>
      <AddPersonForm submitHandler={addNewName} newNameVar={newName} 
      nameChangeHandler={handleNameInput} 
      newNumVar={newNum} numChangeHandler={handleNumInput} />
      
      <h2>Numbers</h2>
      <ul>
        <ShowPeople people={persons} filt={nameFilt} 
        deleteHandler={handleDelete} />
      </ul>
      
    </div>
  )
}

export default App_1
