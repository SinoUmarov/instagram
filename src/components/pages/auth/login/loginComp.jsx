// 'use client'

// import logo from '@/assets/img/pages/auth/registration/inst_logo_auth.png'
// import phones from '@/assets/img/pages/auth/registration/phones.png'
// import { useLoginStore } from '@/store/pages/auth/login/loginStore'

// import Image from 'next/image'
// import google_play from '@/assets/img/pages/auth/registration/google_play.png'
// import microsoft from '@/assets/img/pages/auth/registration/microsoft.png'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'


// export default function LoginComp() {

// 	const router = useRouter()

// 	const { login } = useLoginStore()

// 	const [showPassword, setShowPassword] = useState(false)
// 	const [userName, setUserName] = useState('')
// 	const [password, setPassword] = useState('')

// 	async function handleLogin(e) {
// 		e.preventDefault()
// 		let user = {
// 			userName: e.target.userName.value,
// 			password: e.target.password.value
// 		}

// 		try {
// 			login(user, router)
// 		} catch (error) {
// 			console.log(error)

// 		}
// 	}

// 	return <>
// 		<div className="min-h-screen flex items-center justify-around bg-gray-50">

// 			<aside className='hidden md:block'>
// 				<Image src={phones} alt='phones' className='w-[400px]' />
// 				<div className='mt-4 text-center'>
// 					<p className='text-sm text-gray-600 mb-2'>Установите приложение</p>
// 					<div className='flex justify-center items-center gap-4'>
// 						<Link href='https://play.google.com/store/apps/details?id=com.instagram.android&hl=ru' target='_blank'>
// 							<Image src={google_play} alt='google_play' className='w-35' />
// 						</Link>
// 						<Link href='https://apps.microsoft.com/detail/9nblggh5l9xt?hl=ru-RU&gl=RU' target='_blank'>
// 							<Image src={microsoft} alt='microsoft' className='w-30' />
// 						</Link>
// 					</div>
// 				</div>
// 			</aside>

// 			<div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 bg-white shadow-md">
// 				{/* Логотип */}
// 				<div className="flex justify-center mb-6">
// 					{/* Заменишь на свой логотип */}
// 					<Image src={logo} alt="Instagram" width={150} height={40} />
// 				</div>

// 				{/* Форма */}
// 				<form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
// 					<input
// 						type="text"
// 						placeholder="Username"
// 						className="w-full px-4 py-2 border rounded bg-gray-50 outline-none focus:border-gray-400"
// 						value={userName}
// 						onChange={(e) => setUserName(e.target.value)}
// 						name='userName'
// 					/>

// 					<div className="relative">
// 						<input
// 							type={showPassword ? 'text' : 'password'}
// 							placeholder="Password"
// 							className="w-full px-4 py-2 border rounded bg-gray-50 outline-none focus:border-gray-400"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							name='password'
// 						/>
// 						<span
// 							onClick={() => setShowPassword(!showPassword)}
// 							className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-500"
// 						>
// 							👁
// 						</span>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
// 					>
// 						Log in
// 					</button>
// 				</form>

// 				{/* Divider */}
// 				<div className="flex items-center my-4">
// 					<hr className="flex-grow border-gray-300" />
// 					<span className="mx-2 text-sm text-gray-500 font-medium">OR</span>
// 					<hr className="flex-grow border-gray-300" />
// 				</div>

// 				{/* Login with Facebook */}
// 				<div className="text-center text-blue-800 font-medium cursor-pointer hover:underline mb-3">
// 					Log in with Facebook
// 				</div>

// 				{/* Forgot password */}
// 				<div className="text-center text-xs text-blue-500 hover:underline cursor-pointer">
// 					Forgot password?
// 				</div>

// 				{/* Регистрация */}
// 				<div className="border-t mt-6 pt-4 text-center text-sm">
// 					Don't have an account?{' '}
// 					<Link href="/registration" className="text-blue-600 font-medium hover:underline">
// 						Sign up
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	</>
// }

