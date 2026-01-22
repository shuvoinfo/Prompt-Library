
import { PromptItem, LinkItem } from './types';

export const USER_PROMPTS: PromptItem[] = [
  {
    id: 'p1',
    title: 'Cinematic Cat Video (VEO 3)',
    category: 'Video',
    description: 'Generates 15-20 sequential cinematic prompts for VEO 3 featuring an orange cat.',
    content: `You are an expert cinematic AI text to video prompt generator for cat videos.

I will provide a short story idea.
Based strictly on that story, generate 15-20 sequential image prompts.

 The main part is Maintain consultancy.
 Do NOT add random actions outside the story.
 Every scene must visually move the story forward.

Each scene must include:
 Generating Prompt (for generating text to video in Google VEO 3 , Natural realistic cinematic style visuals)

Must include in every Prompt:
 "The orange cat with a human-like posture"
 "Do not add any background music. Only use natural ambient sounds"
 "Natural realistic visuals"

Note:
 The main character are orange cat and her orange kitten
 Maintain consultant character in every Prompt

Now generate prompts based on the following story: `
  },
  {
    id: 'p2',
    title: 'Special AI Story Architect',
    category: 'Story',
    description: 'Transform raw ideas into high-quality English stories optimized for AI comprehension.',
    content: `Act as a world-class Narrative Architect. Your goal is to write a full, detailed story in English based on the user's input. 

{ full story ta english lekhe dew & amon kore lekhe dew jono ai bujte pare porle karon ami akta specal kaj korbo }

IMPORTANT RULES:
1. Output the FULL STORY in clear, professional English.
2. Write in a way that an AI (like a video generator) can easily understand and visualize. 
3. Use descriptive, visual language (describe lighting, mood, and actions).
4. Structure the story logically with clear scene transitions.

User Input: `
  },
  {
    id: 'p3',
    title: 'Professional VO Script',
    category: 'Script',
    description: 'Converts video transcripts into 600-700 word professional English VO scripts.',
    content: `I will give you a video transcript and you write a professional voice over script. “Requirements: The script Word count should be 600-700 । সম্পূর্ণ স্ক্রিপ্ট হবে ইংরেজিতে এবং আকর্ষণীয় হওয়া উচিত , স্ক্রিপটিতে কিছু পরিবর্তন আনবে এবং কিছুটা নিজের মত করে লেখার চেষ্টা করবেন।`
  },
  {
    id: 'p4',
    title: 'Psychological Optimization',
    category: 'Script',
    description: 'Rates scripts and optimizes them for 10/10 psychological engagement.',
    content: `Task 1 : [ আমার দেওয়া YouTube audio script তোমার কাছে কেমন লেগেছে ? তুমি ১০ এর মধ্যে কত রেটিং দিবা? ]

Task 2 : “ এবং আমার audio script অত্যন্ত আকর্ষণীয় বানানোর জন্য তোমার যা মনে হয় তার সবকিছু করে দাও , যেন তা ১০/১০ হয়। সম্পূর্ণ স্ক্রিপ্ট হবে ইংরেজিতে এবং অত্যন্ত আকর্ষণীয় এবং তার পাশাপাশি অনেকটা শান্ত বিচ্ছিন্ন মনস্তাত্ত্বিক বিশ্লেষণ , চিন্তাশীল সাহিত্যিক এবং কাব্যিক ছন্দময় হওয়া উচিত , যেন’ একজন লোক হৃদয় থেকে বলছে। যেন’ দর্শক শুরু থেকে শেষ পর্যন্ত মনোযোগ দিয়ে দেখতে থাকে এবং সম্পূর্ণ স্ক্রিপ্টে তুমি নিজের ইচ্ছামত যে কোন কিছু পরিবর্তন করতে পারো “ The output script written in simple paragraph style & ready for AI voice over recording. The script Word count should be 600-700 “`
  },
  {
    id: 'p5',
    title: 'Ghibli Thumbnail Creator',
    category: 'Graphics',
    description: 'Studio Ghibli style prompts with artistic, emotional hand-painted look.',
    content: `Create a 16:9 YouTube thumbnail based on the provided script. [ Studio Ghibli-inspired style, with a hand-painted and sketch-like look. The background and text should feel artistic and emotional, with moody lighting that creates a heartfelt atmosphere. Use bold white and yellow text in large letters between 3 to 6 words. Text in the middle of the thumbnail ]`
  },
  {
    id: 'p6',
    title: 'US YouTube SEO Metadata',
    category: 'SEO',
    description: 'SEO strong Title, Description, and Tags for US audience.',
    content: `Using the script below, create YouTube metadata for a US audience:
• Title = short, clickbait, SEO strong. 
• Description = pro feel, powerful hook, title repeat, hashtags, keywords, value prop. 
• Tags = comma separated, best search terms.`
  }
];

export const QUICK_LINKS: LinkItem[] = [
  { id: 'l1', name: 'CapCut', url: 'https://capcut.com/my-cloud/7511750', icon: '🎬' },
  { id: 'l2', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: '🤖' },
  { id: 'l3', name: 'AI Studio', url: 'https://ai.studio/apps/drive/13MJolwyUfi8SDj42OfecK6Z3VpjATCgc?fullscreenApplet=true', icon: '✨' },
  { id: 'l4', name: 'LM Arena', url: 'https://lmarena.ai/', icon: '⚖️' }
];
