'use client'

import { useState } from 'react'
import Image from 'next/image'

const POST_TYPES = ['共感系', '診断誘導系', '守護存在紹介系', '開運メッセージ系'] as const
const SNS_OPTIONS = ['Threads', 'X', 'Pinterest'] as const

const GUARDIANS_LIST = [
  { id: 'ryujin',        name: '龍神' },
  { id: 'houou',         name: '鳳凰' },
  { id: 'kirin',         name: '麒麟' },
  { id: 'inarikitsune',  name: '稲荷狐' },
  { id: 'yatagarasu',    name: '八咫烏' },
  { id: 'shirohebi',     name: '白蛇' },
  { id: 'kyubi',         name: '九尾' },
  { id: 'nekomata',      name: '猫又' },
  { id: 'tengu',         name: '天狗' },
  { id: 'yukionna',      name: '雪女' },
  { id: 'zashikiwarashi',name: '座敷童子' },
  { id: 'mamoriOni',     name: '護り鬼' },
] as const

const IMAGE_FILE_MAP: Record<string, string> = {
  inarikitsune: 'inari',
  zashikiwarashi: 'zashiki',
  mamoriOni: 'mamorioni',
}

const GUARDIAN_NAMES: Record<string, string> = {
  ryujin: '龍神',
  houou: '鳳凰',
  kirin: '麒麟',
  inarikitsune: '稲荷狐',
  yatagarasu: '八咫烏',
  shirohebi: '白蛇',
  kyubi: '九尾の狐',
  nekomata: '猫又',
  tengu: '天狗',
  yukionna: '雪女',
  zashikiwarashi: '座敷童子',
  mamoriOni: '護り鬼',
}

interface Post {
  id: number
  text: string
  hashtags: string
}

interface GenerateResult {
  posts: Post[]
  suggestedGuardians: string[]
}

