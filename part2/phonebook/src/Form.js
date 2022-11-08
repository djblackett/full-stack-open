export function Form({handleNumberChange, newName, onChange, newNumber, handleClick}) {
    return <form>
        <div>
            name: <input value={newName} onChange={onChange}/></div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit" onClick={handleClick}>add</button>
        </div>
    </form>;
}
