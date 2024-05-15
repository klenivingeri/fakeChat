import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Kanban from "../Kambam";

export default function ContainerList(props) {
  const { message, currentList } = props;

  const [items, setItems] = useState({});

  return (
    <Box sx={{ display:'flex', flex:1, overflowY: {xs: 'none', md: "auto"}, marginRight:{xs: '35px', md: 0} ,height: { md: '750px'}}}> 
      <Kanban initialItems={message[currentList.id]} setItems={setItems} />
    </Box>
  );
}
