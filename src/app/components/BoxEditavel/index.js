import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ItemAccordion from "../ItemAccordion";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const BasicSelect = (props) => {
  const { updateOptions , label, width, options } = props

  const handleChange = (event) => {
    updateOptions(event.target.value)
  };

  return (
    <FormControl sx={{ width: `${width}%` }} size="small">
      <InputLabel id="demo-select-small-label">Tipo</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        name={label}
        label={label}
        onChange={handleChange}
      >
        {options?.map((op, i) => <MenuItem key={i} value={op.id}>{op.name}</MenuItem>)}
        
      </Select>
    </FormControl>
  );
};

const BoxEditavel = (props) => {
  const { handleClose, createOrSave, listName } = props;
  const [ optionType, setOptionType ] = useState('')
  const [ optionList, setOptionList ] = useState('')
  const [ options , setOptions] = useState([])
  const [ option , setOption] = useState({})


  const saveOptions = () => {
    const op = {
      option: option.name,
    }
    if(optionType == 'href'){
      op.href = option.href
    } else {
      op.list = optionList
    }

    setOptions([
      ...options, op
    ])

  }
  const handleSetOptions = (e) => {
    setOption({
      ...option,
      [e.target.name]: e.target.value
    });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const {msg, action} = formDataObject

    const _options = options.length ? { options: options} : {}
    const obj = {
      msg,
      action: !!action,
      id: 1,
      ..._options
    }
    console.log(obj)
    createOrSave(obj)
    
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: '10px'
      }}
    >
      <form onSubmit={handleSubmit}>
      <TextField
        sx={{ width: "100%" }}
        size="small"
        id="outlined-basic"
        name='msg'
        label="Clique aqui para atualizar a frase..."
        variant="outlined"
      />
      <ItemAccordion item={{ msg: "Opções" }}>
        <Box sx={{ display: "flex", gap: '10px' }}>
          <TextField
            sx={{ width: "70%"}}
            size="small"
            id="outlined-basic"
            label="Clique aqui para adicionar uma opção"
            name="name"
            onChange={handleSetOptions}
            variant="outlined"
          />
          <BasicSelect label="Tipo" options={[{name: 'Lista', id:'lista'}, {name: 'Link', id:'href'}]} width={30} updateOptions={setOptionType} />
        </Box>
        <Box sx={{ display: "flex", gap: '10px', justifyContent: 'end', flex:1}}>
          {optionType == 'href' && (<TextField
            sx={{ width: "70%" }}
            size="small"
            id="outlined-basic"
            label="Adicione o link"
            variant="outlined"
            name="href"
            onChange={handleSetOptions}
          />)} 
          {optionType == 'lista' && (<BasicSelect options={listName} label="Lista" width={70} updateOptions={setOptionList} />)}
          <Button sx={{ width: '30%' }}  size="small" variant="contained" onClick={saveOptions}>
          Add
        </Button>
        </Box>
        
      </ItemAccordion>

      <FormControlLabel control={<Checkbox defaultChecked name="action"/>} label="É necessario interação do usuario para continuar" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: "1",
          justifyContent: "end",
          mt: "10px",
        }}
      >
        <Button
          sx={{ marginLeft: "10px" }}
          size="small"
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          Caneclar
        </Button>
        <Button sx={{ marginLeft: "10px" }} size="small" variant="contained" type="submit" >
          Salvar
        </Button>
      </Box>
      </form>
    </Box>
  );
};

export default BoxEditavel;
