"use client";
import Profile from "@/assets/icon/layout/instagramDefaultProfile.jpg";
import {
  add,
  compas,
  compasActive,
  homeIcon,
  homeIconActive,
  message,
  messageActive,
  video,
  videoActive,
} from "@/assets/icon/layout/svg";
import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import { API } from "@/utils/config";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BottomNavigation({ children }) {
  const pathname = usePathname();

  // Define reusable classes
  const iconClass =
    "flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center";
  const profileClass = "w-[25px] h-[25px] rounded-[50%]";

  // Map of pathnames to icons
  const icons = {
    "/": { active: homeIcon, inactive: homeIconActive },
    "/explore": { active: compas, inactive: compasActive },
    "/reels": { active: video, inactive: videoActive },
    "/chats": { active: message, inactive: messageActive },
    "/profile": { active: Profile, inactive: Profile }, // No icon state, just border logic
  };
  const { getInfo, info } = useProfileStore();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        getInfo(decode.sid);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div>
      {children}
      <section className="fixed w-[100%] z-[10] bottom-0">
        <div className="flex gap-[0.5rem] mt-4 align-bottom bg-white justify-evenly">
          {/* Home */}
          <Link className="block" href="/">
            <div className={iconClass}>
              {pathname === "/" ? icons["/"].active : icons["/"].inactive}
            </div>
          </Link>

          {/* Explore */}
          <Link href="/explore">
            <div className={iconClass}>
              {pathname === "/explore"
                ? icons["/explore"].active
                : icons["/explore"].inactive}
            </div>
          </Link>

          {/* Reels */}
          <Link href="/reels">
            <div className={iconClass}>
              {pathname === "/reels"
                ? icons["/reels"].active
                : icons["/reels"].inactive}
            </div>
          </Link>

          {/* Create Button */}
          <div className={iconClass}>{add}</div>

          {/* Chats */}
          <Link href="/chats">
            <div className={iconClass}>
              {pathname === "/chats"
                ? icons["/chats"].active
                : icons["/chats"].inactive}
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className={iconClass}>
              <Image
                className={`${
                  pathname === "/profile"
                    ? "border-[2px] border-solid border-[black]"
                    : ""
                } ${profileClass}`}
                src={
                  info?.image ? `${API}/images/${info.image}` : Profile
                }
                alt="Profile"
                width={20}
                height={20}
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
