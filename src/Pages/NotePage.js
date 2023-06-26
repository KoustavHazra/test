import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    const {id} = useParams();
    // const note = notes.find(note => note.id===Number(noteid));
    let [note, setNote] = useState(null)
    // in case of using useState, we should always keep it at top level of our component; 
    // and not in the middle of component or inside any useEffect function.
    // It is because here we're creating our initial state, which should not be disturbed.

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        if (id === 'new') return
        let response = await fetch(`http://localhost:8000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }


    let createNote = async () => {
        await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }


    let navigate = useNavigate()

    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let handleSubmit = () => {

        if(id !== 'new' && !note.body){
            deleteNote()
        } else if(id !== 'new'){
            updateNote()
        } else if(id === 'new' && note !== null) {
            createNote()
        }
        navigate('/')
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({note})
        })
        navigate('/')
    }

    console.log(note);
    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}

                

            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>
                
            </textarea>
        </div>
    )
}

export default NotePage
