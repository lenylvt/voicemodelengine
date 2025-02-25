import { NextResponse } from 'next/server'

export interface ModelData {
  id: string
  title: string
  simplifiedTitle: string
  content: string
  tags: string[]
  createdAt: string
  image: string
  url: string
  isProcessed: boolean
  isPublic: boolean
  isUnlisted: boolean
  isVetted: boolean
  allSamplesGenerated: boolean
  recommendedSampleId: number
  metrics: {
    id: string
    asOf: string
    views: number
    downloads: number
    comments: number
    likes: number
    saves: number
    creations: number
  }
  processedImage: {
    url: string
    blurDataUrl: string
    alt: string | null
  }
  discordUser: string
  likes: number
  downloads: number
  views: number
  creations: number
  saves: number
  comments: number
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const tag = searchParams.get('tag')?.toLowerCase()
  const cursor = searchParams.get('cursor') || ''

  const queryParams = new URLSearchParams({
    input: JSON.stringify({
      json: {
        query: query,
        tagFilters: tag ? [tag] : [],
        sortFilter: null,
        limit: 20,
        cursor: cursor,
        direction: "forward"
      },
      meta: {
        values: {
          sortFilter: ["undefined"]
        }
      }
    })
  })

  const apiUrl = `https://www.weights.com/api/data/home.searchModels?${queryParams}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'fr-FR,fr;q=0.9',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
        'x-payload-sig': 'ec6f1706aa0ca85e4460a1bf6a9dd33664d3a44b2cc90c085cdcfd6d9621a52b',
        'x-datadog-origin': 'rum',
        'x-datadog-sampling-priority': '1',
        'traceparent': '00-00000000000000001946265bdd4c9a53-74f6fa9df7de2c3f-01',
        'tracestate': 'dd=s:1;o:rum',
        'Priority': 'u=3, i'
      },
      credentials: 'include',
      mode: 'cors',
      cache: 'default'
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API request failed with status ${response.status}. Response: ${text}`);
    }

    const responseText = await response.text();
    let results;
    try {
      results = JSON.parse(responseText);
    } catch (error) {
      throw new Error(`Failed to parse JSON response. Raw response: ${responseText}`);
    }

    return NextResponse.json({
      result: {
        data: {
          json: results
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch models',
        details: error.message,
        requestUrl: apiUrl
      },
      { status: 500 }
    );
  }
}