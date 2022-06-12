import React, { SetStateAction } from 'react'

interface Props {
  availableHours: string[]
  setHour: React.Dispatch<SetStateAction<string | undefined>>
}

const HorarioDia: React.FC<Props> = ({ availableHours, setHour }) => {
  return (
    <div>
      <ul>
        {availableHours.map((availableHour, indice) => (
          <li key={indice}>
            <button onClick={() => setHour(availableHour)}>
              {availableHour}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HorarioDia
