"use client";
import instagramDefaultProfile from "#/icon/layout/instagramDefaultProfile.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePostActions } from "@/store/pages/home/post-actions/post-actions";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Image from "next/image";
import { Fragment, useEffect } from "react";
// import { formatDistanceToNow } from "date-fns";

export default function Comments({ open, setOpen, postId }) {
  const { postByID, getPostByID } = usePostActions();
  useEffect(() => {
    if (postId) getPostByID(postId);
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
  };

  // function baroi vaqti post kardanro nishon medihad
  //   const rawTime = formatDistanceToNow(new Date(postByID.datePublished
  // ), {
  //     addSuffix: true,
  //   });
  //   const timeAgo = rawTime.replace("about ", "");

  console.log("postByID: ", postByID);
  return (
    <Fragment> 
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "90vw",
            width: "100%",
            height: "90vh",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
          }}
        >
          <section className="flex flex-col md:flex-row w-full h-[90vh] bg-white">
            {/* LEFT: MEDIA */}
            <Box className="w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center ">
              {postByID.images?.map((media, index) =>
                media.endsWith(".mp4") ? (
                  <video
                    key={index}
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={`http://37.27.29.18:8003/images/${media}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <Image
                    key={index}
                    src={`http://37.27.29.18:8003/images/${media}`}
                    width={400}
                    height={614}
                    alt="story"
                    className="w-full h-full object-cover"
                  />
                )
              )}
            </Box>

            {/* RIGHT: COMMENT + USER */}
            <Box className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-start overflow-y-auto p-4 bg-white">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3 pb-3">
                  <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                    <div className="bg-white rounded-full p-[3px]">
                      <Image
                        src={
                          postByID.userImage
                            ? `http://37.27.29.18:8003/images/${postByID.userImage}`
                            : instagramDefaultProfile
                        }
                        alt="story"
                        className="rounded-full object-cover h-[32px]"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-[14px] font-semibold text-[#1E293B] truncate">
                      {postByID.userName}
                    </p>
                  </div>
                </div>
                <MoreHorizIcon />
              </div>

              <hr className="text-[#f0f0f0] py-2" />
              <div className="flex-1 overflow-y-auto pr-2">
                {/* Ин ҷо комментҳоро метавон ҷой дод */}
                {postByID.content && (
                  <div className="flex gap-3 items-center">
                    <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                      <div className="bg-white rounded-full p-[3px]">
                        <Image
                          src={
                            postByID.userImage
                              ? `http://37.27.29.18:8003/images/${postByID.userImage}`
                              : instagramDefaultProfile
                          }
                          alt="story"
                          className="rounded-full object-cover h-[32px]"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="text-[14px] font-semibold text-[#1E293B] truncate">
                            {postByID.userName}
                          </p>
                          <p className="text-[14px] truncate font-medium">
                            {postByID.content}
                          </p>
                        </div>
                        {/* <p>{timeAgo}</p> */}
                      </div>
                    </div>
                  </div>
                )}
                <div></div>
                {postByID.comments &&
                  postByID.comments?.map((comment) => (
                    <div>
                      <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                        <div className="bg-white rounded-full p-[3px]">
                          <Image
                            src={
                              postByID.userImage
                                ? `http://37.27.29.18:8003/images/${postByID.userImage}`
                                : instagramDefaultProfile
                            }
                            alt="story"
                            className="rounded-full object-cover h-[32px]"
                            width={32}
                            height={32}
                          />
                        </div>
                      </div>

                        <div>
                          <p>{comment.comment}</p>
                          <p>{comment.dateCommented}</p>
                        </div>


                    </div>


                  ))}
              </div>
            </Box>
          </section>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
