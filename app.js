const chat = document.getElementById('chat');
const welcome = document.getElementById('welcome');
const form = document.getElementById('composer');
const promptBox = document.getElementById('prompt');
const sidebar = document.querySelector('.sidebar');

function addMessage(text, who) {
  if (welcome) welcome.remove();
  const row = document.createElement('div');
  row.className = `message ${who}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = who === 'user' ? 'You' : '✦';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  row.append(avatar, bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}
function demoReply(text) {
  const t = text.toLowerCase();
  if (/hello|hi\b|hey|ഹായ്|ഹലോ/.test(t)) return 'Hello! 👋 I’m BASI AI, your personal assistant. This starter is running in demo mode. Connect an AI API to get live intelligent responses.';
  if (/malayalam|മലയാളം|കേരള/.test(t)) return 'നമസ്കാരം! ഇത് BASI AI-യുടെ demo പതിപ്പാണ്. ഇപ്പോൾ ഉദാഹരണ മറുപടികളാണ് നൽകുന്നത്. യഥാർത്ഥ AI മറുപടികൾക്കായി സുരക്ഷിതമായ backend-ൽ ഒരു AI API ബന്ധിപ്പിക്കണം.';
  if (/artificial intelligence|\bai\b/.test(t)) return 'Artificial intelligence (AI) is technology that helps computers perform tasks such as understanding language, answering questions, and recognizing images. This is a sample reply from the starter app, not a live AI model.';
  if (/write|introduction|caption/.test(t)) return 'Here’s a simple starting point:\n\n“Hi! I’m someone who enjoys learning, exploring new ideas, and using technology to make everyday life easier.”\n\nTell me the tone and details you want, and I can help you shape it.';
  if (/idea|brainstorm/.test(t)) return 'Here are three ideas to explore:\n1. A Malayalam-first study helper\n2. A personal writing and caption assistant\n3. A daily learning companion\n\nThis is demo content. Connect a real AI model for dynamic responses.';
  return 'Thanks for your message! This BASI AI starter interface is working, but it is currently in demo mode and does not connect to a live AI model yet.\n\nNext step: add a small backend that calls an AI provider, then have this chat send your message to that backend. Never put a secret API key directly in app.js or the website.';
}
function send(text) {
  const value = text.trim();
  if (!value) return;
  addMessage(value, 'user');
  promptBox.value = '';
  promptBox.style.height = 'auto';
  window.setTimeout(() => addMessage(demoReply(value), 'assistant'), 250);
}
form.addEventListener('submit', e => { e.preventDefault(); send(promptBox.value); });
promptBox.addEventListener('input', () => { promptBox.style.height = 'auto'; promptBox.style.height = Math.min(promptBox.scrollHeight, 180) + 'px'; });
document.querySelectorAll('[data-prompt]').forEach(b => b.addEventListener('click', () => send(b.dataset.prompt)));
document.getElementById('newChat').addEventListener('click', () => { chat.innerHTML = ''; chat.appendChild(welcomeTemplate()); sidebar.classList.remove('open'); });
document.getElementById('clearBtn').addEventListener('click', () => { chat.innerHTML = ''; chat.appendChild(welcomeTemplate()); });
document.getElementById('menuBtn').addEventListener('click', () => sidebar.classList.toggle('open'));
function welcomeTemplate() {
 const el = document.createElement('div'); el.className='welcome';
 el.innerHTML = '<div class="welcome-icon">✦</div><h1>What can I help with?</h1><p>Your personal AI assistant starts here.</p><div class="suggestions"><button class="suggestion" data-prompt="Explain artificial intelligence in simple words">✧ Explain AI simply</button><button class="suggestion" data-prompt="Give me five creative app ideas">✧ Brainstorm ideas</button><button class="suggestion" data-prompt="Help me write a short introduction about myself">✧ Help me write</button><button class="suggestion" data-prompt="Teach me a useful fact in Malayalam">✧ Learn something</button></div>';
 el.querySelectorAll('[data-prompt]').forEach(b => b.addEventListener('click', () => send(b.dataset.prompt)));
 return el;
}
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
