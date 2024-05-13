import * as React from 'react';
import { Accordion, Box } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ItemAccordion(props) {
    const { item } = props
  return (
    <div>
      <Accordion sx={{ background:'red'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {item.msg}
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{
            display:'flex'
        }}>
        <TextField 
        sx={{ width:"100%"}}
        size="small"
        id="outlined-basic" label="Clique aqui para atualizar a frase..." variant="outlined" />
        <Button sx={{ marginLeft: '10px'}} size="small" variant="contained">Atualizar</Button>

        </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}