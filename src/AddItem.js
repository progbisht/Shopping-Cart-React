
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();

    return (
        // events to be handled by react and not by the form 
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Items</label>
            <div className="formItem">
                <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    placeholder="Add Item"
                    required
                    // single source of truth i.e state variable
                    value={newItem}
                    onChange={(e)=>setNewItem(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={()=>inputRef.current.focus()}
                >
                    Add Item
                </button>
            </div>
                
        </form>
    );
}

export default AddItem