
const Exercise = ({colorName, setColorName}) => {
    
    return (
        <form className="exercise" onSubmit={(e)=>e.preventDefault()}>
            
            <input
                autoFocus
                type="text"
                placeholder="Add Color Name"
                value={colorName}
                onChange={(e)=>setColorName(e.target.value)}
            />
        </form>
    )
}

export default Exercise