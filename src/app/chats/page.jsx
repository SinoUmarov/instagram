import DefaultChatComponent from '@/components/pages/chat/pages/default-chat/default-chat'
import { MessageCircleHeart } from 'lucide-react'

export default function DefaultChat() {
	return (
		<section className='w-[100%] h-[100vh] flex'>
			<aside className='w-[30%]'>
				<DefaultChatComponent></DefaultChatComponent>
			</aside>
			<aside className='w-[70%] flex flex-col items-center justify-center gap-[10px]'>
				<div className='border-4 border-[black] rounded-[50%] p-[15px]'>
					<MessageCircleHeart className='w-[55px] h-[55px]' />
				</div>
				<b className='text-[20px]'>Ваши сообщения</b>
				<p className='text-[gray]'>
					Отправляйте личные фото и сообщения другу или группе
				</p>
				<button className='bg-sky-600 text-[white] px-[15px] py-[5px] rounded-[10px]'>
					Отправить сообщение
				</button>
			</aside>
		</section>
	)
}



