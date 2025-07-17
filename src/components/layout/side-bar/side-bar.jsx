"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import Profile from "@/assets/icon/layout/instagramDefaultProfile.jpg"
import { Button, Menu, MenuItem } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  homeIcon,
  homeIconActive,
  searchIcon,
  searchIconActive,
  compas,
  compasActive,
  video,
  videoActive,
  message,
  messageActive,
  like,
  likeActive,
  action,
  setting,
  savedIcon,
  problemIcon,
  threads,
} from "@/assets/icon/layout/svg"
import { useProfileStore } from "@/store/pages/profile/profile/store-profile"
import { API } from "@/utils/config"
import { jwtDecode } from "jwt-decode"
import { useDrawerStore } from '@/store/search/searchStore'

const NavLink = ({ href, icon, activeIcon, label, isActive }) => (
  <Link
    href={href}
    className={`flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100 ${isActive(
      href
    )}`}
  >
    {isActive(href) ? activeIcon : icon}
    <p className="text-lg">{label}</p>
  </Link>
)

export default function SideBar({ children }) {

  const { toggleDrawer, openDrawer } = useDrawerStore()

  const { getInfo, info } = useProfileStore()
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const [token, setToken] = useState(null)
  const router = useRouter()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }



  let decode = null

  if (typeof window !== "undefined") {
    const rawToken = localStorage.getItem("access_token")
    if (rawToken) {
      try {
        decode = jwtDecode(rawToken)
      } catch (error) {
        console.warn("❌ Invalid token", error)
      }
    }
  }

  useEffect(() => {
    if (decode?.sid) {
      getInfo(decode.sid)
    }
  }, [])






  const isActive = (path) => (pathname === path ? "font-bold" : "font-normal")

  let isAuthPage = pathname === '/login' || pathname === '/registration'


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    setToken(accessToken)

    if (!accessToken && pathname !== '/login' && pathname !== "/registration") {
      router.push('/login')
    }
  }, [pathname, router])

  
  return (



    <div>
      {!isAuthPage && (
        <section className="w-[320px] h-[100%] fixed  border-r-2 border-gray-300">
          <div className="sideBar h-full pb-[100px]">
            {/* <div className="m-auto pt-[20px] ml-[20px] flex pb-[10px] mt-[20px]">
              {homeIcon}
            </div> */}
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 mt-4">
                <NavLink
                  href="/"
                  icon={homeIcon}
                  activeIcon={homeIconActive}
                  label={t("layout.home")}
                  isActive={isActive}
                />
                {/* <NavLink
                  href="/search"
                  icon={searchIcon}
                  activeIcon={searchIconActive}
                  label={t("layout.search")}
                  isActive={isActive}
                /> */}
                <Button
                  onClick={openDrawer}
                  startIcon={searchIconActive}
                  fullWidth
                  disableElevation
                  variant="text"
                  sx={{
                    justifyContent: 'flex-start',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    height: '52px',
                    fontSize: '18.5px',
                    color: '#111',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                    width: '90%',
                    margin: '0 auto',
                    gap: '10px',

                  }}
                >
                  {t('layout.search')}
                </Button>
                <NavLink
                  href="/explore"
                  icon={compas}
                  activeIcon={compasActive}
                  label={t("layout.explore")}
                  isActive={isActive}
                />
                <NavLink
                  href="/reels"
                  icon={video}
                  activeIcon={videoActive}
                  label={t("layout.reels")}
                  isActive={isActive}
                />
                <NavLink
                  href="/chats"
                  icon={message}
                  activeIcon={messageActive}
                  label={t("layout.message")}
                  isActive={isActive}
                />
                <NavLink
                  href="/notification"
                  icon={like}
                  activeIcon={likeActive}
                  label={t("layout.notification")}
                  isActive={isActive}
                />

                <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100 cursor-pointer">
                  {action}
                  <p className="text-lg">{t("layout.create")}</p>
                </div>

                <div className="flex items-center gap-2 ml-[7%]">
                  <img
                    src={
                      info?.image ? `${API}/images/${info.image}` : Profile.src
                    }
                    className="w-10 h-10 rounded-full"
                    alt="Profile"
                  />

                  <NavLink
                    href="/profile"
                    icon={
                      <Image
                        className={`h-10 w-10 ${pathname === "/profile"
                          ? "border-2 border-black rounded-full"
                          : ""
                          }`}
                        src={Profile}
                        alt="Profile"
                      />
                    }
                    label={t("layout.profile")}
                    isActive={isActive}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100">
                {threads}
                <p className="text-lg">{t("layout.threads")}qdw</p>
              </div>

              <div className="flex items-center gap-4 w-[90%] m-auto rounded-md h-[52px] px-4 hover:bg-gray-100">
                <button onClick={handleClick} className="flex gap-5">
                  {setting}
                  <p className="text-lg">{t("layout.more")}</p>
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                ></Menu>
              </div>
            </div>
          </div>
        </section>
      )}

      <div style={{ marginLeft: (pathname != '/login' && pathname !== '/registration') ? '370px' : '0px' }}>
        {children}
      </div>
    </div>


  )
}
