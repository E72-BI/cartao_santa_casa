
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Mail, Lock, UserPlus, ArrowLeft, User as UserIcon, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface LoginProps { 
  users: User[]; 
  onLogin: (user: User) => void; 
  onRegister: (newUser: User) => void; 
  onUpdatePassword: (email: string, pass: string) => void;
  onValidateEmail: (email: string) => void;
}

type LoginStep = 'email' | 'password' | 'create-password' | 'validation-pending' | 'register';

const Login: React.FC<LoginProps> = ({ users, onLogin, onRegister, onUpdatePassword, onValidateEmail }) => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regData, setRegData] = useState({ 
    name: '', 
    email: '', 
    cpf: '', 
    birthDate: '', 
    cardType: 'Prata' as 'Prata' | 'Ouro' | 'Diamante' 
  });

  // Identifica o usuário atual baseado no e-mail digitado
  const currentUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert('Por favor, insira seu e-mail.');
    
    if (!currentUser) {
      alert('E-mail não encontrado na base de beneficiários.');
      return;
    }

    if (!currentUser.isValidated) {
      setStep('validation-pending');
    } else if (!currentUser.password) {
      setStep('create-password');
    } else {
      setStep('password');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser.password === password) {
      onLogin(currentUser);
    } else {
      alert('Senha incorreta.');
    }
  };

  const handleCreatePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) return alert('A senha deve ter pelo menos 4 caracteres.');
    if (newPassword !== confirmPassword) return alert('As senhas não coincidem.');

    onUpdatePassword(email, newPassword);
    alert('Senha criada com sucesso! Agora você pode acessar o portal.');
    setStep('password');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.cpf || !regData.birthDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: regData.name.toUpperCase(),
      email: regData.email.toLowerCase(),
      cpf: regData.cpf,
      cardType: regData.cardType,
      birthDate: regData.birthDate,
      expiryDate: `${new Date().getMonth() + 1}/${new Date().getFullYear() + 5}`,
      status: 'Ativo',
      isValidated: false // Começa como não validado conforme pedido
    };
    
    onRegister(newUser);
    setEmail(newUser.email);
    setStep('validation-pending');
  };

  // Simulação de validação (para o usuário testar o fluxo sem e-mail real)
  const simulateValidation = () => {
    onValidateEmail(email);
    alert('E-mail validado com sucesso!');
    setStep('create-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 font-sans relative">
      
      {/* Logomarca Oficial Santa Casa */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-12 h-12">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="49" y="0" width="2" height="15" fill="#2B5797"/>
            <rect x="49" y="85" width="2" height="15" fill="#2B5797"/>
            <rect x="0" y="49" width="15" height="2" fill="#2B5797"/>
            <rect x="85" y="49" width="15" height="2" fill="#2B5797"/>
            <path d="M43 12V43H12" stroke="#2B5797" strokeWidth="2.5"/>
            <path d="M57 12V43H88" stroke="#2B5797" strokeWidth="2.5"/>
            <path d="M43 88V57H12" stroke="#2B5797" strokeWidth="2.5"/>
            <path d="M57 88V57H88" stroke="#2B5797" strokeWidth="2.5"/>
            <path d="M20 22L34 22L20 36V22Z" fill="#7BA7D7"/>
            <path d="M80 22L66 22L80 36V22Z" fill="#7BA7D7"/>
            <path d="M20 78L34 78L20 64V78Z" fill="#7BA7D7"/>
            <path d="M80 78L66 78L80 64V78Z" fill="#7BA7D7"/>
          </svg>
        </div>
        <div className="flex flex-col text-[#2B5797] justify-center items-start leading-none">
          <span className="text-[14px] font-bold uppercase">SANTA CASA</span>
          <span className="text-[6px] font-bold uppercase opacity-80 mt-1">DE MISERICÓRDIA DE MACEIÓ</span>
        </div>
      </div>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-500">
        <div className="bg-[#1a4da3] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 L100 0 V100 Z" fill="white" />
             </svg>
          </div>
          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white p-3 rounded-2xl shadow-xl transform hover:rotate-6 transition-transform w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
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
          </div>
          <h1 className="text-2xl font-black tracking-tight relative z-10 uppercase">Santa Casa Maceió</h1>
          <p className="text-blue-100 mt-1 font-medium text-sm opacity-80 relative z-10">
            {step === 'email' ? 'Portal do Beneficiário' : 
             step === 'register' ? 'Crie sua Conta Digital' :
             step === 'validation-pending' ? 'Verifique seu E-mail' :
             step === 'create-password' ? 'Crie sua Senha' : 'Acesse sua Conta'}
          </p>
        </div>

        <div className="p-8">
          {step === 'email' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <form onSubmit={handleEmailNext} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">E-mail de Acesso</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="exemplo@email.com" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#1a4da3] outline-none transition-all font-medium text-slate-700" 
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a4da3] hover:bg-[#153d82] text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                  CONTINUAR <ArrowRight size={18} />
                </button>
                <div className="pt-4 border-t border-slate-50 text-center">
                  <p className="text-slate-400 text-xs font-medium">Novo por aqui?</p>
                  <button type="button" onClick={() => setStep('register')} className="mt-2 text-[#1a4da3] font-bold text-sm hover:underline flex items-center justify-center gap-1 mx-auto">
                    <UserPlus size={16} />Solicitar Cartão Virtual
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'validation-pending' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 text-center py-4">
              <div className="bg-amber-50 text-amber-700 p-6 rounded-[2rem] border border-amber-100 mb-6 flex flex-col items-center">
                <ShieldAlert size={48} className="mb-4 text-amber-500" />
                <h3 className="font-bold text-lg mb-2 leading-tight">Verificação Necessária</h3>
                <p className="text-xs font-medium opacity-80 leading-relaxed">
                  Enviamos um link de validação para:<br/>
                  <strong className="text-amber-900">{email}</strong>
                </p>
                <p className="text-[10px] mt-4 uppercase font-bold tracking-widest opacity-60">
                  Por favor, clique no link do e-mail para continuar seu cadastro.
                </p>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={simulateValidation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-md transition-all uppercase tracking-widest text-[10px]"
                >
                  SIMULAR CLIQUE NO LINK DO E-MAIL
                </button>
                
                <button 
                  onClick={() => setStep('email')} 
                  className="flex items-center gap-2 text-slate-400 hover:text-[#1a4da3] text-xs font-bold uppercase tracking-wider mx-auto transition-colors"
                >
                  <ArrowLeft size={14} /> Tentar outro e-mail
                </button>
              </div>
            </div>
          )}

          {step === 'create-password' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={20} />
                E-mail Validado!
              </h3>
              <p className="text-slate-500 text-xs mb-6">Agora, defina uma senha segura para o seu primeiro acesso ao portal.</p>
              
              <form onSubmit={handleCreatePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nova Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="No mínimo 4 dígitos" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-sm font-medium" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Confirmar Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="Repita a senha" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-sm font-medium" 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a4da3] hover:bg-[#153d82] text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm mt-2">
                  CRIAR SENHA E ACESSAR
                </button>
              </form>
            </div>
          )}

          {step === 'password' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button onClick={() => setStep('email')} className="flex items-center gap-2 text-slate-400 hover:text-[#1a4da3] text-[10px] font-bold uppercase tracking-wider mb-6 transition-colors">
                <ArrowLeft size={14} />Alterar E-mail ({email})
              </button>
              
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Digite sua senha" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#1a4da3] outline-none transition-all font-medium text-slate-700" 
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a4da3] hover:bg-[#153d82] text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
                  ENTRAR NO PORTAL
                </button>
              </form>
            </div>
          )}

          {step === 'register' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <button onClick={() => setStep('email')} className="flex items-center gap-2 text-slate-400 hover:text-[#1a4da3] text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
                <ArrowLeft size={14} />Voltar para Login
              </button>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nome Completo</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input type="text" value={regData.name} onChange={(e) => setRegData({...regData, name: e.target.value})} placeholder="COMO CONSTA NO DOCUMENTO" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-xs font-bold" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input type="email" value={regData.email} onChange={(e) => setRegData({...regData, email: e.target.value})} placeholder="seu@email.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-xs font-bold" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">CPF</label>
                      <input type="text" value={regData.cpf} onChange={(e) => setRegData({...regData, cpf: e.target.value})} placeholder="000.000.000-00" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-[10px] font-bold font-mono" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nascimento</label>
                      <input type="text" value={regData.birthDate} onChange={(e) => setRegData({...regData, birthDate: e.target.value})} placeholder="DD/MM/AAAA" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-[10px] font-bold" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Plano Desejado</label>
                    <select value={regData.cardType} onChange={(e) => setRegData({...regData, cardType: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#1a4da3] outline-none text-xs font-bold">
                      <option value="Prata">Plano Prata</option>
                      <option value="Ouro">Plano Ouro</option>
                      <option value="Diamante">Plano Diamante</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a4da3] hover:bg-[#153d82] text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-xs mt-4">SOLICITAR CARTÃO VIRTUAL</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
