const TOKEN = '8672112490:AAFfVcW5--tHIofh1J2m_8oO_OLQAzUtqcc';
const CHAT_ID = '-5239196817';

function getVariant(): string {
  const path = window.location.pathname.replace(/^\//, '').split('/')[0];
  return path || 'default';
}

function send(text: string) {
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`, {
    mode: 'no-cors'
  });
}

export function notifyMe(
  name: string,
  phone: string,
  workField: string,
  goal: string,
  frustrations: string,
  pastAttempts: string,
  excitement: string
) {
  const variant = getVariant();
  const lines = [
    `📞 New Contact! [${variant}]`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    workField && `Field: ${workField}`,
    goal && `Goal: ${goal}`,
    frustrations && `Frustrations: ${frustrations}`,
    pastAttempts && `Past attempts: ${pastAttempts}`,
    excitement && `Excited about: ${excitement}`,
  ];
  try {
    const calc = localStorage.getItem('calc');
    if (calc) {
      const { gender, weight, height, age, thirtyDayLoss } = JSON.parse(calc);
      lines.push(`📊 Calculator: ${gender || '?'}, ${weight}kg, ${height}cm, age ${age} → -${thirtyDayLoss}kg in 30d`);
    }
  } catch { /* ignore parse errors */ }
  send(lines.filter(Boolean).join('\n'));
}

export function notifyCalc(data: { gender: string; weight: number; height: number; age: number; thirtyDayLoss: number; ninetyDayLoss: number }) {
  const variant = getVariant();
  send([
    `🧮 Calc touch [${variant}]`,
    `${data.gender}, ${data.weight}kg, ${data.height}cm, age ${data.age}`,
    `→ -${data.thirtyDayLoss}kg / 30d · -${data.ninetyDayLoss}kg / 90d`,
  ].join('\n'));
}
