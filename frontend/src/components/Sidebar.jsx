import { LayoutDashboard, BarChart3, Users } from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analyse SHAP', active: false },
    { icon: Users, label: 'Profils Clients', active: false },
];

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-navy-900 border-r border-slate-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-bold text-lg">
                        O
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-tight">OLEA</h1>
                        <p className="text-slate-500 text-xs">Smart Advisor</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active
                                ? 'bg-gradient-to-r from-accent-purple/20 to-transparent text-white border border-accent-purple/30'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-xs text-slate-500">Modèle</p>
                    <p className="text-sm text-slate-300 font-medium">LightGBM v1.0</p>
                    <p className="text-xs text-emerald-400 mt-1">● En ligne</p>
                </div>
            </div>
        </aside>
    );
}
