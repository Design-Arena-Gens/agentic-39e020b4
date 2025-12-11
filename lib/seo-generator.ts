interface SEOContentParams {
  category: string
  language: string
  videoFileName?: string
}

interface SEOContent {
  title: string
  description: string
  tags: string[]
  hashtags: string[]
  thumbnailPrompt: string
}

const categoryKeywords = {
  tech: {
    keywords: ['technology', 'software', 'coding', 'programming', 'development', 'innovation', 'digital', 'tech review', 'gadgets', 'AI'],
    tags: ['technology', 'tech', 'software', 'innovation', 'digital', 'gadgets', 'techreview', 'coding', 'programming', 'development'],
    hashtags: ['#Technology', '#Tech', '#Innovation', '#Digital', '#Software'],
  },
  vlog: {
    keywords: ['vlog', 'daily vlog', 'lifestyle', 'daily life', 'personal', 'day in the life', 'behind the scenes', 'journey', 'experience', 'story'],
    tags: ['vlog', 'dailyvlog', 'lifestyle', 'dayinthelife', 'behindthescenes', 'vlogger', 'daily', 'life', 'personal', 'journey'],
    hashtags: ['#Vlog', '#DailyVlog', '#Lifestyle', '#DayInTheLife', '#Vlogger'],
  },
  shorts: {
    keywords: ['shorts', 'short video', 'quick', 'viral', 'trending', 'short form', 'bite-sized', 'clip', 'fast', 'snappy'],
    tags: ['shorts', 'shortvideo', 'viral', 'trending', 'quick', 'shortform', 'youtubeshorts', 'viralshorts', 'trendingshorts', 'clip'],
    hashtags: ['#Shorts', '#YouTubeShorts', '#Viral', '#Trending', '#ShortVideo'],
  },
  gaming: {
    keywords: ['gaming', 'gameplay', 'game', 'gamer', 'playthrough', 'walkthrough', 'lets play', 'game review', 'esports', 'gaming tips'],
    tags: ['gaming', 'gameplay', 'gamer', 'playthrough', 'letsplay', 'walkthrough', 'gamereview', 'esports', 'videogames', 'games'],
    hashtags: ['#Gaming', '#Gameplay', '#Gamer', '#LetsPlay', '#VideoGames'],
  },
  tutorial: {
    keywords: ['tutorial', 'how to', 'guide', 'learn', 'step by step', 'beginner', 'tips', 'tricks', 'education', 'teach'],
    tags: ['tutorial', 'howto', 'guide', 'learn', 'education', 'tips', 'tricks', 'stepbystep', 'beginner', 'teaching'],
    hashtags: ['#Tutorial', '#HowTo', '#Learn', '#Guide', '#Education'],
  },
  entertainment: {
    keywords: ['entertainment', 'fun', 'funny', 'comedy', 'hilarious', 'laugh', 'entertaining', 'humor', 'amusing', 'viral'],
    tags: ['entertainment', 'funny', 'comedy', 'fun', 'humor', 'hilarious', 'entertaining', 'laugh', 'viral', 'amusing'],
    hashtags: ['#Entertainment', '#Funny', '#Comedy', '#Fun', '#Viral'],
  },
  education: {
    keywords: ['education', 'learning', 'knowledge', 'educational', 'teach', 'lesson', 'academic', 'informative', 'science', 'facts'],
    tags: ['education', 'learning', 'educational', 'knowledge', 'teach', 'lesson', 'informative', 'science', 'facts', 'academic'],
    hashtags: ['#Education', '#Learning', '#Knowledge', '#Educational', '#Science'],
  },
}

