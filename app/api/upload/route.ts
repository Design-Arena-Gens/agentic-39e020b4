import { NextRequest, NextResponse } from 'next/server'
import { generateSEOContent } from '@/lib/seo-generator'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const videoFile = formData.get('video') as File | null
    const videoUrl = formData.get('videoUrl') as string
    const category = formData.get('category') as string
    const language = formData.get('language') as string
    const monetization = formData.get('monetization') === 'true'
    const scheduleTime = formData.get('scheduleTime') as string

    if (!videoFile && !videoUrl) {
      return NextResponse.json(
        { error: 'Please provide a video file or URL' },
        { status: 400 }
      )
    }

    // Generate SEO content using AI
    const seoContent = await generateSEOContent({
      category,
      language,
      videoFileName: videoFile?.name,
    })

    // Here you would integrate with YouTube API
    // For demo purposes, we'll simulate the upload
    const result = {
      ...seoContent,
      videoId: 'demo_' + Date.now(),
      scheduledTime: scheduleTime || undefined,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
