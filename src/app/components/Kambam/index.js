import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemAccordion from "../ItemAccordion";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import BoxEditavel from "../BoxEditavel";

const Container = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "poppins";
  }

  .kanban {
    display: flex;
    min-height: 300px;
    gap: 10px;
  }

  .column {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: cadetblue;
    border-radius: 5px;
  }

  .item {
  }

  .test0 {
    background-color: red;
    height: 50px;
    width: 100%;
  }
  .item.dragging,
  .item.dragging-parent {
    opacity: 0.5;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Kanban = ({ initialItems, setItems }) => {
  const [startTime, setStartTime] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectItem, setSelectItem] = useState({})

  const handleTouchStart = () => {
    setStartTime(new Date());
  };

  const handleTouchEnd = (item) => {
    if (startTime) {
      const endTime = new Date();
      const diferencaEmMilissegundos = endTime - startTime;
      const segundosPassados = diferencaEmMilissegundos / 1000;
      if (segundosPassados > 1.5) {
        handleOpen()
        setSelectItem(item)
      }
    }
  };
  useEffect(() => {
    const column = document.querySelector(".column");

    const handleDragStart = (e) => {
      e.target.classList.add("dragging");
    };

    const handleDragEnd = (e) => {
      e.target.classList.remove("dragging");
      updateItemsOrder(e);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      const applyAfter = getNewPosition(e.currentTarget, e.clientY);

      if (applyAfter && applyAfter !== dragging) {
        // Verificar se applyAfter não é o próprio elemento de arrasto
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else if (applyAfter !== dragging) {
        // Verificar se applyAfter não é o próprio elemento de arrasto
        e.currentTarget.prepend(dragging);
      }
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      e.target.classList.add("dragging");
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const target = e.target.closest(".item"); // Procura o elemento mais próximo com a classe "item"
      const dragging = document.querySelector(".dragging");

      if (target) {
        // Verifica se o elemento clicado é um item
        const applyAfter = getNewPosition(
          e.currentTarget,
          e.touches[0].clientY
        );

        if (applyAfter) {
          applyAfter.insertAdjacentElement("afterend", target);
        } else {
          if (dragging) {
            dragging.classList.remove("dragging");
          }
          e.currentTarget.prepend(target);
        }

        // Adiciona a classe "dragging" apenas ao item arrastado
        document.querySelectorAll(".item").forEach((item) => {
          if (item === target) {
            item.classList.add("dragging");
          } else {
            item.classList.remove("dragging");
          }

          // Adiciona a classe "dragging-parent" ao item pai
          const parent = item.parentNode.closest(".item");
          if (parent && parent !== target) {
            parent.classList.add("dragging-parent");
          } else if (parent) {
            parent.classList.remove("dragging-parent");
          }
        });
      } else if (dragging) {
        // Se não estiver sobre um item, remove a classe "dragging" para evitar o efeito de opacidade
        dragging.classList.remove("dragging");
      }
    };

    const handleTouchEnd = (e) => {
      const dragging = document.querySelector(".dragging");
      if (dragging) {
        dragging.classList.remove("dragging");
        updateItemsOrder(e);
      }
    };

    const getNewPosition = (column, posY) => {
      const cards = column.querySelectorAll(".item:not(.dragging)");
      let result;

      for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (posY >= boxCenterY) result = refer_card;
      }

      return result;
    };

    const updateItemsOrder = (e) => {
      const updatedItems = Array.from(e.currentTarget.children).map((child) => {
        return initialItems.find((item) => item.id === parseInt(child.dataset.itemId));
      });
      setItems(updatedItems);
    };

    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("dragstart", handleDragStart);
    column.addEventListener("dragend", handleDragEnd);
    column.addEventListener("touchstart", handleTouchStart);
    column.addEventListener("touchmove", handleTouchMove);
    column.addEventListener("touchend", handleTouchEnd);

    return () => {
      column.removeEventListener("dragover", handleDragOver);
      column.removeEventListener("dragstart", handleDragStart);
      column.removeEventListener("dragend", handleDragEnd);
      column.removeEventListener("touchstart", handleTouchStart);
      column.removeEventListener("touchmove", handleTouchMove);
      column.removeEventListener("touchend", handleTouchEnd);
    };
  }, [initialItems, setItems]);

  return (
    <Container>
      <div className="kanban">
        <div className="column">
          {initialItems.map((item) => (
            <div
              key={item.id}
              className="item"
              draggable
              data-item-id={item.id}
              onTouchStart={handleTouchStart}
              onTouchEnd={() => {handleTouchEnd(item)}}
            >
              <Box
              key={item.id}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <div>{item.msg}</div>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <ItemAccordion item={item} />
              </Box>
            </div>
          ))}
        </div>
      </div>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <BoxEditavel />
            </Box>
          </Modal>
    </Container>
  );
};

export default Kanban;
