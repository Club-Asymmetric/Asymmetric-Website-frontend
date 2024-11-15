"use client";
import MusicPlayer from '@/components/MusicPlayer';
import { FaYoutube, FaSpotify, FaApple} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';


interface PropType {
  title: string;
  hosts: string[];
  description: string;
  links: string[];
  sourcefile: string;
  img: string;
}


const Podcast: React.FC<PropType> = ({ title, hosts, description, links, sourcefile, img }) =>  {
    var hostNames = '';
    hosts.forEach(host => {hostNames += host + ', '})
    if(hosts.length != 0){
      hostNames = hostNames.slice(0, hostNames.length - 2);
    }
    const [spotifyLink, youTubeLink, appleLink] = links;
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          root: null, // viewport
          threshold: 0.5, // Adjust this threshold to trigger sooner or later
        }
      );
  
      if (divRef.current) {
        observer.observe(divRef.current);
      }
  
      return () => {
        if (divRef.current) {
          observer.unobserve(divRef.current);
        }
      };
    }, []);

    return (
//w-[100%] my-10  bg-[#2b2e4a] grid grid-cols-[1fr_2fr] px-5 py-10 rounded-xl
      // <div className='transition-transform transform hover:scale-105 duration-500 ease-in-out'>
      <div className={`w-[100%] my-10  bg-[#2b2e4a] grid grid-cols-[1fr_2fr] px-5 py-10 rounded-xl `}>
            <div className="flex place-items-center">
            <Image src={img} alt="Logo"  width={250} height={100} />
            </div>
            <div className=" bg-[#2b2e4a] flex flex-col gap-4 px-10">
              <h1 className="text-3xl font-bold">{title}</h1>
              <h2>{hostNames}</h2>
              <p>
                {description}
              </p>
              <h2>Editing by Asymmetric</h2>
              <div className="icons flex flex-cols gap-4 items-center">
                <Link href={spotifyLink} target='_blank' className="transition-colors">
                  <FaSpotify className="transition-all duration-300 w-5 h-5 hover:bg-green-400 rounded-lg" />
                </Link>
                <Link href={youTubeLink} target='_blank' className="transition-colors">
                  <FaYoutube className="transition-all duration-300 w-5 h-5 hover:bg-red-600 rounded-lg" />
                </Link>
                <Link href={appleLink} target='_blank' className="transition-colors">
                  <FaApple className="transition-all duration-300 w-5 h-5 hover:bg-gray-400 rounded-lg" />
                </Link>

              </div>
              <MusicPlayer sourceFile={sourcefile} />
            </div>
      </div>
      // </div>
    );
  }

  
export default function Podcasts(){

  const hosts = ['host1', 'host2'];
  const links = ['https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C', 'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C', 'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C'];
  const description = 'soluta, explicabo, quam assumenda facilis. Tempore dolor tempora nisi minus inventore explicabo! Sunt facere inventore qui ex molestiae nostrum nulla eligendi omnis minima nam dolorem officia, cupiditate harum aliquam reprehenderit porro officiis ab blanditiis! Accusamus facilis aspernatur, consequatur veniam tempore nobis voluptas cum beatae amet voluptate hic eaque, neque doloremque consectetur repudiandae nam nostrum blanditiis voluptatum aperiam magni doloribus. Nostrum fugit autem officiis placeat, quo sed incidunt aut tempora optio mollitia perspiciatis soluta libero minus iusto, magni vero assumenda numquam. Saepe cum dolor iure tempora, tenetur non soluta aliquam deserunt. Cumque fuga, doloribus error velit, nisi deserunt praesentium odio quas quaerat ducimus labore aliquam et ratione amet officiis. Commodi natus voluptates omnis adipisci vitae minima sequi expedita debitis provident voluptate? Earum, quisquam soluta quae veritatis quis incidunt, voluptas ullam quo harum consequatur maiores dolorum. Consequuntur, modi tenetur quo a impedit animi sapiente excepturi ipsum optio rem consequatur sint fugit? Facere, dolor. Adipisci voluptates similique, a minus voluptas excepturi? Molestias beatae, nulla fuga voluptatum aliquid harum maxime nam. Odit necessitatibus dolorem saepe dicta, blanditiis tenetur. Eaque pariatur vel suscipit ab officiis magnam! Laudantium, voluptatibus officia nostrum aliquid aspernatur corrupti laborum quam esse, beatae a sed? Minima reprehenderit veniam doloribus laboriosam error beatae vitae perspiciatis nihil, ullam facere recusandae dolorum officiis quasi nobis consectetur eveniet fugit sapiente temporibus voluptatum repudiandae. Veniam pariatur voluptatibus, corrupti unde reiciendis ab praesentium assumenda nobis, dolorem quas aliquam! Repellat modi illo laboriosam odio accusamus provident deleniti minus, quos quam atque odit! Maxime blanditiis, laborum provident corrupti cupiditate accusamus adipisci impedit animi vitae architecto nesciunt fuga. Nostrum distinctio dolor vitae? Dignissimos et possimus totam nobis, cum illum id ab culpa dicta repellendus? Odio voluptates earum aspernatur necessitatibus atque esse!';
  return <div className='w-[80%] mx-auto'>

    <h1 className="text-3xl font-bold">Podcasts</h1>
    <Podcast title='Asymmetric Podcast' hosts={hosts} links={links} description={description} sourcefile='/song.mp3' img='/ass.png' />
    <Podcast title='Asymmetric Podcast' hosts={hosts} links={links} description={description} sourcefile='/song.mp3' img='/ass.png' />

  </div>
};