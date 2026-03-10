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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&family=Noto+Serif+SC:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-deep:  #1E5C35;
    --green-mid:   #3D8A5F;
    --green-light: #7EC4A0;
    --green-pale:  #C8E8D5;
    --green-wash:  #EEF6F1;
    --cream:       #FAFCFA;
    --white:       #FFFFFF;
    --ink:         #162218;
    --ink-mid:     #3A5040;
    --ink-soft:    #6B8A72;
    --ink-faint:   #A8C4AE;
    --border:      #DFF0E5;
    --border-soft: #EEF6F1;
    --shadow-sm:   0 1px 4px rgba(30,92,53,0.06);
    --shadow-md:   0 4px 20px rgba(30,92,53,0.09);
    --shadow-lg:   0 12px 40px rgba(30,92,53,0.13);
    --radius-sm:   10px;
    --radius-md:   16px;
    --radius-lg:   24px;
    --radius-xl:   32px;
  }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  /* ====== SPLASH ====== */
  .splash {
    position: fixed; inset: 0;
    background: var(--white);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 1000;
    transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .splash.exit { opacity: 0; transform: scale(1.04); pointer-events: none; }

  .splash-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 70% 50% at 20% 70%, #C8E8D540 0%, transparent 60%),
      radial-gradient(ellipse 50% 70% at 80% 20%, #7EC4A018 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 60% 80%, #3D8A5F08 0%, transparent 50%);
  }

  .ink-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid #3D8A5F14;
    animation: inkExpand 6s ease-out infinite;
  }
  .ink-ring:nth-child(1) { width: 160px; height: 160px; animation-delay: 0s; }
  .ink-ring:nth-child(2) { width: 300px; height: 300px; animation-delay: 1s; }
  .ink-ring:nth-child(3) { width: 460px; height: 460px; animation-delay: 2s; }
  .ink-ring:nth-child(4) { width: 640px; height: 640px; animation-delay: 3s; }
  @keyframes inkExpand {
    0% { opacity: 0.7; transform: scale(0.9); }
    100% { opacity: 0; transform: scale(1.1); }
  }

  .splash-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center;
    animation: splashIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  }
  @keyframes splashIn {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .splash-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 66px; font-weight: 300;
    letter-spacing: 14px; color: var(--ink);
    text-transform: uppercase; line-height: 1;
  }
  .splash-wordmark .e-accent { color: var(--green-mid); }
  .splash-cn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px; letter-spacing: 8px;
    color: var(--ink-soft); margin-top: 12px; font-weight: 300;
  }
  .splash-tagline {
    font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
    color: var(--green-mid); opacity: 0.7; margin-top: 22px;
    font-family: 'Outfit', sans-serif; font-weight: 400;
  }
  .splash-bar-wrap { margin-top: 60px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .splash-bar { width: 90px; height: 1px; background: var(--border); overflow: hidden; }
  .splash-bar-fill {
    height: 100%; width: 0;
    background: linear-gradient(90deg, var(--green-deep), var(--green-mid), var(--green-light));
    animation: barFill 2.4s cubic-bezier(0.4,0,0.2,1) 0.4s forwards;
  }
  @keyframes barFill { 0%{width:0} 70%{width:80%} 100%{width:100%} }
  .splash-bar-label {
    font-size: 8px; letter-spacing: 3px; color: var(--ink-faint);
    text-transform: uppercase;
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  /* ====== APP SHELL ====== */
  .app { display: flex; height: 100vh; overflow: hidden; background: var(--cream); }

  /* Sidebar */
  .sidebar {
    width: 72px;
    background: var(--white);
    border-right: 1px solid var(--border-soft);
    display: flex; flex-direction: column; align-items: center;
    padding: 18px 0; gap: 2px; flex-shrink: 0;
    box-shadow: 2px 0 16px rgba(30,92,53,0.05);
  }

  .sb-logo {
    margin-bottom: 20px;
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    cursor: pointer;
  }
  .sb-logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 8px; letter-spacing: 3.5px;
    color: var(--ink-faint); text-transform: uppercase; font-weight: 300;
  }

  .nav-item {
    width: 48px; height: 48px; border-radius: 14px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.18s ease;
    border: 1px solid transparent; gap: 2px;
    position: relative;
  }
  .nav-item::before {
    content: '';
    position: absolute; left: -1px; top: 50%; transform: translateY(-50%);
    width: 3px; height: 0; border-radius: 0 2px 2px 0;
    background: var(--green-deep);
    transition: height 0.2s ease;
  }
  .nav-item:hover { background: var(--green-wash); }
  .nav-item.active { background: var(--green-wash); }
  .nav-item.active::before { height: 24px; }
  .nav-icon { font-size: 18px; line-height: 1; }
  .nav-label {
    font-size: 7.5px; color: var(--ink-faint);
    font-weight: 500; letter-spacing: 0.2px;
    font-family: 'Outfit', sans-serif;
  }
  .nav-item.active .nav-label { color: var(--green-deep); }

  /* Main area */
  .main {
    flex: 1; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: var(--green-pale) transparent;
    background: var(--cream);
  }
  .main::-webkit-scrollbar { width: 3px; }
  .main::-webkit-scrollbar-thumb { background: var(--green-pale); border-radius: 2px; }

  /* Header */
  .hdr {
    padding: 20px 32px 16px;
    border-bottom: 1px solid var(--border-soft);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.92);
    position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .hdr-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300; color: var(--ink);
    letter-spacing: 0.5px;
  }
  .hdr-sub {
    font-size: 10.5px; color: var(--ink-faint);
    margin-top: 2px; letter-spacing: 0.8px;
    font-family: 'Outfit', sans-serif; font-weight: 300;
  }
  .hdr-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, var(--green-deep), var(--green-mid));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 14px;
    cursor: pointer; color: white;
    border: 1.5px solid var(--green-light);
    box-shadow: 0 0 0 3px var(--green-pale);
    transition: box-shadow 0.2s;
  }
  .hdr-avatar:hover { box-shadow: 0 0 0 4px var(--green-pale), 0 4px 12px rgba(30,92,53,0.2); }

  /* Content */
  .content { padding: 28px 32px 80px; }

  /* Cards */
  .card {
    background: var(--white);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-md); padding: 20px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .card:hover { border-color: var(--green-pale); box-shadow: var(--shadow-md); }

  .card-label {
    font-size: 9.5px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--ink-faint); margin-bottom: 14px;
    display: flex; align-items: center; gap: 7px;
    font-family: 'Outfit', sans-serif; font-weight: 500;
  }

  /* Grids */
  .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
  .g-main { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }

  /* Stat card */
  .stat {
    background: var(--white);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-md); padding: 18px;
    position: relative; overflow: hidden;
    transition: all 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .stat:hover { border-color: var(--green-pale); box-shadow: var(--shadow-md); transform: translateY(-1px); }
  .stat::after {
    content: '';
    position: absolute; top: -24px; right: -24px;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, var(--green-pale) 0%, transparent 70%);
  }
  .stat-icon { font-size: 20px; margin-bottom: 10px; }
  .stat-label {
    font-size: 9px; color: var(--ink-faint); letter-spacing: 1.5px; margin-bottom: 6px;
    font-family: 'Outfit', sans-serif; font-weight: 500; text-transform: uppercase;
  }
  .stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300; color: var(--ink);
    line-height: 1;
  }
  .stat-sub { font-size: 10px; color: var(--green-mid); margin-top: 5px; font-weight: 400; }

  /* Section */
  .sec { margin-bottom: 24px; }
  .sec-hdr {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 400; color: var(--ink);
    letter-spacing: 0.3px;
  }
  .sec-action {
    font-size: 10.5px; color: var(--green-mid);
    cursor: pointer; font-weight: 500;
    font-family: 'Outfit', sans-serif;
    transition: color 0.15s;
  }
  .sec-action:hover { color: var(--green-deep); }

  /* Badge */
  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 20px;
    font-size: 9.5px; font-weight: 500; letter-spacing: 0.3px;
    font-family: 'Outfit', sans-serif;
  }

  /* Tabs */
  .tabs {
    display: flex; gap: 4px; margin-bottom: 18px;
    background: var(--green-wash); border-radius: 12px; padding: 4px;
  }
  .tab {
    flex: 1; padding: 7px 12px; border-radius: 9px;
    font-size: 11px; cursor: pointer;
    color: var(--ink-soft); border: none;
    transition: all 0.18s; text-align: center;
    font-family: 'Outfit', sans-serif; font-weight: 400;
  }
  .tab.on {
    background: var(--white); color: var(--green-deep);
    box-shadow: 0 1px 6px rgba(30,92,53,0.1); font-weight: 500;
  }

  /* Quote card */
  .quote-card {
    background: linear-gradient(135deg, #F0F8F3, var(--white));
    border: 1px solid var(--green-pale);
    border-radius: var(--radius-lg); padding: 24px 28px;
    position: relative; overflow: hidden; margin-bottom: 24px;
  }
  .quote-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--green-deep), var(--green-mid), var(--green-light), transparent);
  }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif; font-size: 80px;
    color: var(--green-light); opacity: 0.5;
    position: absolute; top: -12px; left: 16px; line-height: 1;
  }
  .quote-text {
    font-family: 'Cormorant Garamond', serif; font-size: 15px;
    line-height: 1.75; color: var(--ink); position: relative; z-index: 1;
    font-weight: 300; font-style: italic; padding-left: 8px;
  }
  .quote-by {
    font-size: 10px; color: var(--ink-faint); margin-top: 12px;
    letter-spacing: 1.5px; font-family: 'Outfit', sans-serif; font-weight: 400;
    text-transform: uppercase;
  }

  /* Calendar */
  .cal-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .cal-month {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 400; color: var(--ink);
  }
  .cal-nav { display: flex; gap: 6px; }
  .cal-btn {
    width: 28px; height: 28px; border-radius: 8px;
    background: var(--green-wash); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 13px; color: var(--ink-soft);
    transition: all 0.15s;
  }
  .cal-btn:hover { border-color: var(--green-mid); color: var(--green-deep); background: var(--green-pale); }
  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
  .cal-dh {
    font-size: 8.5px; color: var(--ink-faint); text-align: center;
    padding: 4px; letter-spacing: 0.8px; font-weight: 500;
    font-family: 'Outfit', sans-serif;
  }
  .cal-day {
    aspect-ratio: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; border-radius: 9px;
    font-size: 11px; cursor: pointer; position: relative;
    transition: all 0.15s; gap: 2px; font-family: 'Outfit', sans-serif;
  }
  .cal-day:hover { background: var(--green-wash); }
  .cal-day.today {
    background: var(--green-deep); color: var(--white); font-weight: 600;
    box-shadow: 0 2px 8px rgba(30,92,53,0.3);
  }
  .cal-day.dim { color: var(--ink-faint); }

  .evt { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border-soft); }
  .evt:last-child { border: none; }
  .evt-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .evt-name { font-size: 12px; font-weight: 400; }
  .evt-date { font-size: 10px; color: var(--ink-faint); margin-top: 1px; }

  /* Period / Cycle */
  .cycle-bar { height: 5px; background: var(--green-wash); border-radius: 3px; overflow: hidden; margin-bottom: 14px; }
  .cycle-fill { height: 100%; border-radius: 3px; }
  .phase {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 20px; font-size: 10px; border: 1px solid;
    margin: 3px; font-family: 'Outfit', sans-serif;
  }
  .period-stat { background: var(--green-wash); border-radius: 10px; padding: 11px 13px; }
  .ps-label { font-size: 8.5px; color: var(--ink-faint); margin-bottom: 4px; letter-spacing: 1px; font-family: 'Outfit', sans-serif; font-weight: 500; text-transform: uppercase; }
  .ps-val { font-size: 13px; font-weight: 500; color: var(--ink); }

  /* Fitness */
  .week-bar { display: flex; gap: 5px; margin-bottom: 18px; }
  .wb-day {
    flex: 1; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600; transition: all 0.2s;
    font-family: 'Outfit', sans-serif;
    border: 1px solid var(--border-soft);
    color: var(--ink-faint); background: var(--white);
  }
  .wb-day.done { background: var(--green-deep); color: var(--white); border-color: var(--green-deep); }
  .wb-day.today-wd { background: var(--green-mid); color: white; border-color: var(--green-mid); }
  .ex-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; background: var(--green-wash);
    border-radius: 11px; margin-bottom: 7px;
    border: 1px solid transparent; cursor: pointer; transition: all 0.18s;
  }
  .ex-item:hover { border-color: var(--green-pale); background: #E8F4ED; }
  .ex-check {
    width: 19px; height: 19px; border-radius: 6px;
    border: 1.5px solid var(--green-mid); display: flex;
    align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0;
    transition: all 0.15s;
  }
  .ex-check.on { background: var(--green-deep); border-color: var(--green-deep); }
  .ex-name { font-size: 13px; flex: 1; font-weight: 400; }
  .ex-detail { font-size: 10.5px; color: var(--ink-soft); }

  /* Media / Books */
  .media-item {
    display: flex; gap: 12px; align-items: center;
    padding: 11px; border-radius: 12px; background: var(--green-wash);
    margin-bottom: 8px; cursor: pointer; transition: all 0.18s;
    border: 1px solid transparent;
  }
  .media-item:hover { border-color: var(--green-pale); background: #E8F4ED; }
  .media-cov {
    width: 46px; height: 46px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .media-title { font-size: 13px; font-weight: 500; margin-bottom: 3px; color: var(--ink); }
  .media-sub { font-size: 10px; color: var(--ink-soft); }
  .media-prog { margin-top: 6px; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .media-prog-fill { height: 100%; background: linear-gradient(90deg, var(--green-deep), var(--green-mid)); border-radius: 2px; }

  /* Travel */
  .trip-card {
    background: var(--white);
    border: 1px solid var(--border-soft); border-radius: var(--radius-md);
    padding: 16px; cursor: pointer; transition: all 0.22s;
    box-shadow: var(--shadow-sm);
  }
  .trip-card:hover { border-color: var(--green-pale); box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .trip-emoji { font-size: 28px; margin-bottom: 9px; }
  .trip-name {
    font-size: 14px; font-weight: 500; margin-bottom: 3px;
    font-family: 'Cormorant Garamond', serif; color: var(--ink);
  }
  .trip-date { font-size: 10px; color: var(--ink-soft); }

  /* Finance */
  .nw-hero { text-align: center; padding: 22px 0; }
  .nw-label { font-size: 10px; color: var(--ink-faint); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; font-family: 'Outfit', sans-serif; }
  .nw-val { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: var(--ink); }
  .nw-sub { font-size: 12px; color: var(--green-mid); margin-top: 6px; }
  .fin-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--border-soft); }
  .fin-row:last-child { border: none; }
  .fin-label { font-size: 12px; color: var(--ink-soft); }
  .fin-val { font-size: 14px; font-weight: 600; font-family: 'Cormorant Garamond', serif; }
  .pos { color: var(--green-mid); }
  .neg { color: #c97c5d; }
  .prog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .prog-label { font-size: 11px; color: var(--ink-soft); width: 36px; }
  .prog-bar { flex: 1; height: 5px; background: var(--green-wash); border-radius: 3px; overflow: hidden; }
  .prog-fill { height: 100%; border-radius: 3px; }
  .prog-pct { font-size: 10px; color: var(--ink-faint); width: 28px; text-align: right; }

  /* Journal */
  .journal-textarea {
    width: 100%; min-height: 110px;
    background: var(--green-wash); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 16px;
    color: var(--ink); font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 300; line-height: 1.85;
    resize: none; outline: none; transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .journal-textarea::placeholder { color: var(--ink-faint); font-style: italic; }
  .journal-textarea:focus { border-color: var(--green-mid); background: var(--white); box-shadow: 0 0 0 3px var(--green-pale); }

  .journal-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px;
  }
  .mood-row { display: flex; gap: 5px; }
  .mood-btn {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; cursor: pointer; transition: all 0.15s;
    background: var(--green-wash); border: 1.5px solid transparent;
  }
  .mood-btn:hover { transform: scale(1.18); border-color: var(--green-pale); }
  .mood-btn.selected { background: var(--green-pale); border-color: var(--green-mid); transform: scale(1.18); }

  .journal-save {
    padding: 7px 20px; border-radius: 20px; font-size: 11px;
    background: var(--green-deep); color: var(--white);
    border: none; cursor: pointer; font-family: 'Outfit', sans-serif;
    font-weight: 500; letter-spacing: 0.8px; transition: all 0.2s;
  }
  .journal-save:hover { background: var(--green-mid); box-shadow: 0 4px 12px rgba(30,92,53,0.25); }
  .journal-save:disabled { opacity: 0.5; cursor: not-allowed; }

  .journal-entry {
    padding: 14px 16px; background: var(--white);
    border-radius: 12px; margin-bottom: 8px;
    border-left: 3px solid var(--green-light);
    border-top: 1px solid var(--border-soft);
    border-right: 1px solid var(--border-soft);
    border-bottom: 1px solid var(--border-soft);
    transition: all 0.2s; cursor: pointer;
  }
  .journal-entry:hover { border-left-color: var(--green-deep); box-shadow: var(--shadow-sm); }
  .je-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
  .je-time { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.5px; font-family: 'Outfit', sans-serif; }
  .je-mood { font-size: 14px; }
  .je-text { font-size: 13px; color: var(--ink-mid); line-height: 1.65; font-family: 'Cormorant Garamond', serif; font-weight: 300; }
  .je-tags { display: flex; gap: 5px; margin-top: 8px; flex-wrap: wrap; }
  .je-tag {
    font-size: 9.5px; padding: 2px 9px; border-radius: 10px;
    background: var(--green-wash); color: var(--ink-soft); border: 1px solid var(--border);
    font-family: 'Outfit', sans-serif;
  }

  /* Schedule */
  .sched-block {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 11px 13px; background: var(--white);
    border-radius: 11px; margin-bottom: 7px;
    border: 1px solid var(--border-soft); transition: all 0.18s;
    cursor: pointer;
  }
  .sched-block:hover { border-color: var(--green-pale); box-shadow: var(--shadow-sm); }
  .sched-block.done { opacity: 0.5; }
  .sched-time { font-size: 10px; color: var(--ink-faint); min-width: 38px; padding-top: 1px; font-family: 'Outfit', sans-serif; }
  .sched-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
  .sched-title { font-size: 13px; font-weight: 400; color: var(--ink); }
  .sched-meta { font-size: 10px; color: var(--ink-soft); display: flex; gap: 8px; align-items: center; margin-top: 2px; }
  .sched-check { font-size: 13px; color: var(--green-mid); margin-left: auto; }

  .add-sched-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 10px; border-radius: 11px;
    border: 1.5px dashed var(--border); color: var(--ink-faint);
    cursor: pointer; font-size: 12px; transition: all 0.18s;
    font-family: 'Outfit', sans-serif;
    margin-top: 4px;
  }
  .add-sched-btn:hover { border-color: var(--green-light); color: var(--green-mid); background: var(--green-wash); }

  /* Open button */
  .open-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 20px; border-radius: 20px;
    background: var(--green-wash); color: var(--green-deep);
    border: 1.5px solid var(--green-pale);
    font-size: 12px; cursor: pointer; transition: all 0.18s;
    font-family: 'Outfit', sans-serif; font-weight: 500;
  }
  .open-btn:hover { background: var(--green-pale); border-color: var(--green-light); }

  /* Speak module */
  .speak-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .ted-item {
    display: flex; gap: 12px; padding: 13px 14px;
    background: var(--white); border: 1px solid var(--border-soft);
    border-radius: 13px; cursor: pointer; transition: all 0.18s;
    margin-bottom: 8px;
  }
  .ted-item:hover { border-color: var(--green-pale); box-shadow: var(--shadow-sm); }
  .ted-item.active { border-color: #e2231a40; background: #FFF8F8; }
  .ted-thumb {
    width: 48px; height: 48px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0; position: relative; overflow: hidden;
  }
  .ted-play-btn {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.35); color: white; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.15s; border-radius: 10px;
  }
  .ted-item:hover .ted-play-btn { opacity: 1; }
  .ted-title { font-size: 12.5px; font-weight: 500; color: var(--ink); line-height: 1.4; margin-bottom: 4px; }
  .ted-speaker { font-size: 10px; color: var(--ink-soft); margin-bottom: 5px; font-family: 'Outfit', sans-serif; }
  .ted-meta { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
  .ted-tag {
    padding: 2px 8px; border-radius: 10px; font-size: 9px;
    background: var(--green-wash); color: var(--ink-soft); border: 1px solid var(--border);
    font-family: 'Outfit', sans-serif;
  }
  .ted-duration { font-size: 9px; color: var(--ink-faint); font-family: 'Outfit', sans-serif; }
  .ted-badge {
    font-size: 8.5px; font-weight: 700; padding: 2px 7px; border-radius: 6px;
    background: #e2231a; color: white; letter-spacing: 0.5px;
    font-family: 'Outfit', sans-serif;
  }

  /* Recorder */
  .recorder-wrap {
    background: var(--green-wash); border-radius: var(--radius-md);
    padding: 22px; text-align: center; border: 1px solid var(--border);
  }
  .rec-visualizer {
    display: flex; align-items: center; justify-content: center;
    gap: 3px; height: 40px; margin-bottom: 14px;
  }
  .rec-bar {
    width: 3px; border-radius: 2px;
    background: linear-gradient(180deg, var(--green-mid), var(--green-light));
    transition: height 0.15s;
  }
  .rec-bar.active {
    animation: recPulse var(--dur, 0.5s) ease-in-out infinite alternate;
    height: var(--h, 8px) !important;
  }
  @keyframes recPulse { from { height: 4px; opacity: 0.4; } to { height: var(--h, 20px); opacity: 1; } }
  .rec-timer {
    font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300;
    color: var(--ink); letter-spacing: 4px; line-height: 1;
  }
  .rec-status {
    font-size: 9px; color: var(--ink-faint); text-align: center;
    letter-spacing: 2.5px; text-transform: uppercase; margin-top: 6px;
    font-family: 'Outfit', sans-serif;
  }
  .rec-status.live { color: #e2231a; animation: pulse 1s infinite; }
  .rec-controls { display: flex; align-items: center; justify-content: center; gap: 14px; }
  .rec-btn-main {
    width: 56px; height: 56px; border-radius: 50%; font-size: 20px;
    border: none; cursor: pointer; transition: all 0.18s;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(30,92,53,0.2);
  }
  .rec-btn-main.idle { background: var(--green-deep); color: white; }
  .rec-btn-main.idle:hover { background: var(--green-mid); transform: scale(1.06); }
  .rec-btn-main.recording { background: #e2231a; color: white; animation: recGlow 1.2s infinite; }
  @keyframes recGlow { 0%,100%{box-shadow:0 4px 16px rgba(226,35,26,0.3)} 50%{box-shadow:0 4px 24px rgba(226,35,26,0.55)} }
  .rec-btn-secondary {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--white); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px; color: var(--ink-soft);
    transition: all 0.15s;
  }
  .rec-btn-secondary:hover { border-color: var(--green-light); color: var(--green-deep); }
  .rec-recordings { margin-top: 16px; }
  .rec-entry {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 13px; background: var(--white);
    border-radius: 11px; margin-bottom: 7px; border: 1px solid var(--border-soft);
    transition: all 0.15s;
  }
  .rec-entry:hover { border-color: var(--green-pale); }
  .rec-play {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--green-wash); color: var(--green-deep);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; cursor: pointer; flex-shrink: 0; border: 1px solid var(--border);
    transition: all 0.15s;
  }
  .rec-play:hover { background: var(--green-deep); color: white; }
  .rec-info { flex: 1; }
  .rec-name { font-size: 12.5px; font-weight: 400; color: var(--ink); }
  .rec-dur { font-size: 10px; color: var(--ink-faint); font-family: 'Outfit', sans-serif; }
  .rec-wave { display: flex; align-items: center; gap: 2px; height: 22px; }
  .rec-wv { width: 2.5px; border-radius: 2px; background: var(--green-light); flex-shrink: 0; }

  /* Practice prompts */
  .prompt-card {
    background: var(--white); border: 1px solid var(--border-soft);
    border-radius: var(--radius-md); padding: 18px; margin-bottom: 12px;
    border-left: 3px solid var(--green-deep);
  }
  .prompt-label {
    font-size: 9px; color: var(--green-mid); letter-spacing: 2px;
    text-transform: uppercase; margin-bottom: 8px; font-family: 'Outfit', sans-serif; font-weight: 600;
  }
  .prompt-text {
    font-family: 'Cormorant Garamond', serif; font-size: 14px;
    color: var(--ink); line-height: 1.7; font-style: italic;
  }
  .prompt-hint { font-size: 10.5px; color: var(--ink-soft); margin-top: 8px; }

  /* Speak stats */
  .speak-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
  .speak-stat {
    background: var(--white); border: 1px solid var(--border-soft);
    border-radius: 12px; padding: 13px; text-align: center;
    box-shadow: var(--shadow-sm);
  }
  .speak-stat-val {
    font-family: 'Cormorant Garamond', serif; font-size: 22px;
    font-weight: 300; color: var(--ink);
  }
  .speak-stat-label { font-size: 9px; color: var(--ink-faint); margin-top: 3px; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; }

  /* Person */
  .person { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
  .person-av {
    width: 48px; height: 48px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; background: var(--green-wash);
    border: 1.5px solid var(--border); transition: all 0.2s;
  }
  .person:hover .person-av { border-color: var(--green-mid); box-shadow: 0 0 0 3px var(--green-pale); }
  .person-name { font-size: 10px; color: var(--ink-soft); font-family: 'Outfit', sans-serif; }
  .person-bday { font-size: 9px; color: #c97c5d; font-weight: 600; font-family: 'Outfit', sans-serif; }

  /* Bottom nav */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 62px;
    background: rgba(255,255,255,0.96);
    border-top: 1px solid var(--border-soft);
    box-shadow: 0 -4px 20px rgba(30,92,53,0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
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
    border-radius: 10px; margin: 4px 2px;
  }
  .bn-item.active { background: var(--green-wash); }
  .bn-icon { font-size: 19px; line-height: 1; }
  .bn-label {
    font-size: 8.5px; color: var(--ink-faint);
    font-weight: 500; letter-spacing: 0.2px;
    font-family: 'Outfit', sans-serif;
  }
  .bn-item.active .bn-label { color: var(--green-deep); }

  /* Mobile */
  @media (max-width: 640px) {
    html { font-size: 15px; }
    .app { flex-direction: column; height: 100dvh; }
    .sidebar { display: none; }
    .bottom-nav { display: flex !important; }
    .main { padding-bottom: 70px; }
    .hdr { padding: 13px 16px 11px; }
    .hdr-title { font-size: 18px; }
    .hdr-sub { font-size: 9.5px; }
    .content { padding: 14px 14px 36px; }
    .g4, .g3, .g2 { grid-template-columns: 1fr !important; }
    .g-main { grid-template-columns: 1fr !important; }
    .card { padding: 15px; }
    .sched-time { font-size: 9px; }
    .speak-stats { grid-template-columns: repeat(2, 1fr) !important; }
    .recorder-wrap { padding: 16px; }
    .journal-textarea { min-height: 80px; }
    .mood-btn { width: 28px; height: 28px; font-size: 14px; }
    .person-av { width: 42px; height: 42px; }
    .quote-card { padding: 18px 20px; }
    .quote-text { font-size: 13.5px; }
  }

  /* Utility */
  .fu { width: 100%; }
`

;

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

// =================== NOTES (Apple Notes style) ===================
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadNotes(); }, []);

  const loadNotes = async () => {
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (data) {
      setNotes(data);
      if (data.length > 0 && !activeId) setActiveId(data[0].id);
    }
  };

  const activeNote = notes.find(n => n.id === activeId) || null;

  const newNote = async () => {
    const { data } = await supabase.from('journal_entries').insert({
      text: '',
      mood: '📝',
      tags: [],
      user_id: 'nikki',
    }).select().single();
    if (data) {
      setNotes([data, ...notes]);
      setActiveId(data.id);
    }
  };

  const updateNote = async (id, text) => {
    setNotes(notes.map(n => n.id === id ? {...n, text} : n));
    setSaving(true);
    await supabase.from('journal_entries').update({ text }).eq('id', id);
    setSaving(false);
  };

  const deleteNote = async (id) => {
    await supabase.from('journal_entries').delete().eq('id', id);
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    setActiveId(remaining[0]?.id || null);
  };

  const fmtDate = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return d.toLocaleTimeString('en-AU', {hour:'2-digit', minute:'2-digit'});
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return d.toLocaleDateString('en-AU', {weekday:'short'});
    return d.toLocaleDateString('en-AU', {month:'short', day:'numeric'});
  };

  const preview = (text) => {
    if (!text?.trim()) return 'No additional text';
    const lines = text.trim().split('\n').filter(l => l.trim());
    return lines[1] || lines[0]?.slice(0, 60) || 'No additional text';
  };

  const title = (text) => {
    if (!text?.trim()) return 'New Note';
    return text.trim().split('\n')[0].slice(0, 40) || 'New Note';
  };

  const filtered = notes.filter(n =>
    !search || n.text?.toLowerCase().includes(search.toLowerCase())
  );

  const [mobileView, setMobileView] = useState('list'); // 'list' | 'editor'

  // On desktop always show both; on mobile show one at a time
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  return (
    <div style={{display:'flex', gap:0, height:'calc(100vh - 130px)', minHeight:500,
      background:'var(--white)', borderRadius:20, overflow:'hidden',
      border:'1px solid var(--border-soft)', boxShadow:'var(--shadow-md)'}}>

      {/* Sidebar — note list */}
      <div style={{width:260, flexShrink:0, borderRight:'1px solid var(--border-soft)',
        display:'flex', flexDirection:'column',
        // On mobile: hide when editing
        ...(mobileView === 'editor' ? {display:'none'} : {display:'flex'})}}>

        {/* Top bar */}
        <div style={{padding:'16px 14px 12px', borderBottom:'1px solid var(--border-soft)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:'var(--ink)', fontWeight:400}}>
              Notes
            </div>
            <div onClick={newNote}
              style={{width:28, height:28, borderRadius:8, background:'var(--green-deep)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:'white', fontSize:16, fontWeight:300}}>
              +
            </div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)',
              fontSize:12, color:'var(--ink-faint)'}}>🔍</div>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search notes…"
              style={{width:'100%', padding:'7px 10px 7px 28px',
                background:'var(--green-wash)', border:'1px solid var(--border)',
                borderRadius:10, fontSize:12, outline:'none', color:'var(--ink)',
                fontFamily:"'Outfit',sans-serif"}}/>
          </div>
        </div>

        {/* Note list */}
        <div style={{flex:1, overflowY:'auto'}}>
          {filtered.length === 0 && (
            <div style={{padding:'30px 14px', textAlign:'center', color:'var(--ink-faint)', fontSize:12}}>
              {search ? 'No matching notes' : 'No notes yet — tap + to create one'}
            </div>
          )}
          {filtered.map(n => (
            <div key={n.id} onClick={() => { setActiveId(n.id); setMobileView('editor'); }}
              style={{padding:'12px 14px', cursor:'pointer', borderBottom:'1px solid var(--border-soft)',
                background: n.id === activeId ? 'var(--green-wash)' : 'transparent',
                borderLeft: n.id === activeId ? '3px solid var(--green-deep)' : '3px solid transparent',
                transition:'all 0.12s'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:3}}>
                <div style={{fontSize:13, fontWeight:500, color:'var(--ink)',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                  maxWidth:140, fontFamily:"'Outfit',sans-serif"}}>
                  {title(n.text)}
                </div>
                <div style={{fontSize:9.5, color:'var(--ink-faint)', flexShrink:0, marginLeft:6,
                  fontFamily:"'Outfit',sans-serif"}}>
                  {fmtDate(n.created_at)}
                </div>
              </div>
              <div style={{fontSize:11, color:'var(--ink-soft)',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                fontFamily:"'Outfit',sans-serif"}}>
                {preview(n.text)}
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'10px 14px', borderTop:'1px solid var(--border-soft)',
          fontSize:10, color:'var(--ink-faint)', textAlign:'center', fontFamily:"'Outfit',sans-serif"}}>
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Editor — on mobile only show when editing */}
      <div style={{flex:1, display:'flex', flexDirection:'column',
        ...(mobileView === 'list' ? {display:'none'} : {display:'flex'})}}>
        {activeNote ? (
          <>
            <div style={{padding:'12px 20px', borderBottom:'1px solid var(--border-soft)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              background:'var(--white)'}}>
              <div onClick={() => setMobileView('list')}
                style={{fontSize:11, color:'var(--green-mid)', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", fontWeight:500,
                  display:'flex', alignItems:'center', gap:4}}>
                ‹ Notes
              </div>
              <div style={{fontSize:10, color:'var(--ink-faint)', fontFamily:"'Outfit',sans-serif"}}>
                {saving ? 'Saving…' : `Edited ${fmtDate(activeNote.created_at)}`}
              </div>
              <div onClick={() => deleteNote(activeNote.id)}
                style={{fontSize:11, color:'#c97c5d', cursor:'pointer',
                  fontFamily:"'Outfit',sans-serif", padding:'4px 8px',
                  borderRadius:6, border:'1px solid #c97c5d20', background:'#c97c5d08'}}>
                Delete
              </div>
            </div>
            <textarea
              value={activeNote.text}
              onChange={e => updateNote(activeNote.id, e.target.value)}
              placeholder={"Start writing…\n\nYour notes are saved automatically."}
              style={{flex:1, padding:'20px 24px', border:'none', outline:'none', resize:'none',
                fontSize:14, lineHeight:1.8, color:'var(--ink)',
                fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
                background:'var(--white)', letterSpacing:0.2}}
            />
          </>
        ) : (
          <div style={{flex:1, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', color:'var(--ink-faint)'}}>
            <div style={{fontSize:40, marginBottom:14}}>📝</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:18,
              color:'var(--ink-mid)', marginBottom:8}}>Select a note</div>
            <div style={{fontSize:12, fontFamily:"'Outfit',sans-serif", marginBottom:20}}>
              or create a new one
            </div>
            <div onClick={newNote}
              style={{padding:'9px 22px', borderRadius:20, background:'var(--green-deep)',
                color:'white', fontSize:12, cursor:'pointer', fontFamily:"'Outfit',sans-serif",
                fontWeight:500}}>
              + New Note
            </div>
          </div>
        )}
      </div>

      {/* Desktop: always show both panels via CSS */}
      <style>{`
        @media (min-width: 641px) {
          .notes-list-panel { display: flex !important; width: 260px !important; }
          .notes-edit-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

// =================== DAILY SCHEDULE (Supabase connected) ===================
// =================== ICS PARSER ===================
const parseICS = (icsText) => {
  const events = [];
  const lines = icsText.replace(/\r\n /g, '').replace(/\r\n\t/g, '').split(/\r\n|\n|\r/);
  let current = null;

  const parseDate = (val) => {
    // handles TZID=...:20260310T090000 or 20260310T090000Z or 20260310
    const raw = val.includes(':') ? val.split(':').pop() : val;
    const y = raw.slice(0,4), mo = raw.slice(4,6), d = raw.slice(6,8);
    const h = raw.slice(9,11)||'00', mi = raw.slice(11,13)||'00';
    return new Date(`${y}-${mo}-${d}T${h}:${mi}:00`);
  };

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { current = {}; }
    else if (line === 'END:VEVENT' && current) {
      if (current.start && current.summary) events.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith('SUMMARY:')) current.summary = line.slice(8).trim();
      else if (line.startsWith('DTSTART')) { try { current.start = parseDate(line.slice(line.indexOf(':')+1)); } catch(e){} }
      else if (line.startsWith('DTEND'))   { try { current.end   = parseDate(line.slice(line.indexOf(':')+1)); } catch(e){} }
      else if (line.startsWith('LOCATION:')) current.location = line.slice(9).trim();
      else if (line.startsWith('DESCRIPTION:')) current.description = line.slice(12).trim();
    }
  }
  return events.sort((a,b) => a.start - b.start);
};

const fmtTime = (d) => d ? d.toLocaleTimeString('en-AU', {hour:'2-digit', minute:'2-digit', hour12:true}) : '';

// =================== SCHEDULE ===================
const Schedule = () => {
  const [outlookEvents, setOutlookEvents] = useState([]);
  const [manualEvents, setManualEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [lastSync, setLastSync] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'day'
  const [calMonth, setCalMonth] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [newEvt, setNewEvt] = useState({title:'', date:'', time:'12:00', endTime:'13:00', note:''});

  const today = new Date();

  const loadCalendar = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/calendar');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setOutlookEvents(parseICS(text));
      setLastSync(new Date());
    } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadCalendar(); }, []);

  const isSameDay = (a,b) =>
    a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

  const allEvents = [
    ...outlookEvents,
    ...manualEvents.map(e => ({
      ...e,
      start: new Date(e.startISO),
      end:   new Date(e.endISO),
      isManual: true,
    }))
  ].sort((a,b) => a.start - b.start);

  const dayEvents = allEvents.filter(e => e.start && isSameDay(e.start, selectedDay));

  const catColor = (summary='', isManual=false) => {
    if (isManual) return '#c97c5d';
    const s = summary.toLowerCase();
    if (s.includes('meet')||s.includes('call')||s.includes('sync')) return '#5a7a9e';
    if (s.includes('lunch')||s.includes('coffee')||s.includes('dinner')) return '#9e7a5a';
    if (s.includes('review')||s.includes('report')) return '#6a5a9e';
    if (s.includes('training')||s.includes('yoga')||s.includes('gym')) return '#53976F';
    return '#3D8A5F';
  };

  const addManualEvent = () => {
    if (!newEvt.title.trim() || !newEvt.date) return;
    const startISO = `${newEvt.date}T${newEvt.time}:00`;
    const endISO   = `${newEvt.date}T${newEvt.endTime}:00`;
    setManualEvents(prev => [...prev, {
      id: Date.now(),
      summary: newEvt.title,
      location: newEvt.note,
      startISO, endISO,
    }]);
    setShowAdd(false);
    setNewEvt({title:'', date:'', time:'12:00', endTime:'13:00', note:''});
    // Jump to that day
    setSelectedDay(new Date(startISO));
    setViewMode('day');
  };

  // ── Month calendar grid ──
  const renderMonth = () => {
    const yr = calMonth.getFullYear(), mo = calMonth.getMonth();
    const firstDay = new Date(yr, mo, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(yr, mo+1, 0).getDate();
    const startOffset = (firstDay + 6) % 7; // shift so Mon=0
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(yr, mo, d));

    return (
      <div>
        {/* Month nav */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div onClick={()=>setCalMonth(new Date(yr, mo-1, 1))}
            style={{width:32,height:32,borderRadius:9,background:'var(--green-wash)',
              border:'1px solid var(--border)',display:'flex',alignItems:'center',
              justifyContent:'center',cursor:'pointer',fontSize:14,color:'var(--ink-soft)'}}>‹</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:'var(--ink)',fontWeight:400}}>
            {calMonth.toLocaleDateString('en-AU',{month:'long',year:'numeric'})}
          </div>
          <div onClick={()=>setCalMonth(new Date(yr, mo+1, 1))}
            style={{width:32,height:32,borderRadius:9,background:'var(--green-wash)',
              border:'1px solid var(--border)',display:'flex',alignItems:'center',
              justifyContent:'center',cursor:'pointer',fontSize:14,color:'var(--ink-soft)'}}>›</div>
        </div>

        {/* Day headers */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:3}}>
          {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d=>(
            <div key={d} style={{textAlign:'center',fontSize:9,color:'var(--ink-faint)',
              padding:'4px 0',fontFamily:"'Outfit',sans-serif",fontWeight:600,letterSpacing:0.5}}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
          {cells.map((d,i) => {
            if (!d) return <div key={`e${i}`}/>;
            const isToday  = isSameDay(d, today);
            const isSel    = isSameDay(d, selectedDay);
            const evts     = allEvents.filter(e => e.start && isSameDay(e.start, d));
            const dots     = evts.slice(0,3);
            return (
              <div key={i} onClick={()=>{ setSelectedDay(new Date(d)); setViewMode('day'); }}
                style={{aspectRatio:'1',display:'flex',flexDirection:'column',
                  alignItems:'center',justifyContent:'center',borderRadius:10,
                  cursor:'pointer',position:'relative',gap:2,
                  background: isSel ? 'var(--green-deep)' : isToday ? 'var(--green-wash)' : 'transparent',
                  border: isToday && !isSel ? '1px solid var(--green-light)' : '1px solid transparent',
                  transition:'all 0.12s'}}>
                <div style={{fontSize:12,fontFamily:"'Outfit',sans-serif",
                  color: isSel ? 'white' : isToday ? 'var(--green-deep)' : 'var(--ink)',
                  fontWeight: isToday||isSel ? 600 : 400}}>
                  {d.getDate()}
                </div>
                {dots.length > 0 && (
                  <div style={{display:'flex',gap:2}}>
                    {dots.map((e,j)=>(
                      <div key={j} style={{width:4,height:4,borderRadius:2,
                        background: isSel ? 'rgba(255,255,255,0.7)' : catColor(e.summary, e.isManual)}}/>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Day view ──
  const renderDay = () => (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
        <div onClick={()=>setViewMode('month')}
          style={{fontSize:11,color:'var(--green-mid)',cursor:'pointer',
            fontFamily:"'Outfit',sans-serif",fontWeight:500,
            display:'flex',alignItems:'center',gap:3}}>
          ‹ Calendar
        </div>
        <div style={{flex:1,textAlign:'center',fontFamily:"'Cormorant Garamond',serif",
          fontSize:17,color:'var(--ink)'}}>
          {isSameDay(selectedDay,today) ? 'Today' :
            selectedDay.toLocaleDateString('en-AU',{weekday:'long',month:'short',day:'numeric'})}
        </div>
        <div style={{fontSize:10,color:'var(--ink-faint)',fontFamily:"'Outfit',sans-serif"}}>
          {dayEvents.length} event{dayEvents.length!==1?'s':''}
        </div>
      </div>

      {dayEvents.length === 0 && !loading && (
        <div style={{textAlign:'center',padding:'40px 20px',color:'var(--ink-faint)'}}>
          <div style={{fontSize:28,marginBottom:8}}>🌿</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:'var(--ink-mid)',marginBottom:4}}>
            No events
          </div>
          <div style={{fontSize:11,fontFamily:"'Outfit',sans-serif"}}>Tap + to add one</div>
        </div>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {dayEvents.map((evt,i) => {
          const color = catColor(evt.summary, evt.isManual);
          return (
            <div key={i} style={{display:'flex',gap:12,padding:'13px 15px',
              background:'var(--white)',border:'1px solid var(--border-soft)',
              borderRadius:14,borderLeft:`3px solid ${color}`,
              boxShadow:'var(--shadow-sm)'}}>
              <div style={{minWidth:52,paddingTop:2}}>
                <div style={{fontSize:12,fontWeight:500,color:'var(--ink)',fontFamily:"'Outfit',sans-serif"}}>
                  {fmtTime(evt.start)}
                </div>
                {evt.end && <div style={{fontSize:10,color:'var(--ink-faint)',marginTop:1,fontFamily:"'Outfit',sans-serif"}}>
                  {fmtTime(evt.end)}
                </div>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:'var(--ink)',
                  fontFamily:"'Outfit',sans-serif",marginBottom:3,
                  display:'flex',alignItems:'center',gap:6}}>
                  {evt.summary}
                  {evt.isManual && <span style={{fontSize:9,padding:'1px 6px',borderRadius:8,
                    background:'#c97c5d15',color:'#c97c5d',border:'1px solid #c97c5d30',
                    fontWeight:500}}>Personal</span>}
                </div>
                {evt.location && <div style={{fontSize:10,color:'var(--ink-soft)',
                  fontFamily:"'Outfit',sans-serif"}}>📍 {evt.location}</div>}
              </div>
              {evt.isManual && (
                <div onClick={()=>setManualEvents(prev=>prev.filter(e=>e.id!==evt.id))}
                  style={{fontSize:15,color:'var(--ink-faint)',cursor:'pointer',
                    alignSelf:'center',padding:'0 4px'}}>×</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      {/* Add event modal */}
      {showAdd && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:200,
          display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
          onClick={()=>setShowAdd(false)}>
          <div style={{background:'var(--white)',borderRadius:22,padding:24,width:'100%',maxWidth:340,
            boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:18,
              color:'var(--ink)',fontWeight:400}}>
              Add Personal Event
            </div>
            <input placeholder="Event title *" value={newEvt.title}
              onChange={e=>setNewEvt({...newEvt,title:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',
                borderRadius:11,fontSize:13,marginBottom:10,outline:'none',
                color:'var(--ink)',background:'var(--green-wash)',fontFamily:"'Outfit',sans-serif"}}/>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,color:'var(--ink-faint)',marginBottom:5,
                fontFamily:"'Outfit',sans-serif",letterSpacing:1,textTransform:'uppercase'}}>Date</div>
              <input type="date" value={newEvt.date}
                onChange={e=>setNewEvt({...newEvt,date:e.target.value})}
                style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',
                  borderRadius:11,fontSize:13,outline:'none',
                  color:'var(--ink)',background:'var(--green-wash)',fontFamily:"'Outfit',sans-serif"}}/>
            </div>
            <div style={{display:'flex',gap:10,marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'var(--ink-faint)',marginBottom:5,
                  fontFamily:"'Outfit',sans-serif",letterSpacing:1,textTransform:'uppercase'}}>Start</div>
                <input type="time" value={newEvt.time}
                  onChange={e=>setNewEvt({...newEvt,time:e.target.value})}
                  style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',
                    borderRadius:11,fontSize:13,outline:'none',
                    color:'var(--ink)',background:'var(--green-wash)',fontFamily:"'Outfit',sans-serif"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:'var(--ink-faint)',marginBottom:5,
                  fontFamily:"'Outfit',sans-serif",letterSpacing:1,textTransform:'uppercase'}}>End</div>
                <input type="time" value={newEvt.endTime}
                  onChange={e=>setNewEvt({...newEvt,endTime:e.target.value})}
                  style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',
                    borderRadius:11,fontSize:13,outline:'none',
                    color:'var(--ink)',background:'var(--green-wash)',fontFamily:"'Outfit',sans-serif"}}/>
              </div>
            </div>
            <input placeholder="Note / Location (optional)" value={newEvt.note}
              onChange={e=>setNewEvt({...newEvt,note:e.target.value})}
              style={{width:'100%',padding:'10px 14px',border:'1px solid var(--border)',
                borderRadius:11,fontSize:13,marginBottom:18,outline:'none',
                color:'var(--ink)',background:'var(--green-wash)',fontFamily:"'Outfit',sans-serif"}}/>
            <div style={{display:'flex',gap:8}}>
              <div onClick={()=>setShowAdd(false)}
                style={{flex:1,padding:'11px',borderRadius:12,border:'1px solid var(--border)',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'var(--ink-soft)',
                  fontFamily:"'Outfit',sans-serif"}}>Cancel</div>
              <div onClick={addManualEvent}
                style={{flex:1,padding:'11px',borderRadius:12,background:'var(--green-deep)',
                  textAlign:'center',cursor:'pointer',fontSize:13,color:'#fff',
                  fontWeight:500,fontFamily:"'Outfit',sans-serif"}}>Add ✓</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <div style={{display:'flex',gap:4,background:'var(--green-wash)',borderRadius:10,padding:3}}>
          {['month','day'].map(m=>(
            <div key={m} onClick={()=>setViewMode(m)}
              style={{padding:'6px 14px',borderRadius:8,fontSize:11,cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",fontWeight:500,
                background:viewMode===m?'var(--white)':'transparent',
                color:viewMode===m?'var(--green-deep)':'var(--ink-soft)',
                boxShadow:viewMode===m?'0 1px 4px rgba(30,92,53,0.1)':'none',
                transition:'all 0.15s',textTransform:'capitalize'}}>
              {m}
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {lastSync && <div style={{fontSize:9.5,color:'var(--ink-faint)',fontFamily:"'Outfit',sans-serif"}}>
            ↻ {lastSync.toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'})}
          </div>}
          <div onClick={()=>setShowAdd(true)}
            style={{padding:'7px 14px',borderRadius:20,background:'var(--green-deep)',
              color:'white',fontSize:11,cursor:'pointer',fontFamily:"'Outfit',sans-serif",
              fontWeight:500,display:'flex',alignItems:'center',gap:5}}>
            + Add
          </div>
          <div onClick={loadCalendar}
            style={{width:32,height:32,borderRadius:10,background:'var(--green-wash)',
              border:'1px solid var(--border)',display:'flex',alignItems:'center',
              justifyContent:'center',cursor:'pointer',fontSize:14,
              animation:loading?'spin 1s linear infinite':undefined}}>
            ↻
          </div>
        </div>
      </div>

      {error && !loading && (
        <div style={{padding:'14px 16px',background:'#FFF8F8',border:'1px solid #FFCDD2',
          borderRadius:12,marginBottom:16,fontSize:12,color:'#c97c5d',
          fontFamily:"'Outfit',sans-serif",display:'flex',alignItems:'center',gap:8}}>
          ⚠️ Outlook sync failed — showing personal events only
          <div onClick={loadCalendar} style={{marginLeft:'auto',cursor:'pointer',
            color:'var(--green-mid)',fontWeight:500}}>Retry</div>
        </div>
      )}

      <div className="card">
        {viewMode === 'month' ? renderMonth() : renderDay()}
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
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
          <div style={{fontSize:11,color:'var(--ink-soft)',marginBottom:14,lineHeight:1.6,fontFamily:"'Outfit',sans-serif"}}>
            Pick a category, choose a prompt, hit record. The best speakers practice daily 🌿
          </div>

          {/* Category selector */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
            {Object.entries(catLabels).map(([k,v])=>(
              <div key={k} onClick={()=>{setMatCat(k);setMatIdx(0);}}
                style={{padding:'6px 14px',borderRadius:20,fontSize:11,cursor:'pointer',
                  background:matCat===k?'var(--green-deep)':'var(--green-wash)',
                  color:matCat===k?'#fff':'var(--ink-soft)',
                  border:`1px solid ${matCat===k?'var(--green-deep)':'var(--border)'}`,
                  fontWeight:matCat===k?500:400,fontFamily:"'Outfit',sans-serif",transition:'all 0.15s'}}>
                {v}
              </div>
            ))}
          </div>

          {/* Prompt card */}
          <div style={{background:'var(--white)',border:'1px solid var(--border-soft)',borderRadius:16,padding:18,marginBottom:14,
            borderLeft:'3px solid var(--green-deep)',boxShadow:'var(--shadow-sm)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <div style={{fontSize:9,color:'var(--green-mid)',letterSpacing:2,textTransform:'uppercase',fontWeight:600,fontFamily:"'Outfit',sans-serif"}}>
                {catLabels[matCat]} · {matIdx+1}/{materials[matCat].length}
              </div>
              <div style={{display:'flex',gap:6}}>
                <div onClick={()=>setMatIdx(i=>(i-1+materials[matCat].length)%materials[matCat].length)}
                  style={{width:26,height:26,borderRadius:'50%',background:'var(--green-wash)',border:'1px solid var(--border)',
                    display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:12,color:'var(--ink-soft)'}}>‹</div>
                <div onClick={()=>setMatIdx(i=>(i+1)%materials[matCat].length)}
                  style={{width:26,height:26,borderRadius:'50%',background:'var(--green-wash)',border:'1px solid var(--border)',
                    display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:12,color:'var(--ink-soft)'}}>›</div>
              </div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:'var(--ink)',lineHeight:1.75,marginBottom:10,fontStyle:'italic'}}>
              "{currentPrompt.text}"
            </div>
            <div style={{fontSize:11,color:'var(--green-mid)',padding:'8px 12px',background:'var(--green-wash)',borderRadius:8,marginBottom:14}}>
              💡 {currentPrompt.hint}
            </div>

            {/* Inline recorder */}
            <div style={{background:'var(--green-wash)',borderRadius:14,padding:'16px',border:'1px solid var(--border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                {/* Waveform */}
                <div style={{display:'flex',alignItems:'center',gap:2,flex:1,height:32}}>
                  {heights.slice(0,18).map((h,i)=>(
                    <div key={i} style={{width:3,borderRadius:2,flexShrink:0,
                      background: recording ? 'var(--green-mid)' : 'var(--green-pale)',
                      height: recording ? undefined : Math.floor(h*0.25+2)+'px',
                      ...(recording ? {animation:`recPulse ${0.4+(i%5)*0.1}s ease-in-out infinite alternate`,
                        '--h': h+'px', '--dur': (0.4+(i%5)*0.1)+'s'} : {})}}/>
                  ))}
                </div>
                {/* Timer */}
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:'var(--ink)',
                  letterSpacing:3,minWidth:52,textAlign:'center'}}>
                  {fmt(seconds)}
                </div>
                {/* Record button */}
                <button onClick={toggleRec}
                  style={{width:44,height:44,borderRadius:'50%',border:'none',cursor:'pointer',
                    background: recording ? '#e2231a' : 'var(--green-deep)',
                    color:'white',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',
                    boxShadow: recording ? '0 0 0 4px rgba(226,35,26,0.2)' : '0 2px 10px rgba(30,92,53,0.25)',
                    animation: recording ? 'recGlow 1.2s infinite' : 'none',
                    flexShrink:0,transition:'background 0.2s'}}>
                  {recording ? '⏹' : '⏺'}
                </button>
              </div>
              <div style={{textAlign:'center',marginTop:8,fontSize:9,color:'var(--ink-faint)',
                letterSpacing:2,textTransform:'uppercase',fontFamily:"'Outfit',sans-serif",
                animation: recording ? 'pulse 1s infinite' : 'none',
                color: recording ? '#e2231a' : 'var(--ink-faint)'}}>
                {recording ? '● Recording' : 'Tap ⏺ to record your response'}
              </div>
            </div>

            <div style={{display:'flex',gap:8,marginTop:12}}>
              <div onClick={shuffle}
                style={{flex:1,padding:'9px',borderRadius:12,background:'var(--green-wash)',
                  border:'1px solid var(--border)',color:'var(--ink-soft)',fontSize:12,
                  cursor:'pointer',textAlign:'center',fontFamily:"'Outfit',sans-serif"}}>
                ↻ Shuffle
              </div>
              <div onClick={()=>setTab('record')}
                style={{flex:1,padding:'9px',borderRadius:12,background:'var(--white)',
                  border:'1px solid var(--border)',color:'var(--ink-soft)',fontSize:12,
                  cursor:'pointer',textAlign:'center',fontFamily:"'Outfit',sans-serif"}}>
                📋 All Recordings
              </div>
            </div>
          </div>

          {/* All prompts in category */}
          <div style={{fontSize:10,color:'var(--ink-faint)',letterSpacing:1.5,textTransform:'uppercase',marginBottom:8,
            fontFamily:"'Outfit',sans-serif",fontWeight:500}}>All in this category</div>
          {materials[matCat].map((p,i)=>(
            <div key={i} onClick={()=>setMatIdx(i)}
              style={{padding:'11px 14px',
                background:i===matIdx?'var(--green-wash)':'var(--white)',
                border:`1px solid ${i===matIdx?'var(--green-light)':'var(--border-soft)'}`,
                borderRadius:11,marginBottom:7,cursor:'pointer',transition:'all 0.12s'}}>
              <div style={{fontSize:12,color:'var(--ink)',lineHeight:1.5,fontFamily:"'Outfit',sans-serif"}}>{p.text}</div>
            </div>
          ))}

          {/* Technique tips */}
          <div style={{marginTop:16}}>
            <div style={{fontSize:10,color:'var(--ink-faint)',letterSpacing:1.5,textTransform:'uppercase',
              marginBottom:10,fontFamily:"'Outfit',sans-serif",fontWeight:500}}>Expression Techniques</div>
            {[
              {icon:'🌊', tip:'Pacing', desc:'Vary your speed. Slow down for important points, speed up for energy.'},
              {icon:'🎭', tip:'Vocal Range', desc:'Raise pitch for excitement, lower for gravity. Monotone kills engagement.'},
              {icon:'⏸', tip:'The Pause', desc:'Silence is powerful. A 2-second pause before a key point doubles its impact.'},
              {icon:'👁', tip:'Eye Contact', desc:'Look at one person per thought, then move. Creates intimacy at scale.'},
            ].map((t,i) => (
              <div key={i} style={{display:'flex',gap:12,padding:'11px 14px',background:'var(--green-wash)',
                borderRadius:11,marginBottom:7,border:'1px solid var(--border)',alignItems:'flex-start'}}>
                <span style={{fontSize:18,flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:3,color:'var(--green-mid)',fontFamily:"'Outfit',sans-serif"}}>{t.tip}</div>
                  <div style={{fontSize:11,color:'var(--ink-soft)',lineHeight:1.6,fontFamily:"'Outfit',sans-serif"}}>{t.desc}</div>
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
        <div style={{filter:`drop-shadow(0 0 40px rgba(61,138,95,0.3))`,marginBottom:28}}>
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
  {id:'schedule',icon:'◷',  label:'Schedule'},
  {id:'journal', icon:'📝', label:'Notes'},
  {id:'calendar',icon:'📅', label:'Calendar'},
  {id:'fitness', icon:'💪', label:'Fitness'},
  {id:'reading', icon:'📚', label:'Reading'},
  {id:'speak',   icon:'🎙', label:'Speak'},
  {id:'travel',  icon:'✈️', label:'Travel'},
];

const titles = {
  schedule: {t:'Good morning, Nikki ✨', s:'Your Outlook calendar · live sync'},
  journal:  {t:'Notes',  s:'Your personal notebook'},
  calendar: {t:'Calendar & Events',      s:'Birthdays · Anniversaries · Health'},
  fitness:  {t:'Daily Fitness',          s:'Your workout tracker'},
  reading:  {t:'Reading & Listening',    s:'WeChat Books · Apple Podcasts'},
  speak:    {t:'Expression Studio',      s:'TED Talks · Voice Practice · Your growth in words'},
  travel:   {t:'Travel & Camping',       s:'Your next adventure'},
};

export default function App() {
  const [splash, setSplash] = useState(true);
  const [view, setView] = useState('schedule');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
  }, []);

  const MOBILE_NAV = [
    {id:'schedule',icon:'◷',  label:'Schedule'},
    {id:'journal', icon:'📝', label:'Notes'},
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
    {id:'journal', icon:'📝', label:'Notes'},
    {id:'speak',    icon:'🎙', label:'Speak'},
  ];

  const goTo = (id) => { setView(id); setShowMore(false); };

  const renderPage = () => {
    switch(view) {
      case 'schedule': return <div className="card fu"><Schedule/></div>;
      case 'journal': return <div className="fu"><Notes/></div>;
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
