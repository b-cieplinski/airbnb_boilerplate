import Image from 'next/image'
import React, { useState } from 'react'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';


const Header = ({placeholder}) => {

  const [searchInput, setSearchInput] = useState('');
  const [userSettings, setUserSettings] = useState();
  const [startDate, setStartDate ] = useState(new Date());
  const [endDate, setEndtDate ] = useState(new Date());
  const [numberOfGuests, setNoOfGuests ] = useState(1);
  const router = useRouter();

  const handleSelector = (ranges) => {
  setStartDate (ranges.selection.startDate);
  setEndtDate (ranges.selection.endDate);
}

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
      key: 'selection',
  }

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      }
    })
  }

  return (
      <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
    <div className="relative flex items-center h-10 cursor-pointer my-auto">
        {/* This image below is a img but convered into webp with dom lub fom next/image*/}
        <Image onClick ={() => { router.push('/')}} src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" layout='fill' objectFit='contain' objectPosition='left'/>
    </div>

    <div className="cursor-pointer flex md:shadow-sm items-center border-2 rounded-full py-2 md:border-2">
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' className="flex-grow pl-5 bg-transparent outline-none" placeholder={placeholder || "Start your search"}></input><SearchIcon className="mx-auto hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-1 cursor-pointer md:mx-2"/>
    </div>

    <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="cursor-pointer hidden md:inline">Become a host </p><GlobeAltIcon className="h-6"/>
        <button onClick={(e) => setUserSettings(e.target)} className="flex items-center space-x-2 border-2 p-2 rounded-full">
        <MenuIcon className="h-6"/>
        <UserCircleIcon className="h-6"/>
        </button>
    </div>

    {userSettings && (
      <div>Hello User</div> )
    }


    {/* This is the search banner date picker */}
    {searchInput && (
<div className="flex flex-col col-span-3 mx-auto my-5 rounded-lg">
  <DateRangePicker ranges={[selectionRange]}
  minDate={new Date()}
  rangeColors={["#FD5B61"]}
  onChange={handleSelector}/>
  <div className="flex items-center border-b mb-4">
    <h2 className="text-2xl flex-grow font-semibold ">Number of guests</h2>
      <UserIcon className="h-5"/>
      <input value={numberOfGuests} onChange={e => setNoOfGuests(e.target.value)} min={1} type="number" className="w-12 pl-2 text-lg outline-none text-red-400" />
  </div>
  <div className="flex items-center">
    <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
    <button className="flex-grow text-red-400" onClick={search}>Search</button>
  </div>
</div>)

}

    </header>
  )
}

export default Header