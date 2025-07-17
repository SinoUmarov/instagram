import { API } from '@/lib/api'
import axiosRequest from '@/lib/axiosRequest'
// import axios from 'axios'
import { User } from 'lucide-react'
import { create } from 'zustand'

export const useReelsPage = create((set, get) => ({
	data: [],
	getReels: async () => {
		try {
			let { data } = await axiosRequest.get(`/Post/get-reels?PageSize=1000`, {})
			// console.log(data);

			set(() => ({ data: data.data }))
		} catch (error) {
			console.log(error)
		}
	},
  // лайк
	likePost: async postId => {
		try {
			await axiosRequest.post(`/Post/like-post?postId=${postId}`)

			//   локално тов метеша
			set(state => ({
				data: state.data.map(post => {
					if (post.postId === postId) {
						const isLiked = post.postLike
						return {
							...post,
							postLike: !isLiked,
							postLikeCount: isLiked
								? post.postLikeCount - 1
								: post.postLikeCount + 1,
						}
					}
					return post
				}),
			}))
		} catch (error) {
			console.log(error)
		}
	},
  // подписатся
	addFollowingRelationship: async id => {
		try {
			await axiosRequest.post(
				`/FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`
			)
			set(state => ({
				data: state.data.map(user => {
					if (user.userId === id) {
						return {
							...user,
							isSubscriber: true,
						}
					}
					return user
				}),
			}))
		} catch (error) {
			console.log(error)
		}
	},
  // отписатся
	deleteFollowingRelationship: async id => {  
	  try {
		await axiosRequest.delete(`/FollowingRelationShip/delete-following-relation-ship?followingUserId=${id}`)
    set(state => ({
				data: state.data.map(user => {
					if (user.userId === id) {
						return {
							...user,
							isSubscriber: false,
						}
					}
					return user
				}),
			}))
	  } catch (error) {
		console.log(error);
		
	  }
	},
addFavouriePost: async (postId) => {
  try {
    await axiosRequest.post(
      'http://37.27.29.18:8003/Post/add-post-favorite',
      {
        postId: postId
      }
    )
    set(state => ({
      data: state.data.map(post => {
        if (post.postId === postId) {
          const isFavorite = post.postFavorite

          return {
            ...post,
            postFavorite: !isFavorite
            
          }
        }
        return post
      })
    })) 
  } catch (error) {
    console.log(error)
  }
}


}))
