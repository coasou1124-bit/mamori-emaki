import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '鑑定書サンプル | 護り絵巻',
  description: 'PDF鑑定書のサンプルプレビューです。',
  robots: { index: false, follow: false },
}

// ── サンプルデータ ─────────────────────────────────────────
const S = {
  userName: '山田 花子',
  birthdate: '1990年11月15日',
  issuedDate: '2026年6月',
  main: {
    name: '龍神',
    reading: 'りゅうじん',
    tier: '神獣',
    color: '#d4a843',
    title: '天地を統べる龍の王',
    attrs: ['水', '天', '変容'],
    personality:
      '龍神に守護されたあなたは、広大な視野と底知れぬ適応力を持つ魂の持ち主です。変化を恐れず、むしろ変化の中心に立ち続けることで本来の力を発揮します。他者が見落とす流れを察知し、時代の転換点において自然とリーダーシップを発揮するでしょう。物事の本質を直感的に掴む力と、それを言語化する能力を兼ね備えており、複雑な状況においても冷静に全体像を把握できます。',
    talent:
      'あなたの才能は「変容を可能にする力」です。固定概念に縛られず、状況に応じて最適な形を見出す柔軟性は、創造・経営・芸術・教育など、あらゆる分野で輝きます。特に「新しいものと古いものをつなぐ」役割において、龍神のエネルギーは最大限に発揮されます。直感的に本質を掴み、それを分かりやすく伝える能力も際立っています。',
    mission:
      '固定された形に縛られず、流動する現実の中で最適な姿に変容し続けること。あなたの存在そのものが、周囲に「変化は可能だ」という証明になります。',
    message:
      '水は高きから低きへ流れ、どんな形の器にも従う。しかしその力は岩をも穿つ。あなたもまた、柔らかく、しかし確かに、時代を切り拓く力を持っている。今、あなたが感じている「変わりたい」という衝動は、私があなたに送る合図だ。変わることを恐れるな。変わり続けることが、あなたの本来の姿だ。',
  },
  sub: {
    name: '白蛇',
    reading: 'しろへび',
    tier: '神使',
    color: '#7ab8c5',
    title: '弁財天の使い・縁と財を結ぶ者',
    attrs: ['水', '縁', '財'],
    birthMonth: '十一月',
    description:
      '十一月に生まれたあなたには、白蛇の神使としての守護が宿っています。白蛇は弁財天の御使いであり、縁・財・芸術の守護者です。あなたの日常の流れの中に、白蛇は静かに縁を運び込んでいます。白蛇に守護された人は、表には出さないが深い感受性と審美眼を持ち、良質な縁を引き寄せる不思議な力があります。',
    mission:
      '縁を大切に紡ぎ、流れに逆らわず乗ることで、自然と豊かさが満ちてくる。静けさの中に宿る力を信じること。焦らず、しかし確かに歩みを続けること。',
    message:
      '縁は、あなたが気づく前から始まっている。あなたの周りに集まる人たちは、偶然ではない。私が長い時間をかけて、あなたのもとへ運んできた縁の糸だ。その縁を、どうか大切にしてほしい。静かな水面は、最もよく空を映す。あなたもまた、静けさの中で最も美しい縁を引き寄せる。',
  },
  combo: {
    title: '水龍と白蛇の二重守護',
    subtitle: '変容と縁を司る水の守護者たち',
    description:
      '龍神と白蛇、どちらも「水」のエネルギーを宿す守護存在の組み合わせは、144通りの中でも特に縁の深い構成です。龍は天地を動かし大きな流れを作り、白蛇はその流れの中に人と縁と財を引き寄せます。あなたの人生は、この二つの水のエネルギーによって、静かに、しかし力強く動かされています。',
    advice:
      '「流れに乗る」ことが最大の開運キーワードです。無理に動こうとするより、自然な流れを感じ取り、その方向に進むことで両守護のエネルギーが最大化されます。水が最も低いところを選んで流れるように、あなたも「抵抗の少ない方向」を選ぶことで、大きな力が発動します。',
  },
}

// ── 共通パーツ ─────────────────────────────────────────────
const gradientGold = 'linear-gradient(90deg,transparent 0%,#c9a047 25%,#c9a047 75%,transparent 100%)'

function GoldLine() {
  return <div className="h-[2px] w-full" style={{ background: gradientGold }} />
}

