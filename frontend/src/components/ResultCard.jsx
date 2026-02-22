import { Shield, TrendingUp } from 'lucide-react';

export default function ResultCard({ result }) {
    if (!result) return null;

    return (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-purple/20 via-accent-blue/10 to-transparent p-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Recommandation IA</p>
                            <h3 className="text-xl font-bold text-white">{result.product_name}</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-extrabold text-emerald-400">{result.confidence}%</p>
                        <p className="text-xs text-slate-400">Correspondance</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="flex items-start gap-3 bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                    <TrendingUp className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-slate-300">{result.description}</p>
                        <p className="text-xs text-slate-500 mt-2">Bundle ID: {result.bundle_id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
