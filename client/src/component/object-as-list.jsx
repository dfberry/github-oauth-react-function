import { useMemo } from "react";

const sortByAbc = ([a], [b]) => a.localeCompare(b);
const sortByZxy = ([a], [b]) => b.localeCompare(a);
const sortNone = () => 0;

function Table({data, sortFunc}){
    return (
        <>
        <table>
            {
                Object.entries(data)
                .sort(sortFunc)
                .map(([key, value]) => (
        
        
                  <tr key={key}>
                    <td className="key title">{key}:</td>
                    <td className="value property">{String(value)}</td>
                  </tr>
                ))
            }
        </table>
        </>
        
      );
}
function List({data, sortFunc}){
    return (
        Object.entries(data)
          .sort(sortFunc)
          .map(([key, value]) => (
  
  
            <li key={key}>
              <span className="key title">{key}:</span>{" "}
              <span className="value property">{String(value)}</span>
            </li>
          ))
      );
}

/**
 * Renders <ul> list with all properties of the given JavaScript object
 * @param {object} object - object to print out
 * @param {boolean} [sortAbc] - properties sorted A-Z when true
 * @param {boolean} [sortZxy] - properties sorted Z-A when true
 */
export const ObjectAsList = ({
  className = "",
  object = {},
  sortAbc = false,
  sortZxy = false,
  type =  "table",
  ...restOfProps
}) => {
  console.log(`objAsList = ${JSON.stringify(object)}`);

  const objectPropsWithSorting = useMemo(() => {
    const sortFunc = sortAbc ? sortByAbc : sortZxy ? sortByZxy : sortNone;

    console.log(`sortFunc`);

    if(type==='table'){
        return ( <Table data={object} sortFunc={sortFunc} />)
    } else {
        return ( <List data={object} sortFunc={sortFunc} />)
    }
    
  }, [object /*, sortAbc, sortZxy*/]);

  return (
    <>

        <ul className={`objectAsList ${className}`} {...restOfProps}>
          {objectPropsWithSorting}
        </ul>

    </>
  );
};

export default ObjectAsList;
