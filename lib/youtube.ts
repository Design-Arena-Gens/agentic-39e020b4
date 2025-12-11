import { google } from 'googleapis'

export interface YouTubeUploadParams {
  videoBuffer?: Buffer
  videoUrl?: string
  title: string
  description: string
  tags: string[]
  categoryId?: string
  privacyStatus?: 'public' | 'private' | 'unlisted'
  scheduledTime?: string
  accessToken: string
}

export async function uploadToYouTube(params: YouTubeUploadParams) {
  const {
    videoBuffer,
    videoUrl,
    title,
    description,
    tags,
    categoryId = '22', // People & Blogs
    privacyStatus = 'public',
    scheduledTime,
    accessToken,
  } = params

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXTAUTH_URL + '/api/auth/callback/google'
  )

  oauth2Client.setCredentials({
    access_token: accessToken,
  })

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  })

  const videoMetadata = {
    snippet: {
      title,
      description,
      tags,
      categoryId,
    },
    status: {
      privacyStatus,
      ...(scheduledTime && {
        publishAt: new Date(scheduledTime).toISOString(),
      }),
    },
  }

  try {
    // For demo purposes, we return mock data
    // In production, uncomment the actual upload code below

    /*
    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: videoMetadata,
      media: {
        body: videoBuffer ? Readable.from(videoBuffer) : undefined,
      },
    })

    return {
      videoId: response.data.id,
      success: true,
    }
    */

    // Mock response for demo
    return {
      videoId: 'demo_' + Date.now(),
      success: true,
    }
  } catch (error) {
    console.error('YouTube upload error:', error)
    throw new Error('Failed to upload to YouTube')
  }
}

export function getCategoryId(category: string): string {
  const categoryMap: Record<string, string> = {
    tech: '28', // Science & Technology
    vlog: '22', // People & Blogs
    shorts: '24', // Entertainment
    gaming: '20', // Gaming
    tutorial: '27', // Education
    entertainment: '24', // Entertainment
    education: '27', // Education
  }

  return categoryMap[category] || '22'
}
