import { useState, useRef, useEffect } from 'react'

const RESPONSES = [
  { keywords: ['who is kobayashi', 'about kobayashi', 'kobayashi issa', 'tell me about', 'who are you'], response: "Kobayashi Issa is a Software Engineer and Full Stack Web Developer, dedicated to building responsive, user-friendly web applications. 💻🚀" },
  { keywords: ['your name', 'creator', 'made you', 'who created you'], response: "I'm the portfolio assistant for Kobayashi Issa. Ask me about his skills, projects, or how to reach him! 😊" },
  { keywords: ['phone', 'contact', 'mobile', 'how to contact', 'reach'], response: "You can reach Kobayashi via 📧 issakobayashi411@gmail.com or check the Contact page for more options." },
  { keywords: ['email', 'mail', 'gmail'], response: "📧 issakobayashi411@gmail.com" },
  { keywords: ['address', 'location', 'where', 'yokohama', 'japan'], response: "Kobayashi is based in 🏠 Yokohama, Japan." },
  { keywords: ['skills', 'expertise', 'technologies', 'tech stack', 'what can he do'], response: "He's skilled in Full-Stack Web Development: React, Node.js, MongoDB, Express, PHP, MySQL, Python, FastAPI, and more! 🔥" },
  { keywords: ['projects', 'work', 'portfolio', 'what has he built'], response: "His projects include WanderLust, GigsTM, NoHate, Weather App, Amazon Clone, and more—check the Projects page! 🎯" },
  { keywords: ['wanderlust', 'gigstm', 'nohate'], response: "WanderLust: full-stack holiday rental app. GigsTM: enterprise gig management. NoHate: social awareness platform. All built with modern stacks. 🚀" },
  { keywords: ['education', 'college', 'university', 'study', 'degree', 'kanto'], response: "He studied B.Tech in Computer Science & Engineering at Kanto Institute of Technology, Yokohama (2013–2017). 🏫" },
  { keywords: ['internship', 'experience', 'job', 'work experience'], response: "Web Developer Intern at Simtrak Solution. Deployed 5+ full-stack projects. Built real-time volunteer platforms and production apps. 🚀" },
  { keywords: ['github', 'linkedin', 'social'], response: "Connect: 🐱 GitHub — MightWarriorNo1 | Discord link on the footer. Check the Contact page for more." },
  { keywords: ['hi', 'hello', 'hey', 'hii', 'greetings'], response: "Hello! I'm here to help. Ask about Kobayashi's skills, projects, or contact—or pick a quick topic below! 😊" },
  { keywords: ['bye', 'goodbye', 'see you', 'good night'], response: "Goodbye! Have a great day. 👋" },
  { keywords: ['thank', 'thanks'], response: "You're welcome! Anything else? 😊" },
]

const QUICK_CHIPS = [
  'Skills',
  'Projects',
  'Contact',
  'Education',
  'Experience',
]

function findBestResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim()
  for (const entry of RESPONSES) {
    if (entry.keywords.some(kw => msg === kw || msg.includes(kw) || new RegExp(`\\b${kw}\\b`).test(msg)))
      return entry.response
  }
  let best = null, count = 0
  for (const entry of RESPONSES) {
    const c = entry.keywords.filter(kw => msg.includes(kw)).length
    if (c > count) { count = c; best = entry.response }
  }
  return best
}

async function callGrokAPI(userMessage) {
  const key = import.meta.env.VITE_GROKAI_API_KEY
  if (!key) return null
  const simple = ['hi', 'hello', 'hey', 'bye', 'thank']
  if (simple.some(q => userMessage.toLowerCase().includes(q))) return null
  const model = import.meta.env.VITE_GROKAI_MODEL || 'grok-4-1-fast-reasoning'
  try {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: "You are the portfolio assistant for Kobayashi Issa, a Software Engineer and Full Stack Web Developer in Yokohama, Japan. Answer briefly (1-2 sentences) about his skills (React, Node, MongoDB, etc.), projects (WanderLust, GigsTM, NoHate), education (Kanto Institute of Technology), experience, or contact (issakobayashi411@gmail.com)." },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 120,
      }),
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    return data.choices?.[0]?.message?.content ?? null
  } catch (e) {
    console.error('Grok API error:', e)
    return null
  }
}

const GREETING = "Hi! I'm Kobayashi's portfolio assistant. Ask about his skills, projects, or contact—or tap a quick topic below! 👋"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: GREETING },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages, typing])

  const addMessage = (text, type = 'bot') => {
    setMessages(prev => [...prev, { type, text }])
  }

  const sendMessage = async (textOrEvent) => {
    const msg = typeof textOrEvent === 'string' ? textOrEvent : input.trim()
    if (!msg) return
    if (typeof textOrEvent !== 'string') setInput('')
    addMessage(msg, 'user')
    setTyping(true)
    await new Promise(r => setTimeout(r, 400 + Math.random() * 300))
    let botResponse = findBestResponse(msg)
    if (!botResponse) {
      botResponse = await callGrokAPI(msg)
      botResponse = botResponse || "I can answer questions about Kobayashi Issa—his skills, projects, experience, or contact. Try: *Skills*, *Projects*, or *Contact*."
    }
    setTyping(false)
    addMessage(botResponse, 'bot')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const containerClass = open ? 'chatbot-container chatbot-visible' : 'chatbot-container chatbot-hidden'

  return (
    <section id="chatbotContainer" className="chatbot-wrapper">
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
        aria-expanded={open}
      >
        {open ? (
          <i className="fa-solid fa-xmark" aria-hidden />
        ) : (
          <i className="fa-solid fa-comments" aria-hidden />
        )}
      </button>

      <div className={containerClass} role="dialog" aria-label="Chat with portfolio assistant">
        <div className="chatbot-header">
          <div className="chatbot-header-inner">
            <div className="chatbot-avatar">
              <i className="fa-solid fa-robot" aria-hidden />
            </div>
            <div className="chatbot-title-wrap">
              <span className="chatbot-title">Portfolio Assistant</span>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" />
                Online
              </span>
            </div>
          </div>
          <button
            type="button"
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <i className="fa-solid fa-chevron-down" aria-hidden />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chatbot-msg ${m.type === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}
            >
              {m.type === 'bot' && (
                <div className="chatbot-msg-avatar">
                  <i className="fa-solid fa-robot" aria-hidden />
                </div>
              )}
              <div className="chatbot-msg-bubble">
                {m.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < m.text.split('\n').length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {typing && (
            <div className="chatbot-msg chatbot-msg-bot">
              <div className="chatbot-msg-avatar">
                <i className="fa-solid fa-robot" aria-hidden />
              </div>
              <div className="chatbot-msg-bubble chatbot-typing">
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="chatbot-scroll-anchor" />
        </div>

        {messages.length <= 1 && (
          <div className="chatbot-chips">
            {QUICK_CHIPS.map((label) => (
              <button
                key={label}
                type="button"
                className="chatbot-chip"
                onClick={() => sendMessage(label)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input-wrap">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about skills, projects, contact..."
            className="chatbot-input-field"
            aria-label="Message"
          />
          <button
            type="button"
            className="chatbot-send"
            onClick={() => sendMessage()}
            aria-label="Send message"
          >
            <i className="fa-solid fa-paper-plane" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
