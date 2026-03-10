import { useState, useRef, useEffect } from 'react'

const RESPONSES = [
  { keywords: ['who is affan', 'what affan does', 'about affan', 'affan asghar', 'Kobayashi Issa', 'tell me about affan', 'who are you'], response: "Kobayashi Issa is a Software Engineer and Full Stack Web Developer, dedicated to building responsive, user-friendly web applications. 💻🚀" },
  { keywords: ['your name', 'creator', 'made you', 'built you', 'who created you'], response: "I'm a chatbot created for Affan's portfolio. 😊" },
  { keywords: ['developer name', 'who made you'], response: "My developer is Kobayashi Issa. 🚀" },
  { keywords: ['phone number', 'contact', 'mobile', 'phone', 'how to contact', 'reach affan'], response: "You can contact Kobayashi Issa at 📞 9339828230." },
  { keywords: ['email', 'mail', 'gmail', 'email address'], response: "You can reach him at 📧 affanasgar8@gmail.com." },
  { keywords: ['address', 'location', 'where do you live', 'where is affan'], response: "He is based in 🏠 Kankinara, Kolkata, West Bengal, India." },
  { keywords: ['skills', 'expertise', 'technologies', 'tech stack', 'what can affan do'], response: "He is skilled in Full-Stack Web Development, Node.js, React, PHP, MySQL, MongoDB, Express.js, JavaScript, HTML, CSS, and more! 🔥" },
  { keywords: ['projects', 'work', 'portfolio', 'project', 'what has affan built'], response: "His projects include WanderLust, NoHate, GigsTM, Weather App, and many more—check the Projects page! 🎯" },
  { keywords: ['wanderlust', 'nohate', 'gigstm'], response: "WanderLust is a full-stack holiday rental app; NoHate is a social awareness platform; GigsTM is an enterprise gig management platform. All built with modern stacks. 🚀" },
  { keywords: ['college', 'education', 'study', 'degree', 'where did affan study'], response: "He is pursuing B.Tech in Computer Science & Engineering at Narula Institute of Technology, Kolkata. 🏫" },
  { keywords: ['internship', 'experience', 'job', 'work experience'], response: "He works as Full Stack Web Developer at Ecom Services HUB. Previously Web Developer Intern at Simtrak Solution Pvt Ltd. 🚀" },
  { keywords: ['social media', 'linkedin', 'github', 'instagram'], response: "Connect with him: 🔗 LinkedIn: linkedin.com/in/mdaffanasghar/ | 🐱 GitHub: github.com/affancoder" },
  { keywords: ['hi', 'hello', 'hey', 'hii', 'greetings'], response: "Hello! How can I help you? Ask about Affan's skills, projects, or contact. 😊" },
  { keywords: ['bye', 'goodbye', 'see you', 'good night'], response: "Goodbye! Have a great day! 😊" },
  { keywords: ['thank', 'thanks', 'appreciate'], response: "You're welcome! Let me know if you need anything else. 😊" },
]

function findBestResponse(userMessage) {
  const msg = userMessage.toLowerCase()
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

async function callDeepSeekAPI(userMessage) {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY
  if (!key) return null
  const simple = ['hi', 'hello', 'hey', 'bye', 'thank']
  if (simple.some(q => userMessage.toLowerCase().includes(q))) return null
  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: "You are an assistant for Kobayashi Issa's portfolio. Answer questions about Affan: Software Engineer, Full Stack Developer, his skills (React, Node, MongoDB, etc.), projects (WanderLust, NoHate, GigsTM), education (NIT Kolkata), experience, or contact. Keep responses brief (1-2 sentences)." },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 100,
      }),
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    return data.choices?.[0]?.message?.content ?? null
  } catch (e) {
    console.error('DeepSeek API error:', e)
    return null
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ type: 'bot', text: "Hello! How can I help you? Ask about Affan's skills, projects, or contact. 😊" }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages, typing])

  const addMessage = (text, type = 'bot') => {
    setMessages(prev => [...prev, { type, text }])
  }

  const sendMessage = async () => {
    const msg = input.trim()
    if (!msg) return
    setInput('')
    addMessage(msg, 'user')
    setTyping(true)
    await new Promise(r => setTimeout(r, 500))
    let botResponse = findBestResponse(msg)
    if (!botResponse) {
      botResponse = await callDeepSeekAPI(msg)
      botResponse = botResponse || "I answer questions about Kobayashi Issa. Try asking about his skills, projects, experience, or contact info."
    }
    setTyping(false)
    addMessage(botResponse, 'bot')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  const containerClass = open ? 'chatbot-container visible' : 'chatbot-container hidden'

  return (
    <section id="chatbotContainer">
      <div className="chatbot-icon" onClick={() => setOpen(!open)} role="button" aria-label="Toggle chatbot">
        💬
      </div>
      <div className={containerClass}>
        <div className="chatbot-header">
          Chatbot
          <span className="close-btn" onClick={() => setOpen(false)}>×</span>
        </div>
        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={m.type === 'user' ? 'user-message' : 'bot-message'}>
              {m.text.split('\n').map((line, j) => (
                <span key={j}>{line}{j < m.text.split('\n').length - 1 ? <br /> : null}</span>
              ))}
            </div>
          ))}
          {typing && <div className="bot-message typing">AffanBot is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button type="button" onClick={sendMessage}>➤</button>
        </div>
      </div>
    </section>
  )
}
