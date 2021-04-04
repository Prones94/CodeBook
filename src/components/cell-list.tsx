import { useTypedSelector } from '../hooks/use-typed-selector';
import { Fragment } from 'react'
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

import './css/cell-list.css'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({cells: { order, data }}) =>
   order.map((id) =>data[id])
  )

  const renderedCells = cells.map(cell =>(
    <Fragment key={cell.id}>
    <CellListItem key={cell.id} cell={cell} />
    <AddCell prevCellId={cell.id} />
    </Fragment>));

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} />
      {renderedCells}
    </div>
  )
};

export default CellList
