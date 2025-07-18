// 'use client'


// import Box from '@mui/material/Box'
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import List from '@mui/material/List'
// import Divider from '@mui/material/Divider'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
// import MailIcon from '@mui/icons-material/Mail'
// import { useDrawerStore } from '@/store/search/searchStore'

// export default function TemporaryDrawer() {

// 	const { isOpen, toggleDrawer } = useDrawerStore()



// 	const DrawerList = (
// 		<Box sx={{ width: 350, marginLeft: '50px' }} role="presentation" onClick={toggleDrawer}>
// 			<List>
// 				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// 					<ListItem key={text} disablePadding>
// 						<ListItemButton>
// 							<ListItemIcon>
// 								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// 							</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItemButton>
// 					</ListItem>
// 				))}
// 			</List>
// 			<Divider />
// 			<List>
// 				{['All mail', 'Trash', 'Spam'].map((text, index) => (
// 					<ListItem key={text} disablePadding>
// 						<ListItemButton>
// 							<ListItemIcon>
// 								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// 							</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItemButton>
// 					</ListItem>
// 				))}
// 			</List>
// 		</Box>
// 	)

// 	return (
// 		<div>
// 			{/* <Button onClick={toggleDrawer}>Open drawer</Button> */}
// 			<Drawer open={isOpen} onClose={toggleDrawer}>
// 				{DrawerList}
// 			</Drawer>
// 		</div>
// 	)
// }


"use client"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { useDrawerStore } from "@/store/search/searchStore"

export default function InstagramDrawer() {
	const { isOpen, toggleDrawer } = useDrawerStore()

	const DrawerList = (
		<Box
			sx={{
				width: 350,
				height: "100%",
				backgroundColor: "white",
				paddingTop: "20px",
			}}
			role="presentation"
		>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={toggleDrawer}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={toggleDrawer}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<Drawer
			open={isOpen}
			onClose={toggleDrawer}
			variant="temporary"
			anchor="left"
			ModalProps={{
				keepMounted: true, // Лучше производительность на мобильных
			}}
			sx={{
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					width: 350,
				},
				"& .MuiBackdrop-root": {
					backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение как в Instagram
				},
			}}
		>
			{DrawerList}
		</Drawer>
	)
}
