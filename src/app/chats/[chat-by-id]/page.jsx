'use client'
import { useState, useEffect, useRef } from 'react'
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
import EmojiPicker from 'emoji-picker-react'

export default function ChatById() {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')
	const params = useParams()
	const { chatById, getChatById, userByName, getUserByName, sendMessege } =
		useChat()

	const [file, setFile] = useState(null)
	const fileInputRef = useRef(null)
	function openFileDialog() {
  fileInputRef.current.click()
}


	function handleFileChange(e) {
  const selectedFile = e.target.files[0]
  console.log('Selected file:', selectedFile)
  if (selectedFile) {
    setFile(selectedFile)
  }
}


	async function handleSendMessage(e) {
		e.preventDefault()
		if (!message.trim() && !file) return

		const formData = new FormData()
		formData.append('ChatId', params['chat-by-id'])
		if (message.trim()) formData.append('MessageText', message)
		if (file) formData.append('File', file)
			console.log(formData);
			
		try {
			await sendMessege(formData)
			setMessage('')
			fileInputRef.current.value = null
			setFile(null)
			setShowEmojiPicker(false)
		} catch (err) {
			console.error(err)
		}
	}

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
					<section className='h-[75vh] overflow-y-auto p-4 flex flex-col gap-3'>
						{chatById?.map((msg, idx) => {
							const isMe = msg.userId === userByName?.id
							return (
								<div
									key={msg.messageId}
									className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
								>
									{!isMe && (
										<img
											src={api + 'images/' + msg.userImage}
											alt='avatar'
											className='w-[35px] h-[35px] rounded-full object-cover mr-2'
										/>
									)}

									<div
										className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm ${
											isMe
												? 'bg-blue-500 text-white rounded-br-none'
												: 'bg-gray-100 text-gray-900 rounded-bl-none'
										}`}
									>
										<p>{msg.messageText}</p>
										<p className='text-[10px] text-gray-400 text-right mt-1'>
											{new Date(msg.sendMassageDate).toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</p>
									</div>
								</div>
							)
						})}
					</section>
					<footer className='p-4'>
						<section className='relative gap-2 border-3 border-gray-100 py-1 px-4 rounded-[25px] flex items-center bg-white shadow-md justify-between'>
							<form
								onSubmit={e => handleSendMessage(e)}
								className='flex w-full items-center justify-between'
							>
								<aside className='flex items-center w-[85%] gap-1 relative'>
									<Smile
										className='cursor-pointer'
										onClick={() => setShowEmojiPicker(prev => !prev)}
									/>
									{showEmojiPicker && (
										<div className='absolute bottom-[50px] z-50'>
											<EmojiPicker
												onEmojiClick={emojiData =>
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
										className='w-full p-2 rounded-lg outline-0'
										name='message'
										autoComplete='off'
									/>
								</aside>
								<aside className='flex gap-3 w-[15%]'>
									<Mic />
									<Image />
									<Sticker />
									<Heart />
								</aside>
							</form>
						</section>
					</footer>
				</section>
			</main>
		)
	}

	return (
		<main className='w-[100%] h-[100vh] flex'>
			<aside className='w-[30%] hidden lg:block'>
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
				<section className='h-[75vh] overflow-y-auto p-4 flex flex-col gap-3'>
  {chatById?.map((msg, idx) => {
    const isMe = msg.userId === userByName?.id
    return (
      <div
        key={msg.messageId}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}
      >
        {!isMe && (
          <img
            src={api + 'images/' + msg.userImage}
            alt='avatar'
            className='w-[32px] h-[32px] rounded-full object-cover'
          />
        )}

        <div className='flex flex-col items-end gap-1 max-w-[70%]'>
          <div
            className={`px-4 py-2 rounded-[18px] text-sm whitespace-pre-line break-words ${
              isMe
                ? 'bg-gradient-to-tr from-blue-500 to-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 text-black rounded-bl-none'
            }`}
          >
            <p>{msg.messageText}</p>
          </div>

          {msg.file && (
            <img
              src={api + 'images/' + msg.file}
              alt='attachment'
              className='w-[220px] h-auto rounded-2xl shadow-md object-cover'
            />
          )}

          <span
            className={`text-[10px] mt-1 ${
              isMe ? 'text-gray-200 pr-1' : 'text-gray-500 pl-1'
            }`}
          >
            {new Date(msg.sendMassageDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    )
  })}
</section>

				<footer className='p-4'>
					<section className='relative gap-2 border-3 border-gray-100 py-1 px-4 rounded-[25px] flex items-center bg-white shadow-md justify-between'>
						<form
							onSubmit={handleSendMessage}
							className='flex w-full items-center justify-between'
						>
							<input
								type='file'
								accept='image/*'
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
							<aside className='flex items-center w-[85%] gap-1 relative'>
								<Smile
									className='cursor-pointer'
									onClick={() => setShowEmojiPicker(prev => !prev)}
								/>
								{showEmojiPicker && (
									<div className='absolute bottom-[50px] z-50'>
										<EmojiPicker
											onEmojiClick={emojiData =>
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
									className='w-full p-2 rounded-lg outline-0'
									name='message'
									autoComplete='off'
								/>
							</aside>

							<aside className='flex gap-3 w-[15%]'>
								<Mic />
								<Image className='cursor-pointer'  onClick={openFileDialog} />
								<Sticker />
								<Heart />
							</aside>
						</form>
					</section>
				</footer>
			</section>
		</main>
	)
}
