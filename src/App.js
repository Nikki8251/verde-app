import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// =================== SUPABASE ===================
const supabase = createClient(
  "https://xdsgupuixcpysunqsnes.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkc2d1cHVpeGNweXN1bnFzbmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTA1ODQsImV4cCI6MjA4ODE2NjU4NH0.Fa6zqvOQh5I7kTfzfS3dbOPB2da-6lPf2IgScaZ8-Nw"
);

// =================== COLOR SYSTEM — Light Theme ===================
const C = {
  // 三种绿
  deep:    "#2A6E3F", // 深绿 — logo, active states, buttons
  mid:     "#4A9B6F", // 中绿 — icons, borders, accents
  light:   "#A8D5B5", // 浅绿 — backgrounds, tags, subtle fills

  // 背景层次（白色系）
  bg:      "#FFFFFF", // 主背景
  bgSoft:  "#F7F9F7", // 卡片背景
  bgCard:  "#F0F5F1", // 深一点的卡片
  border:  "#E2EDE5", // 边框

  // 文字
  textDark:  "#1A2E1F", // 主文字
  textMid:   "#4A6655", // 次要文字
  textMuted: "#8AAD95", // 占位/弱文字
  textLight: "#FFFFFF", // 白字（用在深色按钮上）

  // 保留兼容旧变量名
  guanLv:    "#2A6E3F",
  kongQue:   "#4A9B6F",
  sanLv:     "#4A9B6F",
  siLv:      "#4A9B6F",
  songLv:    "#2A6E3F",
  zhuLv:     "#4A9B6F",
  pinLv:     "#2A6E3F",
  tingWu:    "#4A9B6F",
  biShan:    "#A8D5B5",
  caoLv:     "#A8D5B5",
  meiZi:     "#A8D5B5",
  ouBi:      "#A8D5B5",
  chunChen:  "#A8D5B5",
  cangJia:   "#A8D5B5",
  biTai:     "#A8D5B5",
  biCi:      "#A8D5B5",
  luBo:      "#A8D5B5",
  duanChang: "#F0F5F1",
  wuXin:     "#E2EDE5",
  textFaint: "#8AAD95",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    background: #F7F9F7;
    color: #1A2E1F;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  /* ====== SPLASH ====== */
  .splash {
    position: fixed; inset: 0;
    background: #FFFFFF;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 100;
    transition: opacity 1s ease, transform 1s ease;
  }
  .splash.exit { opacity: 0; transform: scale(1.05); pointer-events: none; }

  .splash-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 60% 40% at 30% 60%, #A8D5B540 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 70% 30%, #4A9B6F20 0%, transparent 70%);
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
    color: #1A2E1F;
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
  .splash-bar-label { font-size: 9px; letter-spacing: 3px; color: #8AAD95; text-transform: uppercase; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  /* ====== APP SHELL ====== */
  .app { display: flex; height: 100vh; overflow: hidden; background: #F7F9F7; }

  /* Sidebar — desktop */
  .sidebar {
    width: 74px;
    background: #FFFFFF;
    border-right: 1px solid #E2EDE5;
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 4px; flex-shrink: 0;
    box-shadow: 2px 0 12px rgba(42,110,63,0.06);
  }

  /* ====== MOBILE BOTTOM NAV ====== */
  @media (max-width: 640px) {
    html { font-size: 15px; }

    .app {
      flex-direction: column;
      height: 100dvh;
    }

    /* Hide desktop sidebar, show bottom nav */
    .sidebar {
      display: none;
    }

    .bottom-nav {
      display: flex !important;
    }

    /* Main scrolls above bottom nav */
    .main {
      padding-bottom: 72px;
    }

    /* Header tighter on mobile */
    .hdr {
      padding: 14px 18px 12px;
    }
    .hdr-title { font-size: 17px; }
    .hdr-sub { font-size: 10px; }

    /* Content padding */
    .content { padding: 16px 16px 40px; }

    /* All multi-col grids → single col on mobile */
    .g4, .g3, .g2 {
      grid-template-columns: 1fr !important;
    }
    .g-main {
      grid-template-columns: 1fr !important;
    }

    /* Cards slightly less padding */
    .card { padding: 16px; }

    /* Schedule timeline labels */
    .sched-time { font-size: 9px; }

    /* Speak stats → 2x2 on mobile */
    .speak-stats {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* TED embed full width */
    iframe { width: 100% !important; }

    /* Recorder wrap */
    .recorder-wrap { padding: 16px; }

    /* Journal textarea shorter on mobile */
    .journal-textarea { min-height: 80px; }

    /* Mood buttons slightly smaller */
    .mood-btn { width: 28px; height: 28px; font-size: 14px; }

    /* Trip cards → 1 col */
    .trip-grid { grid-template-columns: 1fr !important; }

    /* Person avatars smaller gap */
    .person-av { width: 42px; height: 42px; }
  }

  /* Bottom nav bar (mobile only, hidden on desktop) */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 64px;
    background: #FFFFFF;
    border-top: 1px solid #E2EDE5; box-shadow: 0 -2px 12px rgba(42,110,63,0.08);
    z-index: 50;
    justify-content: space-around;
    align-items: center;
    padding: 0 4px;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .bn-item {
    flex: 1; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 3px; cursor: pointer; transition: all 0.15s;
    border-radius: 12px; margin: 4px 2px;
  }
  .bn-item.active { background: #2A6E3F12; }
  .bn-icon { font-size: 20px; line-height: 1; }
  .bn-label {
    font-size: 9px; color: #8AAD95;
    font-weight: 500; letter-spacing: 0.3px;
  }
  .sb-logo {
    margin-bottom: 18px;
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    cursor: pointer;
  }
  .sb-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 9px; letter-spacing: 3px;
    color: #8AAD95; text-transform: uppercase; font-weight: 300;
  }

  .nav-item {
    width: 50px; height: 50px; border-radius: 14px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent; gap: 3px;
  }
  .nav-item:hover { background: #F0F5F1; }
  .nav-item.active { background: #2A6E3F15; border-color: #2A6E3F30; }
  .nav-icon { font-size: 19px; }
  .nav-label { font-size: 8px; color: #8AAD95; font-weight: 500; letter-spacing: 0.3px; }
  .nav-item.active .nav-label { color: #2A6E3F; }

  /* Main */
  .main { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #A8D5B5 transparent; background: #F7F9F7; }
  .main::-webkit-scrollbar { width: 3px; }
  .main::-webkit-scrollbar-thumb { background: #A8D5B5; border-radius: 2px; }

  /* Header */
  .hdr {
    padding: 22px 34px 18px;
    border-bottom: 1px solid #E2EDE5;
    display: flex; align-items: center; justify-content: space-between;
    background: #FFFFFF;
    position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 8px rgba(42,110,63,0.06);
  }
  .hdr-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px; font-weight: 300; color: #1A2E1F;
    letter-spacing: 1px;
  }
  .hdr-sub { font-size: 11px; color: #8AAD95; margin-top: 3px; letter-spacing: 1px; }
  .hdr-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #2A6E3F, #4A9B6F);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 15px; cursor: pointer;
    color: white;
    border: 1.5px solid #A8D5B5;
    box-shadow: 0 0 16px #4A9B6F20;
  }

  /* Content */
  .content { padding: 26px 34px 60px; }

  /* Cards */
  .card {
    background: #FFFFFF;
    border: 1px solid #E2EDE5;
    border-radius: 16px; padding: 20px;
    transition: all 0.25s;
    box-shadow: 0 2px 8px rgba(42,110,63,0.06);
  }
  .card:hover { border-color: #A8D5B5; box-shadow: 0 4px 20px rgba(42,110,63,0.1); }

  .card-label {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: #8AAD95; margin-bottom: 14px;
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
    background: #FFFFFF;
    border: 1px solid #E2EDE5;
    border-radius: 16px; padding: 20px;
    position: relative; overflow: hidden;
    transition: all 0.2s; cursor: default;
    box-shadow: 0 2px 8px rgba(42,110,63,0.05);
  }
  .stat:hover { border-color: #A8D5B5; }
  .stat::after {
    content: '';
    position: absolute; top: -20px; right: -20px;
    width: 70px; height: 70px; border-radius: 50%;
    background: #4A9B6F10;
  }
  .stat-icon { font-size: 20px; margin-bottom: 10px; }
  .stat-label { font-size: 10px; color: #8AAD95; letter-spacing: 1px; margin-bottom: 6px; font-family: 'Cormorant Garamond', serif; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: #1A2E1F; }
  .stat-sub { font-size: 11px; color: #4A9B6F; margin-top: 4px; }

  /* Section */
  .sec { margin-bottom: 22px; }
  .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .sec-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; color: #1A2E1F; }
  .sec-action { font-size: 11px; color: #4A9B6F; cursor: pointer; font-weight: 500; }

  /* Calendar */
  .cal-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .cal-month { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; }
  .cal-nav { display: flex; gap: 6px; }
  .cal-btn {
    width: 26px; height: 26px; border-radius: 7px;
    background: #F0F5F1; border: 1px solid #E2EDE5;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 11px; color: ${C.textMuted};
    transition: all 0.15s;
  }
  .cal-btn:hover { border-color: #4A9B6F; color: ${C.siLv}; }

  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .cal-dh { font-size: 9px; color: #8AAD95; text-align: center; padding: 4px; letter-spacing: 0.5px; }
  .cal-day {
    aspect-ratio: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; border-radius: 9px;
    font-size: 11px; cursor: pointer; position: relative; transition: all 0.15s; gap: 2px;
  }
  .cal-day:hover { background: ${C.guanLv}30; }
  .cal-day.today { background: #2A6E3F; color: #FFFFFF; font-weight: 600; }
  .cal-day.dim { color: #8AAD95; }
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
  .cycle-bar { height: 6px; background: #F0F5F1; border-radius: 3px; overflow: hidden; margin-bottom: 14px; }
  .cycle-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #9b72cf, #c97c5d); }
  .phase { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 10px; border: 1px solid; margin: 3px; }
  .period-stat { background: #F0F5F1; border-radius: 10px; padding: 10px 12px; }
  .ps-label { font-size: 9px; color: #8AAD95; margin-bottom: 3px; letter-spacing: 0.5px; }
  .ps-val { font-size: 13px; font-weight: 500; }

  /* Fitness */
  .week-bar { display: flex; gap: 5px; margin-bottom: 18px; }
  .wb-day {
    flex: 1; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600; transition: all 0.2s;
  }
  .wb-day.done { background: #2A6E3F; color: #FFFFFF; border: 1px solid ${C.songLv}; }
  .wb-day.rest { background: #F0F5F1; color: #8AAD95; border: 1px solid #E2EDE5; }
  .wb-day.today-wd { background: ${C.kongQue}; color: white; }

  .ex-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; background: #F0F5F1;
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
    padding: 10px; border-radius: 11px; background: #F0F5F1;
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
  .media-prog { margin-top: 6px; height: 3px; background: #F7F9F7; border-radius: 2px; overflow: hidden; }
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
    background: linear-gradient(145deg, #F0F5F1, #FFFFFF);
    border: 1px solid #E2EDE5; border-radius: 14px;
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
    background: linear-gradient(135deg, ${C.guanLv}20, #FFFFFF);
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
    line-height: 1.7; color: #1A2E1F; position: relative; z-index: 1;
    font-weight: 300; font-style: italic;
  }
  .quote-by { font-size: 10px; color: ${C.textMuted}; margin-top: 10px; letter-spacing: 1px; }

  /* Person */
  .person { display: flex; flex-direction: column; align-items: center; gap: 7px; cursor: pointer; }
  .person-av {
    width: 50px; height: 50px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; background: #F0F5F1;
    border: 1.5px solid ${C.guanLv}40; transition: all 0.2s;
  }
  .person:hover .person-av { border-color: #4A9B6F; box-shadow: 0 0 12px ${C.kongQue}30; }
  .person-name { font-size: 10px; color: ${C.textMuted}; }
  .person-bday { font-size: 9px; color: #c97c5d; font-weight: 600; }

  /* Palette display */
  .palette-row { display: flex; gap: 6px; }
  .pal-sw { flex: 1; height: 40px; border-radius: 8px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5px; }
  .pal-label { font-size: 8px; font-weight: 600; }

  /* ====== 碎碎念 JOURNAL ====== */
  .journal-textarea {
    width: 100%; min-height: 110px;
    background: #F0F5F1; border: 1px solid #E2EDE5;
    border-radius: 12px; padding: 14px 16px;
    color: #1A2E1F; font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 300; line-height: 1.8;
    resize: none; outline: none; transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .journal-textarea::placeholder { color: #8AAD95; font-style: italic; }
  .journal-textarea:focus { border-color: #4A9B6F60; box-shadow: 0 0 0 3px ${C.kongQue}10; }

  .journal-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px;
  }
  .mood-row { display: flex; gap: 6px; }
  .mood-btn {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; cursor: pointer; transition: all 0.15s;
    background: #F0F5F1; border: 1px solid transparent;
  }
  .mood-btn:hover { transform: scale(1.15); border-color: #A8D5B5; }
  .mood-btn.selected { background: ${C.guanLv}40; border-color: #4A9B6F; transform: scale(1.15); }
  .journal-save {
    padding: 7px 18px; border-radius: 20px; font-size: 11px;
    background: #2A6E3F; color: #FFFFFF;
    border: none; cursor: pointer; font-family: 'Cormorant Garamond', serif;
    font-weight: 300; letter-spacing: 1px; transition: all 0.2s;
  }
  .journal-save:hover { background: #4A9B6F; }

  .journal-entry {
    padding: 14px 16px; background: #F0F5F1;
    border-radius: 12px; margin-bottom: 8px;
    border-left: 3px solid #4A9B6F; transition: all 0.2s;
    cursor: pointer;
  }
  .journal-entry:hover { border-left-color: #2A6E3F; background: #E8F2EB; }
  .je-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
  .je-time { font-size: 10px; color: #8AAD95; letter-spacing: 0.5px; }
  .je-mood { font-size: 14px; }
  .je-text { font-size: 12px; color: #4A6655; line-height: 1.7; font-family: 'Cormorant Garamond', serif; font-weight: 300; }
  .je-tags { display: flex; gap: 5px; margin-top: 8px; flex-wrap: wrap; }
  .je-tag {
    font-size: 9px; padding: 2px 8px; border-radius: 20px;
    background: ${C.guanLv}25; color: ${C.textMuted};
    border: 1px solid #E2EDE5; letter-spacing: 0.5px;
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
    font-size: 10px; color: #8AAD95; text-align: right;
    padding-top: 10px; letter-spacing: 0.3px; flex-shrink: 0;
  }
  .sched-dot {
    position: absolute; left: -27px; top: 12px;
    width: 8px; height: 8px; border-radius: 50%;
    border: 1.5px solid ${C.guanLv};
    background: #F7F9F7; flex-shrink: 0; z-index: 1;
    transition: all 0.2s;
  }
  .sched-item.done .sched-dot { background: ${C.guanLv}; border-color: #4A9B6F; }
  .sched-item.now .sched-dot { background: ${C.kongQue}; border-color: ${C.siLv}; box-shadow: 0 0 8px ${C.kongQue}80; }

  .sched-block {
    flex: 1; padding: 10px 14px; border-radius: 11px;
    background: #F0F5F1; border: 1px solid transparent;
    transition: all 0.2s; cursor: pointer;
  }
  .sched-block:hover { border-color: ${C.guanLv}50; background: #E8F2EB; }
  .sched-item.done .sched-block { opacity: 0.5; }
  .sched-item.now .sched-block { border-color: #4A9B6F40; background: ${C.kongQue}12; }

  .sched-title { font-size: 13px; color: #1A2E1F; margin-bottom: 2px; }
  .sched-item.done .sched-title { text-decoration: line-through; color: #8AAD95; }
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
    color: #8AAD95; font-size: 12px; cursor: pointer;
    transition: all 0.2s; width: 100%; margin-top: 6px;
    font-family: 'Cormorant Garamond', serif;
  }
  .add-sched-btn:hover { border-color: #4A9B6F60; color: ${C.textMuted}; background: ${C.guanLv}10; }

  /* ====== EXPRESSION STUDIO ====== */
  .speak-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

  /* TED card */
  .ted-item {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 14px; background: #F0F5F1; border-radius: 13px;
    border: 1px solid transparent; cursor: pointer; transition: all 0.2s;
    margin-bottom: 8px;
  }
  .ted-item:hover { border-color: ${C.guanLv}60; background: #E8F2EB; }
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
  .ted-title { font-size: 12px; font-weight: 500; color: #1A2E1F; line-height: 1.4; margin-bottom: 4px; }
  .ted-speaker { font-size: 10px; color: ${C.textMuted}; margin-bottom: 5px; }
  .ted-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .ted-tag {
    font-size: 9px; padding: 2px 7px; border-radius: 20px;
    background: ${C.guanLv}25; color: ${C.textMuted};
    border: 1px solid #E2EDE5;
  }
  .ted-duration { font-size: 9px; color: #8AAD95; }
  .ted-badge {
    font-size: 9px; padding: 2px 7px; border-radius: 20px;
    background: #e2231a20; color: #e2231a; border: 1px solid #e2231a40;
    font-weight: 600; letter-spacing: 0.5px;
  }

  /* Recorder */
  .recorder-wrap {
    background: linear-gradient(135deg, ${C.guanLv}18, #FFFFFF);
    border: 1px solid ${C.guanLv}35; border-radius: 16px; padding: 24px;
  }
  .rec-visualizer {
    height: 56px; background: #F7F9F7; border-radius: 10px;
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
    background: #F0F5F1; border: 1px solid #E2EDE5; color: ${C.textMuted};
  }
  .rec-btn-secondary:hover { border-color: #4A9B6F; color: #1A2E1F; }

  .rec-timer { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #1A2E1F; text-align: center; margin-bottom: 8px; letter-spacing: 3px; }
  .rec-status { font-size: 10px; color: ${C.textMuted}; text-align: center; letter-spacing: 2px; text-transform: uppercase; }
  .rec-status.live { color: #e2231a; animation: pulse 1.5s infinite; }

  .rec-recordings { margin-top: 16px; }
  .rec-entry {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; background: #F0F5F1; border-radius: 11px;
    margin-bottom: 6px; cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .rec-entry:hover { border-color: ${C.guanLv}50; }
  .rec-play { width: 30px; height: 30px; border-radius: 50%; background: ${C.guanLv}; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
  .rec-info { flex: 1; }
  .rec-name { font-size: 12px; color: #1A2E1F; margin-bottom: 2px; }
  .rec-dur { font-size: 10px; color: ${C.textMuted}; }
  .rec-wave { flex: 1; height: 24px; display: flex; align-items: center; gap: 2px; }
  .rec-wv { width: 2px; border-radius: 1px; background: ${C.guanLv}60; }

  /* Practice prompts */
  .prompt-card {
    background: linear-gradient(135deg, ${C.kongQue}15, #FFFFFF);
    border: 1px solid ${C.kongQue}30; border-radius: 14px;
    padding: 18px; cursor: pointer; transition: all 0.2s; margin-bottom: 8px;
  }
  .prompt-card:hover { border-color: #4A9B6F60; transform: translateY(-1px); }
  .prompt-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${C.kongQue}; margin-bottom: 8px; }
  .prompt-text { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-style: italic; color: #1A2E1F; line-height: 1.5; }
  .prompt-hint { font-size: 10px; color: ${C.textMuted}; margin-top: 8px; }

  /* Stats row */
  .speak-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
  .speak-stat { background: #F0F5F1; border-radius: 12px; padding: 13px; text-align: center; border: 1px solid #E2EDE5; }
  .speak-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: #1A2E1F; }
  .speak-stat-label { font-size: 9px; color: #8AAD95; margin-top: 3px; letter-spacing: 0.5px; }
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
  .open-btn:hover { background: ${C.guanLv}50; border-color: #4A9B6F; }

  /* Badge */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 9px; border-radius: 20px; font-size: 9px; font-weight: 600; letter-spacing: 0.5px;
  }

  /* Progress bar */
  .prog-row { display: flex; align-items: center; gap: 9px; margin-bottom: 7px; }
  .prog-label { width: 50px; font-size: 10px; color: ${C.textMuted}; }
  .prog-bar { flex: 1; height: 5px; background: #F0F5F1; border-radius: 3px; overflow: hidden; }
  .prog-fill { height: 100%; border-radius: 3px; }
  .prog-pct { width: 28px; font-size: 10px; color: ${C.textMuted}; text-align: right; }

  /* Net worth hero */
  .nw-hero {
    background: linear-gradient(135deg, ${C.guanLv}30, #FFFFFF);
    border: 1px solid ${C.sanLv}30;
    border-radius: 14px; padding: 18px; margin-bottom: 14px;
  }
  .nw-label { font-size: 10px; color: ${C.textMuted}; margin-bottom: 6px; letter-spacing: 1px; }
  .nw-val { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #1A2E1F; }
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
        <stop offset="100%" stopColor="#F7F9F7"/>
      </linearGradient>
    </defs>
  </svg>
);

// =================== CALENDAR ===================
const Cal = () => {
  const [month, setMonth] = useState(new Date(2026, 2, 1));
  const [events, setEvents] = useState([
    {day:15, name:"Mom's Birthday", color:'#c97c5d', type:'Birthday'},
    {day:18, name:'Anniversary', color:'#4A9B6F', type:'Special'},
    {day:22, name:"Friend Lily's Birthday", color:'#c97c5d', type:'Birthday'},
    {day:10, name:'Period Expected', color:'#9b72cf', type:'Health'},
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [selDay, setSelDay] = useState(null);
  const [form, setForm] = useState({name:'', type:'Special', color:'#4A9B6F'});

  const dim = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  const first = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const mname = month.toLocaleString('default', { month: 'long', year: 'numeric' });
  const days = [];
  for (let i=0;i<first;i++) days.push(null);
  for (let i=1;i<=dim;i++) days.push(i);

  const today = new Date();
  const isToday = (d) => d === today.getDate() &&
    month.getMonth() === today.getMonth() &&
    month.getFullYear() === today.getFullYear();

  const dayEvents = (d) => events.filter(e => e.day === d);

  const handleDayClick = (d) => {
    if (!d) return;
    setSelDay(d);
    setForm({name:'', type:'Special', color:'#4A9B6F'});
    setShowAdd(true);
  };

  const addEvent = () => {
    if (!form.name.trim()) return;
    setEvents([...events, { day: selDay, ...form }]);
    setShowAdd(false);
  };

  const typeColors = {Birthday:'#c97c5d', Special:'#4A9B6F', Health:'#9b72cf', Reminder:'#5a7a9e'};

  return (
    <div>
      {/* Add event modal */}
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>setShowAdd(false)}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:300,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,marginBottom:16,color:'#1A2E1F'}}>
              Add Event · {mname.split(' ')[0]} {selDay}
            </div>
            <input
              placeholder="Event name"
              value={form.name}
              onChange={e=>setForm({...form,name:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,
                fontSize:13,marginBottom:12,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}
            />
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              {['Birthday','Special','Health','Reminder'].map(t=>(
                <div key={t} onClick={()=>setForm({...form,type:t,color:typeColors[t]})}
                  style={{padding:'5px 10px',borderRadius:20,fontSize:10,cursor:'pointer',
                    background:form.type===t?typeColors[t]+'20':'#F7F9F7',
                    border:`1px solid ${form.type===t?typeColors[t]:'#E2EDE5'}`,
                    color:form.type===t?typeColors[t]:'#8AAD95'}}>
                  {t}
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>setShowAdd(false)}
                style={{flex:1,padding:'10px',borderRadius:12,border:'1px solid #E2EDE5',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'#8AAD95'}}>
                Cancel
              </div>
              <div onClick={addEvent}
                style={{flex:1,padding:'10px',borderRadius:12,background:'#2A6E3F',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>
                Add ✓
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cal-hdr">
        <div className="cal-month">{mname}</div>
        <div className="cal-nav">
          <div className="cal-btn" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1))}>‹</div>
          <div className="cal-btn" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1))}>›</div>
        </div>
      </div>
      <div className="cal-grid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d} className="cal-dh">{d}</div>)}
        {days.map((d,i)=>{
          const de = dayEvents(d);
          return (
            <div key={i}
              className={`cal-day ${!d?'dim':''} ${isToday(d)?'today':''}`}
              onClick={()=>handleDayClick(d)}
              style={{cursor:d?'pointer':'default', position:'relative'}}>
              {d}
              {de.length > 0 && (
                <div style={{display:'flex',gap:2,position:'absolute',bottom:3,justifyContent:'center',width:'100%'}}>
                  {de.slice(0,3).map((e,j)=>(
                    <div key={j} style={{width:4,height:4,borderRadius:'50%',background:e.color}}/>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{marginTop:14}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
          <div className="card-label" style={{marginBottom:0}}><span>🎂</span>Upcoming Dates</div>
          <div onClick={()=>{setSelDay(1);setShowAdd(true);}}
            style={{fontSize:11,color:'#4A9B6F',cursor:'pointer',fontWeight:500}}>+ Add Event</div>
        </div>
        {events.sort((a,b)=>a.day-b.day).map((e,i)=>(
          <div key={i} className="evt">
            <div className="evt-dot" style={{background:e.color}}/>
            <div style={{flex:1}}>
              <div className="evt-name">{e.name}</div>
              <div className="evt-date">{mname.split(' ')[0]} {e.day}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div className="badge" style={{background:e.color+'20',color:e.color,border:`1px solid ${e.color}40`}}>{e.type}</div>
              <div onClick={()=>setEvents(events.filter((_,j)=>j!==i))}
                style={{fontSize:14,color:'#8AAD95',cursor:'pointer',padding:'0 4px'}}>×</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================== PERIOD ===================
const Period = () => {
  const [editing, setEditing] = useState(false);
  const [cycleLen, setCycleLen] = useState(28);
  const [lastStart, setLastStart] = useState('2026-02-18');
  const [flowDays, setFlowDays] = useState(5);

  const today = new Date();
  const last = new Date(lastStart);
  const daysSince = Math.floor((today - last) / 86400000);
  const currentDay = (daysSince % cycleLen) + 1;
  const pct = (currentDay / cycleLen) * 100;

  const nextPeriod = new Date(last);
  nextPeriod.setDate(nextPeriod.getDate() + Math.ceil(daysSince / cycleLen) * cycleLen);
  const daysUntil = Math.floor((nextPeriod - today) / 86400000);

  const getPhase = () => {
    if (currentDay <= flowDays) return {name:'Menstrual', color:'#c97c5d'};
    if (currentDay <= 13) return {name:'Follicular', color:'#d4956a'};
    if (currentDay <= 16) return {name:'Ovulation', color:'#4A9B6F'};
    return {name:'Luteal', color:'#9b72cf'};
  };
  const phase = getPhase();

  const fertileStart = 11, fertileEnd = 16;

  return (
    <div>
      {editing && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>setEditing(false)}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:300,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,marginBottom:20,color:'#1A2E1F'}}>
              Edit Cycle Settings
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:11,color:'#8AAD95',marginBottom:6}}>Cycle Length (days)</div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div onClick={()=>setCycleLen(Math.max(21,cycleLen-1))}
                  style={{width:32,height:32,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18}}>−</div>
                <div style={{fontSize:22,fontFamily:"'Cormorant Garamond',serif",fontWeight:300,minWidth:40,textAlign:'center'}}>{cycleLen}</div>
                <div onClick={()=>setCycleLen(Math.min(40,cycleLen+1))}
                  style={{width:32,height:32,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18}}>+</div>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:11,color:'#8AAD95',marginBottom:6}}>Flow Duration (days)</div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div onClick={()=>setFlowDays(Math.max(2,flowDays-1))}
                  style={{width:32,height:32,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18}}>−</div>
                <div style={{fontSize:22,fontFamily:"'Cormorant Garamond',serif",fontWeight:300,minWidth:40,textAlign:'center'}}>{flowDays}</div>
                <div onClick={()=>setFlowDays(Math.min(10,flowDays+1))}
                  style={{width:32,height:32,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18}}>+</div>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:11,color:'#8AAD95',marginBottom:6}}>Last Period Start Date</div>
              <input type="date" value={lastStart} onChange={e=>setLastStart(e.target.value)}
                style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,
                  fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            </div>
            <div onClick={()=>setEditing(false)}
              style={{padding:'11px',borderRadius:12,background:'#2A6E3F',
                textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>
              Save Changes ✓
            </div>
          </div>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7}}>
        <span style={{fontSize:11,color:C.textMuted}}>Day {currentDay} of {cycleLen}</span>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:11,color:phase.color,fontWeight:500}}>{phase.name} Phase</span>
          <div onClick={()=>setEditing(true)}
            style={{fontSize:10,color:'#4A9B6F',cursor:'pointer',padding:'3px 8px',
              border:'1px solid #A8D5B5',borderRadius:20,background:'#F0F5F1'}}>Edit</div>
        </div>
      </div>
      <div className="cycle-bar"><div className="cycle-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${phase.color},${phase.color}99)`}}/></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:14}}>
        {[
          {name:'Menstrual',color:'#c97c5d',active:currentDay<=flowDays},
          {name:'Follicular',color:'#d4956a',active:currentDay>flowDays&&currentDay<=13},
          {name:'Ovulation',color:'#4A9B6F',active:currentDay>13&&currentDay<=16},
          {name:'Luteal',color:'#9b72cf',active:currentDay>16},
        ].map((p,i)=>(
          <div key={i} className="phase" style={{color:p.color,borderColor:p.color+(p.active?'':'50'),background:p.active?p.color+'20':'transparent'}}>
            {p.active&&<span style={{width:5,height:5,borderRadius:'50%',background:p.color,display:'inline-block',marginRight:4}}/>}
            {p.name}
          </div>
        ))}
      </div>
      <div style={{background:'#F0F5F1',borderRadius:10,padding:'11px 13px',marginBottom:12}}>
        <div style={{fontSize:10,color:C.textMuted,marginBottom:4}}>💊 Next period expected</div>
        <div style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>
          {nextPeriod.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}
          <span style={{fontSize:11,color:C.textMuted}}> · in {daysUntil} days</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {[
          {l:'Avg Cycle',v:`${cycleLen} days`},
          {l:'Last Period',v:new Date(lastStart).toLocaleDateString('en-US',{month:'short',day:'numeric'})},
          {l:'Flow Duration',v:`${flowDays} days`},
          {l:'Fertile Window',v:`Day ${fertileStart}–${fertileEnd}`},
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
  const [tab, setTab] = useState('yoga');
  const [yogaLog, setYogaLog] = useState([
    {id:1, date:'2026-03-09', style:'Hatha', duration:60, teacher:'Sarah', notes:'Great flow, worked on backbends', rating:5},
    {id:2, date:'2026-03-06', style:'Vinyasa', duration:75, teacher:'Online', notes:'Morning session, felt energized', rating:4},
    {id:3, date:'2026-03-03', style:'Yin', duration:90, teacher:'Maya', notes:'Deep stretch, very relaxing', rating:5},
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({date: new Date().toISOString().split('T')[0], style:'Hatha', duration:60, teacher:'', notes:'', rating:5});
  const [done, setDone] = useState([0,2]);

  const styles = ['Hatha','Vinyasa','Yin','Ashtanga','Restorative','Hot Yoga','Power','Kundalini'];
  const totalMin = yogaLog.reduce((s,l)=>s+l.duration,0);
  const thisWeek = yogaLog.filter(l => {
    const d = new Date(l.date), now = new Date();
    return (now - d) / 86400000 <= 7;
  }).length;

  const addLog = () => {
    if (!form.style) return;
    setYogaLog([{id:Date.now(), ...form}, ...yogaLog]);
    setShowAdd(false);
    setForm({date: new Date().toISOString().split('T')[0], style:'Hatha', duration:60, teacher:'', notes:'', rating:5});
  };

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const workoutDays = yogaLog.map(l => {
    const d = new Date(l.date).getDay();
    return d === 0 ? 6 : d - 1;
  });

  return (
    <div>
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>setShowAdd(false)}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:320,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,marginBottom:18,color:'#1A2E1F'}}>🧘 Log Yoga Class</div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Date</div>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}
                style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Style</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {styles.map(s=>(
                  <div key={s} onClick={()=>setForm({...form,style:s})}
                    style={{padding:'5px 11px',borderRadius:20,fontSize:11,cursor:'pointer',
                      background:form.style===s?'#2A6E3F20':'#F7F9F7',
                      border:`1px solid ${form.style===s?'#2A6E3F':'#E2EDE5'}`,
                      color:form.style===s?'#2A6E3F':'#8AAD95'}}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:10,marginBottom:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Duration (min)</div>
                <input type="number" value={form.duration} onChange={e=>setForm({...form,duration:+e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Teacher / Studio</div>
                <input placeholder="Optional" value={form.teacher} onChange={e=>setForm({...form,teacher:e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Notes</div>
              <textarea placeholder="How did it feel?" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
                style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:12,outline:'none',
                  color:'#1A2E1F',background:'#F7F9F7',resize:'none',height:70,fontFamily:'DM Sans,sans-serif'}}/>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:'#8AAD95',marginBottom:5}}>Rating</div>
              <div style={{display:'flex',gap:6}}>
                {[1,2,3,4,5].map(n=>(
                  <div key={n} onClick={()=>setForm({...form,rating:n})}
                    style={{fontSize:20,cursor:'pointer',opacity:n<=form.rating?1:0.3}}>⭐</div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>setShowAdd(false)}
                style={{flex:1,padding:'11px',borderRadius:12,border:'1px solid #E2EDE5',textAlign:'center',cursor:'pointer',fontSize:13,color:'#8AAD95'}}>Cancel</div>
              <div onClick={addLog}
                style={{flex:1,padding:'11px',borderRadius:12,background:'#2A6E3F',textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>Log ✓</div>
            </div>
          </div>
        </div>
      )}

      <div className="tabs">
        <div className={`tab ${tab==='yoga'?'on':''}`} onClick={()=>setTab('yoga')}>🧘 Yoga</div>
        <div className={`tab ${tab==='other'?'on':''}`} onClick={()=>setTab('other')}>🏃 Other</div>
      </div>

      {tab==='yoga' && <>
        <div className="week-bar" style={{marginBottom:12}}>
          {days.map((d,i)=>(
            <div key={i} className={`wb-day ${workoutDays.includes(i)?'done':''} ${i===todayIdx?'today-wd':''}`}>{d}</div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
          {[
            {l:'This Week',v:thisWeek,u:'classes',e:'🧘'},
            {l:'Total Time',v:Math.floor(totalMin/60),u:`hrs ${totalMin%60}min`,e:'⏱'},
            {l:'Sessions',v:yogaLog.length,u:'total',e:'⭐'},
          ].map((s,i)=>(
            <div key={i} style={{background:'#F0F5F1',borderRadius:11,padding:'11px',textAlign:'center'}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.e}</div>
              <div style={{fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}>{s.v}</div>
              <div style={{fontSize:9,color:C.textMuted}}>{s.u}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
          <div className="card-label" style={{marginBottom:0}}><span>📋</span>Class Log</div>
          <div onClick={()=>setShowAdd(true)}
            style={{fontSize:11,color:'#4A9B6F',cursor:'pointer',fontWeight:500,padding:'4px 10px',
              border:'1px solid #A8D5B5',borderRadius:20,background:'#F0F5F1'}}>+ Log Class</div>
        </div>
        {yogaLog.map((l,i)=>(
          <div key={l.id} style={{padding:'13px 15px',background:'#FFFFFF',border:'1px solid #E2EDE5',
            borderRadius:13,marginBottom:8,borderLeft:`3px solid #4A9B6F`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:'#1A2E1F'}}>{l.style} Yoga</div>
                <div style={{fontSize:10,color:'#8AAD95',marginTop:2}}>
                  {new Date(l.date).toLocaleDateString('en-US',{month:'short',day:'numeric',weekday:'short'})}
                  {l.teacher && ` · ${l.teacher}`}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{fontSize:11,color:'#4A9B6F',fontWeight:500}}>{l.duration} min</div>
                <div style={{fontSize:11,color:'#8AAD95'}}>{'⭐'.repeat(l.rating)}</div>
                <div onClick={()=>setYogaLog(yogaLog.filter((_,j)=>j!==i))}
                  style={{fontSize:14,color:'#8AAD95',cursor:'pointer'}}>×</div>
              </div>
            </div>
            {l.notes && <div style={{fontSize:11,color:'#4A6655',marginTop:6,fontStyle:'italic'}}>"{l.notes}"</div>}
          </div>
        ))}
      </>}

      {tab==='other' && <>
        <div className="week-bar" style={{marginBottom:12}}>
          {days.map((d,i)=>(
            <div key={i} className={`wb-day ${[0,1,2].includes(i)?'done':''} ${i===todayIdx?'today-wd':''}`}>{d}</div>
          ))}
        </div>
        <div className="card-label"><span>🏆</span>Today's Plan</div>
        {[
          {name:'Morning Run',detail:'5km · 28 min',icon:'🏃'},
          {name:'Bench Press',detail:'4×12 · 60kg',icon:'🏋️'},
          {name:'Pull-ups',detail:'3×10',icon:'💪'},
          {name:'Plank',detail:'3×60s',icon:'⚡'},
        ].map((ex,i)=>(
          <div key={i} className="ex-item" style={{opacity:done.includes(i)?0.55:1}} onClick={()=>setDone(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i])}>
            <div className={`ex-check ${done.includes(i)?'on':''}`}>{done.includes(i)&&'✓'}</div>
            <span style={{fontSize:15}}>{ex.icon}</span>
            <div className="ex-name">{ex.name}</div>
            <div className="ex-detail">{ex.detail}</div>
          </div>
        ))}
      </>}
    </div>
  );
};

// =================== READING ===================
const Reading = () => {
  const [tab, setTab] = useState('book');
  const [books, setBooks] = useState([
    {id:1, title:'The Psychology of Money', author:'Morgan Housel', emoji:'💰', prog:68},
    {id:2, title:'Atomic Habits', author:'James Clear', emoji:'⚡', prog:92},
    {id:3, title:'Deep Work', author:'Cal Newport', emoji:'🎯', prog:31},
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({title:'', author:'', emoji:'📖', prog:0});

  const pods = [
    {title:'Huberman Lab', ep:'Ep.183 · Sleep Optimization', emoji:'🎙', prog:45},
    {title:'How I Built This', ep:'Ep.412 · Patagonia', emoji:'🏔', prog:72},
    {title:'Tim Ferriss Show', ep:'Ep.678 · Naval Ravikant', emoji:'🎧', prog:20},
  ];

  const openWeChat = () => {
    window.location.href = 'weread://';
    setTimeout(() => {
      window.open('https://weread.qq.com', '_blank');
    }, 800);
  };

  const saveBook = () => {
    if (!form.title.trim()) return;
    if (editId) {
      setBooks(books.map(b => b.id === editId ? {...b, ...form} : b));
      setEditId(null);
    } else {
      setBooks([...books, {id: Date.now(), ...form}]);
    }
    setForm({title:'', author:'', emoji:'📖', prog:0});
    setShowAdd(false);
  };

  const startEdit = (b) => {
    setForm({title:b.title, author:b.author, emoji:b.emoji, prog:b.prog});
    setEditId(b.id);
    setShowAdd(true);
  };

  const emojis = ['📖','💰','⚡','🎯','🌿','🧠','💡','🔥','🌊','🌸','🏔','✨'];

  return (
    <div>
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>{setShowAdd(false);setEditId(null);}}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:310,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,marginBottom:18,color:'#1A2E1F'}}>
              {editId ? 'Edit Book' : 'Add Book'}
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
              {emojis.map(em=>(
                <div key={em} onClick={()=>setForm({...form,emoji:em})}
                  style={{fontSize:20,cursor:'pointer',padding:4,borderRadius:8,
                    background:form.emoji===em?'#2A6E3F20':'transparent',
                    border:`1px solid ${form.emoji===em?'#2A6E3F':'transparent'}`}}>
                  {em}
                </div>
              ))}
            </div>
            <input placeholder="Book title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,marginBottom:10,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <input placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,marginBottom:12,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                <div style={{fontSize:10,color:'#8AAD95'}}>Progress</div>
                <div style={{fontSize:11,color:'#2A6E3F',fontWeight:500}}>{form.prog}%</div>
              </div>
              <input type="range" min="0" max="100" value={form.prog} onChange={e=>setForm({...form,prog:+e.target.value})}
                style={{width:'100%',accentColor:'#2A6E3F'}}/>
            </div>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>{setShowAdd(false);setEditId(null);}}
                style={{flex:1,padding:'10px',borderRadius:12,border:'1px solid #E2EDE5',textAlign:'center',cursor:'pointer',fontSize:13,color:'#8AAD95'}}>Cancel</div>
              <div onClick={saveBook}
                style={{flex:1,padding:'10px',borderRadius:12,background:'#2A6E3F',textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>
                {editId ? 'Save ✓' : 'Add ✓'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tabs">
        <div className={`tab ${tab==='book'?'on':''}`} onClick={()=>setTab('book')}>📚 WeChat Books</div>
        <div className={`tab ${tab==='pod'?'on':''}`} onClick={()=>setTab('pod')}>🎧 Apple Podcasts</div>
      </div>

      {tab==='book' && <>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div className="card-label" style={{marginBottom:0}}><span>📖</span>Reading List</div>
          <div onClick={()=>setShowAdd(true)}
            style={{fontSize:11,color:'#4A9B6F',cursor:'pointer',fontWeight:500,padding:'4px 10px',border:'1px solid #A8D5B5',borderRadius:20,background:'#F0F5F1'}}>+ Add Book</div>
        </div>
        {books.map((b,i)=>(
          <div key={b.id} className="media-item">
            <div className="media-cov" style={{background:'#2A6E3F20'}}>{b.emoji}</div>
            <div style={{flex:1}}>
              <div className="media-title">{b.title}</div>
              <div className="media-sub">{b.author}</div>
              <div className="media-prog"><div className="media-prog-fill" style={{width:`${b.prog}%`}}/></div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:11,color:'#4A9B6F',fontWeight:600}}>{b.prog}%</span>
              <div onClick={()=>startEdit(b)} style={{fontSize:12,color:'#8AAD95',cursor:'pointer',padding:'2px 6px'}}>✏️</div>
              <div onClick={()=>setBooks(books.filter(x=>x.id!==b.id))} style={{fontSize:13,color:'#8AAD95',cursor:'pointer'}}>×</div>
            </div>
          </div>
        ))}
        <div style={{textAlign:'center',marginTop:8}}>
          <div style={{padding:'10px 14px',background:'#F7F9F7',border:'1px solid #E2EDE5',borderRadius:12,marginBottom:10,fontSize:11,color:'#8AAD95',lineHeight:1.6}}>
            📱 Progress below is manually tracked. Tap "Open WeChat Books" to sync your real reading progress, then update here.
          </div>
          <div className="open-btn" onClick={openWeChat}
            style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6}}>
            📱 Open WeChat Books
          </div>
        </div>
      </>}

      {tab==='pod' && <>
        {pods.map((p,i)=>(
          <div key={i} className="media-item">
            <div className="media-cov" style={{background:'#F0F5F1'}}>{p.emoji}</div>
            <div style={{flex:1}}>
              <div className="media-title">{p.title}</div>
              <div className="media-sub">{p.ep}</div>
              <div className="media-prog"><div className="media-prog-fill" style={{width:`${p.prog}%`}}/></div>
            </div>
            <div style={{width:30,height:30,borderRadius:'50%',background:'#2A6E3F',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,cursor:'pointer',color:'white'}}>▶</div>
          </div>
        ))}
        <div style={{textAlign:'center',marginTop:8}}>
          <div className="open-btn" onClick={()=>window.open('podcast://','_blank')} style={{cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6}}>
            🎵 Open Apple Podcasts
          </div>
        </div>
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
  const [trips, setTrips] = useState([
    {id:1, name:'Zhangjiajie', type:'Nature', date:'Apr 12–18', emoji:'⛰️', status:'Planning', notes:'Book cable car tickets'},
    {id:2, name:'Wuyi Camping', type:'Camping', date:'May 3–5', emoji:'🏕️', status:'Confirmed', notes:'Campsite booked at site B3'},
    {id:3, name:'Tokyo Trip', type:'City', date:'Jun 20–28', emoji:'🗾', status:'Dreaming', notes:''},
    {id:4, name:'Sanya Beach', type:'Beach', date:'Aug 1–7', emoji:'🌊', status:'Planning', notes:''},
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [showCamping, setShowCamping] = useState(false);
  const [form, setForm] = useState({name:'', type:'Nature', date:'', emoji:'🌍', status:'Dreaming', notes:''});

  const [campingItems, setCampingItems] = useState([
    {id:1, name:'Tent', cat:'Shelter', packed:true},
    {id:2, name:'Sleeping bag', cat:'Shelter', packed:true},
    {id:3, name:'Sleeping pad', cat:'Shelter', packed:false},
    {id:4, name:'Headlamp + batteries', cat:'Lighting', packed:true},
    {id:5, name:'Camp stove + fuel', cat:'Cooking', packed:false},
    {id:6, name:'Cookware set', cat:'Cooking', packed:false},
    {id:7, name:'Water filter', cat:'Water', packed:true},
    {id:8, name:'First aid kit', cat:'Safety', packed:true},
    {id:9, name:'Rain jacket', cat:'Clothing', packed:false},
    {id:10, name:'Hiking boots', cat:'Clothing', packed:true},
    {id:11, name:'Sunscreen SPF50', cat:'Personal', packed:false},
    {id:12, name:'Insect repellent', cat:'Personal', packed:false},
  ]);
  const [newGear, setNewGear] = useState('');
  const [newGearCat, setNewGearCat] = useState('Other');

  const statusColors = {Planning:'#4A9B6F', Confirmed:'#2A6E3F', Dreaming:'#9b72cf'};
  const types = ['Nature','Camping','City','Beach','Mountain','Road Trip','Cultural'];
  const emojis = ['🌍','⛰️','🏕️','🗾','🌊','🏖️','🏙️','🌸','🎌','🏔️','🚗','✈️'];
  const statuses = ['Dreaming','Planning','Confirmed'];
  const gearCats = ['Shelter','Lighting','Cooking','Water','Safety','Clothing','Personal','Other'];

  const packedCount = campingItems.filter(x=>x.packed).length;

  const openAddTrip = () => {
    setEditTrip(null);
    setForm({name:'', type:'Nature', date:'', emoji:'🌍', status:'Dreaming', notes:''});
    setShowAdd(true);
  };

  const openEditTrip = (t) => {
    setEditTrip(t.id);
    setForm({name:t.name, type:t.type, date:t.date, emoji:t.emoji, status:t.status, notes:t.notes});
    setShowAdd(true);
  };

  const saveTrip = () => {
    if (!form.name.trim()) return;
    if (editTrip) {
      setTrips(trips.map(t => t.id === editTrip ? {...t, ...form} : t));
    } else {
      setTrips([...trips, {id:Date.now(), ...form}]);
    }
    setShowAdd(false);
    setEditTrip(null);
  };

  const addGear = () => {
    if (!newGear.trim()) return;
    setCampingItems([...campingItems, {id:Date.now(), name:newGear, cat:newGearCat, packed:false}]);
    setNewGear('');
  };

  return (
    <div>
      {/* Add/Edit Trip Modal */}
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>{setShowAdd(false);setEditTrip(null);}}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:320,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,marginBottom:18,color:'#1A2E1F'}}>
              {editTrip ? '✏️ Edit Trip' : '✈️ New Trip'}
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
              {emojis.map(em=>(
                <div key={em} onClick={()=>setForm({...form,emoji:em})}
                  style={{fontSize:20,cursor:'pointer',padding:4,borderRadius:8,
                    background:form.emoji===em?'#2A6E3F20':'transparent',
                    border:`1px solid ${form.emoji===em?'#2A6E3F':'transparent'}`}}>
                  {em}
                </div>
              ))}
            </div>
            <input placeholder="Destination *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,marginBottom:10,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <input placeholder="Dates (e.g. Apr 12–18)" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:13,marginBottom:10,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <div style={{display:'flex',gap:8,marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:4}}>Type</div>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}
                  style={{width:'100%',padding:'9px 10px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:12,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}>
                  {types.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:4}}>Status</div>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}
                  style={{width:'100%',padding:'9px 10px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:12,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}>
                  {statuses.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <textarea placeholder="Notes..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:12,marginBottom:16,outline:'none',
                color:'#1A2E1F',background:'#F7F9F7',resize:'none',height:60,fontFamily:'DM Sans,sans-serif'}}/>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>{setShowAdd(false);setEditTrip(null);}}
                style={{flex:1,padding:'10px',borderRadius:12,border:'1px solid #E2EDE5',textAlign:'center',cursor:'pointer',fontSize:13,color:'#8AAD95'}}>Cancel</div>
              <div onClick={saveTrip}
                style={{flex:1,padding:'10px',borderRadius:12,background:'#2A6E3F',textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>
                {editTrip ? 'Save ✓' : 'Add ✓'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camping Checklist Modal */}
      {showCamping && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>setShowCamping(false)}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:340,boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'85vh',overflowY:'auto'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'#1A2E1F'}}>⛺ Camping Gear</div>
              <div onClick={()=>setShowCamping(false)} style={{fontSize:20,color:'#8AAD95',cursor:'pointer'}}>×</div>
            </div>
            <div style={{fontSize:11,color:'#4A9B6F',marginBottom:16}}>{packedCount} / {campingItems.length} packed</div>

            {/* Progress bar */}
            <div style={{height:4,background:'#E2EDE5',borderRadius:2,marginBottom:16,overflow:'hidden'}}>
              <div style={{height:'100%',background:'#2A6E3F',borderRadius:2,width:`${(packedCount/campingItems.length)*100}%`,transition:'width 0.3s'}}/>
            </div>

            {/* Group by category */}
            {gearCats.filter(cat=>campingItems.some(i=>i.cat===cat)).map(cat=>(
              <div key={cat} style={{marginBottom:12}}>
                <div style={{fontSize:9,color:'#8AAD95',letterSpacing:1.5,textTransform:'uppercase',marginBottom:6}}>{cat}</div>
                {campingItems.filter(i=>i.cat===cat).map(item=>(
                  <div key={item.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid #F0F5F1'}}>
                    <div onClick={()=>setCampingItems(campingItems.map(x=>x.id===item.id?{...x,packed:!x.packed}:x))}
                      style={{width:20,height:20,borderRadius:6,border:`2px solid ${item.packed?'#2A6E3F':'#E2EDE5'}`,
                        background:item.packed?'#2A6E3F':'transparent',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
                      {item.packed&&<span style={{color:'white',fontSize:10}}>✓</span>}
                    </div>
                    <div style={{flex:1,fontSize:13,color:item.packed?'#8AAD95':'#1A2E1F',textDecoration:item.packed?'line-through':'none'}}>{item.name}</div>
                    <div onClick={()=>setCampingItems(campingItems.filter(x=>x.id!==item.id))}
                      style={{fontSize:13,color:'#8AAD95',cursor:'pointer',padding:'0 4px'}}>×</div>
                  </div>
                ))}
              </div>
            ))}

            {/* Add gear */}
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <input placeholder="Add item..." value={newGear} onChange={e=>setNewGear(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&addGear()}
                style={{flex:1,padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:12,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
              <select value={newGearCat} onChange={e=>setNewGearCat(e.target.value)}
                style={{padding:'9px 8px',border:'1px solid #E2EDE5',borderRadius:10,fontSize:11,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}>
                {gearCats.map(c=><option key={c}>{c}</option>)}
              </select>
              <div onClick={addGear}
                style={{padding:'9px 14px',borderRadius:10,background:'#2A6E3F',color:'#fff',fontSize:13,cursor:'pointer',fontWeight:500}}>+</div>
            </div>
          </div>
        </div>
      )}

      {/* Trip grid */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div className="card-label" style={{marginBottom:0}}><span>✈️</span>My Trips</div>
        <div onClick={openAddTrip}
          style={{fontSize:11,color:'#4A9B6F',cursor:'pointer',fontWeight:500,padding:'4px 10px',border:'1px solid #A8D5B5',borderRadius:20,background:'#F0F5F1'}}>+ Add Trip</div>
      </div>
      <div className="g2" style={{marginBottom:14}}>
        {trips.map((t)=>(
          <div key={t.id} className="trip-card" style={{position:'relative'}}>
            <div style={{position:'absolute',top:8,right:8,display:'flex',gap:4}}>
              <div onClick={()=>openEditTrip(t)} style={{fontSize:12,cursor:'pointer',opacity:0.5}}>✏️</div>
              <div onClick={()=>setTrips(trips.filter(x=>x.id!==t.id))} style={{fontSize:13,color:'#8AAD95',cursor:'pointer',lineHeight:1}}>×</div>
            </div>
            <div className="trip-emoji">{t.emoji}</div>
            <div className="trip-name">{t.name}</div>
            <div className="trip-date">{t.date} · {t.type}</div>
            {t.notes && <div style={{fontSize:9,color:'#8AAD95',marginTop:4,fontStyle:'italic'}}>{t.notes}</div>}
            <div className="badge" style={{marginTop:8,background:statusColors[t.status]+'20',color:statusColors[t.status],border:`1px solid ${statusColors[t.status]}40`}}>{t.status}</div>
          </div>
        ))}
      </div>

      {/* Camping checklist banner */}
      <div onClick={()=>setShowCamping(true)}
        style={{padding:'14px 16px',background:'#F0F5F1',borderRadius:14,display:'flex',gap:12,alignItems:'center',cursor:'pointer',
          border:'1px solid #E2EDE5',transition:'all 0.2s'}}
        onMouseEnter={e=>e.currentTarget.style.borderColor='#A8D5B5'}
        onMouseLeave={e=>e.currentTarget.style.borderColor='#E2EDE5'}>
        <span style={{fontSize:26}}>🗺</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:2,color:'#1A2E1F'}}>Camping Checklist</div>
          <div style={{fontSize:10,color:'#8AAD95'}}>Wuyi Mountains · {packedCount}/{campingItems.length} items packed</div>
          <div style={{height:3,background:'#E2EDE5',borderRadius:2,marginTop:6,overflow:'hidden'}}>
            <div style={{height:'100%',background:'#4A9B6F',width:`${(packedCount/campingItems.length)*100}%`}}/>
          </div>
        </div>
        <div style={{fontSize:11,color:'#4A9B6F',fontWeight:500}}>View →</div>
      </div>
    </div>
  );
};

// =================== JOURNAL (Supabase connected) ===================
const Journal = () => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadEntries(); }, []);

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    if (data) setEntries(data);
    if (error) console.error('Load error:', error);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('journal_entries').insert({
      text: text.trim(),
      mood: mood || '💚',
      tags: [],
      user_id: 'nikki',
    });
    if (error) { console.error('Save error:', error); }
    else { setText(''); setMood(null); await loadEntries(); }
    setSaving(false);
  };

  const fmtTime = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    const hhmm = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    if (diffDays === 0) return `Today ${hhmm}`;
    if (diffDays === 1) return `Yesterday ${hhmm}`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const moods = ['🌿','☀️','🌙','💭','🔥','🌧','✨','💚'];

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
          <button className="journal-save" onClick={handleSave} disabled={saving}>
            {saving ? '...' : 'Save ✓'}
          </button>
        </div>
      </div>

      <div className="sec-hdr">
        <div className="sec-title">Past Entries</div>
        <div className="sec-action">View All →</div>
      </div>
      {entries.length === 0 && (
        <div style={{textAlign:'center', color: C.textFaint, fontSize: 13, padding: '24px 0'}}>
          No entries yet — write your first one above 🌿
        </div>
      )}
      {entries.map((e, i) => (
        <div key={e.id || i} className="journal-entry">
          <div className="je-header">
            <div className="je-time">{fmtTime(e.created_at)}</div>
            <div className="je-mood">{e.mood || '💚'}</div>
          </div>
          <div className="je-text">{e.text}</div>
          {e.tags && e.tags.length > 0 && (
            <div className="je-tags">
              {e.tags.map((t, j) => <span key={j} className="je-tag"># {t}</span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// =================== DAILY SCHEDULE (Supabase connected) ===================
const Schedule = () => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({title:'', time:'09:00', cat:'Work', meta:''});

  const CATS = {
    Fitness:{color:'#53976F'}, Habit:{color:'#007D62'}, Work:{color:'#5a7a9e'},
    Life:{color:'#9e7a5a'}, Reading:{color:'#6a5a9e'}, People:{color:'#c97c5d'},
  };

  const DEFAULT_ITEMS = [
    { title: 'Morning Run 5km', time: '07:00', meta: 'Fitness · 30 min', cat: 'Fitness', cat_color: '#53976F', done: false },
    { title: 'Meditation & Journaling', time: '08:30', meta: 'Mindfulness · 15 min', cat: 'Habit', cat_color: '#007D62', done: false },
    { title: 'Deep Work · Project A', time: '09:00', meta: 'Work · 2 hours', cat: 'Work', cat_color: '#5a7a9e', done: false },
    { title: 'Reply Emails & Messages', time: '11:30', meta: 'Work · 30 min', cat: 'Work', cat_color: '#5a7a9e', done: false },
    { title: 'Lunch + Walk', time: '12:30', meta: 'Rest · 1 hour', cat: 'Life', cat_color: '#9e7a5a', done: false },
    { title: 'Read · Atomic Habits', time: '14:00', meta: 'Learning · 45 min', cat: 'Reading', cat_color: '#6a5a9e', done: false },
    { title: 'Call Mom', time: '17:00', meta: 'Family · remember birthday gift', cat: 'People', cat_color: '#c97c5d', done: false },
    { title: 'Yoga', time: '18:30', meta: 'Fitness · 40 min', cat: 'Fitness', cat_color: '#53976F', done: false },
    { title: 'Daily Review & Plan Tomorrow', time: '21:00', meta: 'Habit · 15 min', cat: 'Habit', cat_color: '#007D62', done: false },
  ];

  const today = () => new Date().toISOString().split('T')[0];

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    const { data } = await supabase
      .from('schedule_items')
      .select('*')
      .eq('date', today())
      .order('time');
    if (data && data.length > 0) {
      setItems(data);
    } else {
      const toInsert = DEFAULT_ITEMS.map(it => ({ ...it, user_id: 'nikki', date: today() }));
      const { data: inserted } = await supabase.from('schedule_items').insert(toInsert).select();
      if (inserted) setItems(inserted);
    }
    setLoaded(true);
  };

  const toggle = async (item) => {
    const { data } = await supabase
      .from('schedule_items')
      .update({ done: !item.done })
      .eq('id', item.id)
      .select()
      .single();
    if (data) setItems(items.map(it => it.id === item.id ? data : it));
  };

  const doneCount = items.filter(x => x.done).length;

  const addItem = async () => {
    if (!newItem.title.trim()) return;
    const cat_color = CATS[newItem.cat]?.color || '#4A9B6F';
    const item = { ...newItem, cat_color, done: false, user_id: 'nikki', date: today() };
    const { data } = await supabase.from('schedule_items').insert(item).select().single();
    if (data) setItems([...items, data].sort((a,b) => a.time.localeCompare(b.time)));
    setShowAdd(false);
    setNewItem({title:'', time:'09:00', cat:'Work', meta:''});
  };

  return (
    <div>
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={()=>setShowAdd(false)}>
          <div style={{background:'#fff',borderRadius:20,padding:24,width:310,boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,marginBottom:18,color:'#1A2E1F'}}>New Event</div>
            <input placeholder="Title *" value={newItem.title}
              onChange={e=>setNewItem({...newItem,title:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,
                fontSize:13,marginBottom:10,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <div style={{display:'flex',gap:10,marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:4}}>Time</div>
                <input type="time" value={newItem.time}
                  onChange={e=>setNewItem({...newItem,time:e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,
                    fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'#8AAD95',marginBottom:4}}>Category</div>
                <select value={newItem.cat} onChange={e=>setNewItem({...newItem,cat:e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid #E2EDE5',borderRadius:10,
                    fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}>
                  {Object.keys(CATS).map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <input placeholder="Note (optional)" value={newItem.meta}
              onChange={e=>setNewItem({...newItem,meta:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid #E2EDE5',borderRadius:10,
                fontSize:13,marginBottom:16,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>setShowAdd(false)}
                style={{flex:1,padding:'10px',borderRadius:12,border:'1px solid #E2EDE5',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'#8AAD95'}}>Cancel</div>
              <div onClick={addItem}
                style={{flex:1,padding:'10px',borderRadius:12,background:'#2A6E3F',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',fontWeight:500}}>Add ✓</div>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        padding: '12px 16px', background: '#F0F5F1', borderRadius: 12,
        border: `1px solid ${C.guanLv}30` }}>
        <div style={{ fontSize: 24 }}>📋</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 5 }}>Today's Progress</div>
          <div style={{ height: 5, background: '#F7F9F7', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: items.length ? `${(doneCount/items.length*100).toFixed(0)}%` : '0%',
              height: '100%', background: `linear-gradient(90deg, ${C.guanLv}, ${C.kongQue})`,
              borderRadius: 3, transition: 'width 0.4s ease' }} />
          </div>
        </div>
        <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: C.siLv }}>
          {doneCount}<span style={{ fontSize: 11, color: C.textMuted }}>/{items.length}</span>
        </div>
      </div>

      {!loaded && <div style={{textAlign:'center',color:C.textFaint,fontSize:12,padding:'20px 0'}}>Loading…</div>}

      <div className="schedule-timeline">
        {items.map((it) => (
          <div key={it.id} className={`sched-item ${it.done?'done':''}`} onClick={() => toggle(it)}>
            <div className="sched-time">{it.time}</div>
            <div className="sched-dot" />
            <div className="sched-block">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div className="sched-title">{it.title}</div>
              </div>
              <div className="sched-meta">
                <div className="sched-cat" style={{ color: it.cat_color, borderColor: it.cat_color+'50', background: it.cat_color+'15' }}>{it.cat}</div>
                <span>{it.meta}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="add-sched-btn" onClick={()=>setShowAdd(true)}>
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
    { id:1, name: 'Self-intro practice', dur: '1:32', date:'Mar 9', bars: [4,8,14,20,28,22,16,10,6,12,18,24,20,14,8,4,6,10,16,20,14,8] },
    { id:2, name: 'Morning reflection', dur: '0:47', date:'Mar 8', bars: [6,12,8,18,24,16,10,6,8,14,20,16,10,6,4,8,12,16,12,8,4,6] },
    { id:3, name: 'TED shadow: Brené Brown', dur: '2:15', date:'Mar 6', bars: [8,14,20,26,30,24,18,12,8,10,16,22,28,24,18,12,8,12,18,22,16,10] },
  ]);
  const [editRecId, setEditRecId] = useState(null);
  const [editName, setEditName] = useState('');
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [timerRef] = useState({interval: null});

  const teds = [
    { title:'The Power of Vulnerability', speaker:'Brené Brown', duration:'20 min', tags:['Authenticity','Connection'], color:'#8B4513', emoji:'💭', level:'Intermediate',
      url:'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability' },
    { title:'Your Body Language May Shape Who You Are', speaker:'Amy Cuddy', duration:'21 min', tags:['Confidence','Presence'], color:'#2c5f7a', emoji:'🧠', level:'Beginner',
      url:'https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are' },
    { title:'The Surprising Science of Happiness', speaker:'Dan Gilbert', duration:'21 min', tags:['Psychology','Joy'], color:'#5a4a8a', emoji:'✨', level:'Beginner',
      url:'https://www.ted.com/talks/dan_gilbert_asks_why_are_we_happy' },
    { title:'How Great Leaders Inspire Action', speaker:'Simon Sinek', duration:'18 min', tags:['Leadership','Purpose'], color:'#2d6a4f', emoji:'🎯', level:'Intermediate',
      url:'https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action' },
    { title:'Do Schools Kill Creativity?', speaker:'Ken Robinson', duration:'19 min', tags:['Education','Creativity'], color:'#7a5a2d', emoji:'🎨', level:'Advanced',
      url:'https://www.ted.com/talks/sir_ken_robinson_do_schools_kill_creativity' },
    { title:'Inside the Mind of a Master Procrastinator', speaker:'Tim Urban', duration:'14 min', tags:['Humor','Productivity'], color:'#3d5a8a', emoji:'🦍', level:'Beginner',
      url:'https://www.ted.com/talks/tim_urban_inside_the_mind_of_a_master_procrastinator' },
  ];

  // Material library — categorized prompts for expression practice
  const materials = {
    storytelling: [
      { text:'Describe a moment that completely changed how you see the world. Speak for 2 minutes.', hint:'Use vivid imagery and a clear turning point.' },
      { text:'Tell a story about a person who influenced you — with a beginning, conflict, and resolution.', hint:'Use the "what happened → what it meant" structure.' },
      { text:'Recall a time you failed at something important. What did it teach you?', hint:'Vulnerability creates connection. Don\'t skip the hard part.' },
      { text:'Describe a place that feels like home to you. Why does it feel that way?', hint:'Use all five senses to paint the scene.' },
    ],
    shadowing: [
      { text:'Listen to Amy Cuddy\'s opening 30 seconds. Record yourself mimicking her pace and rhythm.', hint:'Focus on pauses and vocal variety, not just words.' },
      { text:'Shadow Simon Sinek\'s "Start With Why" opening — match his calm, deliberate tone.', hint:'Slow down. Leaders don\'t rush.' },
      { text:'Pick any 1-minute clip from a TED talk you love. Shadow it 3 times, improving each time.', hint:'Record all 3 attempts. Compare them.' },
    ],
    impromptu: [
      { text:'You have 30 seconds to prepare, then speak for 2 minutes on: "What makes a good friend?"', hint:'Structure: Point → Reason → Example → Point again.' },
      { text:'Impromptu: "If you could change one thing about how you grew up, what would it be?"', hint:'Be honest. Authenticity beats polish.' },
      { text:'Speak for 90 seconds on something you changed your mind about recently.', hint:'Show your thinking process, not just the conclusion.' },
      { text:'Describe your morning routine as if you\'re selling it to someone.', hint:'Use enthusiasm. Energy is contagious.' },
    ],
    debate: [
      { text:'Argue FOR: "Social media does more good than harm." 2 minutes.', hint:'Pick your strongest 2 points. Don\'t scatter.' },
      { text:'Argue AGAINST: "AI will make human creativity irrelevant."', hint:'Use specific examples. Abstract arguments lose.' },
      { text:'Make the case for a habit or hobby most people underestimate.', hint:'Lead with the surprising benefit, not the obvious one.' },
    ],
  };

  const catLabels = {storytelling:'📖 Storytelling', shadowing:'🎙 Shadowing', impromptu:'⚡ Impromptu', debate:'🗣 Debate'};
  const [matCat, setMatCat] = useState('storytelling');
  const [matIdx, setMatIdx] = useState(0);
  const currentPrompt = materials[matCat][matIdx];

  const shuffle = () => setMatIdx(Math.floor(Math.random() * materials[matCat].length));

  // Recording timer using ref to avoid stale closure
  const startTimer = () => {
    timerRef.interval = setInterval(() => setSeconds(s => s + 1), 1000);
  };
  const stopTimer = () => {
    clearInterval(timerRef.interval);
  };

  const toggleRec = () => {
    if (recording) {
      stopTimer();
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const dur = `${mins}:${secs.toString().padStart(2,'0')}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US',{month:'short',day:'numeric'});
      setRecordings(prev => [
        { id: Date.now(), name: `Recording ${dateStr}`, dur, date: dateStr,
          bars: Array.from({length:22}, ()=>Math.floor(Math.random()*28)+4) },
        ...prev
      ]);
      setSeconds(0);
    } else {
      startTimer();
    }
    setRecording(r => !r);
  };

  const deleteRec = (id) => setRecordings(r => r.filter(x => x.id !== id));
  const saveEditName = (id) => {
    setRecordings(r => r.map(x => x.id === id ? {...x, name: editName} : x));
    setEditRecId(null);
  };

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const heights = [4,8,14,20,26,30,26,20,14,8,4,6,10,16,22,28,24,18,12,6,4,8,14,20,24,20,14,8];

  return (
    <div>
      {/* Stats */}
      <div className="speak-stats fu">
        {[
          {v: recordings.length, l:'Recordings'},
          {v:'3.2h', l:'Practiced'},
          {v: teds.length, l:'TED Talks'},
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
        <div className={`tab ${tab==='materials'?'on':''}`} onClick={()=>setTab('materials')}>💡 Materials</div>
      </div>

      {/* ── TED Talks ── */}
      {tab === 'ted' && (
        <div className="fu">
          <div style={{fontSize:11,color:C.textMuted,marginBottom:14,letterSpacing:0.5}}>
            Click to expand · tap "Watch on TED" to open the real talk 🎬
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
                  <span className="ted-tag" style={{color:'#4A9B6F',borderColor:'#2A6E3F50',background:'#2A6E3F15'}}>{t.level}</span>
                </div>
                {activeTed===i && (
                  <div style={{marginTop:10,padding:'12px',background:'#F7F9F7',borderRadius:9}}>
                    <div style={{height:4,background:'#E2EDE5',borderRadius:2,marginBottom:8,overflow:'hidden'}}>
                      <div style={{width:'35%',height:'100%',background:'linear-gradient(90deg,#2A6E3F,#4A9B6F)',borderRadius:2}}/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#8AAD95',marginBottom:10}}>
                      <span>7:21</span><span>{t.duration}</span>
                    </div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      <div onClick={()=>window.open(t.url,'_blank')}
                        style={{padding:'6px 14px',borderRadius:20,background:'#e2231a',color:'#fff',fontSize:11,cursor:'pointer',fontWeight:500,display:'flex',alignItems:'center',gap:4}}>
                        ▶ Watch on TED
                      </div>
                      <div onClick={()=>{setTab('record');}}
                        style={{padding:'6px 14px',borderRadius:20,background:'#2A6E3F15',border:'1px solid #2A6E3F40',color:'#2A6E3F',fontSize:11,cursor:'pointer'}}>
                        🎙 Shadow It
                      </div>
                      <div onClick={()=>{setTab('materials');setMatCat('shadowing');}}
                        style={{padding:'6px 14px',borderRadius:20,background:'#F0F5F1',border:'1px solid #E2EDE5',color:'#8AAD95',fontSize:11,cursor:'pointer'}}>
                        📝 Get Prompt
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div style={{textAlign:'center',marginTop:12}}>
            <div onClick={()=>window.open('https://www.ted.com/talks','_blank')}
              style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 20px',borderRadius:20,
                background:'#e2231a',color:'#fff',fontSize:12,cursor:'pointer',fontWeight:500}}>
              🌐 Browse All TED Talks
            </div>
          </div>
        </div>
      )}

      {/* ── Voice Studio ── */}
      {tab === 'record' && (
        <div className="fu">
          <div className="recorder-wrap" style={{marginBottom:18}}>
            <div className="rec-visualizer">
              {heights.map((h,i) => (
                <div key={i} className={`rec-bar ${recording?'active':''}`}
                  style={{'--h': h+'px', height: recording ? undefined : Math.floor(h*0.3+2)+'px',
                    animationDelay: `${(i*0.05)%0.6}s`, animationDuration: `${0.4+(i%5)*0.1}s`}}/>
              ))}
            </div>
            <div className="rec-timer">{fmt(seconds)}</div>
            <div className={`rec-status ${recording?'live':''}`}>{recording ? '● RECORDING' : 'ready to record'}</div>
            <div className="rec-controls" style={{marginTop:16}}>
              <div className="rec-btn-secondary">⏮</div>
              <button className={`rec-btn-main ${recording?'recording':'idle'}`} onClick={toggleRec}>
                {recording ? '⏹' : '⏺'}
              </button>
              <div className="rec-btn-secondary">▶</div>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
              {['🎙 Mic','🔊 Speaker','⚙ Settings'].map((b,i)=>(
                <div key={i} style={{fontSize:10,color:'#8AAD95',cursor:'pointer',padding:'4px 10px',
                  borderRadius:20,border:'1px solid #E2EDE5',background:'#F7F9F7'}}>{b}</div>
              ))}
            </div>
          </div>

          {/* Recordings list */}
          <div className="sec-hdr">
            <div className="sec-title" style={{fontSize:13}}>My Recordings ({recordings.length})</div>
          </div>
          {recordings.length === 0 && (
            <div style={{textAlign:'center',color:'#8AAD95',fontSize:12,padding:'20px 0'}}>
              No recordings yet — hit ⏺ to start 🎙
            </div>
          )}
          {recordings.map((r) => (
            <div key={r.id} className="rec-entry" style={{position:'relative'}}>
              <div className="rec-play" style={{cursor:'pointer',background:'#2A6E3F',color:'white',borderRadius:'50%',
                width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:10}}>▶</div>
              <div className="rec-info" style={{flex:1}}>
                {editRecId === r.id ? (
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <input value={editName} onChange={e=>setEditName(e.target.value)}
                      onKeyDown={e=>e.key==='Enter'&&saveEditName(r.id)}
                      style={{flex:1,padding:'4px 8px',border:'1px solid #4A9B6F',borderRadius:8,fontSize:12,outline:'none'}}
                      autoFocus/>
                    <div onClick={()=>saveEditName(r.id)}
                      style={{padding:'4px 10px',background:'#2A6E3F',color:'#fff',borderRadius:8,fontSize:11,cursor:'pointer'}}>✓</div>
                  </div>
                ) : (
                  <div className="rec-name" style={{cursor:'pointer'}} onClick={()=>{setEditRecId(r.id);setEditName(r.name);}}>
                    {r.name} <span style={{fontSize:9,color:'#A8D5B5'}}>✏️</span>
                  </div>
                )}
                <div className="rec-dur">{r.dur} · {r.date}</div>
              </div>
              <div className="rec-wave">
                {r.bars.map((h,j) => (
                  <div key={j} className="rec-wv" style={{height:h+'px'}}/>
                ))}
              </div>
              <div onClick={()=>deleteRec(r.id)}
                style={{fontSize:16,color:'#8AAD95',cursor:'pointer',padding:'0 6px',flexShrink:0}}
                title="Delete">×</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Materials Library ── */}
      {tab === 'materials' && (
        <div className="fu">
          <div style={{fontSize:11,color:C.textMuted,marginBottom:14,lineHeight:1.6}}>
            Pick a category, choose a prompt, hit record. The best speakers practice daily 🌿
          </div>

          {/* Category selector */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
            {Object.entries(catLabels).map(([k,v])=>(
              <div key={k} onClick={()=>{setMatCat(k);setMatIdx(0);}}
                style={{padding:'6px 14px',borderRadius:20,fontSize:11,cursor:'pointer',
                  background:matCat===k?'#2A6E3F':'#F7F9F7',
                  color:matCat===k?'#fff':'#4A6655',
                  border:`1px solid ${matCat===k?'#2A6E3F':'#E2EDE5'}`,
                  fontWeight:matCat===k?500:400}}>
                {v}
              </div>
            ))}
          </div>

          {/* Prompt navigator */}
          <div style={{background:'#FFFFFF',border:'1px solid #E2EDE5',borderRadius:16,padding:18,marginBottom:14,
            borderLeft:'3px solid #2A6E3F'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <div style={{fontSize:9,color:'#4A9B6F',letterSpacing:2,textTransform:'uppercase',fontWeight:500}}>
                {catLabels[matCat]} · {matIdx+1}/{materials[matCat].length}
              </div>
              <div style={{display:'flex',gap:6}}>
                <div onClick={()=>setMatIdx(i=>(i-1+materials[matCat].length)%materials[matCat].length)}
                  style={{width:24,height:24,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:12}}>‹</div>
                <div onClick={()=>setMatIdx(i=>(i+1)%materials[matCat].length)}
                  style={{width:24,height:24,borderRadius:'50%',background:'#F0F5F1',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:12}}>›</div>
              </div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:'#1A2E1F',lineHeight:1.7,marginBottom:10}}>
              "{currentPrompt.text}"
            </div>
            <div style={{fontSize:11,color:'#4A9B6F',padding:'8px 12px',background:'#F0F5F1',borderRadius:8}}>
              💡 {currentPrompt.hint}
            </div>
            <div style={{display:'flex',gap:8,marginTop:14}}>
              <div onClick={()=>setTab('record')}
                style={{flex:1,padding:'9px',borderRadius:12,background:'#2A6E3F',color:'#fff',fontSize:12,
                  cursor:'pointer',textAlign:'center',fontWeight:500}}>
                ⏺ Record Now
              </div>
              <div onClick={shuffle}
                style={{padding:'9px 14px',borderRadius:12,background:'#F7F9F7',border:'1px solid #E2EDE5',
                  color:'#8AAD95',fontSize:12,cursor:'pointer'}}>
                ↻ Shuffle
              </div>
            </div>
          </div>

          {/* All prompts in category */}
          <div style={{fontSize:10,color:'#8AAD95',letterSpacing:1.5,textTransform:'uppercase',marginBottom:8}}>All in this category</div>
          {materials[matCat].map((p,i)=>(
            <div key={i} onClick={()=>setMatIdx(i)}
              style={{padding:'11px 14px',background:i===matIdx?'#2A6E3F10':'#F7F9F7',
                border:`1px solid ${i===matIdx?'#4A9B6F':'#E2EDE5'}`,borderRadius:11,marginBottom:7,cursor:'pointer'}}>
              <div style={{fontSize:12,color:'#1A2E1F',lineHeight:1.5}}>{p.text}</div>
            </div>
          ))}

          {/* Technique tips */}
          <div style={{marginTop:16}}>
            <div className="sec-hdr" style={{marginBottom:10}}>
              <div className="sec-title" style={{fontSize:13}}>Expression Techniques</div>
            </div>
            {[
              {icon:'🌊', tip:'Pacing', desc:'Vary your speed. Slow down for important points, speed up for energy.'},
              {icon:'🎭', tip:'Vocal Range', desc:'Raise pitch for excitement, lower for gravity. Monotone kills engagement.'},
              {icon:'⏸', tip:'The Pause', desc:'Silence is powerful. A 2-second pause before a key point doubles its impact.'},
              {icon:'👁', tip:'Eye Contact', desc:'Look at one person per thought, then move. Creates intimacy at scale.'},
            ].map((t,i) => (
              <div key={i} style={{display:'flex',gap:12,padding:'11px 14px',background:'#F0F5F1',
                borderRadius:11,marginBottom:7,border:'1px solid #E2EDE5',alignItems:'flex-start'}}>
                <span style={{fontSize:18,flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:3,color:'#4A9B6F'}}>{t.tip}</div>
                  <div style={{fontSize:11,color:'#8AAD95',lineHeight:1.6}}>{t.desc}</div>
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
const QUOTES = [
  { text: "The best time to plant a tree was ten years ago. The second best time is now.", by: "Chinese Proverb" },
  { text: "You don't have to be great to start, but you have to start to be great.", by: "Zig Ziglar" },
  { text: "Do something today that your future self will thank you for.", by: "Sean Patrick Flanery" },
  { text: "Small steps every day lead to big changes over time.", by: "Daily Reflection · Verdé" },
  { text: "The secret of getting ahead is getting started.", by: "Mark Twain" },
  { text: "You are the average of the five people you spend the most time with.", by: "Jim Rohn" },
  { text: "Discipline is choosing between what you want now and what you want most.", by: "Augusta F. Kantra" },
];

const Dashboard = ({go}) => {
  const todayIdx = new Date().getDay(); // rotate quote by day of week
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  const [todos, setTodos] = useState([
    {id:1, text:'Morning yoga 🧘', done:false},
    {id:2, text:'Read 20 pages 📖', done:false},
    {id:3, text:'Call Mom 📱', done:false},
    {id:4, text:'Journal entry ✍️', done:true},
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);

  const toggleTodo = (id) => setTodos(t => t.map(x => x.id===id ? {...x, done:!x.done} : x));
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(t => [...t, {id:Date.now(), text:newTodo.trim(), done:false}]);
    setNewTodo('');
    setAddingTodo(false);
  };
  const deleteTodo = (id) => setTodos(t => t.filter(x => x.id!==id));

  const upcomingBirthdays = [
    {name:'Mom', emoji:'👩', date:'Mar 15', daysAway:6, color:'#c97c5d'},
    {name:'Lily', emoji:'👧', date:'Mar 22', daysAway:13, color:'#9b72cf'},
  ];

  const doneCount = todos.filter(x=>x.done).length;

  return (
  <div className="fu">
    {/* Quote */}
    <div className="quote-card">
      <div className="quote-mark">"</div>
      <div className="quote-text">{quote.text}</div>
      <div className="quote-by">— {quote.by}</div>
    </div>

    {/* Stats row */}
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
        {/* Today's To-Do */}
        <div className="sec">
          <div className="sec-hdr">
            <div className="sec-title">Today's To-Do</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{fontSize:10,color:'#4A9B6F'}}>{doneCount}/{todos.length} done</div>
              <div className="sec-action" onClick={()=>setAddingTodo(true)}>+ Add</div>
            </div>
          </div>
          <div className="card">
            {/* Progress bar */}
            <div style={{height:3,background:'#E2EDE5',borderRadius:2,marginBottom:14,overflow:'hidden'}}>
              <div style={{height:'100%',background:'#2A6E3F',borderRadius:2,
                width:`${todos.length?((doneCount/todos.length)*100):0}%`,transition:'width 0.4s'}}/>
            </div>
            {todos.map(todo=>(
              <div key={todo.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',
                borderBottom:'1px solid #F0F5F1'}}>
                <div onClick={()=>toggleTodo(todo.id)}
                  style={{width:20,height:20,borderRadius:6,flexShrink:0,cursor:'pointer',
                    border:`2px solid ${todo.done?'#2A6E3F':'#E2EDE5'}`,
                    background:todo.done?'#2A6E3F':'transparent',
                    display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {todo.done&&<span style={{color:'white',fontSize:10}}>✓</span>}
                </div>
                <div style={{flex:1,fontSize:13,color:todo.done?'#8AAD95':'#1A2E1F',
                  textDecoration:todo.done?'line-through':'none'}}>{todo.text}</div>
                <div onClick={()=>deleteTodo(todo.id)}
                  style={{fontSize:15,color:'#E2EDE5',cursor:'pointer',padding:'0 4px'}}
                  onMouseEnter={e=>e.target.style.color='#8AAD95'}
                  onMouseLeave={e=>e.target.style.color='#E2EDE5'}>×</div>
              </div>
            ))}
            {addingTodo && (
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <input autoFocus placeholder="Add a task..." value={newTodo}
                  onChange={e=>setNewTodo(e.target.value)}
                  onKeyDown={e=>{if(e.key==='Enter')addTodo();if(e.key==='Escape')setAddingTodo(false);}}
                  style={{flex:1,padding:'8px 12px',border:'1px solid #4A9B6F',borderRadius:10,
                    fontSize:13,outline:'none',color:'#1A2E1F',background:'#F7F9F7'}}/>
                <div onClick={addTodo}
                  style={{padding:'8px 14px',borderRadius:10,background:'#2A6E3F',
                    color:'#fff',fontSize:13,cursor:'pointer',fontWeight:500}}>✓</div>
              </div>
            )}
            {todos.length===0&&<div style={{textAlign:'center',color:'#8AAD95',fontSize:12,padding:'12px 0'}}>All done! 🌿</div>}
          </div>
        </div>

        {/* Schedule */}
        <div className="sec">
          <div className="sec-hdr">
            <div className="sec-title">Today's Schedule</div>
            <div className="sec-action" onClick={()=>go('schedule')}>Details →</div>
          </div>
          <div className="card"><Schedule/></div>
        </div>

        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Calendar · March 2026</div><div className="sec-action" onClick={()=>go('calendar')}>View All →</div></div>
          <div className="card"><Cal/></div>
        </div>
      </div>

      <div>
        {/* Upcoming Birthdays */}
        <div className="sec">
          <div className="sec-hdr">
            <div className="sec-title">🎂 Birthdays Coming Up</div>
          </div>
          <div className="card" style={{padding:'14px 16px'}}>
            {upcomingBirthdays.map((b,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,
                padding:'9px 0',borderBottom:i<upcomingBirthdays.length-1?'1px solid #F0F5F1':'none'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:b.color+'20',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
                  {b.emoji}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,color:'#1A2E1F',fontWeight:500}}>{b.name}</div>
                  <div style={{fontSize:10,color:'#8AAD95',marginTop:1}}>{b.date}</div>
                </div>
                <div style={{padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:500,
                  background:b.color+'15',color:b.color,border:`1px solid ${b.color}30`}}>
                  in {b.daysAway}d 🎁
                </div>
              </div>
            ))}
            <div onClick={()=>go('calendar')}
              style={{marginTop:10,textAlign:'center',fontSize:11,color:'#4A9B6F',cursor:'pointer'}}>
              Manage all events →
            </div>
          </div>
        </div>

        {/* Quick journal */}
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Thoughts</div><div className="sec-action" onClick={()=>go('journal')}>More →</div></div>
          <div className="card">
            <textarea className="journal-textarea" placeholder="What's on your mind…" style={{minHeight:80}}/>
            <div style={{display:'flex',gap:5,marginTop:8,flexWrap:'wrap'}}>
              {['🌿','☀️','🌙','💭','🔥','✨'].map(m=>(
                <div key={m} className="mood-btn">{m}</div>
              ))}
              <button className="journal-save" style={{marginLeft:'auto'}}>Capture</button>
            </div>
          </div>
        </div>

        {/* Cycle tracker */}
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Cycle Tracker</div><div className="badge" style={{background:'#9b72cf20',color:'#9b72cf',border:'1px solid #9b72cf40'}}>Day 14</div></div>
          <div className="card"><Period/></div>
        </div>

        {/* My People */}
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

        {/* Next trip */}
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Next Adventure</div><div className="sec-action" onClick={()=>go('travel')}>All Trips →</div></div>
          <div className="card">
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <span style={{fontSize:32}}>⛰️</span>
              <div>
                <div style={{fontSize:15,fontWeight:300,fontFamily:"'Cormorant Garamond',serif"}}>Zhangjiajie</div>
                <div style={{fontSize:10,color:'#8AAD95',marginTop:3}}>Apr 12–18 · Nature Trip</div>
                <div style={{marginTop:8,display:'flex',gap:6}}>
                  <span className="badge" style={{background:'#4A9B6F30',color:'#4A9B6F',border:'1px solid #4A9B6F50'}}>in 39 days</span>
                  <span className="badge" style={{background:'#2A6E3F20',color:'#2A6E3F',border:'1px solid #2A6E3F40'}}>Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

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
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
  }, []);

  const MOBILE_NAV = [
    {id:'home',    icon:'⊞',  label:'Home'},
    {id:'schedule',icon:'◷',  label:'Schedule'},
    {id:'journal', icon:'✍️', label:'Journal'},
    {id:'speak',   icon:'🎙', label:'Speak'},
    {id:'more',    icon:'☰',  label:'Menu'},
  ];

  const MORE_MENU = [
    {id:'calendar', icon:'📅', label:'Calendar'},
    {id:'fitness',  icon:'💪', label:'Fitness'},
    {id:'reading',  icon:'📚', label:'Reading'},
    {id:'travel',   icon:'✈️', label:'Travel'},
    {id:'home',     icon:'⊞',  label:'Home'},
    {id:'schedule', icon:'◷',  label:'Schedule'},
    {id:'journal',  icon:'✍️', label:'Journal'},
    {id:'speak',    icon:'🎙', label:'Speak'},
  ];

  const goTo = (id) => { setView(id); setShowMore(false); };

  const renderPage = () => {
    switch(view) {
      case 'home': return <Dashboard go={goTo}/>;
      case 'schedule': return <div className="card fu"><div className="card-label"><span>◷</span>Today's Schedule</div><Schedule/></div>;
      case 'journal': return <div className="fu"><Journal/></div>;
      case 'calendar': return <div className="g2 fu"><div className="card"><div className="card-label"><span>📅</span>Calendar</div><Cal/></div><div className="card"><div className="card-label"><span>🌸</span>Cycle Tracker</div><Period/></div></div>;
      case 'fitness': return <div className="card fu"><div className="card-label"><span>🏋️</span>Today's Workout</div><Fitness/></div>;
      case 'reading': return <div className="card fu"><Reading/></div>;
      case 'speak': return <div className="fu"><Speak/></div>;
      case 'travel': return <div className="card fu"><div className="card-label"><span>✈️</span>Travel & Camping Plans</div><Travel/></div>;
      default: return null;
    }
  };

  return (
    <>
      <style>{css}</style>
      {splash && <Splash onDone={()=>setSplash(false)}/>}

      {/* More Menu Drawer (mobile) */}
      {showMore && (
        <div style={{position:'fixed',inset:0,zIndex:200,display:'flex',flexDirection:'column',justifyContent:'flex-end'}}
          onClick={()=>setShowMore(false)}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)'}}/>
          <div style={{position:'relative',background:'#FFFFFF',borderRadius:'24px 24px 0 0',
            padding:'20px 20px 40px',boxShadow:'0 -8px 40px rgba(42,110,63,0.15)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{width:36,height:4,background:'#E2EDE5',borderRadius:2,margin:'0 auto 20px'}}/>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:'#1A2E1F',marginBottom:16,textAlign:'center',letterSpacing:1}}>
              All Sections
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
              {MORE_MENU.map(n=>(
                <div key={n.id} onClick={()=>goTo(n.id)}
                  style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,
                    padding:'14px 8px',borderRadius:16,cursor:'pointer',
                    background:view===n.id?'#2A6E3F15':'#F7F9F7',
                    border:`1px solid ${view===n.id?'#4A9B6F':'#E2EDE5'}`}}>
                  <div style={{fontSize:22}}>{n.icon}</div>
                  <div style={{fontSize:10,color:view===n.id?'#2A6E3F':'#8AAD95',fontWeight:view===n.id?600:400}}>{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

        {/* Mobile bottom navigation */}
        <nav className="bottom-nav">
          {MOBILE_NAV.map(n => (
            <div key={n.id}
              className={`bn-item ${(n.id!=='more'&&view===n.id)||(n.id==='more'&&showMore) ? 'active' : ''}`}
              onClick={() => n.id==='more' ? setShowMore(s=>!s) : goTo(n.id)}>
              <div className="bn-icon">{n.icon}</div>
              <div className="bn-label">{n.label}</div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
