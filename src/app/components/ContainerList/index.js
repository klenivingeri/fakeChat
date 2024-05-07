import {  useState } from "react";
import Box from '@mui/material/Box';
import Kanban from '../Kambam';

let toDo = [{
   'id': '1',
   'title': 'Grocery',
   'list': ['apple', 'banana', 'milk', 'eggs', 'bread']
}]
export default function ContainerList(props) {
  const { 
    message,
    currentList
   } = props 

   const [items, setItems] = useState({});

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>  
      <Kanban initialItems={message[currentList.id]} setItems={setItems} />
    </Box>
  );
}
