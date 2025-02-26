'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { searchConfig } from './config/search'
import { motion, AnimatePresence } from "framer-motion"

const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div 
        className="flex overflow-hidden relative h-6"
        layout
        initial={false}
        animate={{ width: "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={text}
            className="flex whitespace-nowrap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.02, // Slower delay between characters
                  ease: "easeInOut"
                }}
                className="text-base font-medium tracking-wide" // Improved text styling
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <ChevronDown className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0" />
    </div>
  );
};


export default function Home() {
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedSort, setSelectedSort] = useState('best-match')

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-8">Voice Model Search</h1>
        
        <div className="w-full space-y-2">
          <div className="relative w-full">
            <Input 
              placeholder="Search voice models..."
              className="w-full pl-6 pr-20 py-6 text-lg rounded-2xl border-2 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus-visible:ring-offset-2"
            />
            <Button 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div layout>
                  <Button 
                    variant="outline" 
                    className="rounded-xl border-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 h-10"
                  >
                    <AnimatedText 
                      text={selectedTag ? searchConfig.tags.find(t => t.id === selectedTag)?.label || '' : 'All Tags'}
                      className="px-3"
                    />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="p-2" 
                align="start"
              >
                {searchConfig.tags.map(tag => (
                  <DropdownMenuItem 
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    className="rounded-lg cursor-pointer"
                  >
                    {tag.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div layout>
                  <Button 
                    variant="outline" 
                    className="rounded-xl border-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 h-10"
                  >
                    <AnimatedText 
                      text={searchConfig.sortOptions.find(s => s.id === selectedSort)?.label || 'Sort By'}
                      className="px-3"
                    />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="p-2" 
                align="start"
              >
                {searchConfig.sortOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.id}
                    onClick={() => setSelectedSort(option.id)}
                    className="rounded-lg cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </main>
  )
}