import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTest } from '../firebase'
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.5)',
                borderRadius: '100px',
            },
            '&:hover fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.5)',
            },
            '&.Mui-focused fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.5)',
            },
        },
    },
})(TextField);

const Section = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 10px 100px;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    Padding: 0px 20px 0px 0px;
    margin-bottom: 30px;
    height: 46px;
`
const Title = styled.div`
    width: 145px;
    font-size: 18px;
    border-bottom: 5px solid #6B354D;
    display: flex;
    justify-content: center;
    align-items: center;
`
const HeaderActionContainer = styled.div`
    display: flex;
    color: #863654;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`
const AddTestForm = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    gap: 20px;
`

const AddTest = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [titleError, setTitleError] = useState('')

    const onChangeName = (event) => {
        setTitle(event.target.value)
        setTitleError('')
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const onAddTest = async (event) => {
        event.preventDefault()
        const test = { title, description, assignee: 'Eyal Yosi', requirement: "ST functional", run: 'No run', status: 'Open', isSuite: false }
        try {
            if (!title.length) {
                setTitleError('Must enter title to test')
                return
            }
            await addTest(test)
            navigate("/")
        } catch (err) {
            console.log('', err);
        }
    }

    return (
        <Section>
            <Header>
                <Title>New Test Cases</Title>
                <HeaderActionContainer>

                    <Tooltip title="New">
                        <IconButton onClick={onAddTest} type='submit' form="addForm"
                            sx={{
                                color: '#863654',
                            }}>
                            <Icon icon="ic:round-plus" width="30" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton onClick={() => navigate("/")}
                            sx={{
                                color: '#863654',
                            }}>
                            <Icon icon="eva:close-fill" width="30" />
                        </IconButton>
                    </Tooltip>
                </HeaderActionContainer>
            </Header>
            <AddTestForm action="" id="addForm" onSubmit={onAddTest}>
                <CssTextField type="text" required placeholder='Name *' value={title} onChange={onChangeName} />
                <div className='AddTest__Form-title-error'>{titleError}</div>
                <CssTextField type="text" placeholder='Description' value={description} onChange={onChangeDescription} />
            </AddTestForm>
        </Section>
    )
}

export default AddTest