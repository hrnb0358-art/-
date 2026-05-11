export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'rules',
    title: '基本のルール',
    description: 'アウト・セーフ、得点のとりかたを学ぼう！',
    icon: 'BookOpen',
    color: 'bg-orange-400'
  },
  {
    id: 'equipment',
    title: '野球のどうぐ',
    description: 'グローブ、バット、ボール…ひみつを知ろう！',
    icon: 'Package',
    color: 'bg-sky-400'
  },
  {
    id: 'positions',
    title: 'ポジション',
    description: 'どこを守る？みんなの役わりを見てみよう！',
    icon: 'Users',
    color: 'bg-grass-green'
  },
  {
    id: 'technique',
    title: '上手くなるコツ',
    description: '打つ、投げる、走る！プロのわざをチェック！',
    icon: 'Zap',
    color: 'bg-baseball-red'
  }
];

export const POSITIONS = [
  { name: 'ピッチャー', id: 1, x: '50%', y: '65%' },
  { name: 'キャッチャー', id: 2, x: '50%', y: '90%' },
  { name: 'ファースト', id: 3, x: '80%', y: '60%' },
  { name: 'セカンド', id: 4, x: '70%', y: '40%' },
  { name: 'サード', id: 5, x: '20%', y: '60%' },
  { name: 'ショート', id: 6, x: '30%', y: '40%' },
  { name: 'レフト', id: 7, x: '15%', y: '15%' },
  { name: 'センター', id: 8, x: '50%', y: '10%' },
  { name: 'ライト', id: 9, x: '85%', y: '15%' },
];
