import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {

    return (
        <>
            <h2> {items.length > 1 ? "Items" : "Item"} </h2>
            
            {items.length ? (
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : "No items to display"}

        </>
    );
}

export default Content;