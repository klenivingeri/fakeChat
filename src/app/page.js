"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from './components/Avatar';
import BoxName from './components/BoxName';
import Smiley from '../../public/Smiley';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 50px;
`;

const Topo = styled.div`
  background-color: #075E54;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 10px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Mensagens = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Rodape = styled.div`
  background-color: #075E54;
  color: white;
  padding: 10px;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const InputMensagem = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  outline: none;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
`
const InputFake = styled.div`
  background-color: white;
  border-radius: 999px;
  padding: 1px 0 1px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default function Chat() {
  const [mensagens, setMensagens] = useState([]);
  const [mensagemAtual, setMensagemAtual] = useState('');

  const enviarMensagem = () => {
    if (mensagemAtual.trim()) {
      setMensagens([...mensagens, mensagemAtual]);
      setMensagemAtual('');
    }
  };

  return (
    <Container>
      <Topo>
        <Description>
        <Avatar/>
        <BoxName/>
        </Description>
        <div>||</div>
      </Topo>
      <Mensagens>
        {mensagens.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Mensagens>
      <Rodape>
        <InputFake>
        <Smiley/>
        <InputMensagem
          type="text"
          placeholder="Digite sua mensagem..."
          value={mensagemAtual}
          onChange={(e) => setMensagemAtual(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              enviarMensagem();
            }
          }}
        />
        </InputFake>
      </Rodape>
    </Container>
  );
}
