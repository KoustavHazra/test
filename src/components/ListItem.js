import React from 'react'
import { Link } from 'react-router-dom'

let getTitle = (note) => {
    const title = note.body.split('\n')[0]
    if(title.length > 50 ){
      return title.slice(0,50) + "..."
    }
    return title
}

let getDate = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

let getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, "")

  if(content.length > 50) {
    return content.slice(0,50) + '...'
  } else {
    return content
  }
}

const ListItem = ({ note }) => {
// props is an immutable form of data which means we can't modify the data once we pass it down.
// because ListItem is a function, props is gonna act like a property or parameter to the function 
// which we can pass down as a child component.
// The props we get in the frontend is simply an object, 
    return (
    <Link to={`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p><span>{getDate(note)}</span>{getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem
