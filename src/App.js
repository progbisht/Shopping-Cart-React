import { useState, useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItems from './SearchItems.js';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest.js';
// import Exercise from './Exercise';


// Working with localstorage to store and fetch data

// function App() {
  
//   const [items,setitems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);

//   const [newItem, setNewItem] = useState('');

//   const [searchItem, setSearchItem] = useState('');

//   useEffect(()=>{
//     localStorage.setItem('shoppingList', JSON.stringify(items));
//   },[items])


//   const addItem = (item) => {
//     const id = items.length ? items[items.length-1].id + 1 : 1;
//     const myNewItem = {id, checked:false, item};
//     const listItems = [...items, myNewItem];
//     setitems(listItems);
//   }

//   const handleCheck = (id) => {
//       const itemList = items.map((item) => item.id === id ? {...item, checked : !item.checked} : item);
//       setitems(itemList);
//   }

//   const handleDelete = (id) => {
//       const itemList = items.filter((item) => item.id !== id);
//       setitems(itemList);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if(!newItem) return;
//     addItem(newItem);
//     setNewItem('')
//   }

//   // const [colorName, setColorName] = useState("Empty Value");
//   return (
//     <div className="App">
//       <Header title="Item List"/>
//       <AddItem 
//         newItem={newItem}
//         setNewItem={setNewItem}
//         handleSubmit={handleSubmit}
//       />
//       <SearchItems
//         searchItem={searchItem}
//         setSearchItem={setSearchItem}
//       />
//       <Content 
//         items={items.filter((item)=>(item.item.toLowerCase()).includes(searchItem.toLowerCase()))}
//         handleCheck={handleCheck}
//         handleDelete={handleDelete}
//       />
//       <Footer />

      
//       {/* <div className="colorBox" style={{
//         backgroundColor:colorName
//       }}>
//         {colorName?colorName:"Empty Value"}
//       </div>

//       <Exercise 
//         colorName={colorName}
//         setColorName={setColorName}
//       /> */}

//     </div>
//   );
// }


// Working with API and simulating server to work with APIs

function App() {
  
  const API_URL = "http://localhost:3500/items";

  const [items,setitems] = useState([]);

  const [newItem, setNewItem] = useState('');

  const [searchItem, setSearchItem] = useState('');

  const [fetchError, setFetchError] = useState(null);
  
  // by default loading state is set to true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive expected data.") 
        const listItems = await response.json()
        setitems(listItems)
        setFetchError(null)
      }
      catch(err){
        console.log(err.message);
        setFetchError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }

    // code snippit for simulating server
    setTimeout(()=>{
      fetchItems()
    },2000);
    

  },[])


  const addItem = async (item) => {
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id, checked:false, item};
    const listItems = [...items, myNewItem];
    setitems(listItems);

    const postOptions = {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);  
  }

  const handleCheck = async (id) => {
      const itemList = items.map((item) => item.id === id ? {...item, checked : !item.checked} : item);
      setitems(itemList);

      const myItem = itemList.filter((item) => item.id === id);

      const updateOptions = {
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({checked : myItem[0].checked})
      }

      const updateUrl = `${API_URL}/${id}`;
      const result = await apiRequest(updateUrl, updateOptions);
      if(result) setFetchError(result);
  }

  const handleDelete = async (id) => {
      const itemList = items.filter((item) => item.id !== id);
      setitems(itemList);
      
      const deleteOptions = {
        method : "DELETE"
      }

      const deleteUrl = `${API_URL}/${id}`;
      const result = await apiRequest(deleteUrl, deleteOptions);
      if(result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!newItem) return;
    addItem(newItem);
    setNewItem('')
  }

  
  return (
    <div className="App">
      <Header title="Item List"/>
      <section className='container'>
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItems
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      </section>
      
      <main className='main-container'>
        {isLoading && <p>Loading Items</p>}
        {fetchError && <p style={{color:"red"}}>{`Error : ${fetchError}`}</p>}
        
        {/* if there are no errors and loading statte id false then the content will be displayed */}
        {!fetchError && !isLoading && <Content 
          items={items.filter((item)=>(item.item.toLowerCase()).includes(searchItem.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      
      <Footer />


    </div>
  );
}

export default App;
