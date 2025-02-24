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

// Mock data - in a real app, this would come from a database
const mockData: ModelData[] = [
  {
    id: "clmjwhwya046awsunvy2wfet1",
    title: "MICHOU",
    simplifiedTitle: "MICHOU",
    content: "Voici le model de michou, je vous partagerai le dataset si vous voulez !",
    tags: ["RVC v2", "YouTubeur", "Français"],
    createdAt: "2023-07-13T09:31:17.022Z",
    image: "https://cdn.discordapp.com/attachments/1128981969594744902/1128981969875767307/telechargement_2.jpeg",
    url: "https://models.weights.com/clmjwhwya046awsunvy2wfet1.zip",
    isProcessed: true,
    isPublic: true,
    isUnlisted: false,
    isVetted: true,
    allSamplesGenerated: true,
    recommendedSampleId: 1,
    metrics: {
      id: "clmjwhwya046awsunvy2wfet1",
      asOf: "2025-02-24T20:01:10.736Z",
      views: 3324,
      downloads: 765,
      comments: 7,
      likes: 29,
      saves: 8,
      creations: 1854
    },
    processedImage: {
      url: "https://assets.weights.com/clmjwhwya046awsunvy2wfet1/14b11fd08a9690f7bb77e5409049c168.jpg",
      blurDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAEoANf/AKg2XYxFSv/f/wDFVnL0tJz/fKEAxEZ4pnZ2tlV8AAIAGPD4/0dPYZwWE7TrvjkwAAAAAElFTkSuQmCC",
      alt: null
    },
    discordUser: "I brokn I",
    likes: 29,
    downloads: 765,
    views: 3324,
    creations: 1854,
    saves: 8,
    comments: 7
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const tag = searchParams.get('tag')?.toLowerCase()

  let results = [...mockData]

  if (query) {
    results = results.filter(model => 
      model.title.toLowerCase().includes(query) ||
      model.content.toLowerCase().includes(query) ||
      model.simplifiedTitle.toLowerCase().includes(query)
    )
  }

  if (tag) {
    results = results.filter(model => 
      model.tags.some(t => t.toLowerCase().includes(tag))
    )
  }

  return NextResponse.json({
    result: {
      data: {
        json: results
      }
    }
  })
}