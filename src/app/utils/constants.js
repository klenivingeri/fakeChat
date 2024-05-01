export const data = {
  poliane: {
    name: 'Poliane Personal',
    image: 'https://scontent.ffrc5-1.fna.fbcdn.net/v/t39.30808-6/432455789_7230535057023466_603031832992687761_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4QXZFFVgsK0Q7kNvgGhH7Gm&_nc_ht=scontent.ffrc5-1.fna&oh=00_AfC1RZwZ79dk9TdE9vKWSznDYhbRsfoHpldvKUHGjPiT6w&oe=66385514',
    whatsapp: 'https://api.whatsapp.com/send?phone=5516992227360&text=Ol%C3%A1,%20acabei%20de%20finalizar%20o%20question%C3%A1rio,%20e%20gostaria%20de%20continuar%20a%20conversa%20por%20aqui',
    question: [
      {
        user: 0,
        msg: "Qual seu nome?",
        type: "simple",
      },
      {
        msg: "Você já teve alguma experiência anterior com atividades físicas?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é o seu principal objetivo ao começar a praticar atividades físicas?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Você tem alguma preferência por um tipo específico de exercício ou atividade?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Quais são suas preocupações ou dúvidas sobre começar um programa de exercícios?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é o seu peso atual?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é a sua altura? (Para calcular o índice de massa corporal, se necessário)",
        type: "simple",
        resp: false,
      },
      {
        msg: "Qual é a sua idade atual?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Você tem alguma restrição de tempo ou disponibilidade que possa afetar sua capacidade de se exercitar regularmente?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Como você se sente sobre fazer ajustes na sua dieta e estilo de vida para alcançar um peso saudável?",
        type: "simple",
        resp: false,
      },
      {
        msg: "Muito obrigado por responder o questionario, gostaria de finalizar essa conversa pelo whatsap?",
        type: "email",
        resp: false,
        send: true,
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
    bye: [
      {
        msg: "Entendi, poderia deixar o numero para contato, assim posso retornar outra hora?",
        type: 'validation',
        resp: false,
        needValid: true,
      },
      {
        msg: "Qual seria o melhor horario para contato?",
        type: "email",
        resp: false,
        send: true,
      },
      {
        msg: "Ok, combinado!",
        type: "simple",
        resp: false,
      }
    ],
    msgInitialSystem: [
      {
        user: 0,
        msg: "Olá, tudo bem?",
        type: "simple",
      },
      {
        user: 0,
        msg: "É muito bom saber que você está interessado em minha consultoria!",
        type: "simple",
      },
      {
        user: 0,
        msg: "Você tem um tempinho para responder algumas perguntas?",
        type: "option",
        resp: false,
        options: [
          {
            option: "Sim",
          },
          {
            option: "Não",
          },
        ],
      },
    ]
  }
};
  