'use client'

import { video } from "@/assets/icon/layout/svg"
import { useExplorePage } from "@/store/pages/explore/explore"
import { API } from "@/utils/config"
import { useEffect } from "react"


export default function Explore(){
	
	const { data, getExplore } = useExplorePage()
	console.log(data)


	useEffect((el)=> {
		getExplore()
	}, [])

	return <>
		<h1>{data.map((el)=> {
			return (
				<div>
					<video controls src={`${API}/images/${el.images}`}></video>
				</div>
			)
		})}</h1>
	</>
}
