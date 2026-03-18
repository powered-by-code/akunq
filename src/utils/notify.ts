export function notifyMe(name: string, phone: string) {
  const TOKEN = '8672112490:AAFfVcW5--tHIofh1J2m_8oO_OLQAzUtqcc';
  const CHAT_ID = '-5239196817';
  const text = `📞 New Contact!\nName: ${name}\nPhone: ${phone}`;
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`, {
    mode: 'no-cors'
  });
}
