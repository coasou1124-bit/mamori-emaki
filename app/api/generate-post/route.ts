import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SNS_GUIDE: Record<string, string> = {
  X: '140文字以内（日本語）。短く鋭いインパクト重視。改行は最小限。',
  Threads: '300〜500文字。会話的で親しみやすいトーン。適度に改行して読みやすく。',
  Pinterest: '150〜250文字。説明的でSEOキーワードを意識。ハッシュタグは10個以上。',
}

const POST_TYPE_GUIDE: Record<string, string> = {
  共感系: '読者が「これ私のことだ」と感じるような、感情・悩み・日常に寄り添う表現。',
  診断誘導系: '「自分の守護存在が気になる」「診断したい」という気持ちを自然に引き出す内容。',
  守護存在紹介系: '12体の守護存在の中から1体をフィーチャーし、世界観・性格・メッセージを紹介。',
  開運メッセージ系: '守護存在からの言葉として、今日を前向きに過ごせる開運メッセージを届ける。',
}

const GUARDIAN_NAME_TO_ID: Record<string, string> = {
  '龍神': 'ryujin',
  '鳳凰': 'houou',
  '麒麟': 'kirin',
  '稲荷狐': 'inarikitsune',
  '八咫烏': 'yatagarasu',
  '白蛇': 'shirohebi',
  '九尾の狐': 'kyubi',
  '九尾': 'kyubi',
  '猫又': 'nekomata',
  '天狗': 'tengu',
  '雪女': 'yukionna',
  '座敷童子': 'zashikiwarashi',
  '護り鬼': 'mamoriOni',
}

function computeSuggestedGuardians(
  theme: string,
  selectedGuardianId: string | null,
  claudeSuggestions: string[]
): string[] {
  // Step 1: ユーザーが明示指定した守護存在を最優先
  const explicit = selectedGuardianId ? [selectedGuardianId] : []

  // Step 2: テーマに直接名前が含まれる守護存在
  const mentioned: string[] = []
  for (const [name, id] of Object.entries(GUARDIAN_NAME_TO_ID)) {
    if (theme.includes(name) && !explicit.includes(id) && !mentioned.includes(id)) {
      mentioned.push(id)
    }
  }

  // Step 3: GUARDIANSのキーワードとテーマの一致スコアで順位付け
  const excluded = new Set([...explicit, ...mentioned])
  const scored = GUARDIANS
    .filter(g => !excluded.has(g.id))
    .map(g => ({
      id: g.id,
      score: g.keywords.filter(kw => theme.includes(kw)).length,
    }))
    .sort((a, b) => b.score - a.score)

  const keywordMatches = scored.filter(g => g.score > 0).map(g => g.id)

  // 指定 → 名前一致 → キーワード一致 → AIの提案 の順でユニーク3体に絞る
  const seen = new Set<string>()
  const result: string[] = []
  for (const id of [...explicit, ...mentioned, ...keywordMatches, ...claudeSuggestions]) {
    if (!seen.has(id)) {
      seen.add(id)
      result.push(id)
    }
    if (result.length >= 3) break
  }
  return result
}

const GUARDIANS = [
  { id: 'ryujin', name: '龍神', keywords: ['水', '豊かさ', '流れ', '大きな転機'] },
  { id: 'houou', name: '鳳凰', keywords: ['再生', '炎', '美', '復活'] },
  { id: 'kirin', name: '麒麟', keywords: ['誠実', '才能', '縁', '本物'] },
  { id: 'inarikitsune', name: '稲荷狐', keywords: ['縁', '商売', '直感', 'チャンス'] },
  { id: 'yatagarasu', name: '八咫烏', keywords: ['決断', '道', '光', '目標'] },
  { id: 'shirohebi', name: '白蛇', keywords: ['金運', '蓄財', '変容', '静けさ'] },
  { id: 'kyubi', name: '九尾の狐', keywords: ['変化', '魅力', '知性', '適応'] },
  { id: 'nekomata', name: '猫又', keywords: ['秘密', '夜', '創造', '忠誠'] },
  { id: 'tengu', name: '天狗', keywords: ['修練', '試練', '技術', '強さ'] },
  { id: 'yukionna', name: '雪女', keywords: ['感性', '直感', '静けさ', '美'] },
  { id: 'zashikiwarashi', name: '座敷童子', keywords: ['幸運', '純粋', '笑顔', '縁起'] },
  { id: 'mamoriOni', name: '護り鬼', keywords: ['守護', '正義', '愛', '強さ'] },
]

export async function POST(req: NextRequest) {
  try {
    const { theme, selectedGuardian, postType, targetSNS } = await req.json()

    if (!theme || !postType || !targetSNS) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const focusedGuardian = selectedGuardian
      ? GUARDIANS.find(g => g.id === selectedGuardian) ?? null
      : null

    const guardianList = GUARDIANS.map(g => `${g.name}（${g.keywords.join('・')}）`).join('\n')
    const guardianIds = GUARDIANS.map(g => g.id).join('/')

    const prompt = `あなたは「護り絵巻」という日本の守護存在診断アプリのSNS運用担当AIです。
世界観：和風・神秘的・女性向け・高級感・霊的守護体系

以下の条件でSNS投稿文を3案生成してください。

## 投稿テーマ
${theme}

## 投稿タイプ
${postType}：${POST_TYPE_GUIDE[postType]}

## 投稿先SNS
${targetSNS}：${SNS_GUIDE[targetSNS]}

${focusedGuardian ? `## フィーチャーする守護存在（最重要）
${focusedGuardian.name}（${focusedGuardian.keywords.join('・')}）
3案すべてこの守護存在を主役として構成してください。

` : ''}## 必須要件
- CTAとして「無料診断はこちら → https://mamori-emaki.vercel.app」を末尾に自然な形で含める
- 世界観に合った神秘的・詩的な表現を使う
- 読者への語りかけを大切に
- 3案はそれぞれ異なるアプローチで書く

## 守護存在リスト（守護存在紹介系の場合はここから1体選ぶ）
${guardianList}

## 出力形式（必ずこのJSON形式のみで返す。説明文は不要）
{
  "posts": [
    { "id": 1, "text": "投稿文1", "hashtags": "#タグ1 #タグ2 #タグ3" },
    { "id": 2, "text": "投稿文2", "hashtags": "#タグ1 #タグ2 #タグ3" },
    { "id": 3, "text": "投稿文3", "hashtags": "#タグ1 #タグ2 #タグ3" }
  ],
  "suggestedGuardians": ["id1", "id2"]
}

suggestedGuardiansには投稿に視覚的に合う守護存在のIDを1〜3体選んでください。
使えるIDのみ: ${guardianIds}`

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const result = JSON.parse(jsonMatch[0])

    // 名前一致 → キーワード一致 → AIの提案 の優先順で守護存在を選定
    result.suggestedGuardians = computeSuggestedGuardians(
      theme,
      selectedGuardian ?? null,
      Array.isArray(result.suggestedGuardians) ? result.suggestedGuardians : []
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('[generate-post]', error)
    return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 })
  }
}
