export default function AboutUs() {
  return (
    <div>
      <div className="font-bold text-3xl flex justify-center mb-5">
        <h1>About Us</h1>
      </div>
      <section className="h-fit w-fit mx-auto bg-gradient-to-br from-blue-950 via-blue-950 to-blue-800 text-white p-16 rounded-2xl flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold">Vision</h2>
              <div className="h-[1px] w-40 bg-white/30"></div>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold">Mission</h2>
              <div className="h-[1px] w-40 bg-white/30"></div>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold">Asymmetric</h2>
            </div>
          </div>

          {/* Subtitle */}
          <div className="uppercase tracking-wider text-base font-light">
            Build. Streamline your development
          </div>

          {/* Main Content */}
          <div className="max-w-3xl text-white text-base leading-relaxed">
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