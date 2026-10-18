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

async function demoReply(text) {
  const response = await fetch(
    'https://basi-ai-api.basithktl31234.workers.dev',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'AI response failed');
  }

  return data.reply || 'BASI AI could not reply.';
}


async function send(text) {
  const value = text.trim();
  if (!value) return;

  addMessage(value, 'user');
  promptBox.value = '';
  promptBox.style.height = 'auto';

  const loading = document.createElement('div');
  loading.className = 'message assistant';
  loading.textContent = 'BASI AI is thinking...';
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  try {
    const reply = await demoReply(value);
    loading.remove();
    addMessage(reply, 'assistant');
  } catch (error) {
    loading.remove();
    addMessage(
      'AI-യുമായി ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കൂ.',
      'assistant'
    );
  }
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
