import type { Guardian } from '@/types/guardian'

export const GUARDIANS: Record<string, Guardian> = {
  ryujin: {
    id: 'ryujin',
    name: '龍神',
    nameReading: 'りゅうじん',
    title: '深淵の主宰者',
    tier: '神獣',
    attributes: ['水', '天', '豊穣'],
    mission:
      'あらゆる「流れ」を生み出し、生命の根源となる水の力で万物に豊かさをもたらすこと。',
    talents: [
      '場の流れを読む力',
      '豊かさを引き寄せる引力',
      '決定的な瞬間に力が集まる',
    ],
    lifeThemes: [
      { label: '金運・豊かさ', rank: '◎' },
      { label: '大きな転機', rank: '◎' },
      { label: '仕事・事業', rank: '○' },
    ],
    message: `あなたの中に、深淵の水が流れている。
それは力だ。
ただし、水は流れなければ澱む。
止まることを、恐れてはいけない。`,
    personality:
      '水のように柔軟でいながら、奥深くに揺るぎない意志を持つ性格です。流れに逆らわず、ただそこにいるだけで場を清め、引き上げる力があります。感情の波が激しいこともありますが、それもまた龍神の証。あなたの中の深淵を、恐れないでください。',
    symbolMotif: '渦を描く水流と龍の爪を重ねた円紋',
    accentColor: '#1a3a5c',
  },

  houou: {
    id: 'houou',
    name: '鳳凰',
    nameReading: 'ほうおう',
    title: '炎翼の不死者',
    tier: '神獣',
    attributes: ['火', '天', '再生'],
    mission:
      '滅びと再生を繰り返しながら、高貴なる美しさの本質を世界に示し続けること。',
    talents: [
      '逆境から甦る再生力',
      '美的センスと表現の才能',
      '存在だけで場の空気を変える華',
    ],
    lifeThemes: [
      { label: '創作・芸術', rank: '◎' },
      { label: '復活・再起', rank: '◎' },
      { label: '恋愛', rank: '○' },
    ],
    message: `あなたは何度でも甦る。
灰になることを恐れるな。
炎は、燃え尽きた後にこそ
最も美しく昇る。`,
    personality:
      '何度でも甦るしなやかな強さと、人を魅了する華やかさを持っています。感受性が高く、美しいものに深く共鳴する魂の持ち主。傷つくことを知っているからこそ、他者の痛みに寄り添える温かさがあります。灰になった経験が、あなたをより輝かせる糧となっています。',
    symbolMotif: '舞い立つ炎の翼を環にした紋',
    accentColor: '#8b1a1a',
  },

  kirin: {
    id: 'kirin',
    name: '麒麟',
    nameReading: 'きりん',
    title: '仁義の霊瑞',
    tier: '神獣',
    attributes: ['土', '木', '祥瑞'],
    mission:
      '誠実なる者の前にのみ現れ、真実の価値を見極める目と稀少な才能を授けること。',
    talents: [
      '人の本質を見抜く眼',
      '誠実さが引き寄せる本物の縁',
      '時間をかけて実る稀少な才能',
    ],
    lifeThemes: [
      { label: '人間関係', rank: '◎' },
      { label: '才能開花', rank: '◎' },
      { label: '誠実さが報われる局面', rank: '○' },
    ],
    message: `あなたの誠実さは、嘘をつかない。
焦る必要はない。
本物の縁は、あなたを必ず見つける。`,
    personality:
      '誠実で純粋な心を持ち、嘘や偽りにとても敏感です。人の本質を静かに見抜く洞察力があり、「この人は信頼できる」という直感が鋭い。急かされることを好まず、自分のペースで丁寧に物事を積み上げる、稀少な性格の持ち主です。',
    symbolMotif: '一角と若葉を重ねた菱紋',
    accentColor: '#2d5a27',
  },

  inarikitsune: {
    id: 'inarikitsune',
    name: '稲荷狐',
    nameReading: 'いなりぎつね',
    title: '千縁の白使',
    tier: '神使',
    attributes: ['金', '縁', '知恵'],
    mission:
      '縁という見えない糸を紡ぎ、人と人・人と機会を最良のタイミングで繋ぐこと。',
    talents: [
      '縁を結ぶ本能',
      '直感が冴える商才',
      'チャンスの匂いを嗅ぎ分ける力',
    ],
    lifeThemes: [
      { label: '人間関係・縁', rank: '◎' },
      { label: '仕事・商売', rank: '◎' },
      { label: '恋愛', rank: '○' },
    ],
    message: `あなたの周りに糸が張られている。
見えない縁の糸が。
引っ張ってみなさい。
必ず、向こう側に誰かがいる。`,
    personality:
      '社交的でありながら、どこか謎めいた雰囲気をまとっています。人と人を繋ぐことに喜びを感じ、場の空気を読む嗅覚が鋭い。表向きは軽やかに見えますが、内側には緻密な直感と強い目的意識が宿っています。縁を大切にするあなたの周りには、自然と良い人が集まります。',
    symbolMotif: '結び紐と狐の尾を重ねた紋',
    accentColor: '#c0392b',
  },

  yatagarasu: {
    id: 'yatagarasu',
    name: '八咫烏',
    nameReading: 'やたがらす',
    title: '太陽の道標',
    tier: '神使',
    attributes: ['火', '光', '決断'],
    mission:
      '迷える者の前に現れ、その者だけの正しい道を照らし、勝利へと導き切ること。',
    talents: [
      '迷いを断つ決断力',
      '土壇場で増す勝負強さ',
      '道を切り開く推進力',
    ],
    lifeThemes: [
      { label: '仕事・目標達成', rank: '◎' },
      { label: '決断・方向性', rank: '◎' },
      { label: '勝負・競争', rank: '○' },
    ],
    message: `道は一つではない。
だが、あなたにとっての正道は一つだ。
迷う時間は終わった。
光の方へ、進め。`,
    personality:
      '決断が速く、迷いを断ち切る力があります。目標が定まると周囲を鼓舞しながら前進する、生まれながらのリーダー気質。時に直感だけで大きな選択をすることがありますが、その判断はたいてい正しい。光の方向へ向かう本能が、あなたの羅針盤になっています。',
    symbolMotif: '太陽を背負う三本足の烏紋',
    accentColor: '#1a1a2e',
  },

  shirohebi: {
    id: 'shirohebi',
    name: '白蛇',
    nameReading: 'しろへび',
    title: '幽玄の蓄財者',
    tier: '神使',
    attributes: ['水', '金', '変容'],
    mission:
      '目に見えない富と力の流れを感知し、静かに・確実に、その者の元へ引き寄せること。',
    talents: [
      '財を静かに蓄える忍耐力',
      '変容する力・脱皮して生まれ変わる',
      '見えない力を感知する感覚',
    ],
    lifeThemes: [
      { label: '金運・蓄財', rank: '◎' },
      { label: '変容・脱皮', rank: '◎' },
      { label: '才能の深化', rank: '○' },
    ],
    message: `急がなくていい。
蛇は一夜で脱皮しない。
だが、必ず脱皮する。
あなたの変容は、もう始まっている。`,
    personality:
      '静かで落ち着いた佇まいの中に、深い観察眼を持っています。感情をすぐには表に出さず、じっくりと状況を見極めてから動く慎重さが強み。蓄えることと、適切なタイミングで脱皮することの両方を知っている、成熟した魂の持ち主です。静かな場所でこそ、あなたの本質は輝きます。',
    symbolMotif: '円く巻いた鱗と抜け殻を重ねた紋',
    accentColor: '#2a5a4a',
  },

  kyubi: {
    id: 'kyubi',
    name: '九尾の狐',
    nameReading: 'きゅうびのきつね',
    title: '千年の変幻者',
    tier: '妖異',
    attributes: ['金', '火', '変化'],
    mission:
      '変化こそ真理であることを体現し、その者の潜在能力の限界を、限界の先へと越えさせること。',
    talents: [
      'どんな環境も生き抜く適応力',
      '知性と霊的直感の高次融合',
      '人を惹きつける神秘的な引力',
    ],
    lifeThemes: [
      { label: '変革・才能覚醒', rank: '◎' },
      { label: '恋愛・魅力', rank: '○' },
      { label: '影響力・発信', rank: '○' },
    ],
    message: `あなたは何にでもなれる。
それは呪いではない。
最大の才能だ。
ただ一つ問う──
あなたは今、何になりたいか。`,
    personality:
      '変化を恐れず、むしろ変化の中にこそ輝く神秘的な存在感があります。知性と霊的な感覚が融合しており、表面だけでは読み取れない深みがある。人を惹きつける不思議な魅力がありながら、自分の本質を簡単には見せない。時を重ねるほど美しくなる、千年の知恵を宿す魂の持ち主です。',
    symbolMotif: '九つに枝分かれた尾を扇に広げた紋',
    accentColor: '#4a1a6a',
  },

  nekomata: {
    id: 'nekomata',
    name: '猫又',
    nameReading: 'ねこまた',
    title: '夜闇の秘守者',
    tier: '妖異',
    attributes: ['陰', '夜', '秘密'],
    mission:
      '秘密と夜の守護者として、人が日中に見せられない深い本質を守り、育て続けること。',
    talents: [
      '人が気づかない変化を感じ取る観察力',
      '信じた者への深い忠誠心',
      '夜と静寂の中で開く創造力',
    ],
    lifeThemes: [
      { label: '創作・表現', rank: '◎' },
      { label: '独立・自力', rank: '◎' },
      { label: '秘めた才能', rank: '○' },
    ],
    message: `静かな夜だけが知っている。
あなたの本当の力を。
誰に見せなくていい。
ただ、自分だけはわかっていろ。`,
    personality:
      '表と裏、光と影の両面を静かに生きています。人には見せない内側の世界が豊かで、創造力と観察力が特に秀でています。信頼した相手には深い忠誠心を示しますが、心を開くまでには時間がかかる。夜の静けさの中で、あなたの本当の力はひっそりと開いています。',
    symbolMotif: '二つに割れた尾と満月を重ねた紋',
    accentColor: '#2a1a3c',
  },

  tengu: {
    id: 'tengu',
    name: '天狗',
    nameReading: 'てんぐ',
    title: '峻嶺の試練者',
    tier: '妖異',
    attributes: ['木', '風', '修練'],
    mission:
      '険しい試練を与えることで、その者の中に眠る真の実力を、容赦なく、完全に目覚めさせること。',
    talents: [
      '一つのことを深く極める集中力',
      '困難を乗り越える精神的な強靭さ',
      '本質を見極める厳しい目',
    ],
    lifeThemes: [
      { label: '技術習得・道を極める', rank: '◎' },
      { label: '精神鍛錬', rank: '◎' },
      { label: '実力での突破', rank: '○' },
    ],
    message: `山は優しくない。
だから登れた者だけが、頂から見える景色を知る。
お前はまだ、本当の力を出していない。
試練は始まりに過ぎない。`,
    personality:
      '妥協を嫌い、本物を追い求める強い意志があります。一見気難しく映ることもありますが、その厳しさは自分にも向けられており、向上心の裏返しです。高い基準を持ちながらも、深いところに熱い情がある。試練を経てこそ輝く、山を登り続ける魂の持ち主です。',
    symbolMotif: '羽団扇と山嶺を組んだ紋',
    accentColor: '#1a3a1a',
  },

  yukionna: {
    id: 'yukionna',
    name: '雪女',
    nameReading: 'ゆきおんな',
    title: '凍月の静観者',
    tier: '守護霊',
    attributes: ['水', '陰', '冬'],
    mission:
      '感情の嵐の中でも揺るぎない内なる静けさを守護し、その深い感性を誰かを救う力へと昇華させること。',
    talents: [
      '感情を制御する冷静な強さ',
      '言葉より気配で真実を読む洞察力',
      '洗練された美意識と深い感性',
    ],
    lifeThemes: [
      { label: '直感・内省', rank: '◎' },
      { label: '感性・美', rank: '◎' },
      { label: '創作', rank: '○' },
    ],
    message: `雪は降り積もる。
静かに、音もなく、しかし確実に。
あなたの感性もそうだ。
溶けることを恐れるな。
春はそのために来る。`,
    personality:
      '深い感性と静かな洞察力を持ち、他者の感情を自分のことのように感じ取ります。感情の海を漂いながらも、内側に凛とした軸があり、乱されることなく中心に戻る力があります。言葉少なくとも存在だけで場を整える、月のような佇まいの持ち主です。',
    symbolMotif: '六花の結晶と月影を重ねた紋',
    accentColor: '#1a3050',
  },

  zashikiwarashi: {
    id: 'zashikiwarashi',
    name: '座敷童子',
    nameReading: 'ざしきわらし',
    title: '縁側の福招き',
    tier: '守護霊',
    attributes: ['土', '木', '縁起'],
    mission:
      '人が忘れがちな「純粋な喜び」を守護し、その場に幸運と笑顔の種を静かに蒔き続けること。',
    talents: [
      'いる場所の空気を明るくする生来の力',
      '幸運を引き寄せる不思議な引力',
      '人の心の壁を取り払う純粋さ',
    ],
    lifeThemes: [
      { label: '幸運・縁起', rank: '◎' },
      { label: '家庭・場の守護', rank: '◎' },
      { label: '癒し・人間関係', rank: '○' },
    ],
    message: `笑顔を忘れたか。
大丈夫。
わたしがそばにいる限り、
幸運の芽は必ず顔を出す。
ただ、心の扉を開けておいて。`,
    personality:
      '純粋な喜びを忘れないこころと、場の気を明るくする不思議な力があります。人の笑顔を見ることに幸せを感じ、自分がいるだけで周囲の運気が上がると言われることも。いつまでも子供のような感性を持ちながら、深いところでは場と人を守護する強い意志があります。',
    symbolMotif: '手毬と松葉を組んだ丸紋',
    accentColor: '#3d2a10',
  },

  mamoriOni: {
    id: 'mamoriOni',
    name: '護り鬼',
    nameReading: 'まもりおに',
    title: '慈剛の守護鬼',
    tier: '守護霊',
    attributes: ['火', '土', '守護'],
    mission:
      '愛する者の前に身をもって立ち、どんな邪をも跳ね除けることで、守護すべき命を全うさせること。',
    talents: [
      '誰かを守るとき最大化する力',
      '正義感と慈悲が共存する強さ',
      '困難な局面での精神的な安定感',
    ],
    lifeThemes: [
      { label: '守護・守る力', rank: '◎' },
      { label: '正義・信念', rank: '◎' },
      { label: '人間関係の絆', rank: '○' },
    ],
    message: `強いということは、傷つかないことではない。
傷ついても、立つことだ。
あなたが守りたいものは何か。
それが決まれば、お前は無敵だ。`,
    personality:
      '守りたいものの前では、誰よりも強くなれる性格です。優しさと激しさが共存しており、愛情の深さが行動の原動力になっています。理不尽なことに対して黙っていられない正義感の持ち主ですが、その根底にあるのはいつも、誰かへの慈しみです。傷ついても立ち上がる力が、あなたの本質です。',
    symbolMotif: '鬼の角と盾を組んだ紋',
    accentColor: '#5a1a1a',
  },
}

