import React from 'react'
import { useMemo } from 'react'

const sortByAbc = ([a]: any, [b]: any) => a.localeCompare(b)
const sortByZxy = ([a]: any, [b]: any) => b.localeCompare(a)
const sortNone = () => 0

type ITableProps = {
  data: Object
  sortFunc: typeof sortByAbc
}

const Table: React.FC<ITableProps> = ({ data, sortFunc }: ITableProps) => {
  return (
    <>
      <table>
        <tbody>
          {Object.entries(data)
            .sort(sortFunc)
            .map(([key, value]) => (
              <tr key={key}>
                <td className="key title">{key}:</td>
                <td className="value property">{String(value)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

type IListProps = {
  data: Object
  sortFunc: typeof sortByAbc
}
const List: React.FC<IListProps> = ({ data, sortFunc }: IListProps) => {
  return (
    <>
      <ul>
        {Object.entries(data)
          .sort(sortFunc)
          .map(([key, value]) => (
            <li key={key}>
              <span className="key title">{key}:</span>{' '}
              <span className="value property">{String(value)}</span>
            </li>
          ))}
      </ul>
    </>
  )
}

type IObjectAsListProps = {
  className: string
  object: {}
  sortAbc?: boolean
  sortZxy?: boolean
  type?: string
}

/**
 * Renders <ul> list with all properties of the given JavaScript object
 * @param {object} object - object to print out
 * @param {boolean} [sortAbc] - properties sorted A-Z when true
 * @param {boolean} [sortZxy] - properties sorted Z-A when true
 */
export const ObjectAsList: React.FC<IObjectAsListProps> = ({
  className = '',
  object = {},
  sortAbc = false,
  sortZxy = false,
  type = 'table'
}: IObjectAsListProps) => {
  const objectPropsWithSorting = useMemo(() => {
    const sortFunc = sortAbc ? sortByAbc : sortZxy ? sortByZxy : sortNone

    if (type === 'table') {
      return <Table data={object} sortFunc={sortFunc} />
    } else {
      return <List data={object} sortFunc={sortFunc} />
    }
  }, [object, sortAbc, sortZxy, type])

  return (
    <>
      <ul className={`objectAsList ${className}`}>{objectPropsWithSorting}</ul>
    </>
  )
}
