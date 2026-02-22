import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const EMPLOYMENT_OPTIONS = [
    { value: 'Employed_FullTime', label: 'Salarié' },
    { value: 'Self_Employed', label: 'Indépendant' },
    { value: 'Contractor', label: 'Contractuel' },
    { value: 'Unemployed', label: 'Sans Emploi' },
];

const CHANNEL_OPTIONS = [
    { value: 'Direct_Website', label: 'Site Web' },
    { value: 'Aggregator_Site', label: 'Agrégateur' },
    { value: 'Local_Broker', label: 'Courtier Local' },
    { value: 'Corporate_Partner', label: 'Partenaire' },
    { value: 'Affiliate_Group', label: 'Affilié' },
];

export default function PredictionForm({ onSubmit, loading }) {
    const [form, setForm] = useState({
        age: 35,
        estimated_annual_income: 55000,
        adult_dependents: 1,
        child_dependents: 0,
        vehicles_on_policy: 1,
        previous_claims_filed: 0,
        employment_status: 'Employed_FullTime',
        acquisition_channel: 'Direct_Website',
    });

    const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-navy-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
                Profil de l'Assuré
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label>Âge</label>
                    <input type="number" min="18" max="99"
                        value={form.age} onChange={(e) => update('age', +e.target.value)} />
                </div>
                <div>
                    <label>Revenu Annuel</label>
                    <input type="number" step="1000"
                        value={form.estimated_annual_income} onChange={(e) => update('estimated_annual_income', +e.target.value)} />
                </div>
                <div>
                    <label>Adultes à Charge</label>
                    <input type="number" min="0"
                        value={form.adult_dependents} onChange={(e) => update('adult_dependents', +e.target.value)} />
                </div>
                <div>
                    <label>Enfants à Charge</label>
                    <input type="number" min="0"
                        value={form.child_dependents} onChange={(e) => update('child_dependents', +e.target.value)} />
                </div>
                <div>
                    <label>Véhicules</label>
                    <input type="number" min="1"
                        value={form.vehicles_on_policy} onChange={(e) => update('vehicles_on_policy', +e.target.value)} />
                </div>
                <div>
                    <label>Sinistres Antérieurs</label>
                    <input type="number" min="0"
                        value={form.previous_claims_filed} onChange={(e) => update('previous_claims_filed', +e.target.value)} />
                </div>
                <div>
                    <label>Statut d'Emploi</label>
                    <select value={form.employment_status} onChange={(e) => update('employment_status', e.target.value)}>
                        {EMPLOYMENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
                <div>
                    <label>Canal d'Acquisition</label>
                    <select value={form.acquisition_channel} onChange={(e) => update('acquisition_channel', e.target.value)}>
                        {CHANNEL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white text-sm
          bg-gradient-to-r from-accent-purple to-accent-blue
          hover:from-accent-purple/90 hover:to-accent-blue/90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 shadow-lg shadow-accent-purple/25
          flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Sparkles className="w-4 h-4" />
                        Lancer la Prédiction
                    </>
                )}
            </button>
        </form>
    );
}
