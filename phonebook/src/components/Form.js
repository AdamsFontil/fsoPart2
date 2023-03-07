import Input from "./Input"
import Header from "./Header"

const Form = ({ addNameAndNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={addNameAndNumber}>
        <Header type='h2' text='add a new' />
        <Input label='name' newType={newName} handleType={handleNameChange} />
        <Input label='number' newType={newNumber} handleType={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };




export default Form
