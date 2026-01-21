
import React, { useState } from 'react';
import { User, Benefit } from '../types';
import DiscountCard from '../components/DiscountCard';
import { askAboutBenefits } from '../services/mockAssistant';
import { 
  MessageSquare, 
  Search, 
  Stethoscope, 
  Pill, 
  Microscope, 
  Send, 
  Bot, 
  Sparkles, 
  Image as ImageIcon,
  Calendar,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

interface DashboardProps {
  user: User;
  appImages?: string[];
}

const mockBenefits: Benefit[] = [
  { id: '1', title: 'Consultas Eletivas', category: 'Médico', discount: 'Até 40%', description: 'Agende consultas com especialistas em nossa rede própria.' },
  { id: '2', title: 'Exames Laboratoriais', category: 'Diagnóstico', discount: 'Até 50%', description: 'Descontos exclusivos em exames de sangue e imagem.' },
  { id: '3', title: 'Medicamentos de Uso Contínuo', category: 'Farmácia', discount: 'Até 20%', description: 'Válido em farmácias parceiras mediante apresentação do cartão.' },
];

const Dashboard: React.FC<DashboardProps> = ({ user, appImages = [] }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: `Olá ${user.name.split(' ')[0]}! Sou seu assistente Santa Casa. Como posso te ajudar hoje?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askAboutBenefits(userMsg, user);
    
    setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Card and User Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-800 mb-6 self-start">Seu Cartão Digital</h2>
            <DiscountCard user={user} />
            <div className="mt-8 w-full space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Tipo de Plano</span>
                <span className="font-semibold text-blue-700">{user.cardType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`font-semibold ${user.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* NOVAS AÇÕES RÁPIDAS (Agendamento e Ouvidoria) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-blue-500" size={18} />
              Canais Diretos
            </h3>
            
            <a 
              href="https://wa.me/558240096001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all border border-blue-100 group"
            >
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform">
                <Calendar size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-blue-900">Agendar Consultas</span>
                <span className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">WhatsApp: (82) 4009-6001</span>
              </div>
            </a>

            <a 
              href="https://santacasamaceio.omd.com.br/scmaceio/externo/cadastro.do" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50 rounded-2xl transition-all border border-slate-200 group"
            >
              <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600 shadow-sm group-hover:scale-110 transition-transform">
                <MessageCircle size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Reclamações e Elogios</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Portal da Ouvidoria</span>
              </div>
            </a>
          </div>

          {/* Promotional Section from Admin Assets */}
          {appImages.length > 0 && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="text-blue-500" size={18} />
                Novidades e Promoções
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {appImages.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-[16/9] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                    <img src={img} alt={`Promo ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">Confira esta oferta</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Stethoscope className="text-blue-500" size={18} />
              Destaques de Benefícios
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                <Stethoscope className="text-blue-600" />
                <div>
                  <p className="text-sm font-semibold">Consultas</p>
                  <p className="text-xs text-slate-500">Rede credenciada em Maceió</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                <Microscope className="text-green-600" />
                <div>
                  <p className="text-sm font-semibold">Exames de Imagem</p>
                  <p className="text-xs text-slate-500">Agilidade no diagnóstico</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                <Pill className="text-red-500" />
                <div>
                  <p className="text-sm font-semibold">Medicamentos</p>
                  <p className="text-xs text-slate-500">Parcerias com grandes redes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Benefits list and AI Chat */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[600px]">
            <div className="bg-blue-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold leading-none">Guia Santa Casa</h3>
                  <p className="text-[10px] opacity-70">Sempre online</p>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${
                    chat.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Pergunte sobre onde usar o cartão..."
                  className="flex-grow px-4 py-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
                <button 
                  onClick={handleSendChat}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Search className="text-blue-600" size={22} />
              Catálogo de Benefícios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockBenefits.map(benefit => (
                <div key={benefit.id} className="p-4 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {benefit.category}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {benefit.discount} OFF
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{benefit.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
