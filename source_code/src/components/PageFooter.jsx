import Image from 'next/image'
import playSound from '@/helpers/playSound'
import soundOn from '../assets/sound-on.svg'
import soundOff from '../assets/sound-off.svg'
import { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'
import { GoAlert } from 'react-icons/go'
import { BsFillStarFill } from 'react-icons/bs'

export default function Footer ({ alert = false }) {
	const [sound, setSound] = useState(false)
	const [showInfo, setShowInfo] = useState(false)

	useEffect(() => {
		if (!localStorage.getItem('sound')) localStorage.setItem('sound', sound)
		else setSound(localStorage.getItem('sound') === 'true')
	}, [])

	useEffect(() => localStorage.setItem('sound', sound), [sound])

	function handleClick (info = false) {
		info ? setShowInfo(!showInfo) : setSound(!sound)
		playSound('switch-on')
	}

	function handleSoundON () {
		setSound(true)
		localStorage.setItem('sound', true)
		playSound('switch-on')
	}

	return (
		<footer className='fixed right-4 bottom-3 z-20'>
			<nav>
				<ul className='flex gap-4'>
					<li className='relative'>
						<button title='Show info' className={`align-middle relative z-20 hover:scale-105 p-1.5 bg-white rounded-md ${showInfo ? 'scale-110' : ''}`} onClick={() => handleClick(true)}>
							{
								alert
									? <GoAlert className='text-[25px] mx-auto' color='#0f172a' />
									: <MdInfo className='text-[25px]' style={{ color: '#1c233a' }} />
							}
						</button>
					</li>

					<li>
						<button title={sound ? 'Mute' : 'Play music'} className='align-middle hover:scale-105 p-1.5 bg-white rounded-md'>
							{
								sound
									? <Image src={soundOn} alt="" width={25} height={25} onClick={() => setSound(false)} />
									: <Image src={soundOff} alt="" width={25} height={25} onClick={handleSoundON} />
							}
						</button>
					</li>
				</ul>
			</nav>
		</footer>
	)
}
