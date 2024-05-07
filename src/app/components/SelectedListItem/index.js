import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

export default function SelectedListItem(props) {
  const { 
    listName,
    setCurrentList
   } = props 
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setCurrentList(event)
    console.log(event)
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      Dados chat
      <Divider/>
      <List component="nav" aria-label="main mailbox folders">
        {listName.map((list, i) => (
          <ListItemButton
            key={i} // Aqui definimos a chave única para cada item
            selected={selectedIndex === i}
            onClick={() => handleListItemClick(list, i)}
          >
            <ListItemIcon>
              <SpeakerNotesIcon />
            </ListItemIcon>
            <ListItemText primary={list.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
