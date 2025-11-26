import { supabase } from '@/utils/supabase'

export default async function handler (req, res) {
  const { method } = req

  if (method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  try {
    const { data, error } = await supabase.from('questions').select()
    if (error) throw error
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}