"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from './components/Avatar';
import BoxName from './components/BoxName';
import Smiley from '../../public/Smiley';
import Message from './components/Message';
import Send from '../../public/Send';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 55px;
  background-image: url('./wallpapers.jpg');
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
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  padding: 10px;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const InputMensagem = styled.input`
  height: 45px;
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
  width: 100%;
`

const BoxSend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #075E54;
  border-radius: 999px;
  width: 54px;
  height: 45px;
  padding-left: 4px;
  margin-left: 10px;
`

export default function Chat() {
  const [mensagens, setMensagens] = useState([{
    user: 0,
    msg:  'Olá, tudo bem?'
  },{
    user: 0,
    msg:  'Qual, seu nome?'
  }]);
  const [mensagemAtual, setMensagemAtual] = useState('');

  const enviarMensagem = () => {
    if (mensagemAtual.trim()) {
      setMensagens([...mensagens, {
        user: 1,
        msg: mensagemAtual
      }]);
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
        {mensagens.map((mensagen, index) => (
          <Message 
            key={index}
            isUser={mensagen.user}
            msg={mensagen.msg}
          />
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
        <BoxSend
        onClick={(e) => {
          enviarMensagem();
        }}
        >
          <Send/>
        </BoxSend>
       
      </Rodape>
    </Container>
  );
}
