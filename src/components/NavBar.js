import styled from 'styled-components'
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as Logo } from '../images/logo.svg'
import IconButton from '@mui/material/IconButton';

const Nav = styled.div`
    width: 60px;
    height: 100%;
    background-color: #003031;
    padding: 10px 5px ;
`

const SectionUp = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const UserAvatar = styled.div`
    background-color: #863654;
    border-radius: 50%;
    height: 50px;
    width:50px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #863654;
    gap:20px
`

const Hr = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50px;
    height: 1px;
    border: 0; 
    border-top: 1px solid #863654;
`

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <Nav>
            <SectionUp>
                <div className='NavBar__Logo'><Logo></Logo></div>
                <UserAvatar>EY</UserAvatar>
            </SectionUp>
            <Hr />
            <Actions>
                <Tooltip title="Test Development">
                    <IconButton onClick={() => navigate("/")}
                        sx={{
                            color: '#863654',
                        }}>
                        <Icon icon="system-uicons:create" width="30" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Suite">
                    <IconButton onClick={() => navigate("suite")}
                        sx={{
                            color: '#863654',
                        }}>
                        <Icon icon="ph:suitcase-simple" width="30" />
                    </IconButton>
                </Tooltip>
            </Actions>
        </Nav>
    )
}

export default NavBar