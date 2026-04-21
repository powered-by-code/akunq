import { useMemo, useState } from 'react';
import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';

interface DataPoint {
  day: number;
  weight: number;
}

function computeProjection(
  startWeight: number,
  heightCm: number,
  age: number
): DataPoint[] {
  const heightM = heightCm / 100;
  const minWeight = 18.5 * heightM * heightM;
  let weight = startWeight;
  const data: DataPoint[] = [{ day: 0, weight: round2(weight) }];

  for (let day = 1; day <= 90; day++) {
    const bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;

    let activityFactor: number;
    let intake: number;

    if (day <= 14) {
      activityFactor = 1.55;
      intake = 1200;
    } else if (day <= 30) {
      activityFactor = 1.4;
      intake = 1400;
    } else {
      activityFactor = 1.375;
      intake = bmr * activityFactor * 0.82;
    }

    const tdee = bmr * activityFactor;
    let dailyLoss = (tdee - intake) / 7700;

    // Water weight from glycogen depletion on keto
    if (day <= 2) {
      dailyLoss += 0.7;
    } else if (day <= 5) {
      dailyLoss += 0.4;
    } else if (day <= 7) {
      dailyLoss += 0.2;
    }

    // Cap at 0.6 kg/day
    dailyLoss = Math.min(dailyLoss, 0.6);

    weight = Math.max(weight - dailyLoss, minWeight);
    data.push({ day, weight: round2(weight) });
  }

  return data;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DataPoint }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0f0f0f] border border-border rounded-md px-3 py-2 font-mono text-[12px]">
      <span className="text-muted-foreground">day_{String(d.day).padStart(2, '0')} </span>
      <span className="text-foreground tabular-nums">{d.weight} կգ</span>
    </div>
  );
}

const MILESTONE_DAYS = [0, 14, 30, 90];

const DEFAULTS = { weight: 85, height: 175, age: 32 };
const RANGES = {
  weight: { min: 70, max: 130, step: 1 },
  height: { min: 130, max: 210, step: 1 },
  age: { min: 20, max: 50, step: 1 },
};

