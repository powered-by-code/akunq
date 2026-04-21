import { Check, Clock } from 'lucide-react';
import { t, tArray } from '@/i18n/useTranslation';

const points = [82.4, 81.8, 81.1, 80.2, 79.4, 78.6, 77.8, 77.1, 76.4, 76.1];

const chartWidth = 320;
const chartHeight = 90;
const min = Math.min(...points);
const max = Math.max(...points);
const stepX = chartWidth / (points.length - 1);
const linePath = points
  .map((v, i) => {
    const x = i * stepX;
    const y = chartHeight - ((v - min) / (max - min)) * chartHeight;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(' ');
const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

type Entry = { time: string; label: string; verified: boolean };

export function DashboardMock({ compact = false }: { compact?: boolean }) {
  const entries = tArray<Entry>('heroMock.entries');

  return (
    <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden font-mono text-[12px] text-foreground/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
            <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
            <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
          </div>
          <span className="mono-label ml-2">weight.log</span>
        </div>
        <span className="mono-label">{t('heroMock.week')}</span>
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-foreground text-2xl font-semibold tracking-tight">76.1</span>
            <span className="text-muted-foreground ml-1">{t('heroMock.unit')}</span>
          </div>
          <div className="text-[#34D399]">
            −6.3 {t('heroMock.unit')} <span className="text-muted-foreground">{t('heroMock.period')}</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-[90px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((tk) => (
            <line
              key={tk}
              x1="0"
              x2={chartWidth}
              y1={chartHeight * tk}
              y2={chartHeight * tk}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          <path d={areaPath} fill="url(#chart-fill)" />
          <path d={linePath} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((v, i) => {
            const x = i * stepX;
            const y = chartHeight - ((v - min) / (max - min)) * chartHeight;
            if (i !== points.length - 1) return null;
            return <circle key={i} cx={x} cy={y} r="3" fill="#3B82F6" stroke="#0a0a0a" strokeWidth="2" />;
          })}
        </svg>
      </div>

      {!compact && <div className="border-t border-border/80">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="mono-label">{t('heroMock.mealsLabel')}</span>
          <span className="mono-label">{t('heroMock.today')}</span>
        </div>
        <div className="px-4 pb-4 space-y-1.5">
          {entries.map((e) => (
            <div key={e.time} className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-white/[0.02] transition-colors">
              <span className="text-muted-foreground tabular-nums">{e.time}</span>
              <span className="flex-1 text-foreground/80">{e.label}</span>
              {e.verified ? (
                <span className="inline-flex items-center gap-1 text-[#34D399]">
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                  {t('heroMock.verified')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[#FBBF24]">
                  <Clock className="w-3 h-3" strokeWidth={2.5} />
                  {t('heroMock.pending')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
