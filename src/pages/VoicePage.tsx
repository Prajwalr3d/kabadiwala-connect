import { useMemo, useState } from 'react'
import { Mic, Send, Sparkles } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { interpretVoiceCommand } from '../services/voiceService'

const suggestions = [
  'What is the current price?',
  'Who is the nearest recycler?',
  'How much have I earned?',
  'Check lot status',
  'Give me safety guidance'
]

export function VoicePage() {
  const store = useAppStore()
  const language = store.language
  const [command, setCommand] = useState('What is the current price?')
  const [lastReply, setLastReply] = useState(
    interpretVoiceCommand('What is the current price?', store, language)
  )

  const replyTone = useMemo(() => {
    if (lastReply.intent === 'SAFETY_GUIDANCE') return 'warning'
    if (lastReply.intent === 'CHECK_EARNINGS') return 'success'
    return 'neutral'
  }, [lastReply])

  const onSubmit = () => {
    const trimmed = command.trim()
    if (!trimmed) return
    const next = interpretVoiceCommand(trimmed, store, language)
    setLastReply(next)
  }

  return (
    <div className="page-shell">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Voice assistant</p>
            <h3>Operational prompts</h3>
          </div>
          <div className="tiny-pill"><Sparkles size={12} /> Demo AI</div>
        </div>

        <div className="voice-layout">
          <div className="voice-panel">
            <div className="voice-input-wrap">
              <Mic size={18} />
              <input
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="Ask about price, recycler, earnings, lot, or safety"
                aria-label="Voice assistant command"
              />
              <button type="button" className="primary-cta" onClick={onSubmit}>
                <Send size={15} /> Send
              </button>
            </div>

            <div className="suggestion-row">
              {suggestions.map((item) => (
                <button key={item} type="button" className="flat-chip" onClick={() => setCommand(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="panel voice-response-panel">
            <div className="panel-header compact-header">
              <div>
                <p className="eyebrow">Response</p>
                <h3>{lastReply.intent}</h3>
              </div>
              <span className={`status-badge ${replyTone}`}>{lastReply.status}</span>
            </div>

            <div className="voice-response-box">
              <strong>{lastReply.reply}</strong>
              {lastReply.data && (
                <div className="voice-data-grid">
                  {lastReply.data.amount && <span>Amount: ₹{lastReply.data.amount.toLocaleString('en-IN')}</span>}
                  {lastReply.data.material && <span>Material: {lastReply.data.material}</span>}
                  {lastReply.data.recycler && <span>Recycler: {lastReply.data.recycler}</span>}
                  {lastReply.data.lotId && <span>Lot: {lastReply.data.lotId}</span>}
                  {lastReply.data.earnings && <span>Earnings: ₹{lastReply.data.earnings.toLocaleString('en-IN')}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
