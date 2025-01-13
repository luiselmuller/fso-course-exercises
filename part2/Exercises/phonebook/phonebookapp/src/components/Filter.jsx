/* eslint-disable react/prop-types */
const Filter = ({ onFilterChange }) => {

  return (
    <div>
      <p>
        filter shown with
      </p>
      <input type="text" onChange={onFilterChange} />
    </div>
  )
}

export default Filter
