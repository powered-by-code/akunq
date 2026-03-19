import { useMemo, useState } from 'react';
import { t } from '@/i18n/useTranslation';
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
    <div className="bg-card border rounded-lg px-3 py-2 shadow-md text-sm">
      <p className="text-text-body">
        Day {d.day}: <span className="font-bold text-text-headline">{d.weight} կգ</span>
      </p>
    </div>
  );
}

const MILESTONE_DAYS = [0, 14, 30, 90];

const DEFAULTS = { weight: 85, height: 165, age: 52 };
const RANGES = {
  weight: { min: 70, max: 130, step: 1 },
  height: { min: 130, max: 220, step: 1 },
  age: { min: 45, max: 70, step: 1 },
};

export function CalculatorSection() {
  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [height, setHeight] = useState(DEFAULTS.height);
  const [age, setAge] = useState(DEFAULTS.age);

  const data = useMemo(
    () => computeProjection(weight, height, age),
    [weight, height, age]
  );

  const thirtyDayLoss = data.length > 30 ? round2(data[0].weight - data[30].weight) : 0;
  const ninetyDayLoss = data.length > 90 ? round2(data[0].weight - data[90].weight) : 0;

  const resultText = t('calculator.resultText')
    .replace('{thirtyDayLoss}', String(thirtyDayLoss))
    .replace('{ninetyDayLoss}', String(ninetyDayLoss));

  function scrollToContact() {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  const yMin = Math.floor(data[data.length - 1].weight - 2);
  const yMax = Math.ceil(data[0].weight + 1);

  return (
    <div className="mt-10 md:bg-secondary/50 md:border md:border-primary/10 md:rounded-lg md:p-8">
      <span className="text-xs uppercase tracking-widest text-primary font-semibold">
        {t('calculator.sectionTag')}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-text-headline mt-3 mb-4">
        {t('calculator.headline')}
      </h3>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SliderInput
          label={t('calculator.weightLabel')}
          value={weight}
          onChange={setWeight}
          {...RANGES.weight}
          unit="կգ"
        />
        <SliderInput
          label={t('calculator.heightLabel')}
          value={height}
          onChange={setHeight}
          {...RANGES.height}
          unit="սմ"
        />
        <SliderInput
          label={t('calculator.ageLabel')}
          value={age}
          onChange={setAge}
          {...RANGES.age}
        />
      </div>

      {/* Chart */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-1 py-4 md:static md:ml-0 md:mr-0 md:w-auto md:px-6 md:py-6 md:bg-card md:border md:rounded-lg">
        <h4 className="text-base font-bold text-text-headline mb-4">
          {t('calculator.chartTitle')}
        </h4>

        <div className="w-full" style={{ minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(144, 20%, 30%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(144, 20%, 30%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />

              {/* Phase background bands */}
              <ReferenceArea x1={0} x2={14} y1={yMin} y2={yMax} fill="hsl(144, 40%, 40%)" fillOpacity={0.08} />
              <ReferenceArea x1={14} x2={30} y1={yMin} y2={yMax} fill="hsl(30, 54%, 50%)" fillOpacity={0.08} />
              <ReferenceArea x1={30} x2={90} y1={yMin} y2={yMax} fill="hsl(220, 45%, 50%)" fillOpacity={0.06} />

              {/* Vertical dashed lines at phase boundaries */}
              <ReferenceLine x={14} stroke="hsl(0, 0%, 75%)" strokeDasharray="5 5" />
              <ReferenceLine x={30} stroke="hsl(0, 0%, 75%)" strokeDasharray="5 5" />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: 'hsl(0, 0%, 29%)' }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(0, 0%, 85%)' }}
                ticks={[0, 14, 30, 60, 90]}
              />
              <YAxis
                domain={[yMin, yMax]}
                tick={{ fontSize: 12, fill: 'hsl(0, 0%, 29%)' }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(0, 0%, 85%)' }}
                unit=" կգ"
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="weight"
                stroke="hsl(144, 20%, 30%)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: 'hsl(144, 20%, 30%)' }}
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
                    r={5}
                    fill="hsl(144, 20%, 30%)"
                    stroke="white"
                    strokeWidth={2}
                    label={{
                      value: `${point.weight} կգ`,
                      position: day === 0 ? 'top' : 'bottom',
                      fontSize: 11,
                      fontWeight: 600,
                      fill: 'hsl(0, 0%, 10%)',
                    }}
                  />
                );
              })}

              {/* Day 30 callout badge */}
              {data[30] && (
                <ReferenceDot
                  x={30}
                  y={data[30].weight}
                  r={0}
                  label={{
                    value: `−${thirtyDayLoss} կգ`,
                    position: 'top',
                    fontSize: 13,
                    fontWeight: 700,
                    fill: 'hsl(144, 20%, 25%)',
                    offset: 20,
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Phase legend */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 px-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'hsl(144, 40%, 40%)', opacity: 0.4 }} />
            <span className="text-xs text-text-body">{t('calculator.phase1Label')} — Days 1–14</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'hsl(30, 54%, 50%)', opacity: 0.4 }} />
            <span className="text-xs text-text-body">{t('calculator.phase2Label')} — Days 15–30</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'hsl(220, 45%, 50%)', opacity: 0.4 }} />
            <span className="text-xs text-text-body">{t('calculator.phase3Label')} — Days 31–90</span>
          </div>
        </div>

        {/* Result text */}
        <p className="text-base font-semibold text-text-headline mt-4 text-center">
          {resultText}
        </p>


        {/* CTA */}
        <div className="text-center mt-8">
<button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            {t('calculator.ctaButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-text-headline">{label}</label>
        <span className="text-sm font-bold text-primary tabular-nums">
          {value}{unit ? ` ${unit}` : ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-primary/15 rounded-full appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
