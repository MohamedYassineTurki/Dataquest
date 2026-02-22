import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import RiskGauge from './components/RiskGauge';
import SHAPChart from './components/SHAPChart';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Prediction failed');
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-navy-950">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Tableau de Bord — Recommandation d'Assurance</h1>
          <p className="text-slate-400 text-sm mt-1">
            Remplissez le profil et laissez l'IA recommander la couverture optimale.
          </p>
        </div>

        {/* Form */}
        <PredictionForm onSubmit={handlePredict} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Results Grid */}
        {result && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResultCard result={result} />
            </div>
            <div>
              <RiskGauge score={result.risk_score} level={result.risk_level} />
            </div>
            <div className="lg:col-span-3">
              <SHAPChart shapValues={result.shap_values} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
