
const Person = ({ person, handleDelete }) => {
    // console.log(person.content)
    // console.log(person)
    return (
        <div>{person.name} {person.number}
        <button onClick={handleDelete}>Delete</button>
        </div>
    )
}





export default Person
