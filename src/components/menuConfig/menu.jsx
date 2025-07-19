'use client'
import { MenuItem,Menu } from '@mui/material'
import { useState } from 'react'
// import SettingsIcon from '@mui/icons-material/Settings'
export default function MenuComp() {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<Menu
				anchorEl={anchorEl}
				open={open}
				sx={{ width: '900px', borderRadius: '60px' }}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<MenuItem
					
					sx={{
						display: 'flex',
						gap: '30px',
						width: '290px',
						cursor: 'pointer',
					}}
				>
				
					<span>sas</span>
				</MenuItem>
				
			</Menu>
		</>
	)
}
