"use client";

import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import SelectedListItem from "./components/SelectedListItem";
import ContainerList from "./components/ContainerList";
import { dataChat } from "./utils/const";

export default function controlPanel() {
  const [hydrate, setHydrate] = useState(false);
  const [records, setRecords] = useState({});
  const [currentList, setCurrentList] = useState( {
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
            flexDirection: { xs: "column", md: "row" }, // Em mobile, coluna, em desktop, linha
            justifyContent: "space-between", // Distribui os elementos horizontalmente
            alignItems: "center", // Centraliza os elementos verticalmente
          }}
        >
          <Box
            sx={{
              mb: { xs: 2, md: 0 },
              width: { xs: "100%", md: 250 },
              background: "#CCC",
              borderRight: { xs: 0, md: "1px solid #ccc" },
            }}
          >
            <SelectedListItem setCurrentList={setCurrentList} listName={records.listName} />
          </Box>
          <Box sx={{ flex: "1" }}>
            <Box>
              {/* Este box irá para a direita em desktop */}
              BoxCima
            </Box>
            <Box>
              <ContainerList message={records.list} currentList={currentList} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: { xs: 2, md: 0 } }}>rodape</Box>
      </Container>
    )
  );
}