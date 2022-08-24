import styled from 'styled-components'
import Modal from '@mui/material/Modal';

const ModalContainer = styled.div`
    width: 600px;
    height: 400px;
    color: #863654;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    border: 1px solid #863654;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    background: #FFFFFF;
`

const Section = styled.div`
    font-size: 50px;
    line-height: 59px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 560px;
    height: 288px;
`
const Action = styled.div`
    width: 249px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

const Button = styled.button`
    width: 99.5px;
    height: 32px;
    background: rgba(134, 54, 84, 0.9);
    box-shadow: 3px 3px 4px rgba(255, 255, 255, 0.25);
    border-radius: 50px;
    color: #FFFFFF;
    font-size: 18px;
    border: 0;
    &:hover {
        cursor: pointer;
    }
`

const TestModal = ({ open, handleClose, deleteTest, text }) => {

    const onDelete = () => {
        deleteTest()
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer>
                <Section>
                    {text}
                </Section>
                <Action>
                    <Button onClick={onDelete}>Delete</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Action>
            </ModalContainer>
        </Modal>
    )

}

export default TestModal