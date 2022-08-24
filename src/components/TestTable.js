import styled from 'styled-components'
import { Icon } from '@iconify/react';
import TestRow from './TestRow';

const Table = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 10px;
`

const TableHeader = styled.div`
    display: flex;
    padding: 10px;
    background: #DBEAF4;
    align-items: center;
    gap: 10px;
`

const TableHeaderTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    &:hover{
        cursor: pointer;
    }
`

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    &:select {
    backgroundColor: #863654;
   }
`

const TableHeaderTitleContainer = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 4;
`

const TableHeaderTitleContainerArrow = styled.div`
    flex-grow: 1;
    color: #863654;
    &:hover{
        cursor: pointer;
    }
`

const TableHeaderRequirement = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: center;
`

const TableHeaderAssignee = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: center;
`

const TableHeaderRun = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: center;
`

const TableHeaderStatus = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: center;
`
const TableHeaderTitleContainerArrowEmpty = styled.div`
    flex-grow: 1;   
    height: 24px;
`

const TestTable = ({ tests, selectedIds, setSelectedIds, onSort, sortBy, clearSort }) => {
    return (
        <Table>
            <TableHeader>
                <Checkbox
                    checked={!!selectedIds.length}
                    onChange={() => {
                        if (selectedIds.length) {
                            setSelectedIds([])
                        } else {
                            setSelectedIds(tests.map((test) => test.id))
                        }
                    }}
                    className="TestTable__Chekbox"
                    size="small"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <TableHeaderTitleContainer>
                    <TableHeaderTitle onClick={clearSort}>Title</TableHeaderTitle>
                    <TableHeaderTitleContainerArrow onClick={onSort}>
                        {sortBy ? sortBy === "desc" ? <Icon icon="cil:arrow-bottom" width="13" /> : <Icon icon="cil:arrow-top" width="13" /> : <TableHeaderTitleContainerArrowEmpty />}
                        {/* {sortBy === "desc" ? <Icon icon="cil:arrow-bottom" width="13" /> : <Icon icon="cil:arrow-top" width="13" />} */}
                    </TableHeaderTitleContainerArrow>
                </TableHeaderTitleContainer>
                <TableHeaderRequirement>Requirement</TableHeaderRequirement>
                <TableHeaderAssignee>Assignee</TableHeaderAssignee>
                <TableHeaderRun>Run</TableHeaderRun>
                <TableHeaderStatus>Status</TableHeaderStatus>
            </TableHeader>
            {
                tests.map((test) => {
                    const isSelected = selectedIds.includes(test.id)
                    const onRowClick = () => {
                        if (isSelected) {
                            setSelectedIds((prev) => prev.filter((id) => id !== test.id))
                        } else {
                            setSelectedIds((prev) => [...prev, test.id])
                        }
                    }
                    return <TestRow key={test.id} test={test} onRowClick={onRowClick} isSelected={isSelected} />
                })
            }
        </Table>
    )
}

export default TestTable