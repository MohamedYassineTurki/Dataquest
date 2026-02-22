import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SHAPChart({ shapValues }) {
    if (!shapValues || shapValues.length === 0) return null;

    const data = shapValues.map((s) => ({
        name: s.feature,
        value: Math.abs(s.value),
        rawValue: s.value,
        impact: s.impact,
    }));

    return (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                Facteurs de Décision (SHAP)
            </h3>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            width={130}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#0f1729',
                                border: '1px solid #1e293b',
                                borderRadius: '12px',
                                color: '#e2e8f0',
                                fontSize: '13px',
                            }}
                            formatter={(value, name, props) => {
                                const raw = props.payload.rawValue;
                                return [raw > 0 ? `+${raw}` : raw, 'Impact'];
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.impact === 'positive' ? '#7c3aed' : '#ef4444'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-accent-purple"></span>Positif
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>Négatif
                </div>
            </div>
        </div>
    );
}
