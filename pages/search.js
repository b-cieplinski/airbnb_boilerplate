import React from 'react'
import Header from "../components/Header.js";
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import { format } from "date-fns"
import InfoCard from '../components/InfoCard'
import Map from '../components/Map.js';

const Search = ({searchResults}) => {
    
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuests} = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
    <Header placeholder={`${location} | ${range} | ${numberOfGuests}  guests`}/>
    <main className="flex">
        <section className="flex-grow pt-14 px-6">
            <p className="text-xs">300+ stays for <b>{numberOfGuests}</b> people from <b>{range}</b></p>
            <h1 className="text-3xl font-semibold mt-2 mb-6">Stay in {location}</h1>
            <div className="hidden lg:inline-flex mb-5 space-x-3 text gray-800 whitespace-nowrap">
                <p className="button">Cancelation of</p>
                <p className="button">Type of Place</p>
                <p className="button">lala</p>
                <p className="button">or some</p>
                <p className="button">things</p>
            </div>
            <div className="">
            {searchResults.map(({             img,
                location, 
                title, 
                description, 
                star, 
                price, 
                total, 
                long, 
                lat}) => (
                <InfoCard 
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
                long={long}
                lat={lat}/>
            ))}
            </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <Map searchResults={searchResults} />
            </section>
    </main>
    <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(res => res.json());

    return {
        props:{
            searchResults,

        }
    }
}