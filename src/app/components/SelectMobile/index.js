import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMobile(props) {
  const { 
    listName,
    setCurrentList
   } = props 

  const handleChange = (event) => {
    setCurrentList(event.target.value);
  };

  return (
    <FormControl sx={{ width:'100%' }} size="small">
      <InputLabel id="demo-select-small-label">Selecione uma lista...</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Selecione uma lista..."
        onChange={handleChange}
      >
        {listName.map((list, i) => <MenuItem key={i} value={list}>{list.name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}