// source_code/src/pages/admin.js
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

// --- Component for Managing Topics ---
const TopicManager = () => {
	const [topics, setTopics] = useState([])

	useEffect(() => {
		const fetchTopics = async () => {
			const { data } = await supabase.from('topics').select('*')
			setTopics(data || [])
		}
		fetchTopics()
	}, [])

	return (
		<div className='bg-gray-800 p-4 rounded-lg'>
			<h2 className='text-xl font-bold mb-4 text-white'>Manage Topics</h2>
			<ul className='space-y-2'>
				{topics.map((topic) => (
					<li
						key={topic.id}
						className='bg-gray-700 p-2 rounded-md flex justify-between items-center'
					>
						<span className='text-white'>{topic.name}</span>
						<div>
							<button className='text-blue-400 hover:text-blue-300 mr-2'>Edit</button>
							<button className='text-red-400 hover:text-red-300'>Delete</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

// --- Component for Managing Questions ---
const QuestionManager = () => {
	const [questions, setQuestions] = useState([])
	const [topics, setTopics] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const { data: qData } = await supabase.from('questions').select('*')
			const { data: tData } = await supabase.from('topics').select('id, name')
			setQuestions(qData || [])
			setTopics(tData || [])
		}
		fetchData()
	}, [])

	const getTopicName = (topicId) => {
		const topic = topics.find(t => t.id === topicId)
		return topic ? topic.name : 'Unknown'
	}

	return (
		<div className='bg-gray-800 p-4 rounded-lg mt-6'>
			<h2 className='text-xl font-bold mb-4 text-white'>Manage Questions</h2>
			<div className='space-y-3'>
				{questions.map((q) => (
					<div key={q.id} className='bg-gray-700 p-3 rounded-md'>
						<p className='text-sm font-semibold text-blue-300'>{getTopicName(q.topic_id)}</p>
						<p className='text-white my-1'>{q.question_text}</p>
						<div className='text-xs text-gray-400'>
							Correct Answer: <span className='text-green-400'>{q.correct_answer}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

// --- Main Admin Page ---
const AdminPage = () => {
	return (
		<div className='min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8'>
			<header className='mb-8'>
				<h1 className='text-3xl font-bold text-center text-blue-400'>Admin Dashboard</h1>
				<p className='text-center text-gray-400 mt-1'>
					Manage quiz topics and questions.
				</p>
			</header>

			<main className='max-w-4xl mx-auto'>
				<TopicManager />
				<QuestionManager />
			</main>
		</div>
	)
}

export default AdminPage
