
import React, { useState } from 'react';
import { User } from '../types';
import { FileUp, Users as UsersIcon, Trash2, Search, Download, CheckCircle, Loader2, Eye, X, LayoutGrid, List, Pencil, Save, Image as ImageIcon, Plus } from 'lucide-react';
import DiscountCard from '../components/DiscountCard';

interface AdminDashboardProps {
  users: User[];
  onUpdateUsers: (newUsers: User[]) => void;
  onDeleteUser: (id: string) => void;
  onEditUser: (user: User) => void;
  appImages: string[];
  onUpdateImages: (images: string[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, onUpdateUsers, onDeleteUser, onEditUser, appImages, onUpdateImages }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedUserForCard, setSelectedUserForCard] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'assets'>('table');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    setTimeout(() => {
      // Fix: Added missing 'isValidated' property to mock users
      const mockParsedUsers: User[] = [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'João Silva Oliveira',
          email: 'joao.silva@exemplo.com',
          cpf: '123.456.789-00',
          cardType: 'Prata',
          expiryDate: '06/2026',
          birthDate: '15/05/1985',
          status: 'Ativo',
          isValidated: true
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Maria Fernanda Costa',
          email: 'maria.costa@exemplo.com',
          cpf: '987.654.321-11',
          cardType: 'Ouro',
          expiryDate: '10/2027',
          birthDate: '22/09/1990',
          status: 'Ativo',
          isValidated: true
        }
      ];

      onUpdateUsers(mockParsedUsers);
      setIsUploading(false);
      setUploadStatus('success');
      event.target.value = '';
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateImages([...appImages, base64String]);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = [...appImages];
    newImages.splice(index, 1);
    onUpdateImages(newImages);
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'CPF', 'Tipo de Plano', 'Validade', 'Nascimento', 'Status'];
    const rows = users.map(u => [
      `"${u.name}"`, 
      u.email, 
      u.cpf, 
      u.cardType, 
      u.expiryDate, 
      u.birthDate, 
      u.status
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    // Use the standard browser Blob constructor to avoid typing issues with URL.createObjectURL
    // Adding the UTF-8 BOM (\ufeff) to ensure Excel opens the CSV correctly with special characters
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `beneficiarios_santa_casa_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onEditUser(editingUser);
      setEditingUser(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.cpf.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Painel Administrativo</h1>
          <p className="text-slate-500 mt-2 font-medium">Gestão de Beneficiários e Cartões Virtuais</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 text-sm font-semibold"
          >
            <Download size={18} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Navegação</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setViewMode('table')} 
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <List size={20} />Lista Detalhada
              </button>
              <button 
                onClick={() => setViewMode('cards')} 
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${viewMode === 'cards' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <LayoutGrid size={20} />Galeria de Cartões
              </button>
              <button 
                onClick={() => setViewMode('assets')} 
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${viewMode === 'assets' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <ImageIcon size={20} />Banco de Ativos
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><FileUp className="text-blue-600" size={20} />Importar Dados</h3>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors group">
                <label className="cursor-pointer block">
                  <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} disabled={isUploading} />
                  <div className="flex flex-col items-center">
                    {isUploading ? <Loader2 className="animate-spin text-blue-600 mb-2" size={32} /> : <FileUp className="text-slate-400 group-hover:text-blue-500 mb-2" size={32} />}
                    <p className="text-sm font-bold text-slate-700">Subir Planilha</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase">Excel ou CSV</p>
                  </div>
                </label>
              </div>
              {uploadStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-xl border border-green-100">
                  <CheckCircle size={18} /><span className="font-medium">Importação concluída!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {viewMode !== 'assets' && (
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-slate-800 px-2 flex items-center gap-2">
                <UsersIcon className="text-blue-600" size={20} /> 
                {viewMode === 'table' ? 'Base de Beneficiários' : 'Cartões Ativos'} 
                <span className="text-slate-400 font-normal ml-1">({filteredUsers.length})</span>
              </h3>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Buscar beneficiário..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>
          )}

          {viewMode === 'table' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-[11px] text-slate-400 uppercase bg-slate-50/50 tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Identificação</th>
                      <th className="px-6 py-4 font-bold">Documento</th>
                      <th className="px-6 py-4 font-bold">Categoria</th>
                      <th className="px-6 py-4 font-bold text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">{user.name}</span>
                            <span className="text-xs text-slate-400">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-500 text-xs">{user.cpf}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${user.cardType === 'Diamante' ? 'bg-slate-800 text-white' : user.cardType === 'Ouro' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{user.cardType}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => setSelectedUserForCard(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Ver Cartão"><Eye size={16} /></button>
                            <button onClick={() => setEditingUser(user)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="Editar"><Pencil size={16} /></button>
                            <button onClick={() => { if(confirm('Excluir este beneficiário?')) onDeleteUser(user.id) }} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Excluir"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredUsers.map(user => (
                <div key={user.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center gap-4 group relative overflow-hidden">
                   <div className="w-full flex justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                     <DiscountCard user={user} />
                   </div>
                   <div className="w-full flex justify-between items-center px-2">
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-800 truncate max-w-[150px]">{user.name}</span>
                       <span className="text-[10px] text-slate-400">Plano: {user.cardType}</span>
                     </div>
                     <div className="flex gap-1">
                        <button onClick={() => setEditingUser(user)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><Pencil size={16} /></button>
                        <button onClick={() => { if(confirm('Excluir este beneficiário?')) onDeleteUser(user.id) }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'assets' && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[500px]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Banco de Imagens</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gerencie os ativos visuais do sistema</p>
                </div>
                <label className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-lg transition-all active:scale-95">
                  <Plus size={20} />
                  <span>Adicionar Imagem</span>
                  <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                </label>
              </div>

              {appImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-300">
                  <ImageIcon size={64} className="mb-4 opacity-20" />
                  <p className="font-bold">Nenhuma imagem carregada ainda</p>
                  <p className="text-xs uppercase tracking-widest mt-2">Os ativos aparecerão aqui após o upload</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {appImages.map((img, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <img src={img} alt={`Asset ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button 
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = img;
                            link.download = `santa_casa_asset_${idx}.png`;
                            link.click();
                          }}
                          className="p-2.5 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform"
                          title="Baixar"
                        >
                          <Download size={20} />
                        </button>
                        <button 
                          onClick={() => removeImage(idx)}
                          className="p-2.5 bg-white text-red-500 rounded-full hover:scale-110 transition-transform"
                          title="Excluir"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-black text-slate-800 text-lg leading-none">Editar Beneficiário</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Atualização de Cadastro</p>
              </div>
              <button onClick={() => setEditingUser(null)} className="p-2 bg-white hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nome Completo</label>
                  <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">E-mail</label>
                  <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CPF</label>
                  <input type="text" value={editingUser.cpf} onChange={e => setEditingUser({...editingUser, cpf: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium font-mono" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Data de Nascimento</label>
                  <input type="text" value={editingUser.birthDate} onChange={e => setEditingUser({...editingUser, birthDate: e.target.value})} placeholder="DD/MM/AAAA" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Data de Validade</label>
                  <input type="text" value={editingUser.expiryDate} onChange={e => setEditingUser({...editingUser, expiryDate: e.target.value})} placeholder="MM/AAAA" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tipo de Plano</label>
                  <select value={editingUser.cardType} onChange={e => setEditingUser({...editingUser, cardType: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium">
                    <option value="Prata">Prata</option>
                    <option value="Ouro">Ouro</option>
                    <option value="Diamante">Diamante</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status</label>
                  <select value={editingUser.status} onChange={e => setEditingUser({...editingUser, status: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-10 flex gap-3">
                <button type="button" onClick={() => setEditingUser(null)} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all">CANCELAR</button>
                <button type="submit" className="flex-1 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"><Save size={20} />SALVAR ALTERAÇÕES</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUserForCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <div>
                <h3 className="font-black text-slate-800 text-lg leading-none">Cartão Virtual</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Visualização Admin</p>
              </div>
              <button onClick={() => setSelectedUserForCard(null)} className="p-2 bg-white hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm"><X size={20} /></button>
            </div>
            <div className="p-10 flex flex-col items-center gap-8 bg-white">
              <div className="w-full flex justify-center drop-shadow-2xl">
                <DiscountCard user={selectedUserForCard} />
              </div>
              <div className="text-center bg-slate-50 w-full p-6 rounded-3xl border border-slate-100">
                <p className="text-base font-black text-slate-800 uppercase mb-1">{selectedUserForCard.name}</p>
                <div className="flex justify-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <span>CPF: {selectedUserForCard.cpf}</span>
                  <span className="text-slate-200">|</span>
                  <span className="text-blue-600">Plano: {selectedUserForCard.cardType}</span>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button onClick={() => setSelectedUserForCard(null)} className="w-full max-w-xs py-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-black rounded-2xl transition-all shadow-lg active:scale-95">FECHAR VISUALIZAÇÃO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
