'use client'

import { useState } from 'react'
import { Upload, Video, CheckCircle, Loader2, Youtube } from 'lucide-react'

interface UploadResult {
  title: string
  description: string
  tags: string[]
  hashtags: string[]
  thumbnailPrompt: string
  videoId?: string
  scheduledTime?: string
}

export default function Home() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [category, setCategory] = useState('tech')
  const [language, setLanguage] = useState('en')
  const [monetization, setMonetization] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
      setVideoUrl('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      if (videoFile) {
        formData.append('video', videoFile)
      }
      formData.append('videoUrl', videoUrl)
      formData.append('category', category)
      formData.append('language', language)
      formData.append('monetization', monetization.toString())
      formData.append('scheduleTime', scheduleTime)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Youtube className="w-12 h-12 text-youtube" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                YouTube Upload Agent
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              AI-powered automated video uploader with SEO optimization
            </p>
          </div>

          {/* Upload Form */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Video Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Video File or URL
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-600 rounded-xl hover:border-purple-500 transition-colors cursor-pointer bg-gray-900/50"
                    >
                      <Upload className="w-6 h-6" />
                      <span>
                        {videoFile ? videoFile.name : 'Click to upload video file'}
                      </span>
                    </label>
                  </div>
                  <div className="text-center text-gray-400">OR</div>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value)
                      setVideoFile(null)
                    }}
                    placeholder="Enter video URL"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="tech">Tech</option>
                  <option value="vlog">Vlog</option>
                  <option value="shorts">Shorts</option>
                  <option value="gaming">Gaming</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="education">Education</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                  <option value="hi">Hindi</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>

              {/* Monetization */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="monetization"
                  checked={monetization}
                  onChange={(e) => setMonetization(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 focus:ring-2 focus:ring-purple-500"
                />
                <label htmlFor="monetization" className="text-gray-300">
                  Enable monetization
                </label>
              </div>

              {/* Schedule Time */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Schedule Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (!videoFile && !videoUrl)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing & Uploading...
                  </>
                ) : (
                  <>
                    <Video className="w-6 h-6" />
                    Upload to YouTube
                  </>
                )}
              </button>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-xl">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Upload Successful!</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Video Title</h3>
                    <p className="text-lg">{result.title}</p>
                  </div>

                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
                    <p className="whitespace-pre-wrap text-gray-300">{result.description}</p>
                  </div>

                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-600/30 rounded-full text-sm border border-purple-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Hashtags</h3>
                    <p className="text-blue-400">{result.hashtags.join(' ')}</p>
                  </div>

                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Thumbnail Prompt</h3>
                    <p className="text-gray-300">{result.thumbnailPrompt}</p>
                  </div>

                  {result.scheduledTime && (
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Scheduled For</h3>
                      <p className="text-lg">{result.scheduledTime}</p>
                    </div>
                  )}

                  {result.videoId && (
                    <div className="p-4 bg-green-500/20 rounded-xl border border-green-500">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Video ID</h3>
                      <p className="text-lg font-mono text-green-300">{result.videoId}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${result.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block px-4 py-2 bg-youtube hover:bg-red-700 rounded-lg font-semibold transition-colors"
                      >
                        View on YouTube
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Powered by AI • Optimized for YouTube SEO</p>
          </div>
        </div>
      </div>
    </main>
  )
}
