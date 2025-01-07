/* eslint-disable react/prop-types */
const Filter = ({filter, handleFilter}) => {
  return (
    <div>
    filet shown with: <input value={filter} onChange={handleFilter} />
  </div>
  )
}

export default Filter