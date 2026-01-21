// Mock assistant service - sem dependência de API externa
// Simula respostas do assistente da Santa Casa de forma local

const mockResponses: { [key: string]: string[] } = {
  consulta: [
    'Contate nosso WhatsApp: (82) 4009-6001 para agendar sua consulta. Temos disponibilidade com especialistas em Cardiologia, Pediatria, Ortopedia e muito mais.',
    'Para agendar uma consulta, você pode ligar para (82) 4009-6001 ou usar nosso portal online. Seu cartão oferece até 40% de desconto em consultas eletivas.',
    'Clique em "Agendar Consultas" nos canais diretos acima. É rápido e fácil marcar sua consulta pela Santa Casa.'
  ],
  exame: [
    'Realizamos exames de imagem como Raio-X, Tomografia e Ressonância Magnética. Você tem até 50% de desconto com seu cartão!',
    'Os exames laboratoriais também possuem desconto especial. Traga seu cartão e aproveite a qualidade Santa Casa.',
    'Exames de sangue, imagem e diagnósticos com até 50% de desconto para portadores do cartão Santa Casa.'
  ],
  medicamento: [
    'Seus medicamentos de uso contínuo têm até 20% de desconto nas farmácias parceiras como Pague Menos e Drogasil. Apresente seu cartão!',
    'Use seu cartão para conseguir descontos em medicamentos nas principais redes de farmácias de Maceió.',
    'Desconto de até 20% em medicamentos. Válido em farmácias conveniadas mediante apresentação do cartão.'
  ],
  beneficio: [
    'Seu cartão oferece: Consultas com desconto, Exames de imagem, Laboratório, Medicamentos em farmácias parceiras, e muito mais!',
    'Como portador do cartão, você tem acesso a uma ampla rede credenciada em Maceió com descontos exclusivos.',
    'Os principais benefícios incluem: Atendimento especializado, Exames com desconto, Medicamentos em rede conveniada.'
  ],
  ajuda: [
    'Posso ajudá-lo com informações sobre: Agendamento de consultas, Exames disponíveis, Desconto em medicamentos, Benefícios do cartão, ou Reclamações/Sugestões.',
    'Estou aqui para responder perguntas sobre seus benefícios. O que você gostaria de saber?',
    'Faça sua pergunta sobre consultas, exames, medicamentos ou qualquer dúvida sobre seu cartão de descontos.'
  ]
};

const getRelevantCategory = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('consulta') || lowerPrompt.includes('médico') || lowerPrompt.includes('especialista')) {
    return 'consulta';
  }
  if (lowerPrompt.includes('exame') || lowerPrompt.includes('raio') || lowerPrompt.includes('tomografia') || lowerPrompt.includes('ressonância')) {
    return 'exame';
  }
  if (lowerPrompt.includes('medicamento') || lowerPrompt.includes('remédio') || lowerPrompt.includes('farmácia')) {
    return 'medicamento';
  }
  if (lowerPrompt.includes('benefício') || lowerPrompt.includes('desconto')) {
    return 'beneficio';
  }
  
  return 'ajuda';
};

const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

export const askAboutBenefits = async (prompt: string, userContext?: any): Promise<string> => {
  // Simula delay de API call para parecer mais natural
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const category = getRelevantCategory(prompt);
  const responses = mockResponses[category] || mockResponses.ajuda;
  
  return getRandomResponse(responses);
};
