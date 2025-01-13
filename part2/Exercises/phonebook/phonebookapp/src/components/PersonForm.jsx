/* eslint-disable react/prop-types */

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, addPerson }) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={onNameChange} />
                    number: <input value={newNumber} onChange={onNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
