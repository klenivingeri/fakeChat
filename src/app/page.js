"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Container as MuiContainer } from "@mui/material";
import SelectedListItem from "./components/SelectedListItem";
import ContainerList from "./components/ContainerList";
import { dataChat } from "./utils/const";
import SelectMobile from "./components/SelectMobile";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Avatar from "./components/Avatar";
import BoxEditavel from "./components/BoxEditavel";

const Container = styled(MuiContainer)`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs: '100%', md: '600px' },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};


export default function controlPanel() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hydrate, setHydrate] = useState(false);
  const [records, setRecords] = useState({});
  const [currentList, setCurrentList] = useState({
    name: "1 - Apresentação",
    id: "number",
  });

  let action = true;
  useEffect(() => {
    if (action) {
      setHydrate(true);
      setRecords(dataChat["erick"]);
    }
    action = false;
  }, []);

  const create = (novaMsg) => {
    const _records = {...records}
    _records.list[currentList.id].push(novaMsg)
    setRecords((preState) => ({...preState, ..._records}))
  }
  return (
    hydrate && (
      <Container
        sx={{
          display: "flex",
          justifyContent: { xs: "start", md: "center" },
          alignItems: { xs: "start", md: "center" },
          minHeight: "100vh",
        }}
      >
        <Box
          component="section"
          sx={{
            border: "1px solid grey",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },

            height: { md: "800px" },
            width: "1000px",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              mb: { xs: 2, md: 0 },
              width: { xs: "100%" },
              pt: '10px',
            }}
          >
            <SelectMobile
              setCurrentList={setCurrentList}
              listName={records.listName}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              mb: { xs: 2, md: 0 },
              width: { md: 250 },
              borderRight: { xs: 0, md: "1px solid #ccc" },
            }}
          >
            <Box sx={{ padding: "10px" }}>
              <Avatar />
            </Box>
            <Divider />
            <SelectedListItem
              setCurrentList={setCurrentList}
              listName={records.listName}
            />
          </Box>

          <Box
            sx={{
              marginRight: { xs: 0, md: 0 },
              paddingLeft: { xs: 0, md: "10px" },
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "end",
                marginBottom: "10px",
                mr:'10px' 
              }}
            >
              <Button variant="contained" onClick={handleOpen}>Adicionar mensagem</Button>
            </Box>
            <Box sx={{ flex: 1, display: "flex" }}>
              <ContainerList message={records.list} listName={records.listName} currentList={currentList} />
            </Box>
          </Box>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BoxEditavel  listName={records.listName} handleClose={handleClose}  createOrSave={create} />
        </Box>
      </Modal>
      </Container>
    )
  );
}