'use client'

import logo from '@/assets/img/pages/auth/registration/inst_logo_auth.png'
import phones from '@/assets/img/pages/auth/registration/phones.png'
import google_play from '@/assets/img/pages/auth/registration/google_play.png'
import microsoft from '@/assets/img/pages/auth/registration/microsoft.png'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLoginStore } from '@/store/pages/auth/login/loginStore'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { CircularProgress } from '@mui/material'

export default function LoginComp() {
	const router = useRouter()
	const { login, wrong, loading } = useLoginStore()

	const [showPassword, setShowPassword] = useState(false)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	async function handleLogin(e) {
		e.preventDefault()
		const user = {
			userName: e.target.userName.value,
			password: e.target.password.value,
		}
		try {
			login(user, router)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className='min-h-screen flex flex-col md:flex-row md:justify-around items-center justify-center p-6 gap-10'>
			{/* Левая часть с изображением */}
			<aside className='hidden md:block'>
				<Image src={phones} alt='phones' className='w-[400px]' />
				<div className='mt-4 text-center'>
					<p className='text-sm text-gray-600 mb-2'>Установите приложение</p>
					<div className='flex justify-center items-center gap-4'>
						<Link href='https://play.google.com/store/apps/details?id=com.instagram.android&hl=ru' target='_blank'>
							<Image src={google_play} alt='google_play' className='w-35' />
						</Link>
						<Link href='https://apps.microsoft.com/detail/9nblggh5l9xt?hl=ru-RU&gl=RU' target='_blank'>
							<Image src={microsoft} alt='microsoft' className='w-30' />
						</Link>
					</div>
				</div>
			</aside>

			{/* Правая часть — форма логина */}
			<aside className='w-full max-w-sm'>
				<div className='bg-white rounded-xl shadow-lg p-8'>
					<div className='flex justify-center mb-6'>
						<Image src={logo} alt='Instagram' className='w-36' />
					</div>

					<form className='space-y-4' onSubmit={handleLogin}>
						<input
							required
							type='text'
							placeholder='Username'
							name='userName'
							className='input-style'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>

						<div className='relative'>
							<input
								required
								type={showPassword ? 'text' : 'password'}
								placeholder='Password'
								name='password'
								className='input-style pr-10'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-3 cursor-pointer text-sm text-gray-500'
							>
								{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</span>
						</div>

						<button
							type='submit'
							className='w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition'
						>
							{
								loading ? <CircularProgress size="30px" /> : 'Sign up'
							}
						</button>
					</form>

					<div className='flex items-center my-4'>
						<hr className='flex-grow border-gray-300' />
						<span className='mx-2 text-sm text-gray-500 font-medium'>OR</span>
						<hr className='flex-grow border-gray-300' />
					</div>

					<div className='text-center text-blue-800 font-medium cursor-pointer hover:underline mb-3'>
						Log in with Facebook
					</div>

					<div className='text-center text-xs text-blue-500 hover:underline cursor-pointer'>
						Forgot password?
					</div>

					<div className='text-center mt-6 border-t pt-4 text-sm text-gray-600'>
						Don't have an account?{' '}
						<Link href='/registration' className='text-blue-600 font-medium hover:underline'>
							Sign up
						</Link>
					</div>
				</div>
				{
					wrong &&
					<p className='text-red-600  text-[15px] text-center mt-3' >Something is go wrong </p>
				}
			</aside>

			{/* Вставка общего input-стиля */}
			<style jsx>{`
				.input-style {
					width: 100%;
					padding: 10px 14px;
					border: 1px solid #e5e7eb;
					border-radius: 8px;
					background-color: #f9fafb;
					outline: none;
					font-size: 14px;
					transition: 0.2s ease;
				}
				.input-style:focus {
					border-color: #cbd5e0;
					background-color: #fff;
				}
			`}</style>
		</section>
	)
}
