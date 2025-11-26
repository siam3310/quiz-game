import { supabase } from '@/utils/supabase'

export default async function handler (req, res) {
  const { method } = req
  const { id } = req.query

  switch (method) {
    case 'PUT':
      try {
        const { data, error } = await supabase.from('questions').update(req.body).eq('id', id)
        if (error) throw error
        res.status(200).json(data)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const { data, error } = await supabase.from('questions').delete().eq('id', id)
        if (error) throw error
        res.status(200).json(data)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}