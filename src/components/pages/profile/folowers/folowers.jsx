"use client";

import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { API } from "@/utils/config";

export default function FollowersMenu({ open, onClose }) {
  const { folowers } = useProfileStore(); 
  const [localFolowers, setLocalFolowers] = useState([]);
  
    useEffect(() => {
    if (open) {
      setLocalFolowers(folowers || []);
    }
  }, [open, folowers]);

  const toggleFollow = async (userId) => {
    setLocalFolowers((prev) =>
      prev.map((user) =>
        user.userId === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
}

  return (
   <Modal open={open} onClose={onClose}>
  <div
    className="fixed inset-0 flex justify-center items-center z-50"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.1)", 
      backdropFilter: "blur(6px)", 
    }}
  >
    <div className="bg-white rounded-xl w-[90%] max-w-sm max-h-[80vh] overflow-hidden flex flex-col">
      <div className="relative px-4 py-3 border-b">
        <Typography className="text-center font-semibold text-base">Подписчики</Typography>
        <IconButton onClick={onClose} className="absolute right-2 top-2">
          <X />
        </IconButton>
      </div>

      <div className="overflow-y-auto px-4 py-2 space-y-3">
        {folowers?.map((el) => (
          <div key={el.userId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={`${API}/images/${el?.userShortInfo?.userPhoto}`}
                alt={el?.userShortInfo?.userName}
                sx={{ width: 44, height: 44 }}
              />
              <Typography className="text-sm font-medium">{el?.userShortInfo?.userName}</Typography>
            </div>
            <Button
              onClick={() => toggleFollow(el.userId)}
              variant={el.isFollowing ? "outlined" : "contained"}
              size="small"
              className="capitalize text-sm"
            >
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
</Modal>

  );
}
