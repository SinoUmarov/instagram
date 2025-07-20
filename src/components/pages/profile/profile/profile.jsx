"use client";
import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import React, { useEffect, useState } from "react";
import Stories from "../story/story";
import { jwtDecode } from "jwt-decode";
import BasicTabs from "../tabs/tabs";
import Link from "next/link";
import FollowersMenu from "../folowers/folowers";
import FollowingMenu from "../folowing/folowing";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";
import QrCodeModal from "../qrcode/qrcode";
import { useRouter } from "next/navigation";

const Profiles = () => {
  const { getInfo, info, getStories, getFolowers, getFolowing } =
    useProfileStore();

    let router = useRouter()

  const [open, setOpen] = useState(false);
  const [openFolowing, setOpenFolowing] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const [qrOpen, setQrOpen] = useState(false);

const [decode, setDecode] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  
    const decoded = jwtDecode(token);
    setDecode(decoded);
    getInfo(decoded.sid);
    getStories(decoded.sid);
 
}, []);


 const showFolowers = () => {
  if (!decode) return;
  getFolowers(decode.sid);
  getFolowing(decode.sid);
  setOpen(true);
};

const showFolowing = () => {
  if (!decode) return;
  getFolowers(decode.sid);
  getFolowing(decode.sid);
  setOpenFolowing(true);
};


  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('access_token');
    router.push('/login')

    console.log("Logout");
  };

  const handleShowQr = () => {
    setQrOpen(true);
    handleMenuClose();
  };

  const handleQrClose = () => {
    setQrOpen(false);
  };

  return (
    <>
      <div className="w-full bg-white px-4">
        <div className="w-full max-w-[900px] mx-auto flex  sm:flex-row items-start sm:items-center gap-5 sm:gap-12 py-4">
          <div className="w-45 h-30 sm:w-42 sm:h-34  rounded-[50%] overflow-hidden border border-gray-300">
            {info?.image ? (
              <img
                src={`http://37.27.29.18:8003/images/${info.image}`}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                ?
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:gap-5 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <h2 className="text-xl font-semibold">
                {info?.userName || "Username"}
              </h2>
              <div className="flex gap-2">
                <button className="bg-gray-100 px-4 py-1 rounded-md text-sm">
                  <Link href="/profile/edit-profile">Edit profile</Link>
                </button>
                <button className="bg-gray-100 px-4 py-1 rounded-md text-sm">
                  View archive
                </button>
              </div>
              <div
                onClick={handleMenuOpen}
                className="text-2xl cursor-pointer hidden sm:block"
              >
                ☰
              </div>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>
                <strong>{info?.postCount || 0}</strong> posts
              </span>
              <span onClick={showFolowers}>
                <strong>{info?.subscribersCount || 0}</strong> followers
              </span>
              <span onClick={showFolowing}>
                <strong>{info?.subscriptionsCount || 0}</strong> following
              </span>
            </div>

            <div className="font-semibold text-sm">
              {info?.firstName || "Full Name"}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[900px] mx-auto">
          <Stories />
        </div>
        <div className="w-full max-w-[900px] mx-auto">
          <BasicTabs />
        </div>
      </div>
      <FollowersMenu open={open} onClose={() => setOpen(false)} />
      <FollowingMenu
        open={openFolowing}
        onClose={() => setOpenFolowing(false)}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleShowQr}>
          <QrCodeIcon fontSize="small" style={{ marginRight: 8 }} />
          QR Code
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>

      <QrCodeModal open={qrOpen} onClose={handleQrClose} />
    </>
  );
};

export default Profiles;
