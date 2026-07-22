export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f9ff] text-slate-950">


      {/* HERO */}

      <section className="
        relative
        overflow-hidden
      ">


        <div className="
          absolute
          right-0
          top-10
          h-[450px]
          w-[450px]
          bg-blue-200/40
          blur-3xl
        "/>


        <div className="
          absolute
          left-0
          bottom-0
          h-[300px]
          w-[300px]
          bg-sky-200/30
          blur-3xl
        "/>



        <div className="
          relative
          mx-auto
          max-w-7xl
          px-8
          pt-20
          pb-16
        ">

          <h1 className="
            mt-6
            max-w-5xl
            text-6xl
            md:text-7xl
            font-bold
            leading-[1.05]
            tracking-tight
          ">

            Your career search,
            <br />
            organized intelligently.

          </h1>



          <p className="
            mt-6
            max-w-2xl
            text-lg
            leading-relaxed
            text-slate-600
          ">

            Manage applications, tasks, contacts,
            materials, and AI career tools in one
            professional workspace.

          </p>



          <div className="
            mt-9
            flex
            gap-5
          ">


            <a
              href="/signup"
              className="
                bg-blue-600
                px-9
                py-4
                text-white
                font-semibold
                shadow-xl
                shadow-blue-200
                hover:bg-blue-700
                transition
              "
            >
              Start Tracking
            </a>



            <a
              href="/copilot"
              className="
                border
                border-blue-200
                bg-white
                px-9
                py-4
                font-semibold
                hover:border-blue-500
                hover:text-blue-600
                transition
              "
            >
              Explore Copilot
            </a>


          </div>


        </div>


      </section>







      {/* FEATURES */}


      <section
        id="features"
        className="
          mx-auto
          max-w-7xl
          px-8
          pt-8
          pb-12
        "
      >


        <div className="mb-8">

          <h2 className="
            mt-3
            text-4xl
            font-bold
            tracking-tight
          ">
            Everything you need for your career search.
          </h2>



          <p className="
            mt-3
            max-w-xl
            text-slate-600
          ">
            A single workspace to manage applications,
            workflow, and professional growth.
          </p>


        </div>





        <div className="
          grid
          gap-5
          md:grid-cols-2
        ">


          <FeatureCard
            number="01"
            title="Job Applications"
            text="Track every opportunity from saved to offer with deadlines, interviews, notes, and progress."
          />



          <FeatureCard
            number="02"
            title="Career Materials"
            text="Organize resumes, cover letters, portfolios, and important career documents."
          />



          <FeatureCard
            number="03"
            title="Networking"
            text="Manage recruiters, mentors, referrals, and professional conversations."
          />



          <FeatureCard
            number="04"
            title="Nook Copilot"
            text="Optimize resumes, generate cover letters, and analyze opportunities with AI."
          />


        </div>


      </section>







      {/* CTA */}


      <section className="
        bg-white
        border-t
        border-blue-100
        px-8
        py-14
        text-center
      ">


        <h2 className="
          text-4xl
          md:text-5xl
          font-bold
          tracking-tight
        ">
          Build your career workspace today.
        </h2>



        <p className="
          mt-4
          text-slate-600
        ">
          Keep your applications, materials, and career growth organized.
        </p>



        <a
          href="/signup"
          className="
            inline-block
            mt-7
            bg-blue-600
            px-10
            py-4
            text-white
            font-semibold
            shadow-xl
            shadow-blue-200
            hover:bg-blue-700
            transition
          "
        >
          Create Account
        </a>


      </section>


    </main>
  );
}







function FeatureCard({
  number,
  title,
  text
}:{
  number:string;
  title:string;
  text:string;
}){


return (

<div className="
group
relative
overflow-hidden
border
border-blue-300/30
bg-[#172554]
p-7
text-white
transition
hover:-translate-y-1
hover:shadow-xl
hover:shadow-blue-300/20
">


<div className="
absolute
right-0
top-0
h-32
w-32
bg-blue-400/20
blur-3xl
"/>



<div className="
relative
flex
h-10
w-10
items-center
justify-center
bg-blue-500
font-bold
">

{number}

</div>





<h3 className="
mt-6
text-2xl
font-bold
">

{title}

</h3>




<p className="
mt-3
text-blue-100
leading-relaxed
">

{text}

</p>



<div className="
mt-5
text-sm
font-semibold
text-blue-300
">

Learn more →

</div>



</div>

);

}