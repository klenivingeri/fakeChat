export const dataChat = {
    erick: {
      name: 'Erick Klenivin - Dev',
      image: 'https://toppng.com/uploads/preview/rickandmorty-rickhappy1500-rick-and-morty-rick-face-11562903020dxmxu5mnce.png',
      whatsapp: 'https://api.whatsapp.com/send?phone=5516992227360&text=Ol%C3%A1,%20acabei%20de%20finalizar%20o%20question%C3%A1rio,%20e%20gostaria%20de%20continuar%20a%20conversa%20por%20aqui',
      listName: [
        {
          name: "1- Apresentação",
          id: "start",
        },
        {
          name: "2 - Despedida",
          id: "end",
        },
        {
          name: "3 - Pega numero",
          id: "number",
        },
        {
          name: "4 - Despedida",
          id: "end",
        },
        ,
        {
          name: "5 - Apresentação",
          id: "start",
        },
        {
          name: "6 - Despedida",
          id: "end",
        },
      ],
      list:{
        start: [
          {
            user: 0,
            msg: "1 - Qual seu nome?",
            type: "simple",
            action: false,
            id: 1
          },
          {
            user: 0,
            msg: "1.2- É muito bom saber que você está interessado em minha consultoria!",
            type: "simple",
            action: false,
            id: 2
          },
          {
            user: 0,
            msg: "1.3 - Você tem um tempinho para responder algumas perguntas?",
            type: "option",
            action: true,
            id:3,
            options: [
              {
                option: "Sim",
                href:'https://api.whatsapp.com/send?phone=5516992227360&text=Ol%C3%A1,%20acabei%20de%20finalizar%20o%20question%C3%A1rio,%20e%20gostaria%20de%20continuar%20a%20conversa%20por%20aqui'
              },
              {
                option: "Não",
                list: "bye"
              },
            ],
          },
          {
            msg: "2 - Você já teve alguma experiência anterior com atividades físicas?",
            type: "simple",
            action: false,
            id: 4
          },
          {
            msg: "3 - Qual é o seu principal objetivo ao começar a praticar atividades físicas?",
            type: "simple",
            action: false,
            id: 5
          },
          {
            msg: "4 - Você tem alguma preferência por um tipo específico de exercício ou atividade?",
            type: "simple",
            action: true,
            id: 6
          },
          {
            msg: "5 - Quais são suas preocupações ou dúvidas sobre começar um programa de exercícios?",
            type: "simple",
            action: true,
            id: 7
          },
          {
            msg: "6 - Qual é o seu peso atual?",
            type: "simple",
            action: false,
            id: 8
          },
          {
            msg: "7 - Qual é a sua altura? (Para calcular o índice de massa corporal, se necessário)",
            type: "simple",
            action: false,
            id: 9
          },
          {
            msg: "8 - Qual é a sua idade atual?",
            type: "simple",
            action: true,
            id: 10
          },
          {
            msg: "9 - Você tem alguma restrição de tempo ou disponibilidade que possa afetar sua capacidade de se exercitar regularmente?",
            type: "simple",
            action: true,
            id: 11
          },
          {
            msg: "10 - Como você se sente sobre fazer ajustes na sua dieta e estilo de vida para alcançar um peso saudável?",
            type: "simple",
            action: true,
            id: 12
          },
          {
            msg: "11 - Muito obrigado por responder o questionario, gostaria de finalizar essa conversa pelo whatsap?",
            type: "email",
            action: false,
            send: true,
            id: 13,
            options: [
              {
                option: "Sim",
              },
              {
                option: "Não",
              },
            ],
          },
        ],
        number: [
          {
            msg: "1 - Entendi, poderia deixar o numero para contato, assim posso retornar outra hora?",
            type: 'validation',
            action: true,
            needValid: {
              name: 'numberIsValid',
              msg: 'Sera que fico faltando um numero?'
            },
            id:1
          },
          {
            msg: "2 - Qual seria o melhor horario para contato?",
            type: "email",
            action: true,
            send: true,
            id:2
          },
          {
            msg: "3 - Qual seria o melhor horario para contato?",
            type: "email",
            action: true,
            send: true,
            id:3
          },
        ],
        end: []
      }
    }
  }