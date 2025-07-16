'use client'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useState } from 'react'
import { useSearchStore } from '@/store/search/searchStore'

export default function TemporaryDrawer() {

	const { openSide, toggleOpen } = useSearchStore()

	// const [openSide, setOpen] = useState(false)

	// const toggleOpen = (newOpen) => () => {
	// 	setOpen(newOpen)
	// }

	const DrawerList = (
		<Box sx={{ width: 250}} role="presentation" onClick={() => toggleOpen(false)}>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			{/* <Button onClick={() => toggleOpen(true)}>Open drawer</Button> */}
			<Drawer open={openSide} onClose={() => toggleOpen(false)}>
				{DrawerList}
			</Drawer>
		</div>
	)
}
