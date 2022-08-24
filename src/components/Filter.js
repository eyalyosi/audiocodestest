import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const Btn = styled.button`
    width: 100px;
    height: 20px;
    background: rgba(134, 54, 84, 0.9);
    box-shadow: 3px 3px 4px rgba(255, 255, 255, 0.25);
    border-radius: 50px;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 400;
    border: 0;
    &:hover {
        cursor: pointer;
    }
`

const Filter = ({ setFilterSearch, setIsFilterOpen, isFilterOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [filterBy, setFilterBy] = useState(null)
    const [startWith, setStartWith] = useState('')
    const [equelsTo, setEquelsTo] = useState('')
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
    const [filterToShow, setFilterToshow] = useState('')

    const handleClick = (event) => {
        setIsFilterMenuOpen(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIsFilterMenuOpen(false)
        setAnchorEl(null);
    };

    const onFilterSelect = (event) => {
        setFilterToshow(event.target.textContent)
        setFilterSearch({ [filterBy]: { value: event.target.textContent, op: '==' } })
        setAnchorEl(null);
        setFilterBy(null)
    }

    const onApplyStartWith = () => {

        setFilterSearch({ "requirement": { value: startWith, op: 'start with' } })
        setFilterBy(null)
        setAnchorEl(null);
        setStartWith('')
    }

    const onApplyEquelsTo = () => {
        setFilterSearch({ "requirement": { value: equelsTo, op: '==' } })
        setFilterBy(null)
        setAnchorEl(null);
        setEquelsTo('')
    }

    const onCancel = () => {
        setFilterSearch('')
        setFilterBy(null)
        setAnchorEl(null)
        setStartWith('')
        setStartWith('')
    }

    let select = []
    switch (filterBy) {
        case 'Requirement':
            select = [
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="start with">start with</MenuItem>,
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="equels to">equels to</MenuItem>,
            ]
            break;
        case 'Assignee':
            select = [
                <MenuItem onClick={onFilterSelect} key="Eyal yosi">Eyal Yosi</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Amitai Zamir">Amitai Zamir</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Yakov K">Yakov K</MenuItem>,
            ]
            break;
        case 'Run':
            select = [
                <MenuItem onClick={onFilterSelect} key="No run">No run</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Passed">Passed</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Faild">Failed</MenuItem>,
            ]
            break;
        case 'Status':
            select = [
                <MenuItem onClick={onFilterSelect} key="Done">Done</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Open">Open</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="Run">Run</MenuItem>,
                <MenuItem onClick={onFilterSelect} key="WIP">WIP</MenuItem>
            ]
            break;
        case 'start with':
            select = [
                <MenuItem disabled key="start with"
                    sx={{
                        backgroundColor: '#DBEAF4',
                        fontSize: '18px',
                        fontWeight: '300',
                    }}>
                    start with</MenuItem>,
                <TextField id="standard-basic" variant="standard" key="input start with" value={startWith} onChange={(event) => setStartWith(event.target.value)} />,
                <Btn key="Btn-Apply" onClick={onApplyStartWith}>Apply</Btn>,
                <Btn key="Btn-Cancel" onClick={onCancel}>Cancel</Btn>
            ]
            break;
        case 'equels to':
            select = [
                <MenuItem disabled key="equels to"
                    sx={{
                        backgroundColor: '#DBEAF4',
                        fontSize: '18px',
                        fontWeight: '300',
                    }}>
                    equels to</MenuItem>,
                <TextField id="standard-basic" variant="standard" key="input equels to" value={equelsTo} onChange={(event) => setEquelsTo(event.target.value)} />,
                <Btn key="Btn-Apply" onClick={onApplyEquelsTo}>Apply</Btn>,
                <Btn key="Btn-Cancel" onClick={onCancel}>Cancel</Btn>
            ]
            break;
        default:
            select = [
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="Requirement">Requirement</MenuItem>,
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="Assignee">Assignee</MenuItem>,
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="Run">Run</MenuItem>,
                <MenuItem onClick={(event) => setFilterBy(event.target.textContent)} key="Status">Status</MenuItem>
            ]
    }

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    width: '300px',
                    color: 'black',
                    borderRadius: '50px',
                    boxShadow: '0px 4px 4px rgba(134, 54, 84, 0.25)',
                    display: 'flex',
                    paddingLeft: '20px',
                    height: '30px',
                    justifyContent: 'space-between',
                }}
            >
                {filterToShow ? `${filterToShow}` : `${isFilterMenuOpen ? 'Choose a filter' : 'Filter by'}` }
                <Icon icon="ic:round-close" width="20" height="20" onClick={(event) => {
                    event.stopPropagation()
                    setIsFilterOpen(false)
                    setFilterSearch(null)
                    setFilterToshow('')
                }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className="Filter__Menu"
            >
                {select}
            </Menu>
        </>
    )
}

export default Filter

