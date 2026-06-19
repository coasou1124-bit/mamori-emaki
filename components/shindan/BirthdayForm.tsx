'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingOverlay from './LoadingOverlay'

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1920 + 1 },
  (_, i) => CURRENT_YEAR - i
)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)

export default function BirthdayForm() {
  const router = useRouter()
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const maxDay =
    year && month ? getDaysInMonth(parseInt(year), parseInt(month)) : 31
  const days = Array.from({ length: maxDay }, (_, i) => i + 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!year || !month || !day) {
      setError('生年月日をすべて選択してください。')
      return
    }

    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const params = new URLSearchParams({
      y: year,
      m: month,
      d: day,
      ...(name.trim() && { name: name.trim() }),
    })

    router.push(`/result?${params.toString()}`)
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <p className="text-kin text-xs tracking-[0.4em] mb-3 font-serif-jp">
            守護存在診断
          </p>
          <h1 className="text-2xl font-bold font-serif-jp text-washi">
            あなたの守護存在を知る
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-3">
            <label className="block text-washi/60 text-sm font-serif-jp">
              生年月日
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-kard border border-kin/20 text-washi px-2 py-3 text-sm font-serif-jp
                           focus:outline-none focus:border-kin/60 transition-colors"
              >
                <option value="">年</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}年
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value)
                  setDay('')
                }}
                className="bg-kard border border-kin/20 text-washi px-2 py-3 text-sm font-serif-jp
                           focus:outline-none focus:border-kin/60 transition-colors"
              >
                <option value="">月</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}月
                  </option>
                ))}
              </select>

              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="bg-kard border border-kin/20 text-washi px-2 py-3 text-sm font-serif-jp
                           focus:outline-none focus:border-kin/60 transition-colors"
              >
                <option value="">日</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}日
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-washi/60 text-sm font-serif-jp">
              お名前{' '}
              <span className="text-washi/30 text-xs">
                （任意・ニックネーム可）
              </span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：さくら"
              maxLength={20}
              className="w-full bg-kard border border-kin/20 text-washi px-4 py-3 text-sm font-serif-jp
                         placeholder:text-washi/20 focus:outline-none focus:border-kin/60 transition-colors"
            />
          </div>

          {error && <p className="text-shu text-sm font-serif-jp">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-kin text-fukai font-bold py-4 text-base font-serif-jp
                       hover:bg-kin-light transition-colors duration-300 disabled:opacity-50"
          >
            守護を呼び覚ます
          </button>

          <p className="text-center text-washi/30 text-xs font-serif-jp">
            ※ 入力した情報は保存されません
          </p>
        </form>
      </div>
    </>
  )
}
