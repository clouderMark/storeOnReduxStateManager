import {TableCell} from '@mui/material';
import {ICell} from './cells';

interface IProps {
  cells: ICell[];
}

const TableCells = (props: IProps) => (
  <>
    {props.cells.map((cell) => (
      <TableCell key={cell.field}>{cell.value}</TableCell>
    ))}
  </>
);

export default TableCells;
