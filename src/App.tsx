/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Package, 
  Users, 
  Zap, 
  ChevronRight, 
  Send, 
  Home as HomeIcon,
  HelpCircle,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { LESSONS, POSITIONS, Lesson } from './constants';
import { askCoach } from './services/coachService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'lesson' | 'coach' | 'quiz'>('home');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const navigateTo = (page: 'home' | 'lesson' | 'coach' | 'quiz', lesson?: Lesson) => {
    setCurrentPage(page);
    if (lesson) setCurrentLesson(lesson);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF0]">
      {/* Header */}
      <header className="bg-white border-b-4 border-primary-dark sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 font-black text-2xl tracking-tighter italic uppercase underline decoration-4 decoration-grass-green"
          >
            <div className="w-10 h-10 bg-baseball-red border-2 border-primary-dark rounded-full flex items-center justify-center text-white">
              <Zap size={22} fill="currentColor" />
            </div>
            <span>WAKUWAKU ACADEMY</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-8 text-sm font-black uppercase tracking-widest">
            <button onClick={() => navigateTo('home')} className="hover:text-baseball-red transition-colors border-b-2 border-transparent hover:border-baseball-red">
              Home
            </button>
            <button onClick={() => navigateTo('coach')} className="hover:text-baseball-red transition-colors border-b-2 border-transparent hover:border-baseball-red">
              Ask Coach
            </button>
            <button onClick={() => navigateTo('quiz')} className="hover:text-baseball-red transition-colors border-b-2 border-transparent hover:border-baseball-red font-black">
              Quiz
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <Home key="home" navigateTo={navigateTo} />}
          {currentPage === 'lesson' && currentLesson && (
            <div className="px-6 py-12">
              <LessonContent key={currentLesson.id} lesson={currentLesson} onBack={() => navigateTo('home')} />
            </div>
          )}
          {currentPage === 'coach' && (
            <div className="px-6 py-12">
              <Coach key="coach" />
            </div>
          )}
          {currentPage === 'quiz' && (
            <div className="px-6 py-12">
              <Quiz key="quiz" onBack={() => navigateTo('home')} />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="h-20 bg-primary-dark text-white flex items-center px-10 gap-10">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">Player Status</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">ランク: ルーキー</span>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-grass-green w-1/3"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center font-bold italic text-sm hidden md:block">
          「毎日10回素振りをするだけで、1ヶ月後には別人のスイングになるよ！」
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="font-black text-xs uppercase">Today's Live Lesson at 17:00</span>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="bg-primary-dark text-white p-2 flex items-center justify-around bold-border shadow-[4px_4px_0px_0px_rgba(255,77,0,1)]">
          <button onClick={() => navigateTo('home')} className={`p-3 ${currentPage === 'home' ? 'text-baseball-red' : ''}`}>
            <HomeIcon size={24} strokeWidth={3} />
          </button>
          <button onClick={() => navigateTo('coach')} className={`p-3 ${currentPage === 'coach' ? 'text-baseball-red' : ''}`}>
            <HelpCircle size={24} strokeWidth={3} />
          </button>
          <button onClick={() => navigateTo('quiz')} className={`p-3 ${currentPage === 'quiz' ? 'text-baseball-red' : ''}`}>
            <Trophy size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ navigateTo }: { navigateTo: (page: 'home' | 'lesson' | 'coach' | 'quiz', lesson?: Lesson) => void }) {
  // BOLD THEME
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] border-b-4 border-primary-dark"
    >
      {/* Left Hero Area */}
      <section className="md:w-[60%] p-8 md:p-16 flex flex-col justify-center bold-border-r bg-white">
        <div className="mb-6">
          <span className="bg-grass-green text-white px-4 py-1 text-xs font-black uppercase tracking-[0.2em]">
            Elementary School Program
          </span>
        </div>
        <h1 className="text-[60px] sm:text-[80px] md:text-[100px] bold-heading leading-[0.85] mb-8">
          打つ！<br/>
          投げる！<br/>
          <span className="text-baseball-red">勝つ！</span>
        </h1>
        <p className="text-xl font-black leading-relaxed max-w-md opacity-80 mb-10">
          野球の基本を楽しくマスターしよう。<br/>
          プロ選手もやっている「秘密の練習法」をわかりやすく教えるよ！
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigateTo('quiz')}
            className="bg-primary-dark text-white px-8 py-4 font-black text-xl hover:bg-baseball-red transition-all border-4 border-primary-dark active:translate-y-1 baseball-shadow"
          >
            練習をはじめる
          </button>
          <button 
            onClick={() => navigateTo('coach')}
            className="bg-white text-primary-dark px-8 py-4 font-black text-xl border-4 border-primary-dark hover:bg-slate-50 transition-all active:translate-y-1 baseball-shadow"
          >
            コーチにきく
          </button>
        </div>
      </section>

      {/* Right Lesson Grid */}
      <section className="md:w-[40%] flex flex-col bg-slate-100">
        {LESSONS.slice(0, 3).map((lesson, idx) => (
          <button
            key={lesson.id}
            onClick={() => navigateTo('lesson', lesson)}
            className={`flex-1 p-8 border-b-4 border-primary-dark flex flex-col justify-between text-left group transition-all relative overflow-hidden ${
              idx === 0 ? 'bg-[#FFD700]' : idx === 1 ? 'bg-grass-green text-white' : 'bg-white'
            }`}
          >
            <div className="relative z-10">
              <div className={`text-6xl font-black italic leading-none mb-2 ${idx === 2 ? 'opacity-10' : 'opacity-30'}`}>
                0{idx + 1}
              </div>
              <h2 className="text-3xl font-black tracking-tight uppercase italic">{lesson.title}</h2>
              <p className={`font-bold mt-2 opacity-80 ${idx === 2 ? 'text-primary-dark opacity-70' : ''}`}>
                {lesson.description}
              </p>
            </div>
            <div className="flex justify-end relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary-dark transition-transform group-hover:translate-x-2 ${
                idx === 1 ? 'bg-white text-primary-dark' : 'bg-primary-dark text-white'
              }`}>
                <ChevronRight size={24} strokeWidth={3} />
              </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
          </button>
        ))}
        <button 
           onClick={() => navigateTo('lesson', LESSONS[3])}
           className="p-8 bg-baseball-red text-white flex items-center justify-between group h-full"
        >
          <span className="font-black text-xl uppercase italic tracking-tight">{LESSONS[3].title}</span>
          <div className="w-10 h-10 bg-white text-primary-dark rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <Zap size={20} fill="currentColor" />
          </div>
        </button>
      </section>
    </motion.div>
  );
}

function LessonContent({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-10"
    >
      <button onClick={onBack} className="flex items-center gap-2 font-black uppercase italic tracking-widest text-[#FF4D00] hover:underline decoration-4">
        <ArrowLeft size={24} strokeWidth={3} /> Back Home
      </button>

      <div className="flex items-center gap-6">
        <div className={`w-20 h-20 bold-border flex items-center justify-center text-white ${lesson.color} shadow-lg`}>
          {lesson.icon === 'BookOpen' && <BookOpen size={40} />}
          {lesson.icon === 'Package' && <Package size={40} />}
          {lesson.icon === 'Users' && <Users size={40} />}
          {lesson.icon === 'Zap' && <Zap size={40} />}
        </div>
        <h1 className="text-4xl md:text-6xl bold-heading">{lesson.title}</h1>
      </div>

      <div className="bg-white bold-border p-8 md:p-12 baseball-shadow">
        {lesson.id === 'rules' && <RulesLesson />}
        {lesson.id === 'equipment' && <EquipmentLesson />}
        {lesson.id === 'positions' && <PositionsLesson />}
        {lesson.id === 'technique' && <TechniqueLesson />}
      </div>
    </motion.div>
  );
}

function RulesLesson() {
  return (
    <div className="space-y-6 prose prose-slate max-w-none">
      <div className="bg-orange-50 p-6 rounded-2xl">
        <h3 className="text-orange-900 border-none m-0">1. アウトとセーフ</h3>
        <p className="m-0 mt-2">バッターが打ったボールを、相手が地面につく前に捕ったらアウト！1塁に走りきる前にボールを持った相手に踏まれてもアウトだよ。3枚アウトになると、攻めと守りが交代するよ。</p>
      </div>
      <div className="bg-orange-50 p-6 rounded-2xl">
        <h3 className="text-orange-900 border-none m-0">2. 得点のとりかた</h3>
        <p className="m-0 mt-2">1塁、2塁、3塁を通って、ホームベースに戻ってきたら「1点」！バッターが打った瞬間にスタンドにボールが入ったら「ホームラン」で、自動的に得点になるんだ。</p>
      </div>
      <div className="bg-orange-50 p-6 rounded-2xl">
        <h3 className="text-orange-900 border-none m-0">3. ストライクとボール</h3>
        <p className="m-0 mt-2">バッターの打ちやすい場所にきたボールを見逃したり、空振りしたら「ストライク」。ストライクが3つで「三振（アウト）」になるよ。</p>
      </div>
    </div>
  );
}

function EquipmentLesson() {
  const items = [
    { name: 'バット', desc: 'ボールを打つための棒。自分に合った重さを見つけよう！', img: 'https://images.unsplash.com/photo-1544049116-563f683407bb?q=80&w=300&fit=crop' },
    { name: 'グローブ', desc: 'ボールを捕るための道具。牛の革で作られていることが多いよ。', img: 'https://images.unsplash.com/photo-1510276634530-9b4f74d010e9?q=80&w=300&fit=crop' },
    { name: 'ボール', desc: '野球専用のボール。縫い目（ぬいめ）があるのが特徴！', img: 'https://images.unsplash.com/photo-1516731415730-0c641725a37c?q=80&w=300&fit=crop' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.name} className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-inner bg-slate-100">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-slate-600 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function PositionsLesson() {
  const [selected, setSelected] = useState<number | null>(null);
  
  return (
    <div className="space-y-6">
      <p className="text-slate-600">フィールドをクリックして、ポジションを確認してみてね！</p>
      <div className="relative aspect-square max-w-md mx-auto bg-grass-green rounded-3xl overflow-hidden border-8 border-clay-brown shadow-xl">
        {/* Simple Field Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[70%] h-[70%] border-4 border-white rotate-45 transform"></div>
        </div>
        
        {POSITIONS.map(pos => (
          <button
            key={pos.id}
            onClick={() => setSelected(pos.id)}
            style={{ left: pos.x, top: pos.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold transition-all ${
              selected === pos.id ? 'bg-baseball-red text-white scale-125 z-10' : 'bg-white text-slate-900 hover:scale-110'
            }`}
          >
            {pos.id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div 
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border-2 border-grass-green p-4 rounded-2xl"
          >
            <h3 className="font-bold text-lg text-grass-green m-0">
              {POSITIONS.find(p => p.id === selected)?.name}
            </h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
              {selected === 1 && "試合の主役！バッターを抑えるために、いろんな球を投げ分けるよ。"}
              {selected === 2 && "ピッチャーの相棒。みんなの守備の指示も出す、グラウンドの監督的な役割！"}
              {selected === 3 && "守備で一番たくさんボールを受け取るポジション。背の高い人が多いよ。"}
              {selected === 4 && "2塁の近くを守る。動きが速くて、ダブルプレイの中心になるよ。"}
              {selected === 5 && "『ホットコーナー』と呼ばれるくらい、強烈な打球が飛んでくる激アツな場所！"}
              {selected === 6 && "守備の要（かなめ）。守備範囲が広くて、一番カッコいいポジションと言われることも！"}
              {selected === 7 && "レフトへの大きな打球を追いかける。正確に送球する肩の強さが必要。"}
              {selected === 8 && "外野のリーダー。とにかく足が速くて、広い範囲をカバーするよ。"}
              {selected === 9 && "強烈な打球からライトゴロまで、状況に合わせた判断が求められるよ。"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TechniqueLesson() {
  return (
    <div className="space-y-8">
      <div className="flex gap-6 items-start">
        <div className="w-24 h-24 bg-baseball-red rounded-2xl flex items-center justify-center shrink-0">
          <Zap size={48} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-xl mb-4">打つときのポイント</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li><strong>しっかりボールを見る:</strong> ピッチャーの手から離れる瞬間を逃さないで！</li>
            <li><strong>リラックスして構える:</strong> 肩の力を抜いて、リズミカルに待とう。</li>
            <li><strong>最短距離でバットを出す:</strong> 脇を締めて、ボールをぶっ壊すイメージで振ろう！</li>
          </ul>
        </div>
      </div>
      <div className="h-px bg-slate-200" />
      <div className="flex gap-6 items-start">
        <div className="w-24 h-24 bg-sky-400 rounded-2xl flex items-center justify-center shrink-0">
          <Package size={48} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-xl mb-4">投げるときのポイント</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li><strong>相手の胸を狙う:</strong> ボールを届ける相手の胸に向かって真っ直ぐ投げよう。</li>
            <li><strong>全身を使おう:</strong> 腕だけじゃなく、足の踏み込みと腰の回転が大事だよ。</li>
            <li><strong>最後まで指先で押し出す:</strong> 最後のスナップで、ボールに回転（スピン）をかけよう。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Coach() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'こんにちは！野球のことなら何でも聞いてね。バッティングのこと、ルールのこと、どんな質問でもOKだよ！⚾️' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const botMsg = await askCoach(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botMsg || 'ごめん、ちょっと考えすぎてわからなくなっちゃった。' }]);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white bold-border overflow-hidden min-h-[60vh] flex flex-col baseball-shadow"
    >
      <div className="bg-primary-dark p-6 text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-primary-dark">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=coach&backgroundColor=c0aede" alt="AI Coach" className="w-full h-full" />
        </div>
        <div>
          <h3 className="font-black text-xl italic uppercase m-0 leading-none tracking-tight">AI Coach</h3>
          <span className="text-xs font-bold text-grass-green flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-grass-green rounded-full animate-pulse" /> ONLINE
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px] bg-[#FDFCF0]">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-6 py-3 font-bold shadow-sm border-2 border-primary-dark ${
              m.role === 'user' ? 'bg-baseball-red text-white' : 'bg-white text-primary-dark'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-primary-dark px-4 py-2 font-black flex gap-1 italic">
              THINKING...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 bg-white border-t-4 border-primary-dark flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="質問を入力してね..."
          className="flex-1 bg-white border-4 border-primary-dark px-6 py-3 font-bold focus:outline-none focus:bg-slate-50 transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-primary-dark text-white w-14 h-14 flex items-center justify-center hover:bg-baseball-red transition-all border-4 border-primary-dark active:translate-y-1"
        >
          <Send size={24} />
        </button>
      </div>
    </motion.div>
  );
}

function Quiz({ onBack }: { onBack: () => void }) {
  const quizzes = [
    { q: 'ストライクがいくつか重なると、バッターはアウトになる？', a: ['2つ', '3つ', '4つ'], c: 1 },
    { q: 'ボールを打たずにホームまで戻ってきたら点数が入る？', a: ['入る', '入らない', 'どちらでもない'], c: 0 },
    { q: 'ショート（遊撃手）のポジション番号は何番？', a: ['4番', '5番', '6番'], c: 2 },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    if (idx === quizzes[current].c) setScore(s => s + 1);
    
    setTimeout(() => {
      if (current + 1 < quizzes.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center bg-white p-12 bold-border baseball-shadow">
        <Trophy size={100} className="mx-auto text-[#FFD700] mb-6 stroke-[3]" />
        <h2 className="text-5xl bold-heading mb-4">Complete!</h2>
        <p className="text-3xl font-black text-baseball-red mb-8 italic uppercase tracking-tighter">Your Score: {score} / {quizzes.length}</p>
        <button 
          onClick={onBack}
          className="bg-primary-dark text-white px-10 py-5 font-black text-2xl border-4 border-primary-dark shadow-[6px_6px_0px_0px_rgba(255,77,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all uppercase italic"
        >
          Back Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10 max-w-2xl mx-auto py-12">
      <div className="flex justify-between items-center bg-primary-dark text-white px-8 py-4 bold-border">
        <span className="font-black italic uppercase tracking-widest text-sm">Question {current + 1} / {quizzes.length}</span>
        <span className="text-baseball-red font-black italic tracking-tighter text-xl underline decoration-2">Score: {score}</span>
      </div>
      
      <div className="bg-white p-10 bold-border baseball-shadow min-h-[400px] flex flex-col justify-center">
        <h3 className="text-4xl font-black mb-12 text-center uppercase leading-tight italic tracking-tight">{quizzes[current].q}</h3>
        <div className="grid grid-cols-1 gap-4">
          {quizzes[current].a.map((ans, i) => (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => handleAnswer(i)}
              className={`w-full p-6 text-2xl bold-border font-black italic uppercase transition-all tracking-tighter ${
                selected === i 
                  ? i === quizzes[current].c ? 'bg-grass-green text-white scale-105' : 'bg-baseball-red text-white'
                  : 'bg-white hover:bg-slate-50 hover:translate-x-2'
              }`}
            >
              {ans}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