// ライフパスナンバー → 守護存在IDのマッピング
const LIFE_PATH_MAP: Record<number, string> = {
  1: 'ryujin',
  2: 'houou',
  3: 'kirin',
  4: 'inarikitsune',
  5: 'yatagarasu',
  6: 'shirohebi',
  7: 'kyubi',
  8: 'nekomata',
  9: 'tengu',
  11: 'yukionna',
  22: 'zashikiwarashi',
  33: 'mamoriOni',
}

export function getGuardianByLifePath(lifePathNumber: number): Guardian | null {
  const id = LIFE_PATH_MAP[lifePathNumber]
  if (!id) return null
  return GUARDIANS[id] ?? null
}

// 誕生月 → 副守護存在IDのマッピング
const BIRTH_MONTH_MAP: Record<number, string> = {
  1:  'mamoriOni',       // 護り鬼
  2:  'yukionna',        // 雪女
  3:  'zashikiwarashi',  // 座敷童子
  4:  'kirin',           // 麒麟
  5:  'ryujin',          // 龍神
  6:  'houou',           // 鳳凰
  7:  'kyubi',           // 九尾の狐
  8:  'nekomata',        // 猫又
  9:  'inarikitsune',    // 稲荷狐
  10: 'yatagarasu',      // 八咫烏
  11: 'shirohebi',       // 白蛇
  12: 'tengu',           // 天狗
}

export function getSubGuardianByMonth(month: number): Guardian | null {
  const id = BIRTH_MONTH_MAP[month]
  if (!id) return null
  return GUARDIANS[id] ?? null
}

export const ALL_GUARDIANS = Object.values(GUARDIANS)
