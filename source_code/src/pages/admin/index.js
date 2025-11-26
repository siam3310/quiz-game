import Head from 'next/head'

export default function Admin () {
  const questions = [
    {
      _id: '1',
      question: 'What is the capital of France?',
      topic: 'Geography',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      _id: '2',
      question: 'What is the capital of Spain?',
      topic: 'Geography',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Madrid'
    }
  ]

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <main className='flex justify-center min-h-screen'>
        <div className='w-full max-w-4xl px-4'>
          <h1 className='text-3xl font-bold text-center mt-10'>Admin Panel</h1>
          <form className='mt-10' onSubmit={() => {}}>
            <h2 className='text-2xl font-bold'>Add question</h2>
            <div className='flex flex-col gap-4 mt-4'>
              <input
                type='text'
                placeholder='Question'
                className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
              />
              <input
                type='text'
                placeholder='Topic'
                className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
              />
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='text'
                  placeholder='Answer 1'
                  className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
                />
                <input
                  type='text'
                  placeholder='Answer 2'
                  className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
                />
                <input
                  type='text'
                  placeholder='Answer 3'
                  className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
                />
                <input
                  type='text'
                  placeholder='Answer 4'
                  className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
                />
              </div>
              <input
                type='text'
                placeholder='Correct answer'
                className='w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md'
              />
              <button
                type='submit'
                className='w-full px-4 py-2 text-white bg-blue-500 rounded-md'
              >
                Add
              </button>
            </div>
          </form>
          <div className='mt-10'>
            <h2 className='text-2xl font-bold'>Questions</h2>
            <div className='flex flex-col gap-4 mt-4'>
              {questions.map(question => (
                <div key={question._id} className='flex flex-col gap-2 p-4 bg-gray-100 rounded-md'>
                  <div className='flex justify-between'>
                    <h3 className='text-lg font-bold text-black'>{question.question}</h3>
                    <div className='flex gap-2'>
                      <button className='px-2 py-1 text-white bg-blue-500 rounded-md'>
                        Edit
                      </button>
                      <button className='px-2 py-1 text-white bg-red-500 rounded-md'>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    {question.answers.map(answer => (
                      <p
                        key={answer}
                        className={`p-2 text-black rounded-md ${
                          answer === question.correctAnswer
                            ? 'bg-green-200'
                            : 'bg-red-200'
                        }`}
                      >
                        {answer}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}