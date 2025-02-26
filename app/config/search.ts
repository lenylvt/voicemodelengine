export const searchConfig = {
  tags: [
    { id: 'english', label: 'Anglais', category: 'language' },
    { id: 'japanese', label: 'Japanese', category: 'language' },
    { id: 'spanish', label: 'Español', category: 'language' },
    { id: 'korean', label: 'Coréen', category: 'language' },
    { id: 'french', label: 'Français', category: 'language' },
    { id: 'russian', label: 'Russie', category: 'language' },
    { id: 'italian', label: 'Italien', category: 'language' },
    { id: 'turkish', label: 'Türk', category: 'language' },
    { id: 'other-languages', label: 'Other Languages', category: 'language' },
    { id: 'artist', label: 'Artist', category: 'type' },
    { id: 'anime', label: 'Anime', category: 'type' },
    { id: 'fictional', label: 'Fictional', category: 'type' },
    { id: 'e-celeb', label: 'E-Celeb', category: 'type' },
    { id: 'non-voice', label: 'Non-Voice / Other', category: 'type' },
    { id: 'tts', label: 'TTS / Realtime', category: 'type' },
    { id: 'og-self', label: 'OG/Self', category: 'type' }
  ],
  sortOptions: [
    { id: 'upload-date', label: 'Date de téléchargement', value: 'createdAt' },
    { id: 'downloads', label: 'Téléchargements', value: 'downloads' },
    { id: 'likes', label: 'Mentions J\'aime', value: 'likes' },
    { id: 'creations', label: 'Créations', value: 'creations' },
    { id: 'saves', label: 'Économise', value: 'saves' },
    { id: 'views', label: 'Points de vue', value: 'views' },
    { id: 'comments', label: 'Commentaires', value: 'comments' },
    { id: 'best-match', label: 'Best Match', value: 'relevance' }
  ]
} as const;

export type SearchTag = typeof searchConfig.tags[number];
export type SortOption = typeof searchConfig.sortOptions[number];