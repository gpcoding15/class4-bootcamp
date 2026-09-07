export const Notes = ({ content, important, onToggleImportant }) => {
    return (
      <li className={important ? "note important" : "note"}>
        {content}
        <button onClick={onToggleImportant}>{important ? "Not important" : "Important"}</button>
      </li>
    )
}