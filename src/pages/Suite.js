import styled from 'styled-components'
import { Icon } from '@iconify/react';
import TestTable from '../components/TestTable';
import Tooltip from '@mui/material/Tooltip';
import { removeFromSuite, getSuites } from '../firebase'
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import TestModal from '../components/TestModal';
import IconButton from '@mui/material/IconButton';

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
    width: 60px;
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

const Suite = () => {
    const [tests, setTests] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [filterSearch, setFilterSearch] = useState(null)
    const [open, setOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [sortBy, setSortBy] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getSuites(filterSearch, sortBy)
            .then((res) => setTests(res))
    }, [filterSearch, sortBy])

    const onSort = () => {
        setSortBy(sortBy === "asc" ? "desc" : "asc")
    }

    const clearSort = () => {
        setSortBy(null)
        setFilterSearch(null)
    }

    const deleteTest = () => {
        removeFromSuite(selectedIds)
        setTests(tests.filter((test) => !selectedIds.includes(test.id)))
        setSelectedIds([])
    }

    const text = 'You are Going to delete selected test from Suite'

    return (
        <Section>
            <Header>
                <Title>Suite</Title>
                <HeaderActionContainer>
                    {tests.length ?
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
                        </>
                        :
                        ""
                    }
                    {tests.length && selectedIds.length ?
                        <>
                            <Hr />
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
                        ""
                    }

                </HeaderActionContainer>
            </Header>
            {tests && <TestTable tests={tests} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onSort={onSort} sortBy={sortBy} clearSort={clearSort}/>}
            <TestModal open={open} handleClose={handleClose} deleteTest={deleteTest} text={text} />
        </Section>
    )
}

export default Suite