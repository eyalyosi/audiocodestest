import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { getTests, deleteTests, addToSuite, getSortTests } from '../firebase'
import { Icon } from '@iconify/react';
import TestTable from '../components/TestTable'
import Tooltip from '@mui/material/Tooltip';
import TestModal from '../components/TestModal';
import Filter from '../components/Filter';
import IconButton from '@mui/material/IconButton';
import { assert, async } from "@firebase/util";

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
    height: 47px;
`
const Title = styled.div`
    width: 125px;
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

const Hr = styled.hr`
    height: 30px;
    border: 0; 
    border-right: 1px solid #863654;
`

const Home = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [filterSearch, setFilterSearch] = useState(null)
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState(null)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getTests(filterSearch, sortBy)
            .then((res) => setTests(res))
    }, [filterSearch, sortBy])

    const onSort = () => {
        setSortBy(sortBy === "asc" ? "desc" : "asc")
    }

    const onAddTest = () => {
        navigate("addTest")
    }

    const onAddToSuite = () => {
        addToSuite(selectedIds)
    }

    const deleteTest = () => {
        deleteTests(selectedIds)
        setTests(tests.filter((test) => !selectedIds.includes(test.id)))
        setSelectedIds([])
    }

    const clearSort = () => {
        setSortBy(null)
        setFilterSearch(null)
    }

    const text = 'You are going to delete selected tests'

    return (
        <Section className="darkBG">
            <Header>
                <Title>Test Cases</Title>
                <HeaderActionContainer>
                    {tests.length && selectedIds.length ?
                        <>
                            {isFilterOpen ?
                                <Filter filterSearch={filterSearch} setFilterSearch={setFilterSearch} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
                                :
                                <>
                                    <Tooltip title="Filter">
                                        <IconButton onClick={() => setIsFilterOpen(true)}
                                            sx={{
                                                color: '#863654',
                                            }}>
                                            <Icon icon="ic:round-filter-list" width="30" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            <Hr />
                            <Tooltip title="Add to siute">
                                <IconButton onClick={onAddToSuite}
                                    sx={{
                                        color: '#863654',
                                    }}>
                                    <Icon icon="ic:round-plus" width="30" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove">
                                <IconButton onClick={() => handleOpen()}
                                    sx={{
                                        color: '#863654',
                                    }}>
                                    <Icon icon="eva:close-fill" width="30" />
                                </IconButton>
                            </Tooltip>
                        </>
                        :
                        <>
                            {isFilterOpen ?
                                <Filter filterSearch={filterSearch} setFilterSearch={setFilterSearch} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
                                :
                                <>
                                    <Tooltip title="Filter">
                                        <IconButton onClick={() => setIsFilterOpen(true)}
                                            sx={{
                                                color: '#863654',
                                            }}>
                                            <Icon icon="ic:round-filter-list" width="30" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            <Tooltip title="New">
                                <IconButton onClick={onAddTest}
                                    sx={{
                                        color: '#863654',
                                    }}>
                                    <Icon icon="ic:round-plus" width="30" />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </HeaderActionContainer>
            </Header>
            {tests && <TestTable tests={tests} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onSort={onSort} sortBy={sortBy} clearSort={clearSort} />}
            <TestModal open={open} handleClose={handleClose} deleteTest={deleteTest} text={text} />
        </Section>
    )
}

export default Home