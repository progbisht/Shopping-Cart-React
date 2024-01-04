
import { useRef } from "react"

const SearchItems = ({searchItem, setSearchItem}) => {
    const inputRef = useRef();

    return(
        <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
            <label>Search</label>
            <div className="searchBox">
                <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    placeholder="Search Item"
                    required
                    value={searchItem}
                    onChange={(e)=>setSearchItem(e.target.value)}
                />
                <button 
                    type="submit"
                    onClick={()=>inputRef.current.focus()}
                >
                    Search
                </button>

            </div>

        </form>
    )
}

export default SearchItems