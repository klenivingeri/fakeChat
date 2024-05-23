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
  const { updateOptions, label, width, options } = props;

  const handleChange = (event) => {
    updateOptions(event.target.value);
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
        {options?.map((op, i) => (
          <MenuItem key={i} value={op.id}>
            {op.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const BoxEditavel = (props) => {
  const { handleClose, createOrSave, listName, item } = props;
  const [optionType, setOptionType] = useState("");
  const [optionList, setOptionList] = useState("");
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState({});

  const saveOptions = () => {
    const op = {
      option: input.name,
    };
    if (optionType == "href") {
      op.href = input.href;
    } else {
      op.list = optionList;
    }

    setOptions([...options, op]);
  };
  const handleSetOptions = (e) => {
    let objOption = {}
    if(e.target.name == 'action'){
      objOption = {[e.target.name]: !!e.target.checked}
    }else {
      objOption = {[e.target.name]: e.target.value}
    }
    setInput({
      ...input,
      ...objOption,
    });
  };

  const handleSubmit = (e) => {
    const _options = options.length ? { options: options } : {};
    const obj = {
      id: 1,
      msg: input.msg,
      action: input.action,
      ..._options,
    };

    createOrSave(obj);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
        <TextField
          sx={{ width: "100%" }}
          size="small"
          id="outlined-basic"
          name="msg"
          label="Clique aqui para atualizar a frase..."
          variant="outlined"
          onChange={handleSetOptions}

        />
        <ItemAccordion item={{ msg: "Opções" }}>
          {item?.options && <Box>{item.options.map(op => <div>{op.option}</div>)}</Box>}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              sx={{ width: "70%" }}
              size="small"
              id="outlined-basic"
              label="Clique aqui para adicionar uma opção"
              name="name"
              onChange={handleSetOptions}
              variant="outlined"
            />
            <BasicSelect
              label="Tipo"
              options={[
                { name: "Lista", id: "lista" },
                { name: "Link", id: "href" },
              ]}
              width={30}
              updateOptions={setOptionType}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              flex: 1,
            }}
          >
            {optionType == "href" && (
              <TextField
                sx={{ width: "70%" }}
                size="small"
                id="outlined-basic"
                label="Adicione o link"
                variant="outlined"
                name="href"
                onChange={handleSetOptions}
              />
            )}
            {optionType == "lista" && (
              <BasicSelect
                options={listName}
                label="Lista"
                width={70}
                updateOptions={setOptionList}
              />
            )}
            <Button
              sx={{ width: "30%" }}
              size="small"
              variant="contained"
              onClick={saveOptions}
            >
              Add
            </Button>
          </Box>
        </ItemAccordion>

        <FormControlLabel
          onChange={handleSetOptions}
          control={<Checkbox defaultChecked name="action"/>}
          label="É necessario interação do usuario para continuar"
        />

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
          <Button
            sx={{ marginLeft: "10px" }}
            size="small"
            variant="contained"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </Box>
    </Box>
  );
};

export default BoxEditavel;
