import React from 'react';
import { 
  Home, 
  BrainCircuit, 
  LineChart, 
  BarChart3, 
  GraduationCap, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    <Icon size={20} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-70" />}
  </button>
);

const Layout = ({ children, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'classification', icon: BrainCircuit, label: 'Classificação' },
    { id: 'regression', icon: LineChart, label: 'Regressão' },
    { id: 'comparison', icon: BarChart3, label: 'Comparação' },
    { id: 'learning', icon: GraduationCap, label: 'Modo Estudo' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-white p-6 flex flex-col gap-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <BrainCircuit className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">Nexus ML</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Learning Lab</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.id}
              {...item}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-border pt-6">
          <SidebarItem icon={Settings} label="Configurações" active={activePage === 'settings'} onClick={() => setActivePage('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-muted/50 px-4 py-2 rounded-xl border border-border w-96 group focus-within:bg-white transition-all">
            <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Procurar módulos, algoritmos..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-[1px] bg-border mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-sm font-bold">Gabriel</p>
                <p className="text-[10px] text-muted-foreground font-medium">Estudante Premium</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                G
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