export function CalculatorSection() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [height, setHeight] = useState(DEFAULTS.height);
  const [age, setAge] = useState(DEFAULTS.age);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  const tweaked = weight !== DEFAULTS.weight || height !== DEFAULTS.height || age !== DEFAULTS.age || gender !== 'male';

  const data = useMemo(
    () => computeProjection(weight, height, age),
    [weight, height, age]
  );

  const thirtyDayLoss = data.length > 30 ? round2(data[0].weight - data[30].weight) : 0;

  // Persist calculator state so the contact form can include it
  if (tweaked) {
    localStorage.setItem('calc', JSON.stringify({ gender, weight, height, age, thirtyDayLoss }));
  } else {
    localStorage.removeItem('calc');
  }
  const ninetyDayLoss = data.length > 90 ? round2(data[0].weight - data[90].weight) : 0;

  const resultText = t('calculator.resultText')
    .replace('{thirtyDayLoss}', String(thirtyDayLoss))
    .replace('{ninetyDayLoss}', String(ninetyDayLoss));

  const yMin = Math.floor(data[data.length - 1].weight - 2);
  const yMax = Math.ceil(data[0].weight + 1);

  return (
    <div className="mt-10 px-4 md:px-0">
      <div className="mono-label mb-4">// {t('calculator.sectionTag')}</div>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-6 max-w-[800px]">
        {t('calculator.headline')}
      </h3>

      <div className="rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
        {/* Window chrome header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/80 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
              <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
              <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
            </div>
            <span className="mono-label ml-2">calculator.tsx</span>
          </div>
          <span className="mono-label text-foreground/60">90d projection</span>
        </div>

        {/* Controls */}
        <div className="px-4 md:px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-5 md:gap-6 items-start">
            {/* Gender segmented control */}
            <div>
              <div className="mb-1">
                <span className="mono-label">Սեռ</span>
              </div>
              <div className="inline-flex border border-border rounded-md overflow-hidden">
                <button
                  onClick={() => setGender('male')}
                  className={`px-3 py-1 text-sm font-mono transition-colors ${gender === 'male' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'}`}
                >
                  {t('calculator.male')}
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`px-3 py-1 text-sm font-mono transition-colors border-l border-border ${gender === 'female' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'}`}
                >
                  {t('calculator.female')}
                </button>
              </div>
            </div>

            <SliderInput
              name="Քաշ"
              label={t('calculator.weightLabel')}
              value={weight}
              onChange={setWeight}
              {...RANGES.weight}
              unit="կգ"
            />
            <SliderInput
              name="Հասակ"
              label={t('calculator.heightLabel')}
              value={height}
              onChange={setHeight}
              {...RANGES.height}
              unit="սմ"
            />
            <SliderInput
              name="Տարիք"
              label={t('calculator.ageLabel')}
              value={age}
              onChange={setAge}
              {...RANGES.age}
              unit="տ"
            />
          </div>
        </div>

        {/* Chart block */}
        <div className="border-t border-border/80">
          <div className="flex items-center justify-between px-4 md:px-6 py-2.5 border-b border-border/80 bg-white/[0.02]">
            <span className="mono-label">{t('calculator.chartTitle')}</span>
            <span className="mono-label text-foreground/60 tabular-nums">
              30d <span className="text-[#60A5FA]">−{thirtyDayLoss}</span> · 90d <span className="text-[#60A5FA]">−{ninetyDayLoss}</span> կգ
            </span>
          </div>

          <div className="px-2 md:px-4 pt-4 pb-2">
            <div className="w-full" style={{ minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.30} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />

                  {/* Phase background bands */}
                  <ReferenceArea x1={0} x2={14} y1={yMin} y2={yMax} fill="#3B82F6" fillOpacity={0.08} />
                  <ReferenceArea x1={14} x2={30} y1={yMin} y2={yMax} fill="#3B82F6" fillOpacity={0.12} />
                  <ReferenceArea x1={30} x2={90} y1={yMin} y2={yMax} fill="#3B82F6" fillOpacity={0.05} />

                  {/* Vertical dashed lines at phase boundaries */}
                  <ReferenceLine x={14} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" />
                  <ReferenceLine x={30} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" />

                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: '#71717A', fontFamily: "'JetBrains Mono', monospace" }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                    ticks={[0, 14, 30, 60, 90]}
                  />
                  <YAxis
                    domain={[yMin, yMax]}
                    tick={{ fontSize: 11, fill: '#71717A', fontFamily: "'JetBrains Mono', monospace" }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                    unit=" կգ"
                  />

                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.15)', strokeDasharray: '3 3' }} />

                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#3B82F6', stroke: '#0a0a0a', strokeWidth: 2 }}
                    fill="url(#weightGradient)"
                  />

                  {/* Milestone dots with labels */}
                  {MILESTONE_DAYS.map((day) => {
                    const point = data[day];
                    if (!point) return null;
                    return (
                      <ReferenceDot
                        key={day}
                        x={day}
                        y={point.weight}
                        r={4}
                        fill="#3B82F6"
                        stroke="#0a0a0a"
                        strokeWidth={2}
                        label={{
                          value: `${point.weight} կգ`,
                          position: day === 0 ? 'top' : 'bottom',
                          fontSize: 11,
                          fontWeight: 500,
                          fill: '#F5F5F7',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      />
                    );
                  })}

                  {/* Day 30 callout badge — desktop only */}
                  {isDesktop && data[30] && (
                    <ReferenceDot
                      x={30}
                      y={data[30].weight}
                      r={0}
                      label={{
                        value: `−${thirtyDayLoss} կգ`,
                        position: 'top',
                        fontSize: 12,
                        fontWeight: 600,
                        fill: '#60A5FA',
                        offset: 20,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Phase legend */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-3 px-3 md:px-2 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#3B82F6]/15" />
                <span className="text-muted-foreground">{t('calculator.phase1Label')} <span className="text-foreground/60">· d1–14</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#3B82F6]/25" />
                <span className="text-muted-foreground">{t('calculator.phase2Label')} <span className="text-foreground/60">· d15–30</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#3B82F6]/10" />
                <span className="text-muted-foreground">{t('calculator.phase3Label')} <span className="text-foreground/60">· d31–90</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Result + CTA */}
        <div className="border-t border-border/80 px-4 md:px-6 py-5">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4">
            {resultText}
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 font-semibold"
          >
            {t('calculator.ctaButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SliderInput({
  name,
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  name: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="mono-label">{name}</span>
        <span className="font-mono text-[13px] text-foreground tabular-nums">
          {value}<span className="text-muted-foreground">{unit ? ` ${unit}` : ''}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-mono leading-none flex-shrink-0"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1 bg-white/[0.08] rounded-full appearance-none cursor-pointer accent-foreground"
        />
        <button
          onClick={increment}
          disabled={value >= max}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-mono leading-none flex-shrink-0"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-muted-foreground/70 mt-1.5 tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
