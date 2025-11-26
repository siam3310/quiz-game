import { supabase } from '@/utils/supabase'

export default async function handler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase.from('questions').select()
        if (error) throw error
        res.status(200).json(data)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
      break
    case 'POST':
      try {
        const { data, error } = await supabase.from('questions').insert(req.body)
        if (error) throw error
        res.status(201).json(data)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}