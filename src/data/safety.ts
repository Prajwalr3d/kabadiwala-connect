import type { SafetyReminder } from '../types'

export const safetyReminders: SafetyReminder[] = [
  {
    id: 'safety-1',
    title: 'Battery handling',
    description: 'Store lithium batteries in a ventilated, dry container before pick-up.',
    severity: 'warning'
  },
  {
    id: 'safety-2',
    title: 'Personal protection',
    description: 'Wear gloves while separating cable and sharp metal fragments.',
    severity: 'normal'
  },
  {
    id: 'safety-3',
    title: 'Chemical disposal',
    description: 'Do not combine paint tins, solvents, or acids with electronic scrap.',
    severity: 'critical'
  }
]
