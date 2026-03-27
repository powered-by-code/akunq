function getVariant(): string {
  const path = window.location.pathname.replace(/^\//, '').split('/')[0];
  return path || 'default';
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
  const TOKEN = '8672112490:AAFfVcW5--tHIofh1J2m_8oO_OLQAzUtqcc';
  const CHAT_ID = '-5239196817';
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
  const filtered = lines.filter(Boolean);
  const text = filtered.join('\n');
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`, {
    mode: 'no-cors'
  });
}
