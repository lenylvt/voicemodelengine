'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ModelData } from './api/search/route'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ModelData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search${query ? `?q=${query}` : ''}`)
        const data = await response.json()
        setResults(data.result.data.json)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models..."
            className="flex-1 p-2 border rounded"
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results?.map((model) => (
              <div key={model.id} className="border rounded-lg p-4">
                <div className="aspect-video relative mb-4">
                  <Image
                    src={model.processedImage.url}
                    alt={model.title}
                    fill
                    className="object-cover rounded"
                    placeholder="blur"
                    blurDataURL={model.processedImage.blurDataUrl}
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">{model.title}</h2>
                <p className="text-gray-600 mb-4">{model.content}</p>
                <div className="flex gap-2 flex-wrap">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}