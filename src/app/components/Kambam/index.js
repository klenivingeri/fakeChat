import { useEffect, useState } from "react";
import styled from "styled-components";

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
    min-height: 300px;
    background-color: cadetblue;
    border-radius: 5px;
  }

  .item {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: grab;
  }

  .test0 {
    background-color: red;
    height: 50px;
    width: 100%;
}
  .dragging {
    opacity: 0.5;
  }
`;


const Kanban = ({ initialItems, setItems }) => {
    useEffect(() => {
      const column = document.querySelector('.column');
  
      const handleDragStart = (e) => {
        e.target.classList.add('dragging');
      };
  
      const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        updateItemsOrder(e);
      };
  
      const handleDragOver = (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const applyAfter = getNewPosition(e.currentTarget, e.clientY);
      
        if (applyAfter && applyAfter !== dragging) { // Verificar se applyAfter não é o próprio elemento de arrasto
          applyAfter.insertAdjacentElement('afterend', dragging);
        } else if (applyAfter !== dragging) { // Verificar se applyAfter não é o próprio elemento de arrasto
          e.currentTarget.prepend(dragging);
        }
      };
  
      const handleTouchStart = (e) => {
        e.preventDefault();
        e.target.classList.add('dragging');
      };
  
      const handleTouchMove = (e) => {
        e.preventDefault();
        const target = e.target.closest('.item'); // Procura o elemento mais próximo com a classe "item"
        const dragging = document.querySelector('.dragging');
        if (target) { // Verifica se o elemento clicado é um item
          const applyAfter = getNewPosition(e.currentTarget, e.touches[0].clientY);
          
          if (applyAfter) {
            applyAfter.insertAdjacentElement('afterend', target);
          } else {
            if (dragging) { // Se não estiver sobre um item, remove a classe "dragging" para evitar o efeito de opacidade
                dragging.classList.remove('dragging');
            }
            e.currentTarget.prepend(target);
          }
      
        }
        else if (dragging) { // Se não estiver sobre um item, remove a classe "dragging" para evitar o efeito de opacidade
            dragging.classList.remove('dragging');
          }
      };
  
      const handleTouchEnd = (e) => {
        const dragging = document.querySelector('.dragging');
        if (dragging) {
          dragging.classList.remove('dragging');
          updateItemsOrder(e);
        }
      };
  
      const getNewPosition = (column, posY) => {
        const cards = column.querySelectorAll('.item:not(.dragging)');
        let result;
  
        for (let refer_card of cards) {
          const box = refer_card.getBoundingClientRect();
          const boxCenterY = box.y + box.height / 2;
  
          if (posY >= boxCenterY) result = refer_card;
        }
  
        return result;
      };
  
      const updateItemsOrder = (e) => {
        const updatedItems = Array.from(e.target.parentNode.children).map((child) => {
          return initialItems.find((item) => item.id === parseInt(child.dataset.itemId));
        });
        setItems(updatedItems);
      };
  
      column.addEventListener('dragover', handleDragOver);
      column.addEventListener('dragstart', handleDragStart);
      column.addEventListener('dragend', handleDragEnd);
      column.addEventListener('touchstart', handleTouchStart);
      column.addEventListener('touchmove', handleTouchMove);
      column.addEventListener('touchend', handleTouchEnd);
  
      return () => {
        column.removeEventListener('dragover', handleDragOver);
        column.removeEventListener('dragstart', handleDragStart);
        column.removeEventListener('dragend', handleDragEnd);
        column.removeEventListener('touchstart', handleTouchStart);
        column.removeEventListener('touchmove', handleTouchMove);
        column.removeEventListener('touchend', handleTouchEnd);
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
              >
                <div className="test0">{item.msg}</div>

              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  };
  
  export default Kanban;