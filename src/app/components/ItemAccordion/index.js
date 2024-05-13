import * as React from 'react';
import { Accordion, Box } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BoxEditavel from '../BoxEditavel';


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
          <BoxEditavel />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}