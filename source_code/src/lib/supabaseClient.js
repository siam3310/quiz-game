// source_code/src/lib/supabaseClient.js

// ----------------------------------------------------------------------------
// ---- THIS IS A MOCK SUPABASE CLIENT ----------------------------------------
// ----------------------------------------------------------------------------
// This file simulates the behavior of the Supabase client by returning
// data from the local `questions.json` file. It allows for UI development
// and testing without a live database connection.
//
// --- TO CONNECT TO YOUR REAL SUPABASE DATABASE: ---
// 1. Comment out or delete the contents of this file.
// 2. Uncomment the following code block.
// 3. Add your Supabase URL and Anon Key to a new `.env.local` file in the
//    `source_code` directory.
//
// --- .env.local FILE ---
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
// -----------------------------------------------------------------------------

/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/

// --- MOCK IMPLEMENTATION ---

import questionsData from '@/assets/questions.json'

// Helper function to simulate a Supabase query with a delay
const mockQuery = (data) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ data, error: null })
		}, 300) // Simulate network delay
	})
}

// Transform the JSON data into the format our new schema would have
const topics = Object.keys(questionsData).map((topic, index) => ({
	id: index + 1,
	name: topic
}))

const questions = Object.entries(questionsData).flatMap(([topic, questionsList]) => {
	const topicId = topics.find((t) => t.name === topic).id
	return questionsList.map((q, index) => ({
		id: (topicId - 1) * 15 + index + 1, // Generate a unique ID
		question_text: q.question,
		answers: q.answers,
		correct_answer: q.correctAnswer,
		topic_id: topicId
	}))
})

// Mock 'from' method to simulate table selection
const from = (tableName) => {
	const select = () => {
		switch (tableName) {
		case 'topics':
			return mockQuery(topics)
		case 'questions':
			return mockQuery(questions)
		default:
			return mockQuery(null, { message: 'Table not found' })
		}
	}
	return { select }
}

// The mock Supabase client object
export const supabase = {
	from
}
