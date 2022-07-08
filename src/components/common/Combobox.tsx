import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

interface Option {
  value: string
  text: string
}
interface Props {
  options: Option[]
  selected: Option
  setSelected: (option: Option) => void
}

const MyCombobox: React.FC<Props> = ({ options, selected, setSelected }) => {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? options
      : options.filter((option) =>
        option.text
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className='text-sm shadow-sm w-[120px] relative'>
          <div className='flex cursor-default text-gray-700 border items-center h-10 px-2 justify-between border-gray-300 hover:border-gray-400'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(option: { text: string }) => option.text}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-6 w-6 text-gray-400 hover:text-gray-500'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredPeople.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  No se encontró.
                </div>
              ) : (
                filteredPeople.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      } ${
                        selected
                          ? 'font-medium text-white bg-black'
                          : 'font-normal'
                      }`
                    }
                    value={option}
                  >
                    {option.text}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default MyCombobox
