
import React from 'react';
import { User } from '../types';

interface DiscountCardProps {
  user: User;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ user }) => {
  // Logomarca Vida & Saúde reduzida em ~30%
  const VidaESaudeLogo = () => (
    <div className="flex flex-col relative h-full justify-center">
      <div className="flex items-center">
        <span className="text-[#2b5797] font-[900] text-[1.0rem] tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>Vida</span>
        <span className="text-[#c1c1c1] font-light text-[1.25rem] mx-0.5" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>&</span>
        <span className="text-[#2b5797] font-bold text-[1.0rem] tracking-tight" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Saúde</span>
      </div>
      
      {/* Swoosh reduzido */}
      <div className="absolute -bottom-0.5 -left-0.5 w-[110%] h-3 pointer-events-none opacity-40">
        <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
          <path 
            d="M0,5 Q50,20 100,0" 
            fill="none" 
            stroke="#a1a1aa" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );

  // Logomarca Santa Casa com SANTA CASA reduzido, mas frase inferior mantida/destacada
  const SantaCasaLogoOficial = () => (
    <div className="flex items-center gap-1 h-full py-2">
      {/* Símbolo da Cruz reduzido */}
      <div className="h-[70%] aspect-square flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="49" y="0" width="2" height="15" fill="#2B5797"/>
          <rect x="49" y="85" width="2" height="15" fill="#2B5797"/>
          <rect x="0" y="49" width="15" height="2" fill="#2B5797"/>
          <rect x="85" y="49" width="15" height="2" fill="#2B5797"/>
          
          <path d="M44 14V44H14" stroke="#2B5797" strokeWidth="2.5" strokeLinecap="square"/>
          <path d="M56 14V44H86" stroke="#2B5797" strokeWidth="2.5" strokeLinecap="square"/>
          <path d="M44 86V56H14" stroke="#2B5797" strokeWidth="2.5" strokeLinecap="square"/>
          <path d="M56 86V56H86" stroke="#2B5797" strokeWidth="2.5" strokeLinecap="square"/>
          
          <path d="M22 24L34 24L22 36V24Z" fill="#7BA7D7"/>
          <path d="M28 30L38 30L28 40V30Z" fill="#2B5797"/>
          
          <path d="M78 24L66 24L78 36V24Z" fill="#7BA7D7"/>
          <path d="M72 30L62 30L72 40V30Z" fill="#2B5797"/>
          
          <path d="M22 76L34 76L22 64V76Z" fill="#7BA7D7"/>
          <path d="M28 70L38 70L28 60V70Z" fill="#2B5797"/>
          
          <path d="M78 76L66 76L78 64V76Z" fill="#7BA7D7"/>
          <path d="M72 70L62 70L72 60V70Z" fill="#2B5797"/>
        </svg>
      </div>

      <div className="flex flex-col text-[#2B5797] justify-center leading-[0.85] whitespace-nowrap">
        {/* Reduzido de 1.15rem para 0.8rem (-30%) */}
        <span className="text-[0.8rem] font-extrabold tracking-tighter uppercase">SANTA CASA</span>
        {/* MANTIDO ORIGINAL E DESTACADO CONFORME PEDIDO */}
        <span className="text-[0.32rem] font-bold uppercase tracking-wider mt-0.5">
          DE MISERICÓRDIA DE MACEIÓ
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-[288px] h-48 rounded-[1.25rem] shadow-2xl overflow-hidden bg-white select-none font-sans border border-slate-200">
      
      {/* Cabeçalho */}
      <div className="absolute top-0 left-0 w-full h-[32%] bg-white px-4 flex justify-between items-center">
        <VidaESaudeLogo />
        <SantaCasaLogoOficial />
      </div>

      {/* Divisória */}
      <div className="absolute top-[32%] left-0 w-full h-[6px] bg-[#0099cc] flex overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className={`min-w-[8px] h-full ${i % 2 === 0 ? 'bg-[#0077aa]' : 'bg-[#00aadd]'}`} 
            style={{ 
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
            }}
          ></div>
        ))}
      </div>

      {/* Corpo do Cartão - Espaçamentos reduzidos */}
      <div className="absolute bottom-0 left-0 w-full h-[66%] bg-[#1a4da3] px-4 py-4 flex flex-col justify-start">
        
        {/* Marca d'água reduzida */}
        <div className="absolute right-[-5%] bottom-[-5%] opacity-[0.04] pointer-events-none transform rotate-[-15deg]">
          <svg width="130" height="130" viewBox="0 0 100 100" fill="white">
            <path d="M48 10V42H10 M52 10V42H90 M48 90V58H10 M52 90V58H90" stroke="white" strokeWidth="2"/>
            <path d="M22 38L38 38L38 22L22 38Z" fill="white"/>
            <path d="M78 38L62 38L62 22L78 38Z" fill="white"/>
            <path d="M22 62L38 62L38 78L22 62Z" fill="white"/>
            <path d="M78 62L62 62L62 78L78 62Z" fill="white"/>
          </svg>
        </div>

        {/* CPF Reduzido */}
        <div className="relative z-10 flex flex-col mb-1.5 opacity-90">
          <span className="text-[0.35rem] text-white/70 font-black uppercase tracking-[0.15em] mb-0.5">CPF Beneficiário</span>
          <span className="text-white text-[0.7rem] font-mono font-bold tracking-widest leading-none">
            {user.cpf || '000.000.000-00'}
          </span>
        </div>

        {/* Nome e Nascimento Reduzidos */}
        <div className="relative z-10 mt-auto flex flex-col gap-0.5">
          <div className="flex flex-col">
            <span className="text-[0.35rem] text-white/70 font-medium uppercase tracking-wider">Nascimento</span>
            <span className="text-white text-[0.6rem] font-bold tracking-widest leading-none">
              {user.birthDate || '--/--/----'}
            </span>
          </div>

          <div className="mt-1 pt-1 border-t border-white/10">
            <h2 className="text-white text-[0.7rem] font-black tracking-wide uppercase truncate leading-none">
              {user.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[0.28rem] bg-white/20 px-1 py-0.5 rounded text-white/90 font-bold uppercase">
                Plano {user.cardType}
              </span>
              <span className="text-[0.28rem] text-white/50 uppercase font-medium">Exp: {user.expiryDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
