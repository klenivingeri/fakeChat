"use client";

import React, { useState, useEffect } from "react";
import { Box, Container as MuiContainer } from "@mui/material";
import SelectedListItem from "./components/SelectedListItem";
import ContainerList from "./components/ContainerList";
import { dataChat } from "./utils/const";
import SelectMobile from "./components/SelectMobile";
import styled from "styled-components";

const Container = styled(MuiContainer)`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export default function controlPanel() {
  const [hydrate, setHydrate] = useState(false);
  const [records, setRecords] = useState({});
  const [currentList, setCurrentList] = useState({
    name: "1 - Apresentação",
    id: "start",
  });

  let action = true;
  useEffect(() => {
    if (action) {
      setHydrate(true);
      setRecords(dataChat["erick"]);
    }
    action = false;
  }, []);

  return (
    hydrate && (
      <Container sx={{ p: 0 }}>
        <Box
          component="section"
          sx={{
            border: "1px dashed grey",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              mb: { xs: 2, md: 0 },
              width: { xs: "100%" },
              background: "#CCC",
              borderRight: { xs: 0, md: "1px solid #ccc" },
            }}
          >
            <SelectMobile />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              mb: { xs: 2, md: 0 },
              width: { md: 250 },
              background: "#CCC",
              borderRight: { xs: 0, md: "1px solid #ccc" },
            }}
          >
            <SelectedListItem
              setCurrentList={setCurrentList}
              listName={records.listName}
            />
          </Box>

          <Box sx={{ flex: "1" }}>
            <Box>BoxCima</Box>
            <Box sx={{ marginRight: "50px" }}>
              <ContainerList message={records.list} currentList={currentList} />
            </Box>
          </Box>
        </Box>

        {/* Renderiza o rodapé */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>rodape</Box>
      </Container>
    )
  );
}