export default function SNSDashboard() {
  const [theme, setTheme] = useState('')
  const [selectedGuardian, setSelectedGuardian] = useState<string>('')
  const [postType, setPostType] = useState<string>('共感系')
  const [targetSNS, setTargetSNS] = useState<string>('Threads')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!theme.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, selectedGuardian, postType, targetSNS }),
      })
      if (!res.ok) throw new Error('生成に失敗しました')
      const data: GenerateResult = await res.json()
      setResult(data)
    } catch {
      setError('投稿文の生成に失敗しました。再度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-fukai text-washi">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-kin text-xs tracking-[0.4em] font-serif-jp opacity-70">管理ダッシュボード</p>
          <h1 className="text-2xl font-bold font-serif-jp">SNS投稿 生成</h1>
          <div className="h-px w-16 bg-kin/30 mx-auto mt-3" />
        </div>

        {/* Form */}
        <div className="bg-kard border border-kin/10 p-6 space-y-6">

          {/* Theme Input */}
          <div className="space-y-2">
            <label className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">
              今日のテーマ
            </label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例：自分の可能性に気づいていない人へ、龍神の力を伝えたい"
              rows={3}
              className="w-full bg-fukai border border-kin/20 text-washi/80 text-sm font-serif-jp p-3 resize-none focus:outline-none focus:border-kin/50 placeholder:text-washi/20 leading-relaxed"
            />
          </div>

          {/* Guardian Select */}
          <div className="space-y-2">
            <label className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">
              守護存在を指定
            </label>
            <div className="relative">
              <select
                value={selectedGuardian}
                onChange={(e) => setSelectedGuardian(e.target.value)}
                className="w-full bg-fukai border border-kin/20 text-sm font-serif-jp p-3 pr-8 focus:outline-none focus:border-kin/50 cursor-pointer appearance-none"
                style={{ color: selectedGuardian ? 'rgb(var(--color-washi) / 0.8)' : 'rgb(var(--color-washi) / 0.25)' }}
              >
                <option value="" style={{ color: 'rgb(var(--color-washi) / 0.4)' }}>
                  指定なし（テーマに合わせてAIが選定）
                </option>
                {GUARDIANS_LIST.map(({ id, name }) => (
                  <option key={id} value={id} style={{ color: 'rgb(var(--color-washi))' }}>
                    {name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-kin/40 text-xs">▼</span>
            </div>
          </div>

          {/* Post Type */}
          <div className="space-y-3">
            <p className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">投稿タイプ</p>
            <div className="grid grid-cols-2 gap-2">
              {POST_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setPostType(type)}
                  className={`py-2.5 px-3 text-xs font-serif-jp border transition-all ${
                    postType === type
                      ? 'border-kin/60 text-kin bg-kin/10'
                      : 'border-washi/10 text-washi/40 hover:border-washi/25 hover:text-washi/60'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* SNS */}
          <div className="space-y-3">
            <p className="text-washi/40 text-xs tracking-[0.3em] font-serif-jp">投稿先SNS</p>
            <div className="flex gap-2">
              {SNS_OPTIONS.map((sns) => (
                <button
                  key={sns}
                  onClick={() => setTargetSNS(sns)}
                  className={`flex-1 py-2.5 text-xs font-serif-jp border transition-all ${
                    targetSNS === sns
                      ? 'border-kin/60 text-kin bg-kin/10'
                      : 'border-washi/10 text-washi/40 hover:border-washi/25 hover:text-washi/60'
                  }`}
                >
                  {sns}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!theme.trim() || loading}
            className="w-full py-3.5 bg-kin text-fukai font-bold text-sm font-serif-jp tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-kin/90 transition-colors"
          >
            {loading ? '生成中...' : 'AIで3案生成する'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400/70 text-sm font-serif-jp text-center">{error}</p>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <p className="text-kin/40 text-xs tracking-[0.3em] font-serif-jp animate-pulse">
              守護の言葉を紡いでいます...
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-washi/25 text-xs tracking-[0.3em] font-serif-jp text-center">
              生成された投稿案
            </p>

            {result.posts.map((post) => (
              <div key={post.id} className="bg-kard border border-kin/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-kin/50 text-xs font-serif-jp tracking-widest">案 {post.id}</span>
                  <span className="text-washi/20 text-xs font-serif-jp">{targetSNS}</span>
                </div>

                {/* Post Text */}
                <p className="text-washi/80 text-sm font-serif-jp leading-loose whitespace-pre-wrap border-l border-kin/10 pl-4">
                  {post.text}
                </p>

                {/* Hashtags */}
                <p className="text-kin/40 text-xs font-serif-jp leading-relaxed">{post.hashtags}</p>

                {/* Copy Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => copyToClipboard(post.text, `text-${post.id}`)}
                    className="text-xs font-serif-jp border border-washi/10 text-washi/35 hover:border-washi/30 hover:text-washi/65 px-3 py-1.5 transition-all"
                  >
                    {copiedId === `text-${post.id}` ? '✓ コピー済み' : '本文をコピー'}
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${post.text}\n\n${post.hashtags}`, `all-${post.id}`)}
                    className="text-xs font-serif-jp border border-kin/20 text-kin/45 hover:border-kin/45 hover:text-kin/75 px-3 py-1.5 transition-all"
                  >
                    {copiedId === `all-${post.id}` ? '✓ コピー済み' : '本文＋タグをコピー'}
                  </button>
                </div>
              </div>
            ))}

            {/* Guardian Image Suggestions */}
            {result.suggestedGuardians?.length > 0 && (
              <div className="space-y-4">
                <p className="text-washi/25 text-xs tracking-[0.3em] font-serif-jp text-center">
                  投稿に合う守護存在画像
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {result.suggestedGuardians.map((id) => {
                    const fileName = IMAGE_FILE_MAP[id] ?? id
                    const name = GUARDIAN_NAMES[id] ?? id
                    return (
                      <div key={id} className="space-y-2">
                        <div className="relative aspect-[3/4] overflow-hidden border border-kin/15">
                          <Image
                            src={`/images/guardians/${fileName}.jpg`}
                            alt={name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-washi/35 text-xs font-serif-jp text-center tracking-wider">
                          {name}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Regenerate */}
            <div className="text-center pt-2">
              <button
                onClick={handleGenerate}
                className="text-washi/30 text-xs font-serif-jp hover:text-washi/60 transition-colors border border-washi/10 hover:border-washi/25 px-5 py-2"
              >
                再生成する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
