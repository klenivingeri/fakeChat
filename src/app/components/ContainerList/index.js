import {  useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Kanban from '../Kambam';

export default function ContainerList(props) {
  const { 
    message,
    currentList
   } = props 

   const [items, setItems] = useState({});
   
   useEffect(() =>{
    setItems
   }, [])
  return (
<Box sx={{ 

}}>
  <Kanban initialItems={message[currentList.id]} setItems={setItems} />
</Box>
  );
}
