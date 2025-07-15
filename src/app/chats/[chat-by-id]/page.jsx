'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/api/pages/chat/utils/axios-reguest'
import DefaultChatComponent from '@/components/pages/chat/pages/default-chat/default-chat'
import useChat from '@/store/pages/chat/pages/default-chat/default-chat'
import {
	Heart,
	Info,
	Mic,
	Phone,
	Smile,
	Sticker,
	Video,
	Image,
} from 'lucide-react'
import EmojiPicker from 'emoji-picker-react' // ✅ правильная библиотека

export default function ChatById() {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')
	const params = useParams()
	const { chatById, getChatById, userByName, getUserByName } = useChat()

	useEffect(() => {
		if (params['chat-by-id']) {
			getChatById(params['chat-by-id'])
		}
		const storedUserName = localStorage.getItem('userName')
		if (storedUserName) {
			getUserByName(storedUserName)
		}
	}, [params])

	const user = chatById?.[0]

	if (!user) {
		return (
			<main className='w-full h-screen flex'>
				<div className='w-[450px]'>
					<DefaultChatComponent />
				</div>
				<p className='text-gray-500'>Загрузка...</p>
			</main>
		)
	}

	return (
		<main className='w-[100%] h-[100vh] flex'>
			<aside className='w-[30%]'>
				<DefaultChatComponent />
			</aside>
			<section className='w-[70%] relative'>
				<nav className='p-4 bg-white border-b border-gray-200 flex justify-between items-center'>
					<aside className='flex items-center gap-3'>
						<img
							src={api + 'images/' + userByName?.avatar}
							alt='avatar'
							className='w-[55px] h-[55px] rounded-full object-cover border border-gray-300 bg-gray-200'
						/>
						<div>
							<p className='text-lg font-semibold'>{userByName?.userName}</p>
							<p className='text-sm text-gray-500'>{userByName?.fullName}</p>
						</div>
					</aside>
					<aside className='flex items-center gap-[20px]'>
						<Phone className='w-[25px] h-[25px]' />
						<Video className='w-[30px] h-[30px]' />
						<Info className='w-[25px] h-[25px]' />
					</aside>
				</nav>

				<section className='h-[75vh] overflow-y-hidden'></section>

				<footer className='p-4'>
					<section className='relative gap-2 border-3 border-gray-100 py-1 px-4 rounded-[25px] flex items-center bg-white shadow-md justify-between'>
						<aside className='flex items-center w-[85%] gap-1 relative'>
							<Smile
								className='cursor-pointer'
								onClick={() => setShowEmojiPicker(prev => !prev)}
							/>
							{showEmojiPicker && (
								<div className='absolute bottom-[50px] z-50'>
									<EmojiPicker
										onEmojiClick={(emojiData) =>
											setMessage(prev => prev + emojiData.emoji)
										}
									/>
								</div>
							)}
							<input
								type='text'
								value={message}
								onChange={e => setMessage(e.target.value)}
								placeholder='Напишите сообщение...'
								className='w-[100%] p-2 rounded-lg outline-0'
							/>
						</aside>
						<aside className='flex gap-3 w-[15%]'>
							<Mic />
							<Image />
							<Sticker />
							<Heart />
						</aside>
					</section>
				</footer>
			</section>
		</main>
	)
}
