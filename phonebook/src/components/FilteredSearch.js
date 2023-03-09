import Person from './Persons'




const filteredSearch = ({ filter, handleDelete}) => {
    return (
      <div>
        {filter.map(person =>
          <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)}/>
        )}
      </div>
    );
  };


export default filteredSearch
