export default function RiskGauge({ score, level }) {
    if (score === null || score === undefined) return null;

    const percentage = Math.min((score / 5) * 100, 100);
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (percentage / 100) * circumference;

    const color =
        score < 1.5 ? '#10b981' :
            score < 3.0 ? '#f59e0b' :
                '#ef4444';

    return (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Complexité du Risque
            </h3>
            <div className="flex items-center justify-center">
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke={color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{score}</span>
                        <span className="text-xs font-medium mt-1" style={{ color }}>{level}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
