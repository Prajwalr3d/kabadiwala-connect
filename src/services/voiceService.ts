import type { AppStoreState, Language } from '../types'

export type VoiceState = 'Idle' | 'Listening' | 'Processing' | 'Response'

export type VoiceIntent =
  | 'GET_PRICE'
  | 'FIND_RECYCLER'
  | 'CREATE_LOT'
  | 'CHECK_EARNINGS'
  | 'CHECK_TRANSACTION'
  | 'CHECK_LOT'
  | 'SAFETY_GUIDANCE'
  | 'HELP'

export interface VoiceResponse {
  status: VoiceState
  intent: VoiceIntent
  reply: string
  data?: {
    amount?: number
    material?: string
    recycler?: string
    lotId?: string
    earnings?: number
  }
}

export function interpretVoiceCommand(command: string, store: AppStoreState, language: Language = 'en'): VoiceResponse {
  const normalized = command.toLowerCase()

  if (normalized.includes('rate') || normalized.includes('price') || normalized.includes('kya hai')) {
    const lot = store.lots[0]
    const amount = lot?.indicativeValue ?? 4200
    return {
      status: 'Response',
      intent: 'GET_PRICE',
      reply:
        language === 'hi'
          ? `PCB ka aaj ka approximate rate ₹${amount.toLocaleString('en-IN')} hai.`
          : language === 'mr'
            ? `PCB साठी आजचा अंदाजित दर ₹${amount.toLocaleString('en-IN')} आहे.`
            : `The current indicative price is ₹${amount.toLocaleString('en-IN')}.`,
      data: { amount, material: lot?.material ?? 'PCB' }
    }
  }

  if (normalized.includes('recycler') || normalized.includes('show') || normalized.includes('निकट') || normalized.includes('नज़दीकी')) {
    const recycler = store.selectedRecycler ?? store.recyclers[0]
    return {
      status: 'Response',
      intent: 'FIND_RECYCLER',
      reply:
        language === 'hi'
          ? `नज़दीकी recycler ${recycler.name} है, ${recycler.distanceKm} km दूर है.`
          : language === 'mr'
            ? `${recycler.name} हा तुमच्या जवळचा recycler आहे, तो ${recycler.distanceKm} km दूर आहे.`
            : `The closest recycler is ${recycler.name}, about ${recycler.distanceKm} km away.`,
      data: { recycler: recycler.name }
    }
  }

  if (normalized.includes('earning') || normalized.includes('कमाई') || normalized.includes('कमाई') || normalized.includes('मगणी')) {
    const earnings = store.earnings.total
    return {
      status: 'Response',
      intent: 'CHECK_EARNINGS',
      reply:
        language === 'hi'
          ? `Aaj ki total kamai ₹${earnings.toLocaleString('en-IN')} hai.`
          : language === 'mr'
            ? `तुमची एकूण कमाई ₹${earnings.toLocaleString('en-IN')} आहे.`
            : `Your total earnings are ₹${earnings.toLocaleString('en-IN')}.`,
      data: { earnings }
    }
  }

  if (normalized.includes('lot') || normalized.includes('lot') || normalized.includes('लॉट') || normalized.includes('लॉट')) {
    const lot = store.lots[0]
    return {
      status: 'Response',
      intent: 'CHECK_LOT',
      reply:
        language === 'hi'
          ? `Lot ${lot?.id ?? 'KC-2026-0187'} ${lot?.status ?? 'Bidding Open'} mein hai.`
          : language === 'mr'
            ? `लॉट ${lot?.id ?? 'KC-2026-0187'} ${lot?.status ?? 'Bidding Open'} स्थितीत आहे.`
            : `The active lot is ${lot?.id ?? 'KC-2026-0187'} and is currently ${lot?.status ?? 'Bidding Open'}.`,
      data: { lotId: lot?.id }
    }
  }

  if (normalized.includes('safety') || normalized.includes('safe') || normalized.includes('सुरक्षा')) {
    return {
      status: 'Response',
      intent: 'SAFETY_GUIDANCE',
      reply:
        language === 'hi'
          ? 'Batteries aur PCB ko dry, insulated area mein rakhein. Knee-level ke close contact se bachen.'
          : language === 'mr'
            ? 'बॅटरी आणि PCB सुरक्षित, कोरडे, अलग ठेवावेत. उकळणाऱ्या किंवा जळणाऱ्या क्षेत्रापासून दूर ठेवा.'
            : 'Keep batteries and PCB dry, isolated, and away from heat. Use gloves and proper handling gear.',
    }
  }

  return {
    status: 'Response',
    intent: 'HELP',
    reply:
      language === 'hi'
        ? 'Mein rate, recycler, lot aur earnings check kar sakta hoon.'
        : language === 'mr'
          ? 'मी दर, recycler, लॉट आणि कमाई तपासू शकतो.'
          : 'I can help with price, recycler, lot, earnings, safety, and transactions.'
  }
}
