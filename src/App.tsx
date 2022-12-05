/* eslint-disable no-param-reassign */
import { useState, useRef, useEffect } from 'react'
import TeamList from './components/TeamList'
import styles from './App.module.css'

export default function App() {
  const [val, setVal] = useState('')
  const [teams, setTeams] = useState([])
  const [preferredChunk, setPreferredChuck] = useState(1)
  const textAreaRef = useRef<any>(null)
  const people = val.split('\n')

  const resizeTextArea = () => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  useEffect(resizeTextArea, [val])

  const handleChange = (e: any) => {
    setVal(e.target.value)
  }

  const shuffle = (array: any) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const splitToChunks = (array: any, chunk: number) => {
    const result: any = []
    for (let i = chunk; i > 0; i -= 1) {
      result.push(array.splice(0, Math.ceil(array.length / i)))
    }
    return result
  }

  const draw = (array: any, chunk: number) => {
    if (array.length >= chunk && chunk > 0) {
      setTeams(splitToChunks(shuffle(array), chunk))
    }
  }

  const minChunkHandler = () => {
    if (preferredChunk > 1) {
      setPreferredChuck((prev) => prev - 1)
    }
  }

  const plusChunkHandler = () => {
    if (preferredChunk < people.length) {
      setPreferredChuck((prev) => prev + 1)
    }
  }
  return (
    <div>
      <textarea
        placeholder="List of names"
        name="input"
        className={styles.input}
        ref={textAreaRef}
        rows={1}
        value={val}
        onChange={handleChange}
      />
      <div>
        <div>Number of teams</div>
        <div className={styles.numberOfTeamsButton}>
          <button type="button" onClick={minChunkHandler}>-</button>
          <div>{preferredChunk}</div>
          <button type="button" onClick={plusChunkHandler}>+</button>
        </div>
      </div>
      <button type="button" onClick={() => draw(people, preferredChunk)}>Generate</button>
      <div className={styles.teamList}>
        {teams.map((team, index) => (
          <TeamList key={team[0]} team={team} number={index + 1} />
        ))}
      </div>
    </div>
  )
}
