import styles from './TeamList.module.css'

export default function TeamList({ team, number }: any) {
  return (
    <div className={styles.teamList}>
      <div>
        Team
        {' '}
        {number}
      </div>
      {team.map((person: any) => (
        <div key={person}>{person}</div>
      ))}
    </div>
  )
}
