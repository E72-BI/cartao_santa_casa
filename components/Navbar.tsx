
import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps { role: UserRole | null; userName?: string; onLogout: () => void; }

const Navbar: React.FC<NavbarProps> = ({ role, userName, onLogout }) => {
  return (
    <nav className="bg-blue-700 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-12 translate-x-16 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="49" y="0" width="2" height="15" fill="white"/>
                <rect x="49" y="85" width="2" height="15" fill="white"/>
                <rect x="0" y="49" width="15" height="2" fill="white"/>
                <rect x="85" y="49" width="15" height="2" fill="white"/>
                <path d="M43 12V43H12" stroke="white" strokeWidth="3"/>
                <path d="M57 12V43H88" stroke="white" strokeWidth="3"/>
                <path d="M43 88V57H12" stroke="white" strokeWidth="3"/>
                <path d="M57 88V57H88" stroke="white" strokeWidth="3"/>
                <path d="M20 22L34 22L20 36V22Z" fill="#7BA7D7"/>
                <path d="M80 22L66 22L80 36V22Z" fill="#7BA7D7"/>
                <path d="M20 78L34 78L20 64V78Z" fill="#7BA7D7"/>
                <path d="M80 78L66 78L80 64V78Z" fill="#7BA7D7"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">Santa Casa <span className="font-light">Maceió</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            {role && (
              <div className="hidden md:flex items-center gap-2 bg-blue-800/50 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10">
                <UserIcon size={14} />
                <span>{userName || (role === UserRole.ADMIN ? 'Administrador' : 'Beneficiário')}</span>
              </div>
            )}
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>

            {/* Logo Oficial Santa Casa - Top Right */}
            <div className="flex items-center gap-2 py-1 px-4 bg-white rounded-lg shadow-sm transform scale-90 md:scale-100">
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="49" y="0" width="2" height="15" fill="#2B5797"/>
                  <rect x="49" y="85" width="2" height="15" fill="#2B5797"/>
                  <rect x="0" y="49" width="15" height="2" fill="#2B5797"/>
                  <rect x="85" y="49" width="15" height="2" fill="#2B5797"/>
                  <path d="M43 12V43H12" stroke="#2B5797" strokeWidth="3"/>
                  <path d="M57 12V43H88" stroke="#2B5797" strokeWidth="3"/>
                  <path d="M43 88V57H12" stroke="#2B5797" strokeWidth="3"/>
                  <path d="M57 88V57H88" stroke="#2B5797" strokeWidth="3"/>
                  <path d="M20 22L34 22L20 36V22Z" fill="#7BA7D7"/>
                  <path d="M80 22L66 22L80 36V22Z" fill="#7BA7D7"/>
                  <path d="M20 78L34 78L20 64V78Z" fill="#7BA7D7"/>
                  <path d="M80 78L66 78L80 64V78Z" fill="#7BA7D7"/>
                </svg>
              </div>
              <div className="flex flex-col text-[#2B5797] justify-center items-start leading-none">
                <span className="text-[10px] font-bold uppercase">SANTA CASA</span>
                <span className="text-[4px] font-bold uppercase opacity-80 mt-0.5">DE MISERICÓRDIA DE MACEIÓ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
