import * as React from 'react';
import { Accordion, Box } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ItemAccordion(props) {
    const { item, children } = props
  return (
    <div>
      <Accordion sx={{
        
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {item.msg}
        </AccordionSummary>
        <AccordionDetails sx={{display:'flex', gap:'10px', flexDirection: 'column'}}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}