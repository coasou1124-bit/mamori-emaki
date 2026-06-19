import type { Tier } from '@/types/guardian'

export const TIER_COLORS: Record<Tier, { text: string; bg: string; border: string; hex: string }> = {
  神獣: { text: 'text-[#d4a843]', bg: 'bg-[#d4a843]/10', border: 'border-[#d4a843]/40', hex: '#d4a843' },
  神使: { text: 'text-[#7ab8c5]', bg: 'bg-[#7ab8c5]/10', border: 'border-[#7ab8c5]/40', hex: '#7ab8c5' },
  妖異: { text: 'text-[#9b72c8]', bg: 'bg-[#9b72c8]/10', border: 'border-[#9b72c8]/40', hex: '#9b72c8' },
  守護霊: { text: 'text-[#7db87d]', bg: 'bg-[#7db87d]/10', border: 'border-[#7db87d]/40', hex: '#7db87d' },
}

export const TIER_ORDER: Tier[] = ['神獣', '神使', '妖異', '守護霊']
