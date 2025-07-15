
import { axios } from 'axios';
import { headers } from 'next/headers';

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0ODJjYzg1Yy02YTY5LTQzOGYtODRjNi1jODM4M2U0ZjA4NTciLCJuYW1lIjoiZXJhaiIsImVtYWlsIjoiTWlyem9ldkBnbWFpbC5jb20iLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzUyNjUzNDc5LCJpc3MiOiJpbnN0YWdyYW0tZ3JvdXAiLCJhdWQiOiJpbnN0YWdyYW0tYXBpIn0.ePKBPyNMkSPrlPeYGqzNWoaV3WOcFt3tIpIno24gFLE"
let API = 'http://37.27.29.18:8003'

 export const useExplorePage = create((set, get)=> ({
    data: [],

    getExplore: async () => {
        try {
            const { data } = await axios.get(
                `${API}/Post/get-posts?PageSize=10000`, {
                    headers: {
                        Autorization: `Bearer ${token}`
                    }
                }
            )
            set(()=> ({}))
        } catch (error) {
            console.log(error)
        }
    }
 }))