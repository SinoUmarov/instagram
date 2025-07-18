"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button, Menu, MenuItem, Tooltip, tooltipClasses } from "@mui/material"
import Profile from "@/assets/icon/layout/instagramDefaultProfile.jpg"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import InstagramIcon from '@mui/icons-material/Instagram'

import {
  add,
  compas,
  compasActive,
  homeIcon,
  homeIconActive,
  instagramMiniLogo,
  like,
  likeActive,
  message,
  messageActive,
  searchIcon,
  searchIconActive,
  setting,
  settings,
  threads,
  video,
  videoActive,
} from "@/assets/icon/layout/svg"
import { useProfileStore } from "@/store/pages/profile/profile/store-profile"
import { jwtDecode } from "jwt-decode"
import { API } from "@/utils/config"
import { useDrawerStore } from '@/store/search/searchStore'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0 0 5px 1px rgba(0,0,0, .0975)",
    fontSize: 11,
    ".MuiTooltip-arrow": {
      color: "white",
    },
  },
}))

const MiniSideBar = ({ children }) => {


  const { toggleDrawer, openDrawer, isOpen } = useDrawerStore()
  const { getInfo, info } = useProfileStore()
  const router = useRouter()
  const pathname = usePathname()
  // const [anchorEl, setAnchorEl] = (useState < null) | (HTMLElement > null)
  // const open = Boolean(anchorEl)
  const { t } = useTranslation()


  // const handleClick = event => setAnchorEl(event.currentTarget)
  // const handleClose = () => setAnchorEl(null)

  const renderIcon = (path, activeIcon, inactiveIcon) => {
    return pathname === path ? activeIcon : inactiveIcon
  }
  useEffect(() => {
    const rawToken = localStorage.getItem("access_token")
    if (rawToken) {
      try {
        const decode = jwtDecode(rawToken)
        getInfo(decode.sid)
      } catch (err) {
        console.error("Invalid token", err)
      }
    }
  }, [])


  const [token, setToken] = useState(null)

  let isAuthPage = pathname === '/login' || pathname === '/registration'
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    setToken(accessToken)

    if (!accessToken && pathname !== '/login' && pathname !== "/registration") {
      router.push('/login')
    }
  }, [pathname, router])

  return (
    <div className="flex">
      {!isAuthPage && (
        <section className="flex justify-center w-[50px] border-r-[2px] border-[#eee] h-[100vh]" style={{ marginRight: isOpen == true && pathname !== '/chats' ? '325px' : '0px' }} >
          <div className="sideBar h-full pb-[100px]">
            <div className="m-auto flex justify-center pb-[10px] mt-[20px]">
              {/* {instagramMiniLogo} */}
              <InstagramIcon />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-[0.5rem] mt-4">
                {/* Home Icon */}
                <LightTooltip title={t("layout.home")} placement="right" arrow>
                  <Link href="/" passHref>
                    <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                      {renderIcon("/", homeIconActive, homeIcon)}
                    </div>
                  </Link>
                </LightTooltip>



                <button
                  onClick={openDrawer}
                  className="w-full flex items-center justify-start px-2 py-3 rounded-lg text-black "
                >
                  {searchIconActive}
                  {/* {t('layout.search')} */}
                </button>


                {/* Explore Icon */}
                <LightTooltip title={t("layout.explore")} placement="right" arrow>
                  <Link href="/explore" passHref>
                    <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                      {renderIcon("/explore", compasActive, compas)}
                    </div>
                  </Link>
                </LightTooltip>

                {/* Reels Icon */}
                <LightTooltip title={t("layout.reels")} placement="right" arrow>
                  <Link href="/reels" passHref>
                    <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                      {renderIcon("/reels", videoActive, video)}
                    </div>
                  </Link>
                </LightTooltip>

                {/* Messages Icon */}
                <LightTooltip title={t("layout.message")} placement="right" arrow>
                  <Link href="/chats" passHref>
                    <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                      {renderIcon("/chats", messageActive, message)}
                    </div>
                  </Link>
                </LightTooltip>

                {/* Notifications Icon */}
                <LightTooltip
                  title={t("layout.notification")}
                  placement="right"
                  arrow
                >
                  <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                    {renderIcon("/notification", likeActive, like)}
                  </div>
                </LightTooltip>

                {/* Create Icon */}
                <LightTooltip title={t("layout.create")} placement="right" arrow>
                  <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                    {add}
                  </div>
                </LightTooltip>

                {/* Profile Icon */}
                <LightTooltip title={t("layout.profile")} placement="right" arrow>
                  <Link href="/profile" passHref>
                    <div className="flex items-center super-svg gap-4 w-[90%] rounded-[8px] h-[52px] px-0 justify-center">
                      <img
                        className={`rounded-[50%] h-[25] w-[25] ml-[10%] ${router.pathname === "/profile"
                          ? "border-2 border-black"
                          : ""
                          }`}
                        src={
                          info?.image
                            ? `${API}/images/${info.image}`
                            : Profile
                        }
                        alt="Profile"
                      
                      />
                    </div>
                  </Link>
                </LightTooltip>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="ml-[0px] w-[100%]">{children}</div>
    </div>
  )
}

export default MiniSideBar

