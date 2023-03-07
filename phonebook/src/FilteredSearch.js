import Person from './components/Persons'

const filteredSearch = ({ filter }) => {
    return (
      <div>
        {filter.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div>
    );
  };


export default filteredSearch
