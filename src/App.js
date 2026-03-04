import { supabase } from "./lib/supabase";
import { useState, useEffect } from "react";
async function saveJournal() {
  const content = prompt("Write your journal:");

  if (!content) return;

  const { data, error } = await supabase.from("journal_entries").insert([
    {
      user_id: "demo-user",
      content: content,
      mood: "calm"
    }
  ]);

  if (error) {
    alert("Error saving journal");
    console.log(error);
  } else {
    alert("Journal saved!");
  }
}
<button onClick={saveJournal}>
Write Journal
</button>

// =================== 中国传统绿色色系 ===================
// 从图片中提取的色值
const C = {
  // 深底色系
  guanLv:    "#2A6E3F", // 官绿 — 最深，作为深背景
  kongQue:   "#007D62", // 孔雀绿 — 强调色
  pinLv:     "#1C8D6C", // 品绿
  
  // 中调绿
  songLv:    "#3D6036", // 松绿
  zhuLv:     "#357974", // 竹绿（带青）
  sanLv:     "#53976F", // 三绿
  siLv:      "#6BB392", // 四绿
  tingWu:    "#68945C", // 庭芜绿
  
  // 中浅绿
  biShan:    "#779649", // 碧山
  caoLv:     "#799A64", // 葱绿
  meiZi:     "#A9BD70", // 梅子青
  ouBi:      "#C0D695", // 欧碧
  chunChen:  "#A9BE7B", // 春辰
  
  // 浅嫩绿
  cangJia:   "#A8BF8F", // 苍葭
  biTai:     "#A8B78C", // 碧苔
  biCi:      "#90A07D", // 碧滋
  luBo:      "#9BB496", // 渌波
  
  // 极浅 / 白绿
  duanChang: "#E8EDB9", // 断肠
  wuXin:     "#BFD1B2", // 无心绿
  
  // 文字
  textLight: "#F0F5EC",
  textMid:   "#C8DCC0",
  textMuted: "#7A9E72",
  textFaint: "#3D5A35",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    background: #0e1a10;
    color: ${C.textLight};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  /* ====== SPLASH ====== */
  .splash {
    position: fixed; inset: 0;
    background: #0a120b;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 100;
    transition: opacity 1s ease, transform 1s ease;
  }
  .splash.exit { opacity: 0; transform: scale(1.05); pointer-events: none; }

  .splash-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 60% 40% at 30% 60%, ${C.guanLv}18 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 70% 30%, ${C.kongQue}12 0%, transparent 70%);
  }

  /* Ink wash rings */
  .ink-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid ${C.sanLv}20;
    animation: inkExpand 5s ease-out infinite;
  }
  .ink-ring:nth-child(1) { width: 180px; height: 180px; animation-delay: 0s; }
  .ink-ring:nth-child(2) { width: 320px; height: 320px; animation-delay: 0.8s; }
  .ink-ring:nth-child(3) { width: 480px; height: 480px; animation-delay: 1.6s; }
  .ink-ring:nth-child(4) { width: 660px; height: 660px; animation-delay: 2.4s; }

  @keyframes inkExpand {
    0% { opacity: 0.6; transform: scale(0.92); }
    100% { opacity: 0; transform: scale(1.08); }
  }

  .splash-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center;
    animation: splashIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
  }
  @keyframes splashIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .splash-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 62px;
    font-weight: 300;
    letter-spacing: 12px;
    color: ${C.textLight};
    text-transform: uppercase;
    line-height: 1;
    filter: drop-shadow(0 0 30px ${C.sanLv}40);
  }
  .splash-wordmark .e-accent { color: ${C.siLv}; }

  .splash-cn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    letter-spacing: 8px;
    color: ${C.textMuted};
    margin-top: 10px;
    font-weight: 300;
  }

  .splash-tagline {
    font-size: 11px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: ${C.kongQue}88;
    margin-top: 20px;
  }

  .splash-bar-wrap { margin-top: 56px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .splash-bar { width: 100px; height: 1px; background: ${C.guanLv}60; border-radius: 1px; overflow: hidden; }
  .splash-bar-fill {
    height: 100%; width: 0;
    background: linear-gradient(90deg, ${C.guanLv}, ${C.kongQue}, ${C.siLv});
    animation: barFill 2.2s cubic-bezier(0.4,0,0.2,1) 0.6s forwards;
  }
  @keyframes barFill { 0%{width:0} 70%{width:82%} 100%{width:100%} }
  .splash-bar-label { font-size: 9px; letter-spacing: 3px; color: ${C.textFaint}; text-transform: uppercase; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  /* ====== APP SHELL ====== */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* Sidebar */
  .sidebar {
    width: 74px;
    background: #0a120b;
    border-right: 1px solid ${C.guanLv}30;
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 4px; flex-shrink: 0;
  }

  .sb-logo {
    margin-bottom: 18px;
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    cursor: pointer;
  }
  .sb-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 9px; letter-spacing: 3px;
    color: ${C.textFaint}; text-transform: uppercase; font-weight: 300;
  }

  .nav-item {
    width: 50px; height: 50px; border-radius: 14px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent; gap: 3px;
  }
  .nav-item:hover { background: ${C.guanLv}25; }
  .nav-item.active { background: ${C.guanLv}40; border-color: ${C.songLv}50; }
  .nav-icon { font-size: 19px; }
  .nav-label { font-size: 8px; color: ${C.textMuted}; font-weight: 500; letter-spacing: 0.3px; }
  .nav-item.active .nav-label { color: ${C.siLv}; }

  /* Main */
  .main { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: ${C.guanLv} transparent; }
  .main::-webkit-scrollbar { width: 3px; }
  .main::-webkit-scrollbar-thumb { background: ${C.guanLv}; border-radius: 2px; }

  /* Header */
  .hdr {
    padding: 22px 34px 18px;
    border-bottom: 1px solid ${C.guanLv}25;
    display: flex; align-items: center; justify-content: space-between;
    background: #0e1a10;
    position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(12px);
  }
  .hdr-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px; font-weight: 300; color: ${C.textLight};
    letter-spacing: 1px;
  }
  .hdr-sub { font-size: 11px; color: ${C.textMuted}; margin-top: 3px; letter-spacing: 1px; }
  .hdr-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, ${C.guanLv}, ${C.kongQue});
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 15px; cursor: pointer;
    border: 1.5px solid ${C.sanLv}40;
    box-shadow: 0 0 16px ${C.kongQue}30;
  }

  /* Content */
  .content { padding: 26px 34px 60px; }

  /* Cards */
  .card {
    background: #131e14;
    border: 1px solid ${C.guanLv}30;
    border-radius: 16px; padding: 20px;
    transition: all 0.25s;
  }
  .card:hover { border-color: ${C.sanLv}50; box-shadow: 0 4px 24px rgba(0,0,0,0.35); }

  .card-label {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: ${C.textMuted}; margin-bottom: 14px;
    display: flex; align-items: center; gap: 7px;
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
  }

  /* Grids */
  .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
  .g-main { display: grid; grid-template-columns: 1fr 330px; gap: 18px; }

  /* Stat card */
  .stat {
    background: #131e14;
    border: 1px solid ${C.guanLv}30;
    border-radius: 16px; padding: 20px;
    position: relative; overflow: hidden;
    transition: all 0.2s; cursor: default;
  }
  .stat:hover { border-color: ${C.sanLv}50; }
  .stat::after {
    content: '';
    position: absolute; top: -20px; right: -20px;
    width: 70px; height: 70px; border-radius: 50%;
    background: ${C.kongQue}12;
  }
  .stat-icon { font-size: 20px; margin-bottom: 10px; }
  .stat-label { font-size: 10px; color: ${C.textMuted}; letter-spacing: 1px; margin-bottom: 6px; font-family: 'Cormorant Garamond', serif; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: ${C.textLight}; }
  .stat-sub { font-size: 11px; color: ${C.siLv}; margin-top: 4px; }

  /* Section */
  .sec { margin-bottom: 22px; }
  .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .sec-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; color: ${C.textLight}; }
  .sec-action { font-size: 11px; color: ${C.kongQue}; cursor: pointer; font-weight: 500; }

  /* Calendar */
  .cal-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .cal-month { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; }
  .cal-nav { display: flex; gap: 6px; }
  .cal-btn {
    width: 26px; height: 26px; border-radius: 7px;
    background: #1a2b1b; border: 1px solid ${C.guanLv}40;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 11px; color: ${C.textMuted};
    transition: all 0.15s;
  }
  .cal-btn:hover { border-color: ${C.kongQue}; color: ${C.siLv}; }

  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .cal-dh { font-size: 9px; color: ${C.textFaint}; text-align: center; padding: 4px; letter-spacing: 0.5px; }
  .cal-day {
    aspect-ratio: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; border-radius: 9px;
    font-size: 11px; cursor: pointer; position: relative; transition: all 0.15s; gap: 2px;
  }
  .cal-day:hover { background: ${C.guanLv}30; }
  .cal-day.today { background: ${C.guanLv}; color: ${C.duanChang}; font-weight: 600; }
  .cal-day.dim { color: ${C.textFaint}; }
  .cal-day.has-dot::after {
    content: ''; width: 3px; height: 3px; border-radius: 50%;
    background: ${C.siLv}; position: absolute; bottom: 3px;
  }
  .cal-day.bday::after { background: #c97c5d; }
  .cal-day.period::after { background: #9b72cf; }

  .evt { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid ${C.guanLv}20; }
  .evt:last-child { border: none; }
  .evt-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .evt-name { font-size: 12px; }
  .evt-date { font-size: 10px; color: ${C.textMuted}; margin-top: 1px; }

  /* Period */
  .cycle-bar { height: 6px; background: #1a2b1b; border-radius: 3px; overflow: hidden; margin-bottom: 14px; }
  .cycle-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #9b72cf, #c97c5d); }
  .phase { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 10px; border: 1px solid; margin: 3px; }
  .period-stat { background: #1a2b1b; border-radius: 10px; padding: 10px 12px; }
  .ps-label { font-size: 9px; color: ${C.textMuted}; margin-bottom: 3px; letter-spacing: 0.5px; }
  .ps-val { font-size: 13px; font-weight: 500; }

  /* Fitness */
  .week-bar { display: flex; gap: 5px; margin-bottom: 18px; }
  .wb-day {
    flex: 1; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600; transition: all 0.2s;
  }
  .wb-day.done { background: ${C.guanLv}; color: ${C.duanChang}; border: 1px solid ${C.songLv}; }
  .wb-day.rest { background: #1a2b1b; color: ${C.textFaint}; border: 1px solid ${C.guanLv}20; }
  .wb-day.today-wd { background: ${C.kongQue}; color: white; }

  .ex-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; background: #1a2b1b;
    border-radius: 11px; margin-bottom: 7px;
    border: 1px solid transparent; cursor: pointer; transition: all 0.2s;
  }
  .ex-item:hover { border-color: ${C.guanLv}50; }
  .ex-check {
    width: 18px; height: 18px; border-radius: 5px;
    border: 1.5px solid ${C.guanLv}; display: flex;
    align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0;
  }
  .ex-check.on { background: ${C.guanLv}; border-color: ${C.guanLv}; }
  .ex-name { font-size: 13px; flex: 1; }
  .ex-detail { font-size: 11px; color: ${C.textMuted}; }

  /* Media */
  .media-item {
    display: flex; gap: 12px; align-items: center;
    padding: 10px; border-radius: 11px; background: #1a2b1b;
    margin-bottom: 7px; cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .media-item:hover { border-color: ${C.guanLv}50; }
  .media-cov {
    width: 44px; height: 44px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
  }
  .media-title { font-size: 13px; font-weight: 500; margin-bottom: 3px; }
  .media-sub { font-size: 10px; color: ${C.textMuted}; }
  .media-prog { margin-top: 6px; height: 3px; background: #0e1a10; border-radius: 2px; overflow: hidden; }
  .media-prog-fill { height: 100%; background: ${C.kongQue}; border-radius: 2px; }

  /* Finance */
  .fin-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid ${C.guanLv}20; }
  .fin-row:last-child { border: none; }
  .fin-label { font-size: 12px; color: ${C.textMuted}; }
  .fin-val { font-size: 14px; font-weight: 600; font-family: 'Cormorant Garamond', serif; }
  .pos { color: ${C.siLv}; }
  .neg { color: #c97c5d; }

  /* Travel */
  .trip-card {
    background: linear-gradient(145deg, #1a2b1b, #131e14);
    border: 1px solid ${C.guanLv}30; border-radius: 14px;
    padding: 16px; cursor: pointer; transition: all 0.25s;
  }
  .trip-card:hover { border-color: ${C.sanLv}60; transform: translateY(-2px); }
  .trip-emoji { font-size: 28px; margin-bottom: 8px; }
  .trip-name { font-size: 14px; font-weight: 600; margin-bottom: 3px; font-family: 'Cormorant Garamond', serif; }
  .trip-date { font-size: 10px; color: ${C.textMuted}; }

  /* Tabs */
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; }
  .tab {
    padding: 6px 14px; border-radius: 20px; font-size: 12px;
    cursor: pointer; color: ${C.textMuted}; border: 1px solid transparent; transition: all 0.2s;
  }
  .tab.on { background: ${C.guanLv}35; border-color: ${C.sanLv}50; color: ${C.siLv}; }

  /* Quote */
  .quote-card {
    background: linear-gradient(135deg, ${C.guanLv}20, #131e14);
    border: 1px solid ${C.sanLv}30;
    border-radius: 16px; padding: 22px 26px;
    position: relative; overflow: hidden; margin-bottom: 22px;
  }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif; font-size: 72px;
    color: ${C.kongQue}; opacity: 0.15;
    position: absolute; top: -8px; left: 12px; line-height: 1;
  }
  .quote-text {
    font-family: 'Cormorant Garamond', serif; font-size: 14px;
    line-height: 1.7; color: ${C.textLight}; position: relative; z-index: 1;
    font-weight: 300; font-style: italic;
  }
  .quote-by { font-size: 10px; color: ${C.textMuted}; margin-top: 10px; letter-spacing: 1px; }

  /* Person */
  .person { display: flex; flex-direction: column; align-items: center; gap: 7px; cursor: pointer; }
  .person-av {
    width: 50px; height: 50px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; background: #1a2b1b;
    border: 1.5px solid ${C.guanLv}40; transition: all 0.2s;
  }
  .person:hover .person-av { border-color: ${C.kongQue}; box-shadow: 0 0 12px ${C.kongQue}30; }
  .person-name { font-size: 10px; color: ${C.textMuted}; }
  .person-bday { font-size: 9px; color: #c97c5d; font-weight: 600; }

  /* Palette display */
  .palette-row { display: flex; gap: 6px; }
  .pal-sw { flex: 1; height: 40px; border-radius: 8px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5px; }
  .pal-label { font-size: 8px; font-weight: 600; }

  /* ====== 碎碎念 JOURNAL ====== */
  .journal-textarea {
    width: 100%; min-height: 110px;
    background: #1a2b1b; border: 1px solid ${C.guanLv}40;
    border-radius: 12px; padding: 14px 16px;
    color: ${C.textLight}; font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 300; line-height: 1.8;
    resize: none; outline: none; transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .journal-textarea::placeholder { color: ${C.textFaint}; font-style: italic; }
  .journal-textarea:focus { border-color: ${C.kongQue}60; box-shadow: 0 0 0 3px ${C.kongQue}10; }

  .journal-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px;
  }
  .mood-row { display: flex; gap: 6px; }
  .mood-btn {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; cursor: pointer; transition: all 0.15s;
    background: #1a2b1b; border: 1px solid transparent;
  }
  .mood-btn:hover { transform: scale(1.15); border-color: ${C.guanLv}50; }
  .mood-btn.selected { background: ${C.guanLv}40; border-color: ${C.kongQue}; transform: scale(1.15); }
  .journal-save {
    padding: 7px 18px; border-radius: 20px; font-size: 11px;
    background: ${C.guanLv}; color: ${C.duanChang};
    border: none; cursor: pointer; font-family: 'Cormorant Garamond', serif;
    font-weight: 300; letter-spacing: 1px; transition: all 0.2s;
  }
  .journal-save:hover { background: ${C.kongQue}; }

  .journal-entry {
    padding: 14px 16px; background: #1a2b1b;
    border-radius: 12px; margin-bottom: 8px;
    border-left: 3px solid ${C.guanLv}; transition: all 0.2s;
    cursor: pointer;
  }
  .journal-entry:hover { border-left-color: ${C.kongQue}; background: #1f3320; }
  .je-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
  .je-time { font-size: 10px; color: ${C.textFaint}; letter-spacing: 0.5px; }
  .je-mood { font-size: 14px; }
  .je-text { font-size: 12px; color: ${C.textMid}; line-height: 1.7; font-family: 'Cormorant Garamond', serif; font-weight: 300; }
  .je-tags { display: flex; gap: 5px; margin-top: 8px; flex-wrap: wrap; }
  .je-tag {
    font-size: 9px; padding: 2px 8px; border-radius: 20px;
    background: ${C.guanLv}25; color: ${C.textMuted};
    border: 1px solid ${C.guanLv}30; letter-spacing: 0.5px;
  }

  /* ====== DAILY SCHEDULE ====== */
  .schedule-timeline { position: relative; padding-left: 52px; }
  .schedule-timeline::before {
    content: ''; position: absolute;
    left: 28px; top: 8px; bottom: 8px; width: 1px;
    background: linear-gradient(to bottom, transparent, ${C.guanLv}50 10%, ${C.guanLv}50 90%, transparent);
  }

  .sched-item {
    position: relative; margin-bottom: 6px;
    display: flex; gap: 12px; align-items: flex-start;
  }
  .sched-time {
    position: absolute; left: -52px; width: 44px;
    font-size: 10px; color: ${C.textFaint}; text-align: right;
    padding-top: 10px; letter-spacing: 0.3px; flex-shrink: 0;
  }
  .sched-dot {
    position: absolute; left: -27px; top: 12px;
    width: 8px; height: 8px; border-radius: 50%;
    border: 1.5px solid ${C.guanLv};
    background: #0e1a10; flex-shrink: 0; z-index: 1;
    transition: all 0.2s;
  }
  .sched-item.done .sched-dot { background: ${C.guanLv}; border-color: ${C.kongQue}; }
  .sched-item.now .sched-dot { background: ${C.kongQue}; border-color: ${C.siLv}; box-shadow: 0 0 8px ${C.kongQue}80; }

  .sched-block {
    flex: 1; padding: 10px 14px; border-radius: 11px;
    background: #1a2b1b; border: 1px solid transparent;
    transition: all 0.2s; cursor: pointer;
  }
  .sched-block:hover { border-color: ${C.guanLv}50; background: #1f3320; }
  .sched-item.done .sched-block { opacity: 0.5; }
  .sched-item.now .sched-block { border-color: ${C.kongQue}40; background: ${C.kongQue}12; }

  .sched-title { font-size: 13px; color: ${C.textLight}; margin-bottom: 2px; }
  .sched-item.done .sched-title { text-decoration: line-through; color: ${C.textFaint}; }
  .sched-meta { font-size: 10px; color: ${C.textMuted}; display: flex; gap: 8px; align-items: center; }
  .sched-cat {
    font-size: 9px; padding: 1px 7px; border-radius: 20px;
    letter-spacing: 0.5px; border: 1px solid;
  }
  .sched-now-badge {
    font-size: 9px; color: ${C.kongQue}; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    background: ${C.kongQue}20; padding: 1px 7px; border-radius: 20px;
    border: 1px solid ${C.kongQue}40;
  }

  .add-sched-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 14px; border-radius: 11px;
    background: transparent; border: 1px dashed ${C.guanLv}40;
    color: ${C.textFaint}; font-size: 12px; cursor: pointer;
    transition: all 0.2s; width: 100%; margin-top: 6px;
    font-family: 'Cormorant Garamond', serif;
  }
  .add-sched-btn:hover { border-color: ${C.kongQue}60; color: ${C.textMuted}; background: ${C.guanLv}10; }

  /* ====== EXPRESSION STUDIO ====== */
  .speak-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

  /* TED card */
  .ted-item {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 14px; background: #1a2b1b; border-radius: 13px;
    border: 1px solid transparent; cursor: pointer; transition: all 0.2s;
    margin-bottom: 8px;
  }
  .ted-item:hover { border-color: ${C.guanLv}60; background: #1f3320; }
  .ted-item.active { border-color: #e2231a50; background: #e2231a08; }
  .ted-thumb {
    width: 72px; height: 50px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; position: relative; overflow: hidden;
  }
  .ted-play-btn {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.2s;
    font-size: 18px;
  }
  .ted-item:hover .ted-play-btn { opacity: 1; }
  .ted-title { font-size: 12px; font-weight: 500; color: ${C.textLight}; line-height: 1.4; margin-bottom: 4px; }
  .ted-speaker { font-size: 10px; color: ${C.textMuted}; margin-bottom: 5px; }
  .ted-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .ted-tag {
    font-size: 9px; padding: 2px 7px; border-radius: 20px;
    background: ${C.guanLv}25; color: ${C.textMuted};
    border: 1px solid ${C.guanLv}30;
  }
  .ted-duration { font-size: 9px; color: ${C.textFaint}; }
  .ted-badge {
    font-size: 9px; padding: 2px 7px; border-radius: 20px;
    background: #e2231a20; color: #e2231a; border: 1px solid #e2231a40;
    font-weight: 600; letter-spacing: 0.5px;
  }

  /* Recorder */
  .recorder-wrap {
    background: linear-gradient(135deg, ${C.guanLv}18, #131e14);
    border: 1px solid ${C.guanLv}35; border-radius: 16px; padding: 24px;
  }
  .rec-visualizer {
    height: 56px; background: #0e1a10; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    gap: 3px; margin-bottom: 18px; overflow: hidden; padding: 0 12px;
  }
  .rec-bar {
    width: 3px; border-radius: 2px; background: ${C.guanLv};
    transition: height 0.1s ease;
    animation: none;
  }
  .rec-bar.active {
    background: ${C.kongQue};
    animation: waveBar 0.6s ease-in-out infinite alternate;
  }
  @keyframes waveBar {
    from { height: 4px; }
    to { height: var(--h, 28px); }
  }

  .rec-controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
  .rec-btn-main {
    width: 56px; height: 56px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; cursor: pointer; transition: all 0.2s; border: none;
  }
  .rec-btn-main.idle {
    background: linear-gradient(135deg, ${C.guanLv}, ${C.kongQue});
    box-shadow: 0 0 20px ${C.kongQue}40;
  }
  .rec-btn-main.idle:hover { transform: scale(1.08); box-shadow: 0 0 30px ${C.kongQue}60; }
  .rec-btn-main.recording {
    background: linear-gradient(135deg, #c0392b, #e2231a);
    box-shadow: 0 0 20px #e2231a60;
    animation: recPulse 1.5s ease-in-out infinite;
  }
  @keyframes recPulse { 0%,100%{box-shadow:0 0 20px #e2231a60} 50%{box-shadow:0 0 36px #e2231a90} }

  .rec-btn-secondary {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; cursor: pointer; transition: all 0.2s;
    background: #1a2b1b; border: 1px solid ${C.guanLv}40; color: ${C.textMuted};
  }
  .rec-btn-secondary:hover { border-color: ${C.kongQue}; color: ${C.textLight}; }

  .rec-timer { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: ${C.textLight}; text-align: center; margin-bottom: 8px; letter-spacing: 3px; }
  .rec-status { font-size: 10px; color: ${C.textMuted}; text-align: center; letter-spacing: 2px; text-transform: uppercase; }
  .rec-status.live { color: #e2231a; animation: pulse 1.5s infinite; }

  .rec-recordings { margin-top: 16px; }
  .rec-entry {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; background: #1a2b1b; border-radius: 11px;
    margin-bottom: 6px; cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .rec-entry:hover { border-color: ${C.guanLv}50; }
  .rec-play { width: 30px; height: 30px; border-radius: 50%; background: ${C.guanLv}; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
  .rec-info { flex: 1; }
  .rec-name { font-size: 12px; color: ${C.textLight}; margin-bottom: 2px; }
  .rec-dur { font-size: 10px; color: ${C.textMuted}; }
  .rec-wave { flex: 1; height: 24px; display: flex; align-items: center; gap: 2px; }
  .rec-wv { width: 2px; border-radius: 1px; background: ${C.guanLv}60; }

  /* Practice prompts */
  .prompt-card {
    background: linear-gradient(135deg, ${C.kongQue}15, #131e14);
    border: 1px solid ${C.kongQue}30; border-radius: 14px;
    padding: 18px; cursor: pointer; transition: all 0.2s; margin-bottom: 8px;
  }
  .prompt-card:hover { border-color: ${C.kongQue}60; transform: translateY(-1px); }
  .prompt-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${C.kongQue}; margin-bottom: 8px; }
  .prompt-text { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-style: italic; color: ${C.textLight}; line-height: 1.5; }
  .prompt-hint { font-size: 10px; color: ${C.textMuted}; margin-top: 8px; }

  /* Stats row */
  .speak-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
  .speak-stat { background: #1a2b1b; border-radius: 12px; padding: 13px; text-align: center; border: 1px solid ${C.guanLv}25; }
  .speak-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: ${C.textLight}; }
  .speak-stat-label { font-size: 9px; color: ${C.textMuted}; margin-top: 3px; letter-spacing: 0.5px; }
  .fu { animation: fadeUp 0.4s ease forwards; }
  .d1{animation-delay:.05s;opacity:0} .d2{animation-delay:.1s;opacity:0} 
  .d3{animation-delay:.15s;opacity:0} .d4{animation-delay:.2s;opacity:0}

  /* Open button */
  .open-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 18px;
    background: ${C.guanLv}30; border: 1px solid ${C.guanLv}50;
    border-radius: 20px; font-size: 11px; color: ${C.siLv};
    cursor: pointer; transition: all 0.2s; margin-top: 10px;
  }
  .open-btn:hover { background: ${C.guanLv}50; border-color: ${C.kongQue}; }

  /* Badge */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 9px; border-radius: 20px; font-size: 9px; font-weight: 600; letter-spacing: 0.5px;
  }

  /* Progress bar */
  .prog-row { display: flex; align-items: center; gap: 9px; margin-bottom: 7px; }
  .prog-label { width: 50px; font-size: 10px; color: ${C.textMuted}; }
  .prog-bar { flex: 1; height: 5px; background: #1a2b1b; border-radius: 3px; overflow: hidden; }
  .prog-fill { height: 100%; border-radius: 3px; }
  .prog-pct { width: 28px; font-size: 10px; color: ${C.textMuted}; text-align: right; }

  /* Net worth hero */
  .nw-hero {
    background: linear-gradient(135deg, ${C.guanLv}30, #131e14);
    border: 1px solid ${C.sanLv}30;
    border-radius: 14px; padding: 18px; margin-bottom: 14px;
  }
  .nw-label { font-size: 10px; color: ${C.textMuted}; margin-bottom: 6px; letter-spacing: 1px; }
  .nw-val { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: ${C.textLight}; }
  .nw-sub { font-size: 11px; color: ${C.siLv}; margin-top: 5px; }
`;

// =================== LOGO SVG ===================
const VerdeLogo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 16 C53 24, 60 35, 58 50 C56 62, 48 67, 40 68 C32 67, 24 62, 22 50 C20 35, 27 24, 40 16Z"
      fill="url(#lg1)"
    />
    <line x1="40" y1="18" x2="40" y2="66" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M40 30 C45 33,52 33,55 36" stroke="rgba(255,255,255,0.1)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
    <path d="M40 42 C45 45,51 45,53 48" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
    <path d="M40 30 C35 33,28 33,25 36" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
    <line x1="40" y1="67" x2="40" y2="74" stroke={C.sanLv} strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="lg1" x1="40" y1="16" x2="40" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={C.tingWu}/>
        <stop offset="50%" stopColor={C.guanLv}/>
        <stop offset="100%" stopColor="#0e1a10"/>
      </linearGradient>
    </defs>
  </svg>
);

// =================== CALENDAR ===================
const Cal = () => {
  const [month, setMonth] = useState(new Date(2026, 2, 1));
  const bdays = [15, 22, 8];
  const periods = [10,11,12,13,14];
  const events = [5,18,25];
  const dim = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  const first = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const mname = month.toLocaleString('default', { month: 'long', year: 'numeric' });
  const days = [];
  for (let i=0;i<first;i++) days.push(null);
  for (let i=1;i<=dim;i++) days.push(i);

  return (
    <div>
      <div className="cal-hdr">
        <div className="cal-month">{mname}</div>
        <div className="cal-nav">
          <div className="cal-btn" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1))}>‹</div>
          <div className="cal-btn" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1))}>›</div>
        </div>
      </div>
      <div className="cal-grid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d} className="cal-dh">{d}</div>)}
        {days.map((d,i)=>(
          <div key={i} className={`cal-day ${!d?'dim':''} ${d===4?'today':''} ${bdays.includes(d)?'has-dot bday':''} ${periods.includes(d)?'has-dot period':''} ${events.includes(d)&&!bdays.includes(d)&&!periods.includes(d)?'has-dot':''}`}>
            {d}
          </div>
        ))}
      </div>
      <div style={{marginTop:14}}>
        <div className="card-label"><span>🎂</span>Upcoming Dates</div>
        {[
          {name:"Mom's Birthday", date:'Mar 15', color:'#c97c5d', type:'Birthday'},
          {name:'Anniversary',    date:'Mar 18', color:C.kongQue,  type:'Special'},
          {name:"Friend Lily's Birthday", date:'Mar 22', color:'#c97c5d', type:'Birthday'},
          {name:'Period Expected', date:'Mar 10', color:'#9b72cf', type:'Health'},
        ].map((e,i)=>(
          <div key={i} className="evt">
            <div className="evt-dot" style={{background:e.color}}/>
            <div style={{flex:1}}><div className="evt-name">{e.name}</div><div className="evt-date">{e.date}</div></div>
            <div className="badge" style={{background:e.color+'20',color:e.color,border:`1px solid ${e.color}40`}}>{e.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================== PERIOD ===================
const Period = () => {
  const day=14, total=28, pct=(day/total)*100;
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
        <span style={{fontSize:11,color:C.textMuted}}>Day {day} of {total}</span>
        <span style={{fontSize:11,color:'#9b72cf',fontWeight:500}}>Ovulation Phase</span>
      </div>
      <div className="cycle-bar"><div className="cycle-fill" style={{width:`${pct}%`}}/></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:14}}>
        {[
          {name:'Menstrual',color:'#c97c5d'},{name:'Follicular',color:'#d4956a'},
          {name:'Ovulation',color:C.kongQue,current:true},{name:'Luteal',color:'#9b72cf'},
        ].map((p,i)=>(
          <div key={i} className="phase" style={{color:p.color,borderColor:p.color+(p.current?'':'50'),background:p.current?p.color+'20':'transparent'}}>
            {p.current&&<span style={{width:5,height:5,borderRadius:'50%',background:p.color,display:'inline-block'}}/>}
            {p.name}
          </div>
        ))}
      </div>
      <div style={{background:'#1a2b1b',borderRadius:10,padding:'11px 13px',marginBottom:12}}>
        <div style={{fontSize:10,color:C.textMuted,marginBottom:4}}>💊 Next period expected</div>
        <div style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>April 1, 2026 <span style={{fontSize:11,color:C.textMuted}}>· in 14 days</span></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {[
          {l:'Avg Cycle',v:'28 days'},{l:'Last Period',v:'Feb 18'},
          {l:'Flow Duration',v:'5 days'},{l:'Fertile Window',v:'Mar 12–17'},
        ].map((s,i)=>(
          <div key={i} className="period-stat">
            <div className="ps-label">{s.l}</div>
            <div className="ps-val">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================== FITNESS ===================
const Fitness = () => {
  const [done, setDone] = useState([0,2]);
  const exs = [
    {name:'Morning Run',detail:'5km · 28 min',icon:'🏃'},
    {name:'Bench Press',detail:'4×12 · 60kg',icon:'🏋️'},
    {name:'Yoga Flow',detail:'20 min',icon:'🧘'},
    {name:'Pull-ups',detail:'3×10',icon:'💪'},
    {name:'Plank',detail:'3×60s',icon:'⚡'},
  ];
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const comp = [true,true,true,false,false,false,false];
  return (
    <div>
      <div className="week-bar">
        {days.map((d,i)=>(
          <div key={i} className={`wb-day ${comp[i]?'done':''} ${i===2?'today-wd':''}`}>{d}</div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
        {[{l:'Calories',v:'487',u:'kcal',e:'🔥'},{l:'Active Time',v:'52',u:'min',e:'⏱'},{l:'Streak',v:'12',u:'days',e:'⚡'}].map((s,i)=>(
          <div key={i} style={{background:'#1a2b1b',borderRadius:11,padding:'11px',textAlign:'center'}}>
            <div style={{fontSize:18,marginBottom:4}}>{s.e}</div>
            <div style={{fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.v}</div>
            <div style={{fontSize:9,color:C.textMuted}}>{s.u}</div>
          </div>
        ))}
      </div>
      <div className="card-label"><span>🏆</span>Today's Plan</div>
      {exs.map((ex,i)=>(
        <div key={i} className="ex-item" style={{opacity:done.includes(i)?0.55:1}} onClick={()=>setDone(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i])}>
          <div className={`ex-check ${done.includes(i)?'on':''}`}>{done.includes(i)&&'✓'}</div>
          <span style={{fontSize:15}}>{ex.icon}</span>
          <div className="ex-name">{ex.name}</div>
          <div className="ex-detail">{ex.detail}</div>
        </div>
      ))}
    </div>
  );
};

// =================== READING ===================
const Reading = () => {
  const [tab, setTab] = useState('book');
  const books = [
    {title:'The Psychology of Money',author:'Morgan Housel',emoji:'💰',prog:68,bg:C.guanLv+'30'},
    {title:'Atomic Habits',author:'James Clear',emoji:'⚡',prog:92,bg:C.kongQue+'25'},
    {title:'Deep Work',author:'Cal Newport',emoji:'🎯',prog:31,bg:C.songLv+'35'},
  ];
  const pods = [
    {title:'Huberman Lab',ep:'Ep.183 · Sleep Optimization',emoji:'🎙',prog:45},
    {title:'How I Built This',ep:'Ep.412 · Patagonia',emoji:'🏔',prog:72},
    {title:'Tim Ferriss Show',ep:'Ep.678 · Naval Ravikant',emoji:'🎧',prog:20},
  ];
  return (
    <div>
      <div className="tabs">
        <div className={`tab ${tab==='book'?'on':''}`} onClick={()=>setTab('book')}>📚 WeChat Books</div>
        <div className={`tab ${tab==='pod'?'on':''}`} onClick={()=>setTab('pod')}>🎧 Apple Podcasts</div>
      </div>
      {tab==='book'&&<>
        {books.map((b,i)=>(
          <div key={i} className="media-item">
            <div className="media-cov" style={{background:b.bg}}>{b.emoji}</div>
            <div style={{flex:1}}>
              <div className="media-title">{b.title}</div>
              <div className="media-sub">{b.author}</div>
              <div className="media-prog"><div className="media-prog-fill" style={{width:`${b.prog}%`}}/></div>
            </div>
            <span style={{fontSize:11,color:C.siLv,fontWeight:600}}>{b.prog}%</span>
          </div>
        ))}
        <div style={{textAlign:'center'}}><div className="open-btn">📱 Open WeChat Books</div></div>
      </>}
      {tab==='pod'&&<>
        {pods.map((p,i)=>(
          <div key={i} className="media-item">
            <div className="media-cov" style={{background:'#1a2b1b'}}>{p.emoji}</div>
            <div style={{flex:1}}>
              <div className="media-title">{p.title}</div>
              <div className="media-sub">{p.ep}</div>
              <div className="media-prog"><div className="media-prog-fill" style={{width:`${p.prog}%`}}/></div>
            </div>
            <div style={{width:30,height:30,borderRadius:'50%',background:C.guanLv,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,cursor:'pointer'}}>▶</div>
          </div>
        ))}
        <div style={{textAlign:'center'}}><div className="open-btn">🎵 Open Apple Podcasts</div></div>
      </>}
    </div>
  );
};

// =================== FINANCE ===================
const Finance = () => (
  <div>
    <div className="nw-hero">
      <div className="nw-label">总资产</div>
      <div className="nw-val">¥ 234,800</div>
      <div className="nw-sub">↑ +12.4% this year</div>
    </div>
    {[
      {l:'股票',p:45,c:C.kongQue},{l:'储蓄',p:30,c:C.sanLv},{l:'基金',p:25,c:C.caoLv},
    ].map((a,i)=>(
      <div key={i} className="prog-row">
        <div className="prog-label">{a.l}</div>
        <div className="prog-bar"><div className="prog-fill" style={{width:`${a.p}%`,background:a.c}}/></div>
        <div className="prog-pct">{a.p}%</div>
      </div>
    ))}
    <div style={{marginTop:12}}>
      {[
        {l:'Monthly Income',v:'+¥28,500',pos:true},{l:'Fixed Expenses',v:'-¥8,200',pos:false},
        {l:'储蓄率',v:'34%',pos:true},{l:'应急储备',v:'¥45,000',pos:true},
      ].map((r,i)=>(
        <div key={i} className="fin-row">
          <span className="fin-label">{r.l}</span>
          <span className={`fin-val ${r.pos?'pos':'neg'}`}>{r.v}</span>
        </div>
      ))}
    </div>
  </div>
);

// =================== TRAVEL ===================
const Travel = () => {
  const trips = [
    {name:'Zhangjiajie',type:'Nature 🏞',date:'Apr 12–18',emoji:'⛰️',status:'Planning'},
    {name:'Wuyi Camping',type:'Camping ⛺',date:'May 3–5',emoji:'🏕️',status:'Confirmed'},
    {name:'Tokyo Trip',type:'City 🏙',date:'Jun 20–28',emoji:'🗾',status:'Dreaming'},
    {name:'Sanya Beach',type:'Beach 🏖',date:'Aug 1–7',emoji:'🌊',status:'Planning'},
  ];
  const sc = {'Planning':C.siLv,'Confirmed':C.kongQue,'Dreaming':'#9b72cf'};
  return (
    <div>
      <div className="g2" style={{marginBottom:14}}>
        {trips.map((t,i)=>(
          <div key={i} className="trip-card">
            <div className="trip-emoji">{t.emoji}</div>
            <div className="trip-name">{t.name}</div>
            <div className="trip-date">{t.date} · {t.type}</div>
            <div className="badge" style={{marginTop:8,background:sc[t.status]+'20',color:sc[t.status],border:`1px solid ${sc[t.status]}40`}}>{t.status}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'13px',background:'#1a2b1b',borderRadius:12,display:'flex',gap:12,alignItems:'center'}}>
        <span style={{fontSize:26}}>🗺</span>
        <div><div style={{fontSize:13,fontWeight:600,marginBottom:2}}>Camping Checklist</div><div style={{fontSize:10,color:C.textMuted}}>Wuyi Mountains · 8 items ready</div></div>
        <div style={{marginLeft:'auto',fontSize:11,color:C.kongQue}}>View →</div>
      </div>
    </div>
  );
};

// =================== 碎碎念 JOURNAL ===================
const Journal = () => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);
  const [entries, setEntries] = useState([
    { time: 'Today 08:14', mood: '🌿', text: 'Went for a run this morning and spotted wildflowers along the path. Life feels quietly beautiful right now. Must hold onto this feeling.', tags: ['morning run', 'good vibes'] },
    { time: 'Yesterday 22:30', mood: '🌙', text: 'A bit tired, but I finished everything I planned today — deeply satisfying. Remember to call Mom tomorrow about her birthday gift.', tags: ['accomplished', 'reminder'] },
    { time: 'Mar 2', mood: '💭', text: "Been reflecting on my career direction lately. I think I need some stillness before deciding. Read a chapter on financial freedom in 'The Psychology of Money' — really resonated.", tags: ['reflection', 'reading', 'planning'] },
  ]);

  const moods = ['🌿','☀️','🌙','💭','🔥','🌧','✨','💚'];

  const handleSave = () => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `Today ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    setEntries([{ time: timeStr, mood: mood || '💚', text: text.trim(), tags: [] }, ...entries]);
    setText('');
    setMood(null);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-label"><span>✍️</span>Today's Thoughts</div>
        <textarea
          className="journal-textarea"
          placeholder="What's on your mind? Even just one sentence…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="journal-toolbar">
          <div className="mood-row">
            {moods.map(m => (
              <div key={m} className={`mood-btn ${mood===m?'selected':''}`} onClick={() => setMood(m===mood?null:m)}>{m}</div>
            ))}
          </div>
          <button className="journal-save" onClick={handleSave}>Save ✓</button>
        </div>
      </div>

      <div className="sec-hdr">
        <div className="sec-title">Past Entries</div>
        <div className="sec-action">View All →</div>
      </div>
      {entries.map((e, i) => (
        <div key={i} className="journal-entry">
          <div className="je-header">
            <div className="je-time">{e.time}</div>
            <div className="je-mood">{e.mood}</div>
          </div>
          <div className="je-text">{e.text}</div>
          {e.tags.length > 0 && (
            <div className="je-tags">
              {e.tags.map((t, j) => <span key={j} className="je-tag"># {t}</span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// =================== DAILY SCHEDULE ===================
const Schedule = () => {
  const [items, setItems] = useState([
    { time: '07:00', title: 'Morning Run 5km', meta: 'Fitness · 30 min', cat: 'Fitness', catColor: '#53976F', done: true, now: false },
    { time: '08:30', title: 'Meditation & Journaling', meta: 'Mindfulness · 15 min', cat: 'Habit', catColor: '#007D62', done: true, now: false },
    { time: '09:00', title: 'Deep Work · Project A', meta: 'Work · 2 hours', cat: 'Work', catColor: '#5a7a9e', done: false, now: true },
    { time: '11:30', title: 'Reply Emails & Messages', meta: 'Work · 30 min', cat: 'Work', catColor: '#5a7a9e', done: false, now: false },
    { time: '12:30', title: 'Lunch + Walk', meta: 'Rest · 1 hour', cat: 'Life', catColor: '#9e7a5a', done: false, now: false },
    { time: '14:00', title: 'Read · Atomic Habits', meta: 'Learning · 45 min', cat: 'Reading', catColor: '#6a5a9e', done: false, now: false },
    { time: '17:00', title: 'Call Mom', meta: 'Family · remember birthday gift', cat: 'People', catColor: '#c97c5d', done: false, now: false },
    { time: '18:30', title: 'Yoga', meta: 'Fitness · 40 min', cat: 'Fitness', catColor: '#53976F', done: false, now: false },
    { time: '21:00', title: 'Daily Review & Plan Tomorrow', meta: 'Habit · 15 min', cat: 'Habit', catColor: '#007D62', done: false, now: false },
  ]);

  const toggle = i => setItems(items.map((it, idx) => idx===i ? {...it, done: !it.done} : it));

  return (
    <div>
      {/* 今日进度 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        padding: '12px 16px', background: '#1a2b1b', borderRadius: 12,
        border: `1px solid ${C.guanLv}30` }}>
        <div style={{ fontSize: 24 }}>📋</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 5 }}>Today's Progress</div>
          <div style={{ height: 5, background: '#0e1a10', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(items.filter(x=>x.done).length / items.length * 100).toFixed(0)}%`,
              height: '100%', background: `linear-gradient(90deg, ${C.guanLv}, ${C.kongQue})`, borderRadius: 3,
              transition: 'width 0.4s ease' }} />
          </div>
        </div>
        <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: C.siLv }}>
          {items.filter(x=>x.done).length}<span style={{ fontSize: 11, color: C.textMuted }}>/{items.length}</span>
        </div>
      </div>

      {/* 时间线 */}
      <div className="schedule-timeline">
        {items.map((it, i) => (
          <div key={i} className={`sched-item ${it.done?'done':''} ${it.now?'now':''}`} onClick={() => toggle(i)}>
            <div className="sched-time">{it.time}</div>
            <div className="sched-dot" />
            <div className="sched-block">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div className="sched-title">{it.title}</div>
                {it.now && <div className="sched-now-badge">In Progress</div>}
              </div>
              <div className="sched-meta">
                <div className="sched-cat" style={{ color: it.catColor, borderColor: it.catColor+'50', background: it.catColor+'15' }}>{it.cat}</div>
                <span>{it.meta}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="add-sched-btn">
          <span style={{ fontSize: 16 }}>＋</span> Add Event
        </div>
      </div>
    </div>
  );
};

// =================== EXPRESSION STUDIO ===================
const Speak = () => {
  const [tab, setTab] = useState('ted');
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeTed, setActiveTed] = useState(null);
  const [recordings, setRecordings] = useState([
    { name: 'Self-intro practice', dur: '1:32', bars: [4,8,14,20,28,22,16,10,6,12,18,24,20,14,8,4,6,10,16,20,14,8] },
    { name: 'Morning reflection', dur: '0:47', bars: [6,12,8,18,24,16,10,6,8,14,20,16,10,6,4,8,12,16,12,8,4,6] },
    { name: 'TED shadow: Brené Brown', dur: '2:15', bars: [8,14,20,26,30,24,18,12,8,10,16,22,28,24,18,12,8,12,18,22,16,10] },
  ]);

  const teds = [
    { title: 'The Power of Vulnerability', speaker: 'Brené Brown', duration: '20 min', tags: ['Authenticity','Connection'], color: '#8B4513', emoji: '💭', level: 'Intermediate' },
    { title: 'Your Body Language May Shape Who You Are', speaker: 'Amy Cuddy', duration: '21 min', tags: ['Confidence','Presence'], color: '#2c5f7a', emoji: '🧠', level: 'Beginner' },
    { title: 'The Surprising Science of Happiness', speaker: 'Dan Gilbert', duration: '21 min', tags: ['Psychology','Joy'], color: '#5a4a8a', emoji: '✨', level: 'Beginner' },
    { title: 'How Great Leaders Inspire Action', speaker: 'Simon Sinek', duration: '18 min', tags: ['Leadership','Purpose'], color: '#2d6a4f', emoji: '🎯', level: 'Intermediate' },
    { title: 'Do Schools Kill Creativity?', speaker: 'Ken Robinson', duration: '19 min', tags: ['Education','Creativity'], color: '#7a5a2d', emoji: '🎨', level: 'Advanced' },
    { title: 'Inside the Mind of a Master Procrastinator', speaker: 'Tim Urban', duration: '14 min', tags: ['Humor','Productivity'], color: '#3d5a8a', emoji: '🦍', level: 'Beginner' },
  ];

  const prompts = [
    { label: 'Today\'s Prompt', text: 'Describe a moment that completely changed how you see the world. Speak for 2 minutes.', hint: 'Try to use vivid imagery and a clear turning point.' },
    { label: 'Shadowing Exercise', text: 'Listen to Amy Cuddy\'s opening 30 seconds. Then record yourself mimicking her pace and rhythm.', hint: 'Focus on pauses and vocal variety.' },
    { label: 'Storytelling', text: 'Tell a story about a person who influenced you — with a beginning, conflict, and resolution.', hint: 'Use the "what happened → what it meant" structure.' },
  ];

  // Timer
  useState(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  });

  const toggleRec = () => {
    if (recording) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const dur = `${mins}:${secs.toString().padStart(2,'0')}`;
      setRecordings([{ name: 'New recording', dur, bars: Array.from({length:22}, ()=>Math.floor(Math.random()*28)+4) }, ...recordings]);
      setSeconds(0);
    }
    setRecording(r => !r);
  };

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const heights = [4,8,14,20,26,30,26,20,14,8,4,6,10,16,22,28,24,18,12,6,4,8,14,20,24,20,14,8];

  return (
    <div>
      {/* Stats */}
      <div className="speak-stats fu">
        {[
          {v:'12', l:'Sessions'},
          {v:'3.2h', l:'Practiced'},
          {v:'8', l:'TED Watched'},
          {v:'14d', l:'Streak'},
        ].map((s,i) => (
          <div key={i} className="speak-stat">
            <div className="speak-stat-val">{s.v}</div>
            <div className="speak-stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs fu">
        <div className={`tab ${tab==='ted'?'on':''}`} onClick={()=>setTab('ted')}>🎙 TED Talks</div>
        <div className={`tab ${tab==='record'?'on':''}`} onClick={()=>setTab('record')}>⏺ Voice Studio</div>
        <div className={`tab ${tab==='prompts'?'on':''}`} onClick={()=>setTab('prompts')}>💡 Practice Prompts</div>
      </div>

      {/* TED Talks */}
      {tab === 'ted' && (
        <div className="fu">
          <div style={{fontSize:11,color:C.textMuted,marginBottom:14,letterSpacing:0.5}}>
            Watch, shadow, and take notes. Learning expression starts with great speakers.
          </div>
          {teds.map((t,i) => (
            <div key={i} className={`ted-item ${activeTed===i?'active':''}`} onClick={()=>setActiveTed(activeTed===i?null:i)}>
              <div className="ted-thumb" style={{background:t.color+'30'}}>
                <span>{t.emoji}</span>
                <div className="ted-play-btn">▶</div>
              </div>
              <div style={{flex:1}}>
                <div className="ted-title">{t.title}</div>
                <div className="ted-speaker">{t.speaker}</div>
                <div className="ted-meta">
                  <span className="ted-badge">TED</span>
                  <span className="ted-duration">⏱ {t.duration}</span>
                  {t.tags.map((tg,j) => <span key={j} className="ted-tag">{tg}</span>)}
                  <span className="ted-tag" style={{color:C.siLv,borderColor:C.guanLv+'50',background:C.guanLv+'20'}}>{t.level}</span>
                </div>
                {activeTed===i && (
                  <div style={{marginTop:10,padding:'10px 12px',background:'#0e1a10',borderRadius:9}}>
                    <div style={{height:4,background:'#1a2b1b',borderRadius:2,marginBottom:8,overflow:'hidden'}}>
                      <div style={{width:'35%',height:'100%',background:`linear-gradient(90deg,${C.guanLv},${C.kongQue})`,borderRadius:2}}/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.textFaint}}>
                      <span>7:21</span><span>{t.duration}</span>
                    </div>
                    <div style={{display:'flex',gap:8,marginTop:10}}>
                      {['▶ Play','↩ Shadow','📝 Notes'].map((btn,j)=>(
                        <div key={j} style={{padding:'5px 12px',borderRadius:20,background:j===0?C.guanLv:'#1a2b1b',
                          border:`1px solid ${j===0?C.guanLv:C.guanLv+'40'}`,fontSize:11,cursor:'pointer',
                          color:j===0?C.duanChang:C.textMuted,transition:'all 0.2s'}}>
                          {btn}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voice Studio */}
      {tab === 'record' && (
        <div className="fu">
          <div className="recorder-wrap" style={{marginBottom:18}}>
            {/* Visualizer */}
            <div className="rec-visualizer">
              {heights.map((h,i) => (
                <div key={i} className={`rec-bar ${recording?'active':''}`}
                  style={{'--h': h+'px', height: recording ? undefined : Math.floor(h*0.3+2)+'px',
                    animationDelay: `${(i*0.05)%0.6}s`, animationDuration: `${0.4+(i%5)*0.1}s`}}/>
              ))}
            </div>

            {/* Timer */}
            <div className="rec-timer">{fmt(seconds)}</div>
            <div className={`rec-status ${recording?'live':''}`}>{recording ? '● RECORDING' : 'ready to record'}</div>

            {/* Controls */}
            <div className="rec-controls" style={{marginTop:16}}>
              <div className="rec-btn-secondary" title="Rewind">⏮</div>
              <button className={`rec-btn-main ${recording?'recording':'idle'}`} onClick={toggleRec}>
                {recording ? '⏹' : '⏺'}
              </button>
              <div className="rec-btn-secondary" title="Play back">▶</div>
            </div>

            <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
              {['🎙 Mic','🔊 Speaker','⚙ Settings'].map((b,i)=>(
                <div key={i} style={{fontSize:10,color:C.textFaint,cursor:'pointer',padding:'4px 10px',
                  borderRadius:20,border:`1px solid ${C.guanLv}25`,background:'#0e1a10'}}>{b}</div>
              ))}
            </div>
          </div>

          {/* Past recordings */}
          <div className="sec-hdr">
            <div className="sec-title" style={{fontSize:13}}>My Recordings</div>
            <div className="sec-action">Manage →</div>
          </div>
          {recordings.map((r,i) => (
            <div key={i} className="rec-entry">
              <div className="rec-play">▶</div>
              <div className="rec-info">
                <div className="rec-name">{r.name}</div>
                <div className="rec-dur">{r.dur}</div>
              </div>
              <div className="rec-wave">
                {r.bars.map((h,j) => (
                  <div key={j} className="rec-wv" style={{height:h+'px'}}/>
                ))}
              </div>
              <div style={{fontSize:13,color:C.textFaint,cursor:'pointer',padding:'0 4px'}}>⋯</div>
            </div>
          ))}
        </div>
      )}

      {/* Practice Prompts */}
      {tab === 'prompts' && (
        <div className="fu">
          <div style={{fontSize:11,color:C.textMuted,marginBottom:16,letterSpacing:0.5,lineHeight:1.6}}>
            Great expression is built through deliberate practice. Pick a prompt, record yourself, and review.
          </div>
          {prompts.map((p,i) => (
            <div key={i} className="prompt-card">
              <div className="prompt-label">{p.label}</div>
              <div className="prompt-text">"{p.text}"</div>
              <div className="prompt-hint">💡 {p.hint}</div>
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <div style={{padding:'5px 14px',borderRadius:20,background:C.guanLv,color:C.duanChang,fontSize:11,cursor:'pointer'}}>
                  ⏺ Record Now
                </div>
                <div style={{padding:'5px 14px',borderRadius:20,background:'transparent',border:`1px solid ${C.guanLv}40`,color:C.textMuted,fontSize:11,cursor:'pointer'}}>
                  Shuffle ↻
                </div>
              </div>
            </div>
          ))}

          {/* Technique tips */}
          <div style={{marginTop:8}}>
            <div className="sec-hdr" style={{marginBottom:10}}>
              <div className="sec-title" style={{fontSize:13}}>Expression Techniques</div>
            </div>
            {[
              {icon:'🌊', tip:'Pacing', desc:'Vary your speed. Slow down for important points, speed up for energy.'},
              {icon:'🎭', tip:'Vocal Range', desc:'Raise pitch for excitement, lower for gravity. Monotone kills engagement.'},
              {icon:'⏸', tip:'The Pause', desc:'Silence is powerful. A 2-second pause before a key point doubles its impact.'},
              {icon:'👁', tip:'Eye Contact', desc:'Look at one person per thought, then move. Creates intimacy at scale.'},
            ].map((t,i) => (
              <div key={i} style={{display:'flex',gap:12,padding:'11px 14px',background:'#1a2b1b',
                borderRadius:11,marginBottom:7,border:`1px solid ${C.guanLv}20`,alignItems:'flex-start'}}>
                <span style={{fontSize:18,flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:3,color:C.siLv}}>{t.tip}</div>
                  <div style={{fontSize:11,color:C.textMuted,lineHeight:1.6}}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// =================== DASHBOARD ===================
const Dashboard = ({go}) => (
  <div className="fu">
    <div className="quote-card">
      <div className="quote-mark">"</div>
      <div className="quote-text">The best time to plant a tree was ten years ago. The second best time is now.</div>
      <div className="quote-by">— Daily Reflection · Verdé</div>
    </div>

    <div className="g3 fu d1" style={{marginBottom:22}}>
      {[
        {l:'Habit Streak',v:'12',s:'days in a row',e:'🔥'},
        {l:'Books Read',v:'8',s:'this year',e:'📚'},
        {l:'Workout Days',v:'3/7',s:'this week',e:'💪'},
      ].map((s,i)=>(
        <div key={i} className="stat">
          <div className="stat-icon">{s.e}</div>
          <div className="stat-label">{s.l}</div>
          <div className="stat-val">{s.v}</div>
          <div className="stat-sub">{s.s}</div>
        </div>
      ))}
    </div>

    <div className="g-main fu d2">
      <div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Today's Schedule</div><div className="sec-action" onClick={()=>go('schedule')}>Details →</div></div>
          <div className="card"><Schedule/></div>
        </div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Calendar · March 2026</div><div className="sec-action" onClick={()=>go('calendar')}>View All →</div></div>
          <div className="card"><Cal/></div>
        </div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Today's Workout</div><div className="sec-action" onClick={()=>go('fitness')}>Details →</div></div>
          <div className="card"><Fitness/></div>
        </div>
      </div>
      <div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Thoughts</div><div className="sec-action" onClick={()=>go('journal')}>More →</div></div>
          <div className="card">
            <textarea className="journal-textarea" placeholder="What's on your mind…" style={{minHeight:80}} readOnly={false}/>
            <div style={{display:'flex',gap:5,marginTop:8,flexWrap:'wrap'}}>
              {['🌿','☀️','🌙','💭','🔥','✨'].map(m=>(
                <div key={m} className="mood-btn">{m}</div>
              ))}
              <button className="journal-save" style={{marginLeft:'auto'}}>Capture</button>
            </div>
          </div>
        </div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Cycle Tracker</div><div className="badge" style={{background:'#9b72cf20',color:'#9b72cf',border:'1px solid #9b72cf40'}}>Day 14</div></div>
          <div className="card"><Period/></div>
        </div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">My People</div><div className="sec-action">Manage →</div></div>
          <div className="card">
            <div style={{display:'flex',gap:14,justifyContent:'space-around'}}>
              {[{n:'Mom',e:'👩',b:'🎂 Mar 15'},{n:'Dad',e:'👨',b:null},{n:'Lily',e:'👧',b:'🎂 Mar 22'},{n:'Tom',e:'👦',b:null},{n:'Sister',e:'🧒',b:null}].map((p,i)=>(
                <div key={i} className="person">
                  <div className="person-av">{p.e}</div>
                  <div className="person-name">{p.n}</div>
                  {p.b&&<div className="person-bday">{p.b}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Next Adventure</div><div className="sec-action" onClick={()=>go('travel')}>All Trips →</div></div>
          <div className="card">
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <span style={{fontSize:32}}>⛰️</span>
              <div>
                <div style={{fontSize:15,fontWeight:300,fontFamily:"'Cormorant Garamond',serif"}}>Zhangjiajie</div>
                <div style={{fontSize:10,color:C.textMuted,marginTop:3}}>Apr 12–18 · Nature Trip</div>
                <div style={{marginTop:8,display:'flex',gap:6}}>
                  <span className="badge" style={{background:C.guanLv+'30',color:C.siLv,border:`1px solid ${C.guanLv}50`}}>in 39 days</span>
                  <span className="badge" style={{background:C.kongQue+'20',color:C.kongQue,border:`1px solid ${C.kongQue}40`}}>Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// =================== SPLASH ===================
const Splash = ({onDone}) => {
  const [exit, setExit] = useState(false);
  const go = () => { setExit(true); setTimeout(onDone, 900); };
  useEffect(()=>{ const t=setTimeout(go,2800); return()=>clearTimeout(t); },[]);
  return (
    <div className={`splash ${exit?'exit':''}`} onClick={go}>
      <div className="splash-bg"/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="ink-ring"/><div className="ink-ring"/><div className="ink-ring"/><div className="ink-ring"/>
      </div>
      <div className="splash-content">
        <div style={{filter:`drop-shadow(0 0 40px ${C.kongQue}50)`,marginBottom:28}}>
          <VerdeLogo size={76}/>
        </div>
        <div className="splash-wordmark">Verd<span className="e-accent">é</span></div>
        <div className="splash-cn">Your world · Your growth</div>
        <div className="splash-tagline">grow · connect · thrive</div>
        <div className="splash-bar-wrap">
          <div className="splash-bar"><div className="splash-bar-fill"/></div>
          <div className="splash-bar-label">entering Nikki's world</div>
        </div>
      </div>
    </div>
  );
};

// =================== MAIN ===================
const NAV = [
  {id:'home',    icon:'⊞',  label:'Home'},
  {id:'schedule',icon:'◷',  label:'Schedule'},
  {id:'journal', icon:'✍️', label:'Journal'},
  {id:'calendar',icon:'📅', label:'Calendar'},
  {id:'fitness', icon:'💪', label:'Fitness'},
  {id:'reading', icon:'📚', label:'Reading'},
  {id:'speak',   icon:'🎙', label:'Speak'},
  {id:'travel',  icon:'✈️', label:'Travel'},
];

const titles = {
  home:     {t:'Good morning, Nikki ✨', s:'Wednesday, March 4, 2026'},
  schedule: {t:'Daily Schedule',          s:'Tap any item to mark complete'},
  journal:  {t:'Journal',                 s:'Capture your thoughts, one line at a time'},
  calendar: {t:'Calendar & Events',       s:'Birthdays · Anniversaries · Health'},
  fitness:  {t:'Daily Fitness',           s:'Your workout tracker'},
  reading:  {t:'Reading & Listening',     s:'WeChat Books · Apple Podcasts'},
  speak:    {t:'Expression Studio',        s:'TED Talks · Voice Practice · Your growth in words'},
  travel:   {t:'Travel & Camping',        s:'Your next adventure'},
};

export default function App() {
  const [splash, setSplash] = useState(true);
  const [view, setView] = useState('home');

  const renderPage = () => {
    switch(view) {
      case 'home': return <Dashboard go={setView}/>;
      case 'schedule': return <div className="card fu"><div className="card-label"><span>◷</span>Today's Schedule</div><Schedule/></div>;
      case 'journal': return <div className="fu"><Journal/></div>;      case 'calendar': return <div className="g2 fu"><div className="card"><div className="card-label"><span>📅</span>Calendar</div><Cal/></div><div className="card"><div className="card-label"><span>🌸</span>Cycle Tracker</div><Period/></div></div>;
      case 'fitness': return <div className="card fu"><div className="card-label"><span>🏋️</span>Today's Workout</div><Fitness/></div>;
      case 'reading': return <div className="card fu"><Reading/></div>;
      case 'speak': return <div className="fu"><Speak/></div>;
      case 'travel': return <div className="card fu"><div className="card-label"><span>✈️</span>Travel & Camping Plans</div><Travel/></div>;
      case 'finance': return null;
      default: return null;
    }
  };

  return (
    <>
      <style>{css}</style>
      {splash && <Splash onDone={()=>setSplash(false)}/>}
      <div className="app" style={{opacity:splash?0:1,transition:'opacity 0.6s ease 0.2s'}}>
        <nav className="sidebar">
          <div className="sb-logo" onClick={()=>setView('home')}>
            <VerdeLogo size={34}/>
            <div className="sb-logo-text">Verdé</div>
          </div>
          {NAV.map(n=>(
            <div key={n.id} className={`nav-item ${view===n.id?'active':''}`} onClick={()=>setView(n.id)}>
              <div className="nav-icon">{n.icon}</div>
              <div className="nav-label">{n.label}</div>
            </div>
          ))}
        </nav>
        <div className="main">
          <div className="hdr">
            <div>
              <div className="hdr-title">{titles[view]?.t}</div>
              <div className="hdr-sub">{titles[view]?.s}</div>
            </div>
            <div className="hdr-avatar">N</div>
          </div>
          <div className="content">{renderPage()}</div>
        </div>
      </div>
    </>
  );
}

