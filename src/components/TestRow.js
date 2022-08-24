import styled from 'styled-components'

const TableRow = styled.div`
    display: flex;
    padding: 10px;
    background: #FFFFF;
    align-items: center;
    gap: 10px;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const Checkbox = styled.input.attrs({ type: "checkbox" })`

`
const TableRowTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    flex-grow: 4;
`

const TableRowTitleRequirement = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`

const TableRowTitleAssignee = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`

const TableRowTitleRun = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`

const TableRowTitleStatus = styled.div`
    flex-grow: 1;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: center;
`

const TestRow = ({ test, onRowClick, isSelected }) => {
    return (
        <TableRow>
            <Checkbox
                checked={isSelected}
                onChange={() => onRowClick()}
                size="small"
                className="TestRow__Checkbox"
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <TableRowTitle>{test.title}</TableRowTitle>
            <TableRowTitleRequirement>{test.requirement}</TableRowTitleRequirement>
            <TableRowTitleAssignee>{test.assignee}</TableRowTitleAssignee>
            <TableRowTitleRun>{test.run}</TableRowTitleRun>
            <TableRowTitleStatus>{test.status}</TableRowTitleStatus>
        </TableRow>
    )
}

export default TestRow