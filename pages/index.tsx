import Head from 'next/head'
import Header from "../components/Header.js"
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

//importing props of the fetch function called exploredata
export default function Home({ exploreData, cardData, placeholder}) {
  return (
    <div className="">
      <Head>
        <title>Air Kretowiny</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Header placeholder={placeholder}/>
<Banner />
<main className="max-w-7xl mx-auto px-8 sm:px-16">
  <section className="pt-6">
    <h2 className="text-4xl font-semibold pb-5" >Explore Nearby</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* This maps the called json file and destructures the file according to new standards.
    The fetched data is then sent to the smallcards component that is responsible for the style*/}
      {exploreData?.map(({img, distance, location}) => (
        <SmallCard key={img} img={img} distance={distance} location={location}/>
      ))}
</div>
  </section>
  <section>
    <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
    <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
    {cardData?.map(({img, title}) => (
      <MediumCard key={img} img={img} title={title}/>
    ))}
    </div>
  </section>
  <section>
<LargeCard img="https://a0.muscache.com/im/pictures/2da67c1c-0c61-4629-8798-1d4de1ac9291.jpg?im_w=1440" title="The Greatest Outdoors" description="Whishlists curated by Us" buttonText="Get Inspired"/>
  </section>
</main>
<Footer />
    </div>
  );
}


//This is an API fetcher function that get JSON files and displays on the hp
//Should be an Async function as data get swapped between two or more components
export async function getStaticProps() {
// exploreData is the name of the fetching function. 
  const exploreData = await fetch ('https://jsonkeeper.com/b/4G1G')
//THen function tells the fetch what to do with the file... to be confirmed
  .then(res => res.json());

  //Passing this also filters the data and helps only passing the JSON file. 
  const cardData = await fetch ('https://jsonkeeper.com/b/VHHT')
  .then(res => res.json());

//After getting the json, a result is exported that is then sent up the file

  return { 
    props: { 
      exploreData,
      cardData,
    }
  }
}
