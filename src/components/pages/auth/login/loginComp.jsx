'use client'

import logo from '@/assets/img/pages/auth/registration/inst_logo_auth.png'
import { useLoginStore } from '@/store/pages/auth/login/loginStore'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LoginComp() {

	const router = useRouter()

	const { login } = useLoginStore()

	const [showPassword, setShowPassword] = useState(false)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	async function handleLogin(e) {
		e.preventDefault()
		let user = {
			userName: e.target.userName.value,
			password: e.target.password.value
		}

		try {
         login(user,router)
		} catch (error) {
			console.log(error)

		}
	}

	return <>
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 bg-white shadow-md">
				{/* Логотип */}
				<div className="flex justify-center mb-6">
					{/* Заменишь на свой логотип */}
					<Image src={logo} alt="Instagram" width={150} height={40} />
				</div>

				{/* Форма */}
				<form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
					<input
						type="text"
						placeholder="Username"
						className="w-full px-4 py-2 border rounded bg-gray-50 outline-none focus:border-gray-400"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						name='userName'
					/>

					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							className="w-full px-4 py-2 border rounded bg-gray-50 outline-none focus:border-gray-400"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name='password'
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-500"
						>
							👁
						</span>
					</div>

					<button
						type="submit"
						className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
					>
						Log in
					</button>
				</form>

				{/* Divider */}
				<div className="flex items-center my-4">
					<hr className="flex-grow border-gray-300" />
					<span className="mx-2 text-sm text-gray-500 font-medium">OR</span>
					<hr className="flex-grow border-gray-300" />
				</div>

				{/* Login with Facebook */}
				<div className="text-center text-blue-800 font-medium cursor-pointer hover:underline mb-3">
					Log in with Facebook
				</div>

				{/* Forgot password */}
				<div className="text-center text-xs text-blue-500 hover:underline cursor-pointer">
					Forgot password?
				</div>

				{/* Регистрация */}
				<div className="border-t mt-6 pt-4 text-center text-sm">
					Don't have an account?{' '}
					<Link href="/registration" className="text-blue-600 font-medium hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	</>
}