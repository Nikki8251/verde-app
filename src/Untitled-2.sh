#!/bin/bash
# Verdé — 一键项目创建脚本
# 在终端里运行: bash verde-setup.sh

set -e  # 任何错误自动停止

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${GREEN}🌿 Verdé 项目创建向导${NC}"
echo "================================"
echo ""

# 1. 创建项目
echo -e "${BLUE}[1/6]${NC} 创建 React 项目..."
npx create-react-app verde-app --template cra-template
cd verde-app
echo -e "${GREEN}✅ 项目创建完成${NC}"
echo ""

# 2. 安装依赖
echo -e "${BLUE}[2/6]${NC} 安装依赖包..."
npm install @supabase/supabase-js react-router-dom
echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 3. 创建目录结构
echo -e "${BLUE}[3/6]${NC} 创建项目结构..."
mkdir -p src/api
mkdir -p src/components
mkdir -p src/hooks
echo -e "${GREEN}✅ 目录结构创建完成${NC}"
echo ""

# 4. 创建 Supabase 客户端文件
echo -e "${BLUE}[4/6]${NC} 创建 Supabase 配置文件..."
cat > src/supabase.js << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase 环境变量未设置，请检查 .env.local 文件')
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')
EOF
echo -e "${GREEN}✅ Supabase 配置文件创建完成${NC}"
echo ""

# 5. 创建 API 文件
echo -e "${BLUE}[5/6]${NC} 创建 API 模块..."

# TED / YouTube API
cat > src/api/ted.js << 'EOF'
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
const TED_CHANNEL_ID = 'UCAuUUnT6oDeKwE6v1NGQxug'

export async function searchTED(query = 'communication confidence') {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API Key 未设置，使用示例数据')
    return SAMPLE_TEDS
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&channelId=${TED_CHANNEL_ID}` +
      `&q=${encodeURIComponent(query)}` +
      `&type=video&maxResults=8&key=${YOUTUBE_API_KEY}`
    )
    const data = await res.json()

    if (data.error) throw new Error(data.error.message)

    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title.replace(' | TED', '').replace(' | TED Talk', ''),
      speaker: item.snippet.description.split('\n')[0] || 'TED Speaker',
      thumbnail: item.snippet.thumbnails.medium.url,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }))
  } catch (err) {
    console.error('YouTube API 错误:', err)
    return SAMPLE_TEDS
  }
}

// 没有 API Key 时的示例数据
const SAMPLE_TEDS = [
  {
    id: 'iCvmsMzlF7o',
    title: 'How great leaders inspire action',
    speaker: 'Simon Sinek',
    embedUrl: 'https://www.youtube.com/embed/iCvmsMzlF7o',
    watchUrl: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
  },
  {
    id: 'X4Qm9cGRub0',
    title: 'The power of vulnerability',
    speaker: 'Brené Brown',
    embedUrl: 'https://www.youtube.com/embed/X4Qm9cGRub0',
    watchUrl: 'https://www.youtube.com/watch?v=X4Qm9cGRub0',
  },
  {
    id: 'Unzc731iCUY',
    title: 'Think fast, talk smart',
    speaker: 'Matt Abrahams · Stanford',
    embedUrl: 'https://www.youtube.com/embed/HAnw168huqA',
    watchUrl: 'https://www.youtube.com/watch?v=HAnw168huqA',
  },
]
EOF

# iTunes Podcasts API
cat > src/api/podcasts.js << 'EOF'
export async function searchPodcasts(query) {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?` +
      `term=${encodeURIComponent(query)}&media=podcast&limit=10`
    )
    const data = await res.json()
    return data.results.map(p => ({
      id: p.collectionId,
      title: p.collectionName,
      author: p.artistName,
      artwork: p.artworkUrl100?.replace('100x100', '300x300'),
      genre: p.primaryGenreName,
      feedUrl: p.feedUrl,
      trackCount: p.trackCount,
    }))
  } catch (err) {
    console.error('iTunes API 错误:', err)
    return []
  }
}

export async function getPodcastEpisodes(feedUrl) {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=10`
    )
    const data = await res.json()
    return (data.items || []).map(ep => ({
      id: ep.guid,
      title: ep.title,
      date: ep.pubDate?.split(' ')[0],
      duration: ep.itunes_duration || '--',
      description: ep.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
      audioUrl: ep.enclosure?.link,
    }))
  } catch (err) {
    console.error('RSS 解析错误:', err)
    return []
  }
}
EOF

# Supabase 数据操作封装
cat > src/api/db.js << 'EOF'
import { supabase } from '../supabase'

// -------- 获取当前用户 --------
async function getCurrentUserId() {
  const { data } = await supabase.auth.getUser()
  return data?.user?.id
}

// -------- 日记 --------
export async function getJournalEntries() {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30)
  if (error) throw error
  return data
}

export async function addJournalEntry({ text, mood, tags = [] }) {
  const userId = await getCurrentUserId()
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({ text, mood, tags, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteJournalEntry(id) {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// -------- 日程 --------
export async function getScheduleItems(date) {
  const dateStr = date || new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('schedule_items')
    .select('*')
    .eq('date', dateStr)
    .order('time')
  if (error) throw error
  return data
}

export async function addScheduleItem(item) {
  const userId = await getCurrentUserId()
  const { data, error } = await supabase
    .from('schedule_items')
    .insert({ ...item, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function toggleScheduleItem(id, done) {
  const { data, error } = await supabase
    .from('schedule_items')
    .update({ done })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteScheduleItem(id) {
  const { error } = await supabase
    .from('schedule_items')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// -------- 书单 --------
export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addBook(book) {
  const userId = await getCurrentUserId()
  const { data, error } = await supabase
    .from('books')
    .insert({ ...book, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateBookProgress(id, progress) {
  const { data, error } = await supabase
    .from('books')
    .update({ progress })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// -------- 录音记录 --------
export async function getRecordings() {
  const { data, error } = await supabase
    .from('recordings')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addRecording({ name, duration }) {
  const userId = await getCurrentUserId()
  const { data, error } = await supabase
    .from('recordings')
    .insert({ name, duration, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return data
}
EOF

echo -e "${GREEN}✅ API 模块创建完成${NC}"
echo ""

# 6. 创建 .env.local 模板
echo -e "${BLUE}[6/6]${NC} 创建环境变量模板..."
cat > .env.local << 'EOF'
# Supabase — 从 supabase.com 项目设置里复制
REACT_APP_SUPABASE_URL=https://替换为你的项目ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=替换为你的anon_key

# YouTube API — 从 Google Cloud Console 获取（可选，不填用示例数据）
REACT_APP_YOUTUBE_API_KEY=替换为你的youtube_api_key
EOF

# 创建 .gitignore（确保密钥不上传）
echo ".env.local" >> .gitignore

echo -e "${GREEN}✅ 环境变量模板创建完成${NC}"
echo ""

# 完成提示
echo "================================"
echo -e "${GREEN}🎉 Verdé 项目创建完成！${NC}"
echo ""
echo -e "📁 项目位置: ${YELLOW}$(pwd)${NC}"
echo ""
echo "下一步："
echo "  1. 用文本编辑器打开 ${YELLOW}.env.local${NC} 填入你的 Supabase 密钥"
echo "  2. 把 Claude 给你的 App 代码复制到 ${YELLOW}src/App.jsx${NC}"
echo "  3. 运行 ${YELLOW}npm start${NC} 启动项目"
echo ""
echo -e "遇到问题？把报错信息截图发给 Claude 🌿"
echo "================================"
EOF