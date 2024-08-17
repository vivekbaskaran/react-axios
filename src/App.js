import React, { useEffect, useState } from 'react'
import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/users";


const App = () => {
    const [items, setitems] = useState([])
    const [newItem, setNewItem] = useState({ name: "", email: "" })
    const [edititem,setEditItem]=useState(null)
    useEffect(() => {
        (async () => {
            try {
                const response=await axios.get(API_URL);
                console.log("response", response);
                setitems(response.data)
            }
            catch (error) {
                console.error("error", error)
            }
        })()
    }, [])
    const createItem = async () => {  
    const response = await axios.post(API_URL, newItem)
    }
    
    const deleteItem = async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
    }
    
    const updateItem = async (id) => {
        try {      
            const response=await axios.put(`${API_URL}/${edititem.id}`,edititem)
            setitems(items.map(item => item.id === response.data.id ? response : item))

        }
        catch (error)
        {
         console.error('error:',error)       
        }    
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (edititem) {
            updateItem()
        } else {
            createItem()
        }
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" placeholder='name' value={edititem?edititem.name:newItem.name} onChange={(e) => {edititem?setEditItem({...edititem,name:e.target.value})
                    :setNewItem({...newItem,name:e.target.value})}}required />
                <input type="email" placeholder='email' value={edititem?edititem.email:newItem.email} onChange={(e) => {edititem?setEditItem({...edititem,email:e.target.value}):
                    setNewItem({ ...newItem, email: e.target.value })
                }} required />
                <button type="submit">{edititem ? "update" : "Create"}</button>
                {edititem && <button type="button" onclick={() => setEditItem(null)}>Cancel</button>}
       </form>
            <ul>
                {items.map(item => <li key={items.id}>
                  <div className="ed-sec"><span>{`NAME:${item.name}    EMAIL:${item.email}`}</span>
                    <span className="ed-button">
                        <button onClick={() => setEditItem(item)}>Edit</button>
                      <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </span>
                    </div>
              </li>)}
        </ul>
      
    </div>
  )
}

export default App