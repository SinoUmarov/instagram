'use client'
// import { api, userId } from '@/api/pages/chat/utils/axios-reguest'
import { api, userId } from '@/api/pages/chat/utils/axios-reguest'
import useChat from '@/store/pages/chat/pages/default-chat/default-chat'
import { Search, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function DefaultChatComponent() {
	const {
		userProfile,
		getUserProfile,
		allUsers,
		getAllUsers,
		chatById,
		getUserByNameForSearch,
		userByNameForSearch,
		createChat,
		getLastMessages,
		lastMessages,
	} = useChat()
	const [search, setSearch] = useState('')

	function handleCreateChat(id) {
		createChat(id)
		setSearch('')
	}

	function handleSearch(e) {
		setSearch(e.value)
		getUserByNameForSearch(e.value)
	}

	useEffect(() => {
		getUserProfile(userId.sid)
		getAllUsers()
		getLastMessages(18)
	}, [])

	return (
		<>
			<aside className='w-[100%] h-[100vh] border-r border-gray-200 px-[20px] pt-[40px] flex flex-col gap-[20px] bg-white text-black'>
				<nav className='w-full flex justify-between items-center'>
					<b className='text-[23px] font-semibold'>{userProfile.userName}</b>
					<SquarePen className='text-gray-600' />
				</nav>
				<section className='flex items-center gap-[15px] px-[15px] py-[7px] rounded bg-gray-100'>
					<Search className='text-gray-500 h-[20px]' />
					<input
						type='text'
						placeholder='Поиск'
						className='outline-none w-full bg-transparent text-[14px] placeholder-gray-500'
						value={search}
						onChange={e => handleSearch(e.target)}
					/>
				</section>
				<section className='w-full'>
					<Swiper spaceBetween={20} slidesPerView={4}>
						<SwiperSlide>
							<div className='flex flex-col items-center gap-[5px]'>
								<img
									src={`${api}images/${userProfile.image}`}
									alt={userProfile.userName}
									className='w-[75px] h-[75px] object-cover rounded-full border border-gray-300'
								/>
								<p className='text-[11px] text-gray-600'>Ваша заметка</p>
							</div>
						</SwiperSlide>
						{allUsers.map(user => {
							const isMeSender = user.sendUserId === userId.sid
							const companionName = isMeSender
								? user.receiveUserName
								: user.sendUserName
							const companionImage = isMeSender
								? user.receiveUserImage
								: user.sendUserImage

							return (
								<SwiperSlide key={user.chatId}>
									<div className='flex flex-col items-center gap-[5px]'>
										<img
											src={`${api}images/${companionImage}`}
											alt={companionName}
											className='w-[75px] h-[75px] object-cover rounded-full border border-gray-300 bg-gray-200'
										/>
										<p className='text-[11px] text-gray-600'>{companionName}</p>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</section>
				<section className='flex items-center justify-between'>
					<b className='text-[17px] font-semibold'>Сообщения</b>
					<p className='text-gray-500 text-[14px]'>Запросы</p>
				</section>
				<section className='overflow-y-scroll scrollbar-hide flex flex-col gap-[20px] pr-[4px]'>
					{search ? (
						<div>
							{userByNameForSearch.map(el => (
								<div
									key={el.id}
									className='flex items-center gap-[10px] cursor-pointer hover:bg-gray-100 p-[6px] rounded-lg transition'
									onClick={() => handleCreateChat(el.id)}
								>
									<img
										src={`${api}images/${el.avatar}`}
										alt={el.userName}
										className='w-[60px] h-[60px] rounded-full object-cover border border-gray-300 bg-gray-200'
									/>
									<div className='flex flex-col'>
										<b className='text-[15px]'>{el.userName}</b>
										<p className='text-[13px] text-gray-500'>Новое сообщение</p>
									</div>
								</div>
							))}
						</div>
					) : (
						allUsers.map(el => {
							const isMeSender = el.sendUserId === userId.sid
							const companionName = isMeSender
								? el.receiveUserName
								: el.sendUserName
							const companionImage = isMeSender
								? el.receiveUserImage
								: el.sendUserImage

							return (
								<Link href={`/chats/${el.chatId}`} key={el.chatId}>
									<div
										className='flex items-center gap-[10px] cursor-pointer hover:bg-gray-100 p-[6px] rounded-lg transition'
										onClick={() =>
											localStorage.setItem('userName', companionName)
										}
									>
										<img
											src={`${api}images/${companionImage}`}
											alt={companionName}
											className='w-[60px] h-[60px] rounded-full object-cover border border-gray-300 bg-gray-200'
										/>
										<div className='flex flex-col'>
											<b className='text-[15px]'>{companionName}</b>
											<p className='text-[13px] text-gray-500'>
												{lastMessages?.[el.chatId]?.messageText ||
													'Новое сообщение'}
											</p>
										</div>
									</div>
								</Link>
							)
						})
					)}
				</section>
			</aside>
		</>
	)
}
