// source_code/src/pages/admin.js
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

// --- Component for Managing Topics ---
const TopicManager = () => {
	const [topics, setTopics] = useState([])
	const [newTopicName, setNewTopicName] = useState('')
	const [editingTopic, setEditingTopic] = useState(null)

	const fetchTopics = async () => {
		const { data } = await supabase.from('topics').select('*')
		setTopics(data.sort((a, b) => a.id - b.id) || [])
	}

	useEffect(() => {
		fetchTopics()
	}, [])

	const handleAddTopic = async (e) => {
		e.preventDefault()
		if (!newTopicName.trim()) return
		await supabase.from('topics').insert([{ name: newTopicName }])
		setNewTopicName('')
		fetchTopics()
	}

	const handleUpdateTopic = async (id, newName) => {
		if (!newName.trim()) return
		await supabase.from('topics').update({ name: newName }).eq('id', id)
		setEditingTopic(null)
		fetchTopics()
	}

	const handleDeleteTopic = async (id) => {
		if (window.confirm('Are you sure you want to delete this topic and all its questions?')) {
			await supabase.from('topics').delete().eq('id', id)
			fetchTopics()
		}
	}

	return (
		<div className='bg-gray-800 p-4 rounded-lg'>
			<h2 className='text-xl font-bold mb-4 text-white'>Manage Topics</h2>
			<form onSubmit={handleAddTopic} className='mb-6 flex gap-2'>
				<input
					type='text'
					value={newTopicName}
					onChange={(e) => setNewTopicName(e.target.value)}
					placeholder='New topic name'
					className='bg-gray-700 text-white rounded-md p-2 flex-grow'
				/>
				<button
					type='submit'
					className='bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-4'
				>
					Add
				</button>
			</form>

			<ul className='space-y-2'>
				{topics.map((topic) => (
					<li
						key={topic.id}
						className='bg-gray-700 p-2 rounded-md flex justify-between items-center'
					>
						{editingTopic?.id === topic.id
							? (
								<input
									type='text'
									defaultValue={topic.name}
									onBlur={(e) => handleUpdateTopic(topic.id, e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') handleUpdateTopic(topic.id, e.target.value)
										if (e.key === 'Escape') setEditingTopic(null)
									}}
									className='bg-gray-600 text-white rounded-md p-1'
									autoFocus
								/>
							)
							: (
								<span className='text-white'>{topic.name}</span>
							)}
						<div>
							<button
								onClick={() => setEditingTopic(topic)}
								className='text-blue-400 hover:text-blue-300 mr-2'
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteTopic(topic.id)}
								className='text-red-400 hover:text-red-300'
							>
								Delete
							</button>
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
	const [newQuestion, setNewQuestion] = useState({ topic_id: '', question_text: '', answers: '', correct_answer: '' })

	const fetchData = async () => {
		const { data: qData } = await supabase.from('questions').select('*')
		const { data: tData } = await supabase.from('topics').select('id, name')
		setQuestions(qData.sort((a, b) => a.id - b.id) || [])
		setTopics(tData.sort((a, b) => a.id - b.id) || [])
		if (tData.length > 0) {
			setNewQuestion(prev => ({ ...prev, topic_id: tData[0].id }))
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleAddQuestion = async (e) => {
		e.preventDefault()
		const answersArray = newQuestion.answers.split(',').map(s => s.trim())
		if (!newQuestion.question_text || answersArray.length < 2 || !newQuestion.correct_answer) {
			alert('Please fill all fields. Answers must be comma-separated.')
			return
		}
		await supabase.from('questions').insert([{ ...newQuestion, answers: answersArray }])
		fetchData()
	}

	const handleDeleteQuestion = async (id) => {
		if (window.confirm('Are you sure you want to delete this question?')) {
			await supabase.from('questions').delete().eq('id', id)
			fetchData()
		}
	}

	const getTopicName = (topicId) => {
		const topic = topics.find(t => t.id === topicId)
		return topic ? topic.name : 'Unknown'
	}

	return (
		<div className='bg-gray-800 p-4 rounded-lg mt-6'>
			<h2 className='text-xl font-bold mb-4 text-white'>Manage Questions</h2>
			{/* Add Question Form */}
			<form onSubmit={handleAddQuestion} className='mb-6 space-y-3'>
				<select
					value={newQuestion.topic_id}
					onChange={(e) => setNewQuestion({ ...newQuestion, topic_id: Number(e.target.value) })}
					className='bg-gray-700 text-white rounded-md p-2 w-full'
				>
					{topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
				</select>
				<input
					type='text'
					value={newQuestion.question_text}
					onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
					placeholder='Question text'
					className='bg-gray-700 text-white rounded-md p-2 w-full'
				/>
				<input
					type='text'
					value={newQuestion.answers}
					onChange={(e) => setNewQuestion({ ...newQuestion, answers: e.target.value })}
					placeholder='Answers, comma-separated'
					className='bg-gray-700 text-white rounded-md p-2 w-full'
				/>
				<input
					type='text'
					value={newQuestion.correct_answer}
					onChange={(e) => setNewQuestion({ ...newQuestion, correct_answer: e.target.value })}
					placeholder='Correct answer'
					className='bg-gray-700 text-white rounded-md p-2 w-full'
				/>
				<button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-4 py-2'>
					Add Question
				</button>
			</form>

			{/* Question List */}
			<div className='space-y-3'>
				{questions.map((q) => (
					<div key={q.id} className='bg-gray-700 p-3 rounded-md flex justify-between items-start'>
						<div>
							<p className='text-sm font-semibold text-blue-300'>{getTopicName(q.topic__id)}</p>
							<p className='text-white my-1'>{q.question_text}</p>
							<div className='text-xs text-gray-400'>
								Correct Answer: <span className='text-green-400'>{q.correct_answer}</span>
							</div>
						</div>
						<button onClick={() => handleDeleteQuestion(q.id)} className='text-red-400 hover:text-red-300'>Delete</button>
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
