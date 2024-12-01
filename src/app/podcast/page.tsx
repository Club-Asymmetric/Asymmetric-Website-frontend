// "use client";
// import MusicPlayer from '@/components/MusicPlayer';
// import { FaYoutube, FaSpotify, FaApple} from "react-icons/fa";
// import Link from 'next/link';
// import Image from 'next/image';
// import React, { useRef, useEffect, useState } from 'react';


// interface PropType {
//   title: string;
//   hosts: string[];
//   description: string;
//   links: string[];
//   sourcefile: string;
//   img: string;
// }


// const Podcast: React.FC<PropType> = ({ title, hosts, description, links, sourcefile, img }) =>  {
//     var hostNames = '';
//     hosts.forEach(host => {hostNames += host + ', '})
//     if(hosts.length != 0){
//       hostNames = hostNames.slice(0, hostNames.length - 2);
//     }
//     const [spotifyLink, youTubeLink, appleLink] = links;
//     const [isVisible, setIsVisible] = useState(false);
//     const divRef = useRef(null);
  
//     useEffect(() => {
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           setIsVisible(entry.isIntersecting);
//         },
//         {
//           root: null, // viewport
//           threshold: 0.5, // Adjust this threshold to trigger sooner or later
//         }
//       );
  
//       if (divRef.current) {
//         observer.observe(divRef.current);
//       }
  
//       return () => {
//         if (divRef.current) {
//           observer.unobserve(divRef.current);
//         }
//       };
//     }, []);

//     return (
//       <div className={`w-[100%] my-10 bg-gradient-to-br from-blue-950 via-blue-950 to-blue-800 
//         grid grid-cols-1 lg:grid-cols-[1fr_2fr] px-5 py-10 rounded-xl`}>
//           <div className="flex justify-center lg:place-items-center mb-6 lg:mb-0">
//             <Image 
//             src={img} 
//             alt="Logo"  
//             width={250} 
//             height={100}
//             className="w-[200px] lg:w-[250px] hover:scale-105 transition-all duration-300 hover:animate-pulse" 
//             />
//           </div>
//           <div className="flex flex-col gap-4 px-2 lg:px-10">
//             <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
//             <h2 className='font-imprintMTShadow text-sm lg:text-base'>{hostNames}</h2>
//             <p className="text-sm lg:text-base">
//             {description}
//             </p>
//             <h2 className='font-metal text-sm lg:text-base'>Editing by <span className='text-orange-500'>Asymmetric</span></h2>
//             <div className="icons flex flex-cols gap-4 items-center">
//             <Link href={spotifyLink} target='_blank' className="transition-colors">
//               <FaSpotify className="transition-all duration-300 w-4 lg:w-5 h-4 lg:h-5 hover:bg-green-400 rounded-lg" />
//             </Link>
//             <Link href={youTubeLink} target='_blank' className="transition-colors">
//               <FaYoutube className="transition-all duration-300 w-4 lg:w-5 h-4 lg:h-5 hover:bg-red-600 rounded-lg" />
//             </Link>
//             <Link href={appleLink} target='_blank' className="transition-colors">
//               <FaApple className="transition-all duration-300 w-4 lg:w-5 h-4 lg:h-5 hover:bg-gray-400 rounded-lg" />
//             </Link>
//             </div>
//             <MusicPlayer sourceFile={sourcefile} />
//           </div>
//         </div>
//     );
//   }

  
// export default function Podcasts(){

//   const hosts = ['host1', 'host2'];
//   const links = ['https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C', 'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C', 'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C'];
//   const description = 'soluta, explicabo, quam assumenda facilis. Tempore dolor tempora nisi minus inventore explicabo! Sunt facere inventore qui ex molestiae nostrum nulla eligendi omnis minima nam dolorem officia, cupiditate harum aliquam reprehenderit porro officiis ab blanditiis! Accusamus facilis aspernatur, Consequuntur, modi tenetur quo a impedit animi sapiente excepturi ipsum optio rem consequatur sint fugit? Facere, dolor. Adipisci voluptates similique, a minus voluptas excepturi? Molestias beatae, nulla fuga voluptatum aliquid harum maxime nam. Odit necessitatibus dolorem saepe dicta';
  
//   return (
//   <div className='w-[95%] lg:w-[80%] mx-auto'>
//     <h1 className="text-2xl lg:text-3xl font-bold">
//       Podcasts
//     </h1>
//     <Podcast title='Asymmetric Podcast' hosts={hosts} links={links} description={description} sourcefile='/songs/song.mp3' img='/logo/ass.png' />
//     <Podcast title='Asymmetric Podcast' hosts={hosts} links={links} description={description} sourcefile='/songs/song.mp3' img='/logo/ass.png' />
//   </div>)
// };

"use client";
import MusicPlayer from '@/components/MusicPlayer';
import { FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
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

const Podcast: React.FC<PropType> = ({ title, hosts, description, links, sourcefile, img }) => {
  var hostNames = '';
  hosts.forEach(host => { hostNames += host + ', ' })
  if (hosts.length != 0) {
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
    <div
      className={`w-full my-10 bg-gradient-to-br from-blue-950 via-blue-950 to-blue-800 
        grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-8 px-5 sm:px-8 py-10 rounded-xl`}
    >
      <div className="flex justify-center lg:place-items-center mb-6 lg:mb-0">
        <Image
          src={img}
          alt="Logo"
          width={250}
          height={100}
          className="w-[150px] sm:w-[200px] lg:w-[250px] hover:scale-105 transition-all duration-300 hover:animate-pulse"
        />
      </div>
      <div className="flex flex-col gap-4 px-2 lg:px-10">
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold">{title}</h1>
        <h2 className="font-imprintMTShadow text-xs sm:text-sm lg:text-base">{hostNames}</h2>
        <p className="text-xs sm:text-sm lg:text-base">
          {description}
        </p>
        <h2 className="font-metal text-xs sm:text-sm lg:text-base">
          Editing by <span className="text-orange-500">Asymmetric</span>
        </h2>
        <div className="icons flex flex-cols gap-4 items-center">
          <Link href={spotifyLink} target="_blank" className="transition-colors">
            <FaSpotify className="transition-all duration-300 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 hover:bg-green-400 rounded-lg" />
          </Link>
          <Link href={youTubeLink} target="_blank" className="transition-colors">
            <FaYoutube className="transition-all duration-300 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 hover:bg-red-600 rounded-lg" />
          </Link>
          <Link href={appleLink} target="_blank" className="transition-colors">
            <FaApple className="transition-all duration-300 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 hover:bg-gray-400 rounded-lg" />
          </Link>
        </div>
        <MusicPlayer sourceFile={sourcefile} />
      </div>
    </div>
  );
}

export default function Podcasts() {
  const hosts = ['host1', 'host2'];
  const links = [
    'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C',
    'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C',
    'https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C'
  ];
  const description = 'soluta, explicabo, quam assumenda facilis. Tempore dolor tempora nisi minus inventore explicabo!';
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto">
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">Podcasts</h1>
      <Podcast
        title="Asymmetric Podcast"
        hosts={hosts}
        links={links}
        description={description}
        sourcefile="/songs/song.mp3"
        img="/logo/ass.png"
      />
      <Podcast
        title="Asymmetric Podcast"
        hosts={hosts}
        links={links}
        description={description}
        sourcefile="/songs/song.mp3"
        img="/logo/ass.png"
      />
    </div>
  );
};
