interface Props {
  availableHours: string[]
}

const HorarioDia: React.FC<Props> = ({ availableHours }) => {
  return (
    <div>
      <ul>
        {availableHours.map((availableHour, indice) => (
          <li key={indice}>
            <button onClick={() => console.log('accc   ', availableHour)}>
              {availableHour}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HorarioDia
