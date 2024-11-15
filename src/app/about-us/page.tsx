'use client';

import ColorText from "@/components/ColorText";
import TypingHeader from "@/components/TypingHeader";

const heading=[
  { text: "Vision", showLine: true },
  { text: "Mission", showLine: true },
  { text: "Asymmetric" }
]

export default function AboutUs() {
  return (
    <div className="">
      <div className="font-bold text-4xl flex justify-center mb-8 hover:animate-pulse hover:scale-x-125 cursor-pointer transition-all duration-300">
        <h1>About Us</h1>
      </div>
      <section className="h-fit w-fit mx-auto bg-gradient-to-br from-blue-950 via-blue-950 to-blue-800 text-white p-16 rounded-2xl flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10">
          {/* Title */}
          <TypingHeader items={heading} delay={500} duration={300}/>

          {/* Subtitle */}
          <div className="text-xl font-semibold transition-all duration-200">
            <ColorText text="Build. Streamline your development" interval={50}/>
          </div>
          {/* Try to add Some Animation using Framer Motion */}
          {/* Main Content */}
          <div className="max-w-4xl text-white leading-relaxed">
            We're on a mission to transform the way people work together by helping them collaborate better. 
            Faster. On everything. From anywhere. solid foundation for your application while ensuring adaptability 
            to future need, with this template that looks effortlessly on-point in the conference, consultations, 
            courses, event, exhibition, landing page, meeting, responsive, seminar, startup etc. With all, it features 
            you can build something greater. It is ultimate flexible with loads of nice options and features.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eum reiciendis enim voluptatem illo inventore suscipit id. Dolores expedita voluptates odit aspernatur eum aliquid, quos sequi facere harum quidem. Nesciunt.
            Aperiam dolore sequi ea, provident odit qui, mollitia facere dicta asperiores esse explicabo quasi in rem quaerat aliquid veniam neque laborum. Temporibus numquam ducimus natus veritatis, distinctio nemo dicta molestias.
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}