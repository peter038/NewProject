
import React, { useState, useCallback } from 'react';
import { QUESTIONS, ATTITUDES, ASKERS, ASSETS } from './constants';
import { Attitude, Asker, AppState, GenerationResult } from './types';
import { generateReply } from './services/gemini';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'HOME',
    selectedQuestionId: QUESTIONS[0].id,
    selectedAttitude: 'HUMOROUS',
    selectedAsker: 'RELATIVES',
    result: null,
    loading: false,
  });

  const handleGenerate = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const questionLabel = QUESTIONS.find(q => q.id === state.selectedQuestionId)?.label || '';
      const result = await generateReply(questionLabel, state.selectedAttitude, state.selectedAsker);
      setState(prev => ({ ...prev, result, view: 'RESULT', loading: false }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.selectedQuestionId, state.selectedAttitude, state.selectedAsker]);

  const handleBack = () => {
    setState(prev => ({ ...prev, view: 'HOME' }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const handleWhatsAppShare = (text: string) => {
    const encodedText = encodeURIComponent(`【春节高情商护体】我刚刚生成了一个神回复：\n\n“${text}”\n\n快来看看你的：${window.location.href}`);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪贴板');
  };

  if (state.view === 'RESULT' && state.result) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-[480px] mx-auto shadow-2xl overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center p-4 sticky top-0 bg-background-light dark:bg-background-dark z-50 border-b border-gray-100 dark:border-gray-800">
          <button onClick={handleBack} className="size-12 flex items-center justify-center text-gray-800 dark:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold text-gray-800 dark:text-white">春节高情商护体回复</h2>
          <button className="size-12 flex items-center justify-center text-gray-800 dark:text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
        </header>

        <main className="flex-1 p-4 pb-10">
          {/* Result Card */}
          <div className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-festive-gold/20 shadow-xl mb-6 mt-4">
            <div className="absolute -top-3 left-6 bg-accent-red text-white text-xs px-3 py-1 rounded-full font-bold">推荐回复</div>
            <div 
              className="w-full aspect-[16/9] rounded-xl mb-6 bg-cover bg-center" 
              style={{ backgroundImage: `url(${ASSETS.RESULT_IMAGE})` }}
            />
            <div className="flex flex-col gap-4">
              <p className="text-gray-900 dark:text-white text-xl font-bold leading-relaxed italic">
                “{state.result.reply}”
              </p>
              <div className="flex items-start gap-3 p-4 bg-accent-red/5 dark:bg-accent-red/10 rounded-xl">
                <span className="material-symbols-outlined text-accent-red">lightbulb</span>
                <p className="text-[#9a4c4c] dark:text-accent-red/80 text-sm font-medium leading-relaxed">
                  建议：{state.result.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-10">
            <button 
              onClick={() => handleCopy(state.result?.reply || '')}
              className="flex items-center justify-center h-14 w-full bg-accent-red text-white rounded-2xl font-bold text-lg shadow-lg shadow-accent-red/20 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined mr-2">content_copy</span>
              复制回复
            </button>
            <button 
              onClick={handleGenerate}
              disabled={state.loading}
              className="flex items-center justify-center h-14 w-full bg-white dark:bg-zinc-800 border-2 border-accent-red text-accent-red rounded-2xl font-bold text-lg active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined mr-2">refresh</span>
              {state.loading ? '正在重新思考...' : '换一个'}
            </button>
          </div>

          {/* Share Section */}
          <div className="mb-10 text-center">
            <h4 className="text-[#9a4c4c] dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">分享给好友</h4>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => handleWhatsAppShare(state.result?.reply || '')}
                className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                   <span className="material-symbols-outlined text-green-600">chat</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp分享</span>
              </div>
              <div 
                onClick={handleCopyLink}
                className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="p-3 bg-accent-red/10 rounded-full">
                   <span className="material-symbols-outlined text-accent-red">link</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">复制链接</span>
              </div>
            </div>
          </div>

          {/* Footer Promo */}
          <div className="p-4 bg-gradient-to-r from-festive-gold/10 to-accent-red/10 rounded-2xl flex items-center gap-4 mb-6 border border-festive-gold/20">
            <div 
              className="size-14 rounded-full bg-cover bg-center shrink-0 border-2 border-white shadow-sm"
              style={{ backgroundImage: `url(${ASSETS.AVATAR_EXPLORE})` }}
            />
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white text-sm font-bold">探索东西方神话</p>
              <p className="text-[#9a4c4c] dark:text-gray-400 text-xs">发现更多新年趣事</p>
            </div>
            <button className="bg-accent-red text-white text-xs font-bold px-4 py-2 rounded-full">
              去看看
            </button>
          </div>

          <footer className="text-center text-[10px] text-gray-400 dark:text-gray-600 px-10 pb-10">
            免责声明：回复仅供参考。在与长辈交流时请注意语气，具体效果视亲戚关系亲密度而定。
          </footer>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-[480px] mx-auto shadow-2xl relative">
      {/* Top Navigation */}
      <div className="flex items-center p-4 sticky top-0 bg-background-light dark:bg-background-dark z-50">
        <div className="text-gray-800 dark:text-white flex size-12 items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <h2 className="flex-1 text-center text-lg font-bold text-gray-800 dark:text-white pr-12">春节高情商护体神器</h2>
      </div>

      {/* Hero */}
      <div className="px-4 py-2">
        <div className="flex min-h-[280px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-6 text-center shadow-lg relative overflow-hidden" 
             style={{ backgroundImage: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)' }}>
          <div className="absolute top-4 left-4 opacity-40"><span className="material-symbols-outlined text-festive-gold text-4xl">celebration</span></div>
          <div className="absolute bottom-4 right-4 opacity-40"><span className="material-symbols-outlined text-festive-gold text-4xl">redeem</span></div>
          
          <div className="relative z-10">
            <h1 className="text-white text-4xl font-black leading-tight drop-shadow-lg mb-4">
              过年不尴尬<br/>开口即绝杀
            </h1>
            <h2 className="text-white/90 text-sm font-medium bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
              优雅化解：对象、薪水、生娃、买房
            </h2>
          </div>

          <div className="flex items-center gap-2 text-festive-gold font-bold text-sm bg-white/10 px-5 py-2.5 rounded-xl border border-white/10">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>已累计为 12.5w 青年护体</span>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-4 space-y-6">
        {/* Question Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
              <span className="bg-primary/20 p-1.5 rounded-lg text-amber-600 material-symbols-outlined text-xl">psychology_alt</span>
              第一步：选择扎心问题
            </h3>
            <span className="text-xs text-gray-400">必选</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {QUESTIONS.map(q => (
              <button
                key={q.id}
                onClick={() => setState(prev => ({ ...prev, selectedQuestionId: q.id }))}
                className={`flex h-10 items-center justify-center gap-2 px-4 rounded-xl text-sm font-bold transition-all border ${
                  state.selectedQuestionId === q.id 
                    ? 'bg-primary text-gray-900 border-primary shadow-md shadow-primary/20' 
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-white border-gray-200 dark:border-white/10'
                }`}
              >
                {state.selectedQuestionId === q.id && <span className="material-symbols-outlined text-base">check_circle</span>}
                {q.label}
              </button>
            ))}
          </div>
        </section>

        {/* Attitude Section */}
        <section>
          <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2 mb-4">
            <span className="bg-primary/20 p-1.5 rounded-lg text-amber-600 material-symbols-outlined text-xl">mood</span>
            第二步：选择你的态度
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {ATTITUDES.map(a => (
              <button
                key={a.id}
                onClick={() => setState(prev => ({ ...prev, selectedAttitude: a.id }))}
                className={`flex flex-col items-center justify-center gap-2 h-20 rounded-2xl border-2 transition-all ${
                  state.selectedAttitude === a.id
                    ? 'bg-white dark:bg-white/10 border-primary shadow-md'
                    : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5 opacity-60'
                }`}
              >
                <span className={`material-symbols-outlined ${state.selectedAttitude === a.id ? 'text-primary' : 'text-gray-400'}`}>
                  {a.icon}
                </span>
                <span className={`text-xs font-bold ${state.selectedAttitude === a.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Asker Section */}
        <section>
          <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2 mb-4">
            <span className="bg-primary/20 p-1.5 rounded-lg text-amber-600 material-symbols-outlined text-xl">groups</span>
            第三步：提问者是谁？
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ASKERS.map(a => (
              <button
                key={a.id}
                onClick={() => setState(prev => ({ ...prev, selectedAsker: a.id }))}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                  state.selectedAsker === a.id
                    ? 'bg-white dark:bg-white/10 border-primary'
                    : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5'
                }`}
              >
                <div className={`size-10 rounded-full flex items-center justify-center ${a.color} ${state.selectedAsker === a.id ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-900' : ''}`}>
                  <span className="material-symbols-outlined text-xl">{a.icon}</span>
                </div>
                <span className={`text-sm font-bold ${state.selectedAsker === a.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Footer CTA */}
      <div className="p-4 pb-8 sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-gray-100 dark:border-white/5">
        <button 
          onClick={handleGenerate}
          disabled={state.loading}
          className="flex w-full items-center justify-center rounded-2xl h-16 bg-primary text-gray-900 text-lg font-black shadow-xl shadow-primary/40 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {state.loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin material-symbols-outlined">sync</span>
              正在注入高情商...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">magic_button</span>
              生成我的完美回复
            </div>
          )}
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-4 font-medium">护体神功加持中 · 祝您新年大吉</p>
      </div>
    </div>
  );
};

export default App;
