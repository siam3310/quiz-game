// source_code/src/helpers/getQuestions.js
import { supabase } from '@/lib/supabaseClient'

// Helper function to shuffle an array
const randomArray = (arr) => arr.toSorted(() => 0.5 - Math.random())

/**
 * Fetches quiz questions from the data source based on selected topics.
 * This function is now configured to use the Supabase client (currently mocked).
 *
 * @param {string[]} selectedTopics - An array of topic names to fetch questions for.
 * @param {number} qNumber - The total number of questions to return.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of formatted question objects.
 */
export default async function getQuestions (selectedTopics, qNumber) {
	// 1. Fetch all topics and questions from Supabase (mock)
	const { data: topics, error: topicsError } = await supabase.from('topics').select('id, name')
	const { data: questions, error: questionsError } = await supabase.from('questions').select('*')

	// Basic error handling
	if (topicsError || questionsError) {
		console.error('Error fetching data:', topicsError || questionsError)
		// In a real app, you might want to show a user-facing error
		return []
	}

	// 2. Create a map of topic IDs to names for efficient lookup
	const topicIdToName = topics.reduce((acc, topic) => {
		acc[topic.id] = topic.name
		return acc
	}, {})

	// 3. Filter the questions to include only those from the selected topics
	const filteredQuestions = questions.filter((question) =>
		selectedTopics.includes(topicIdToName[question.topic_id])
	)

	// 4. Shuffle the filtered list and slice to get the desired number of questions
	const randomQuestions = randomArray(filteredQuestions).slice(0, qNumber)

	// 5. Format the selected questions into the structure required by the UI components
	const formattedQuestions = randomQuestions.map((q) => ({
		question: q.question_text,
		answers: randomArray(q.answers), // Shuffle answers for each question
		correctAnswer: q.correct_answer,
		topic: topicIdToName[q.topic_id],
		userAnswer: undefined,
		ia: false // All questions are from the database, not AI
	}))

	// We return a promise with a timeout to simulate the feel of a network request,
	// as the original code did.
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(formattedQuestions)
		}, 500) // 500ms delay
	})
}