function CornerDeco({ size = 'w-10 h-10', weight = 'border-t-2 border-l-2', color = 'border-kin/35' }) {
  return (
    <>
      <div className={`absolute top-5 left-5 ${size} ${weight} ${color} pointer-events-none`} />
      <div className={`absolute top-5 right-5 ${size} ${weight.replace('border-l-2', 'border-r-2')} ${color} pointer-events-none`} />
      <div className={`absolute bottom-5 left-5 ${size} ${weight.replace('border-t-2', 'border-b-2')} ${color} pointer-events-none`} />
      <div className={`absolute bottom-5 right-5 ${size} ${weight.replace('border-t-2 border-l-2', 'border-b-2 border-r-2')} ${color} pointer-events-none`} />
    </>
  )
}

function Page({ num, chapter, children }: { num: number; chapter: string; children: React.ReactNode }) {
  return (
    <div id={`page-${num}`} className="w-full bg-fukai border border-kin/15 shadow-2xl shadow-black/70 overflow-hidden">
      <GoldLine />
      <div className="flex items-center justify-between px-10 py-4 border-b border-kin/10">
        <p className="text-kin/45 text-[11px] tracking-[0.5em] font-serif-jp">護り絵巻 公式鑑定書</p>
        <p className="text-washi/25 text-[10px] font-serif-jp tracking-wider">{chapter}</p>
        <p className="text-washi/20 text-[10px] font-serif-jp">{num} / 13</p>
      </div>
      <div className="px-12 py-10 min-h-[860px]">{children}</div>
      <div className="px-10 py-4 border-t border-kin/10 flex items-center justify-center gap-4">
        <div className="h-px w-20" style={{ background: 'linear-gradient(90deg,transparent,#c9a04745)' }} />
        <span className="text-kin/25 text-xs">✦</span>
        <div className="h-px w-20" style={{ background: 'linear-gradient(270deg,transparent,#c9a04745)' }} />
      </div>
      <GoldLine />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="text-washi/80 text-2xl font-bold font-serif-jp">{children}</h2>
      <div className="h-px" style={{ background: 'linear-gradient(90deg,#c9a04755,transparent)' }} />
    </div>
  )
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-washi/60 text-sm font-serif-jp leading-[2.3] ${className}`}>{children}</p>
  )
}

function Dot({ color }: { color: string }) {
  return <span className="shrink-0 mt-[5px]" style={{ color, fontSize: '10px' }}>・</span>
}

function TierBadge({ tier, color }: { tier: string; color: string }) {
  return (
    <span
      className="inline-block text-[11px] tracking-[0.4em] px-5 py-1.5 border font-serif-jp"
      style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
    >
      {tier}
    </span>
  )
}

// ── ページコンポーネント ────────────────────────────────────
export default function ReportPreviewPage() {
  return (
    <div className="min-h-screen bg-[#080b10] py-10 px-4">

      {/* ── ナビ ── */}
      <div className="max-w-[794px] mx-auto mb-7 flex items-center justify-between">
        <Link href="/paid" className="text-washi/30 text-xs font-serif-jp hover:text-washi/60 transition-colors">
          ← 商品ページへ戻る
        </Link>
        <p className="text-kin/35 text-[10px] tracking-[0.5em] font-serif-jp">サンプルプレビュー</p>
        <Link
          href="/paid"
          className="text-kin/55 text-xs font-serif-jp border border-kin/30 px-4 py-1.5 hover:border-kin/55 transition-colors"
        >
          購入する →
        </Link>
      </div>

      <div className="max-w-[794px] mx-auto space-y-8">

        {/* ══════════════ p.1 表紙 ══════════════ */}
        <div
          id="page-cover"
          className="w-full bg-fukai border border-kin/20 shadow-2xl shadow-black/80 overflow-hidden relative"
          style={{ minHeight: '960px' }}
        >
          <GoldLine />
          <CornerDeco />
          {/* 縦装飾ライン */}
          <div className="absolute top-20 bottom-20 left-14 w-px" style={{ background: 'linear-gradient(180deg,transparent,#c9a04722 30%,#c9a04722 70%,transparent)' }} />
          <div className="absolute top-20 bottom-20 right-14 w-px" style={{ background: 'linear-gradient(180deg,transparent,#c9a04722 30%,#c9a04722 70%,transparent)' }} />

          <div className="flex flex-col items-center justify-between px-20 py-16" style={{ minHeight: '960px' }}>
            {/* 上部ロゴ */}
            <div className="text-center space-y-2">
              <p className="text-kin/55 text-xs tracking-[0.6em] font-serif-jp">護り絵巻</p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-14 bg-kin/20" />
                <p className="text-washi/20 text-[10px] tracking-[0.4em] font-serif-jp">守護存在 公式鑑定書</p>
                <div className="h-px w-14 bg-kin/20" />
              </div>
            </div>

            {/* メイン */}
            <div className="text-center space-y-7">
              <div className="space-y-2">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.35em]">{S.main.reading}</p>
                <h1 className="shimmer-text font-bold font-serif-jp leading-none" style={{ fontSize: '100px' }}>
                  {S.main.name}
                </h1>
                <p className="text-sm font-serif-jp tracking-widest" style={{ color: S.main.color }}>
                  ── {S.main.title} ──
                </p>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-20 bg-kin/20" />
                <TierBadge tier={S.main.tier} color={S.main.color} />
                <div className="h-px w-20 bg-kin/20" />
              </div>
              <div className="space-y-1">
                <p className="text-washi/65 text-xl font-bold font-serif-jp">{S.userName}</p>
                <p className="text-washi/30 text-sm font-serif-jp">{S.birthdate}</p>
              </div>
            </div>

            {/* 下部 */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-kin/15" />
                <p className="text-washi/20 text-[10px] tracking-[0.3em] font-serif-jp">
                  副守護存在　{S.sub.name}（{S.sub.tier}）
                </p>
                <div className="h-px w-10 bg-kin/15" />
              </div>
              <p className="text-washi/15 text-[10px] font-serif-jp tracking-wider">{S.issuedDate} 発行</p>
            </div>
          </div>
          <GoldLine />
        </div>

        {/* ══════════════ p.2 はじめに ══════════════ */}
        <Page num={2} chapter="はじめに">
          <SectionTitle>はじめに</SectionTitle>
          <div className="space-y-6">
            <Body>
              この鑑定書は、あなたの生年月日から算出した「ライフパスナンバー」と「誕生月」をもとに、日本の霊的守護体系12体の中からあなたを守護する2体の存在を特定し、その意味と使命を詳しく解説したものです。
            </Body>
            <Body>
              主守護存在はあなたの生涯を通じて寄り添う守護であり、あなたの性格・才能・宿命の根幹を形作ります。副守護存在は誕生月に宿るエネルギーで、日常の流れ・縁・恋愛・財の傾向に深く影響を与えます。
            </Body>
            <div className="border-l-2 border-kin/30 pl-6 py-3 my-4">
              <Body className="text-washi/45">
                この書は呪術でも占いでもありません。日本古来の霊的守護体系に基づいた「あなたの本質の読み解き」です。書かれていることは、すでにあなたの中にある資質であり、可能性です。
              </Body>
            </div>
            <Body>
              各章をゆっくりと読み進め、自分自身の中にある守護の力を感じ取ってください。この書があなたの日常に、確かさと守られている感覚をもたらすことを願っています。
            </Body>
            <div className="pt-10 text-center space-y-1">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-kin/15" />
                <span className="text-kin/25 text-xs">✦</span>
                <div className="h-px w-12 bg-kin/15" />
              </div>
              <p className="text-washi/20 text-xs font-serif-jp tracking-widest pt-2">護り絵巻 鑑定師</p>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.3 主守護存在 ══════════════ */}
        <Page num={3} chapter="主守護存在">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-washi/25 text-xs tracking-[0.5em] font-serif-jp">主 守 護 存 在</p>
              <TierBadge tier={S.main.tier} color={S.main.color} />
              <div className="space-y-1">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.3em]">{S.main.reading}</p>
                <h2 className="shimmer-text font-bold font-serif-jp leading-none" style={{ fontSize: '80px' }}>
                  {S.main.name}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20" style={{ background: `${S.main.color}40` }} />
                <p className="text-sm font-serif-jp" style={{ color: S.main.color }}>{S.main.title}</p>
                <div className="h-px w-20" style={{ background: `${S.main.color}40` }} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {S.main.attrs.map((a) => (
                  <span key={a} className="text-washi/40 text-xs font-serif-jp border border-washi/10 px-4 py-1">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-kin/10 pt-7 space-y-5">
              <div>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${S.main.color}80` }}>守護の姿</p>
                <Body>{S.main.personality}</Body>
              </div>
              <div className="bg-kard/60 border p-6" style={{ borderColor: `${S.main.color}18` }}>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${S.main.color}70` }}>魂の使命</p>
                <Body className="text-washi/65">{S.main.mission}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.4 副守護存在 ══════════════ */}
        <Page num={4} chapter="副守護存在">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-washi/25 text-xs tracking-[0.5em] font-serif-jp">副 守 護 存 在</p>
              <p className="text-washi/20 text-xs font-serif-jp">{S.sub.birthMonth}生まれに宿る守護</p>
              <TierBadge tier={S.sub.tier} color={S.sub.color} />
              <div className="space-y-1">
                <p className="text-washi/25 text-sm font-serif-jp tracking-[0.3em]">{S.sub.reading}</p>
                <h2 className="text-washi/85 font-bold font-serif-jp leading-none" style={{ fontSize: '80px' }}>
                  {S.sub.name}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20" style={{ background: `${S.sub.color}40` }} />
                <p className="text-sm font-serif-jp" style={{ color: S.sub.color }}>{S.sub.title}</p>
                <div className="h-px w-20" style={{ background: `${S.sub.color}40` }} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {S.sub.attrs.map((a) => (
                  <span key={a} className="text-washi/40 text-xs font-serif-jp border border-washi/10 px-4 py-1">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-kin/10 pt-7 space-y-5">
              <div>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${S.sub.color}80` }}>守護の姿</p>
                <Body>{S.sub.description}</Body>
              </div>
              <div className="bg-kard/60 border p-6" style={{ borderColor: `${S.sub.color}18` }}>
                <p className="text-xs tracking-widest font-serif-jp mb-3" style={{ color: `${S.sub.color}70` }}>副守護の使命</p>
                <Body className="text-washi/65">{S.sub.mission}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.5 組み合わせ ══════════════ */}
        <Page num={5} chapter="二守護の組み合わせ">
          <SectionTitle>二守護の組み合わせ</SectionTitle>
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-kin/45 text-xs tracking-[0.4em] font-serif-jp">144通りの中のあなたの守護構成</p>
              <h3 className="text-washi/85 text-2xl font-bold font-serif-jp">{S.combo.title}</h3>
              <p className="text-washi/35 text-sm font-serif-jp">{S.combo.subtitle}</p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center space-y-2">
                <span className="text-[10px] tracking-widest px-3 py-1 border font-serif-jp" style={{ color: S.main.color, borderColor: `${S.main.color}40` }}>
                  主守護
                </span>
                <p className="text-washi/75 text-2xl font-bold font-serif-jp">{S.main.name}</p>
              </div>
              <p className="text-kin/30 text-3xl font-bold">×</p>
              <div className="text-center space-y-2">
                <span className="text-[10px] tracking-widest px-3 py-1 border font-serif-jp" style={{ color: S.sub.color, borderColor: `${S.sub.color}40` }}>
                  副守護
                </span>
                <p className="text-washi/75 text-2xl font-bold font-serif-jp">{S.sub.name}</p>
              </div>
            </div>
            <div className="border border-kin/20 bg-kin/5 p-7">
              <Body>{S.combo.description}</Body>
            </div>
            <div className="space-y-3">
              <p className="text-kin/40 text-xs tracking-widest font-serif-jp">この組み合わせの開運の鍵</p>
              <Body>{S.combo.advice}</Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.6 性格と才能 ══════════════ */}
        <Page num={6} chapter="性格と才能">
          <SectionTitle>性格と才能</SectionTitle>
          <div className="space-y-7">
            <div>
              <p className="text-kin/40 text-xs tracking-widest font-serif-jp mb-4">本質の性格</p>
              <Body>{S.main.personality}</Body>
            </div>
            <div className="border-t border-kin/10 pt-6">
              <p className="text-kin/40 text-xs tracking-widest font-serif-jp mb-4">開花する才能</p>
              <Body>{S.main.talent}</Body>
            </div>
            <div className="bg-kard/50 border border-kin/10 p-6 space-y-3">
              <p className="text-washi/25 text-xs tracking-widest font-serif-jp">白蛇の副守護が加わることで</p>
              <Body className="text-washi/55">
                龍神の変容する力に、白蛇の縁を引き寄せる力が加わることで、あなたの才能はさらに人とのつながりの中で輝きます。一人で考えるよりも、誰かとの対話の中で最良のアイデアが生まれる傾向があります。良質な縁を大切にすることが、あなたの才能を最大限に活かす鍵です。
              </Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.7 恋愛傾向 ══════════════ */}
        <Page num={7} chapter="恋愛傾向">
          <SectionTitle>恋愛傾向</SectionTitle>
          <div className="space-y-7">
            <Body>
              龍神に守護されたあなたの恋愛は「変化と深さ」がキーワードです。表面的なつながりよりも、魂の深いところで共鳴できる相手を無意識に求めています。恋愛においても変化を恐れないため、新しい段階への移行は得意ですが、逆に現状維持を強く求めるパートナーとは長期的な摩擦が生じる場合があります。
            </Body>
            <Body>
              白蛇の副守護が加わることで、縁の引き寄せ力が高まります。気づけば自然と出会いが増える時期と、まったく縁が来ない時期のメリハリがはっきりしているのも特徴です。縁が来ている時期は積極的に、来ていない時期は内省の時間として過ごすのが白蛇守護のリズムに合います。
            </Body>
            <div className="border-t border-kin/10 pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-kin/40 text-xs tracking-widest font-serif-jp">相性の良い守護存在</p>
                <ul className="space-y-2">
                  {['鳳凰（変化を共に楽しめる）', '麒麟（深い知性で共鳴）', '稲荷狐（縁の流れが合う）'].map((t) => (
                    <li key={t} className="text-washi/55 text-xs font-serif-jp flex gap-2 items-start">
                      <Dot color={S.main.color} />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-washi/30 text-xs tracking-widest font-serif-jp">注意が必要な傾向</p>
                <ul className="space-y-2">
                  {['自由を制限されることへの抵抗', '変化が多いため安定を誤解される', '深すぎる関係への恐れ'].map((t) => (
                    <li key={t} className="text-washi/40 text-xs font-serif-jp flex gap-2 items-start">
                      <Dot color="#ffffff33" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.8 仕事運 ══════════════ */}
        <Page num={8} chapter="仕事運">
          <SectionTitle>仕事運</SectionTitle>
          <div className="space-y-7">
            <Body>
              龍神の守護を受けたあなたの仕事運は「変化の時代に強い」という特徴があります。安定した組織の中で守備範囲を守るよりも、新しいプロジェクトの立ち上げや、未開拓の領域に挑戦するときにエネルギーが最大化します。
            </Body>
            <div className="border-l-2 pl-5 py-2 space-y-2" style={{ borderColor: `${S.main.color}50` }}>
              <p className="text-xs tracking-widest font-serif-jp" style={{ color: `${S.main.color}80` }}>最も輝く仕事環境</p>
              <Body className="text-washi/55">
                変化が多く、正解のない問いに向き合える仕事。クリエイティブ・コンサルティング・教育・起業・研究など、「流れを作る」側に立てる役割があなたに合っています。
              </Body>
            </div>
            <Body>
              白蛇の副守護が仕事面でもたらすのは「縁による発展」です。人脈や紹介を通じて仕事が広がることが多く、良質な縁を丁寧に育てることが長期的な成功につながります。特に女性の上司や先輩との縁を大切にすると、白蛇のエネルギーが活性化します。
            </Body>
            <div className="bg-kard/50 border border-kin/10 p-6">
              <p className="text-kin/40 text-xs tracking-widest font-serif-jp mb-3">2026年の仕事のポイント</p>
              <Body className="text-washi/60">
                2026年前半は新しいつながりを育てる時期。後半に向けてそのつながりが具体的な成果として形になってくるでしょう。焦らず、しかし縁の機会は逃さないことが大切です。
              </Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.9 金運 ══════════════ */}
        <Page num={9} chapter="金運">
          <SectionTitle>金運</SectionTitle>
          <div className="space-y-7">
            <Body>
              龍神の守護と白蛇の守護が重なるこの組み合わせは、金運において特に「縁を通じた豊かさ」が強調されます。ひとりで稼ぐことよりも、誰かとの協力・パートナーシップ・紹介を通じた収入の流れが自然に広がる傾向があります。
            </Body>
            <Body>
              白蛇は弁財天の使いであり、財・縁・芸術の守護者です。この守護が宿るあなたは金銭に対する直感が鋭く、「今はこの流れに乗るべき」という感覚が金運のシグナルになることがあります。その直感を信頼することが、白蛇守護を活かす鍵です。
            </Body>
            <div className="border-t border-kin/10 pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-kin/40 text-xs tracking-widest font-serif-jp">金運を高める行動</p>
                <ul className="space-y-2">
                  {['水辺・弁財天を祀る神社への参拝', '白・金・青緑のカラーを身につける', '財布を定期的に整理する', '大切な人への感謝を行動で示す'].map((t) => (
                    <li key={t} className="text-washi/55 text-xs font-serif-jp flex gap-2 items-start">
                      <Dot color={S.main.color} />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-washi/30 text-xs tracking-widest font-serif-jp">避けると良いこと</p>
                <ul className="space-y-2">
                  {['焦りからの衝動的な出費', '縁のない話への安易な乗り込み', '流れに逆らう強引な投資'].map((t) => (
                    <li key={t} className="text-washi/40 text-xs font-serif-jp flex gap-2 items-start">
                      <Dot color="#ffffff30" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.10 開運アドバイス ══════════════ */}
        <Page num={10} chapter="開運アドバイス">
          <SectionTitle>開運アドバイス</SectionTitle>
          <div className="space-y-8">
            <Body>
              龍神と白蛇の二重守護を持つあなたへの最大の開運アドバイスは「流れに乗ること」です。水のエネルギーを持つ2体の守護存在は、あなたが自然な流れを選ぶとき、最もよく働きます。
            </Body>
            <div className="space-y-5">
              {[
                { title: '場の選択',  body: '水が関係する場所（川・海・湖・弁天池）を定期的に訪れると守護エネルギーが補充されます。近くの弁財天を祀る神社を見つけておくと、節目節目に参拝できます。' },
                { title: '色の活用',  body: '龍神の金・白、白蛇の青緑・白を日常に取り入れましょう。アクセサリー・財布・手帳の色を意識するだけで、守護の感応が高まります。' },
                { title: '時間の感覚', body: '直感が来たら48時間以内に動くことを習慣にしてください。龍神のエネルギーは「タイミング」を重視します。後回しにすると流れが変わってしまうことがあります。' },
                { title: '縁を育てる', body: '白蛇守護は縁の積み重ねで強化されます。大切な人への連絡・感謝・贈り物などの小さな行動が、長期的な金運と対人運を底上げします。' },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-5 items-start">
                  <p className="text-kin/50 text-xs font-serif-jp tracking-widest shrink-0 w-16 text-right mt-1">{title}</p>
                  <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                  <Body className="flex-1">{body}</Body>
                </div>
              ))}
            </div>
          </div>
        </Page>

        {/* ══════════════ p.11 2026年の運勢 ══════════════ */}
        <Page num={11} chapter="2026年の運勢">
          <SectionTitle>2026年の運勢</SectionTitle>
          <div className="space-y-7">
            <div className="border border-kin/20 bg-kin/5 p-6 space-y-2">
              <p className="text-kin/60 text-xs tracking-widest font-serif-jp">2026年 総括</p>
              <Body className="text-washi/65">
                2026年はあなたにとって「縁の年」です。龍神のエネルギーが外向きに大きく広がり、白蛇が縁の糸を次々と紡いでいく年。自分から動くよりも、呼ばれる場所・紹介される人・偶然の再会を大切にしてください。
              </Body>
            </div>
            <div className="space-y-4">
              {[
                { period: '1〜3月',  note: '内省と準備の時期。焦らず、来る波に備える。龍神が内に力を蓄えています。' },
                { period: '4〜6月',  note: '縁が動き始める。出会いと紹介を大切に。新しいプロジェクトの芽が出る。' },
                { period: '7〜9月',  note: '最大の活動期。龍神のエネルギーがピーク。大きな決断・行動に適した時期。' },
                { period: '10〜12月', note: '結実と感謝の時期。今年育てた縁が形になる。白蛇の守護が財と縁を引き寄せる。' },
              ].map(({ period, note }) => (
                <div key={period} className="flex gap-5 items-start">
                  <p className="text-kin/50 text-xs font-serif-jp shrink-0 w-16 text-right mt-1">{period}</p>
                  <div className="w-px bg-kin/15 shrink-0 self-stretch" />
                  <Body className="text-washi/55 flex-1">{note}</Body>
                </div>
              ))}
            </div>
            <div className="border-t border-kin/10 pt-5">
              <Body className="text-washi/40">
                2026年の守護のメッセージは「焦るな、しかし止まるな」。ゆっくりと確かに、あなたの人生は今、大きな転換点へと向かっています。
              </Body>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.12 守護存在からの手紙 ══════════════ */}
        <Page num={12} chapter="守護存在からの手紙">
          <SectionTitle>守護存在からの手紙</SectionTitle>
          <div className="space-y-10">
            {/* 主守護 */}
            <div className="space-y-5">
              <span
                className="inline-block text-[10px] tracking-widest px-3 py-1 border font-serif-jp"
                style={{ color: S.main.color, borderColor: `${S.main.color}45` }}
              >
                主守護 · 龍神より
              </span>
              <div className="border-l-2 pl-6 py-2 space-y-4" style={{ borderColor: `${S.main.color}45` }}>
                <Body className="text-washi/70">{S.main.message}</Body>
              </div>
            </div>
            {/* 副守護 */}
            <div className="space-y-5 border-t border-kin/10 pt-7">
              <span
                className="inline-block text-[10px] tracking-widest px-3 py-1 border font-serif-jp"
                style={{ color: S.sub.color, borderColor: `${S.sub.color}45` }}
              >
                副守護 · 白蛇より
              </span>
              <div className="border-l-2 pl-6 py-2 space-y-4" style={{ borderColor: `${S.sub.color}45` }}>
                <Body className="text-washi/65">{S.sub.message}</Body>
              </div>
            </div>
          </div>
        </Page>

        {/* ══════════════ p.13 お守りページ ══════════════ */}
        <div
          id="page-13"
          className="w-full bg-fukai border border-kin/20 shadow-2xl shadow-black/70 overflow-hidden relative"
          style={{ minHeight: '900px' }}
        >
          <GoldLine />
          <CornerDeco />
          <div
            className="flex flex-col items-center justify-center text-center space-y-10 px-16 py-16"
            style={{ minHeight: '900px' }}
          >
            <p className="text-washi/20 text-[10px] tracking-[0.5em] font-serif-jp">お 守 り ペ ー ジ</p>

            <div className="space-y-3">
              <p className="text-washi/20 text-xs tracking-widest font-serif-jp">{S.main.reading}</p>
              <p className="shimmer-text font-bold font-serif-jp leading-none" style={{ fontSize: '110px' }}>
                {S.main.name}
              </p>
              <p className="font-serif-jp tracking-widest text-sm" style={{ color: S.main.color }}>
                {S.main.title}
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="h-px w-20 bg-kin/20" />
              <div className="text-center space-y-1">
                <p className="text-washi/25 text-xs font-serif-jp tracking-widest">× 副守護</p>
                <p className="text-washi/60 text-xl font-bold font-serif-jp">{S.sub.name}</p>
              </div>
              <div className="h-px w-20 bg-kin/20" />
            </div>

            <div className="border border-kin/20 px-10 py-7 max-w-sm space-y-4">
              <p className="text-kin/45 text-xs tracking-widest font-serif-jp">守護の言葉</p>
              <Body className="text-washi/50">
                変わることを恐れるな。<br />
                縁を大切にせよ。<br />
                あなたは守られている。
              </Body>
            </div>

            <div className="space-y-1">
              <p className="text-washi/15 text-[10px] font-serif-jp">{S.userName} 様</p>
              <p className="text-washi/10 text-[10px] font-serif-jp">{S.issuedDate} 発行</p>
            </div>
          </div>
          <GoldLine />
        </div>

        {/* ── 購入CTA ── */}
        <div className="text-center space-y-5 py-10">
          <p className="text-washi/30 text-sm font-serif-jp">
            これは <span className="text-washi/55">山田 花子</span> さんのサンプル鑑定書です
          </p>
          <p className="text-washi/20 text-xs font-serif-jp leading-relaxed">
            あなたの守護存在に合わせた鑑定書は、下記よりお求めいただけます
          </p>
          <Link
            href="/paid"
            className="inline-block border border-kin/60 bg-kin/8 hover:bg-kin/15 text-kin text-sm font-serif-jp tracking-[0.35em] px-12 py-4 transition-colors duration-200"
          >
            PDF鑑定書を購入する →
          </Link>
        </div>

      </div>
    </div>
  )
}