export async function generateSEOContent(params: SEOContentParams): Promise<SEOContent> {
  const { category, language, videoFileName } = params

  const categoryData = categoryKeywords[category as keyof typeof categoryKeywords] || categoryKeywords.tech

  // Generate title (60-70 chars)
  const titleTemplates = [
    `${capitalize(category)} Content You Need to See`,
    `Amazing ${capitalize(category)} - Must Watch!`,
    `The Ultimate ${capitalize(category)} Experience`,
    `${capitalize(category)} That Will Blow Your Mind`,
    `Top ${capitalize(category)} Content of 2024`,
  ]

  const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]

  // Generate description with keywords
  const description = generateDescription(category, categoryData.keywords, language)

  // Generate tags
  const tags = [...categoryData.tags, language, '2024', 'viral', 'trending', 'new']

  // Generate hashtags
  const hashtags = [...categoryData.hashtags]

  // Generate thumbnail prompt
  const thumbnailPrompt = generateThumbnailPrompt(category)

  return {
    title,
    description,
    tags,
    hashtags,
    thumbnailPrompt,
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateDescription(category: string, keywords: string[], language: string): string {
  const descriptions = {
    tech: `Discover the latest in ${keywords[0]} and ${keywords[1]}! This video covers cutting-edge ${keywords[2]} techniques and ${keywords[3]} innovations that you need to know.

🔔 Subscribe for more ${category} content!
💬 Comment your thoughts below
👍 Like if you enjoyed this video

Keywords: ${keywords.slice(0, 8).join(', ')}

#${category} #technology #innovation #2024 #trending`,

    vlog: `Join me in this amazing ${keywords[0]} where I share my ${keywords[2]} and ${keywords[3]} experiences! Get an exclusive look at my ${keywords[5]} in this personal journey.

🔔 Subscribe to follow my journey!
💬 Let me know what you think
👍 Drop a like if you enjoyed

#${category} #dailyvlog #lifestyle #2024`,

    shorts: `Quick and entertaining ${category} content that you can't miss! Perfect for a fast dose of ${keywords[4]} and ${keywords[5]} entertainment.

#shorts #viral #trending #2024`,

    gaming: `Epic ${keywords[1]} featuring intense action and ${keywords[4]} moments! Watch as we dive deep into this ${keywords[2]} with expert ${keywords[9]}.

🎮 Subscribe for daily gaming content!
💬 Comment your favorite moment
👍 Like and share with fellow gamers

#gaming #gameplay #gamer #2024`,

    tutorial: `Learn ${keywords[1]} do this with our comprehensive ${keywords[2]}! Perfect for ${keywords[5]} and anyone looking to master ${keywords[7]} techniques.

📚 Step-by-step instructions
💡 Pro tips and tricks included
🔔 Subscribe for more tutorials!

#tutorial #howto #learn #guide #2024`,

    entertainment: `${keywords[2]} and ${keywords[3]} content that will make you ${keywords[5]}! Pure ${keywords[0]} at its finest.

🔔 Subscribe for daily laughs!
👍 Like if this made you smile
💬 Share your favorite part

#entertainment #funny #comedy #viral #2024`,

    education: `Expand your ${keywords[2]} with this ${keywords[3]} content! Learn about ${keywords[8]} and interesting ${keywords[9]} explained in an easy-to-understand way.

📖 Educational content for curious minds
🔔 Subscribe to keep learning!
💬 Ask questions in the comments

#education #learning #knowledge #2024`,
  }

  return descriptions[category as keyof typeof descriptions] || descriptions.tech
}

function generateThumbnailPrompt(category: string): string {
  const prompts = {
    tech: 'High-tech futuristic design with bold text overlay, vibrant blue and purple gradient, modern gadgets or code in background, professional and sleek aesthetic',
    vlog: 'Bright and colorful lifestyle shot with expressive face, warm natural lighting, candid moment, high contrast with bold text, inviting and personal vibe',
    shorts: 'Eye-catching vertical design with bold colors, dynamic action shot, large text with high contrast, energetic and attention-grabbing composition',
    gaming: 'Epic gaming scene with character action shot, vibrant neon colors, game logo prominent, intense expression, dark background with glowing effects',
    tutorial: 'Clean educational layout with step numbers, bright background, before/after comparison, clear title text, professional and trustworthy design',
    entertainment: 'Expressive reaction face with bright colors, bold text, high energy composition, funny or surprising expression, yellow and red accents',
    education: 'Professional educational design with icons or diagrams, clean white/blue background, bold readable text, academic but approachable aesthetic',
  }

  return prompts[category as keyof typeof prompts] || prompts.tech
}
