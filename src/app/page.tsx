export default function Home() {

  return (

    <main className="min-h-screen bg-slate-100">


      {/* HERO */}

      <section className="
        mx-auto
        max-w-7xl
        px-8
        py-20
        text-center
      ">


        <h1 className="
          text-5xl
          font-bold
          tracking-tight
          text-slate-900
        ">
          Your Career Search,
          <br />
          Organized in One Place.
        </h1>



        <p className="
          mx-auto
          mt-6
          max-w-2xl
          text-lg
          text-slate-600
        ">
          Career Nook helps you manage job applications,
          professional contacts, tasks, and career materials
          from one powerful dashboard.
        </p>



        <div className="mt-8 flex justify-center gap-4">


          <a
            href="/jobs"
            className="
              rounded-lg
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              hover:bg-blue-700
            "
          >
            Start Tracking Jobs
          </a>



          <a
            href="/tasks"
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-6
              py-3
              font-semibold
              text-slate-700
              hover:bg-slate-50
            "
          >
            Manage Tasks
          </a>


        </div>


      </section>





      {/* FEATURES */}


      <section className="
        mx-auto
        max-w-7xl
        px-8
        py-16
      ">


        <h2 className="
          text-center
          text-3xl
          font-bold
        ">
          Everything You Need For Your Career Search
        </h2>




        <div className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
        ">



          <FeatureCard

            title="Job Tracking"

            description="Track applications, interviews, offers, and opportunities."

          />



          <FeatureCard

            title="Networking"

            description="Manage recruiters, mentors, and professional contacts."

          />



          <FeatureCard

            title="Task Management"

            description="Never miss deadlines, interviews, or follow-ups."

          />



          <FeatureCard

            title="Career Materials"

            description="Organize resumes, cover letters, and portfolios."

          />



        </div>


      </section>





      {/* HOW IT WORKS */}



      <section className="
        bg-white
        px-8
        py-16
      ">


        <div className="
          mx-auto
          max-w-5xl
        ">


          <h2 className="
            text-center
            text-3xl
            font-bold
          ">
            How Career Nook Works
          </h2>



          <div className="
            mt-10
            grid
            gap-8
            md:grid-cols-3
          ">


            <Step

              number="1"

              text="Save your opportunities"

            />


            <Step

              number="2"

              text="Organize your career workflow"

            />


            <Step

              number="3"

              text="Use AI tools to improve"

            />


          </div>


        </div>


      </section>





      {/* AI SECTION */}


      <section className="
        mx-auto
        max-w-5xl
        px-8
        py-16
        text-center
      ">


        <h2 className="
          text-3xl
          font-bold
        ">
          AI Career Assistant Coming Soon
        </h2>


        <p className="
          mt-4
          text-slate-600
        ">
          Future AI features will help improve resumes,
          analyze job descriptions, and generate personalized
          career materials.
        </p>


      </section>


    </main>

  );

}





function FeatureCard({

title,

description

}:{

title:string;

description:string;

}){


return (

<div className="
rounded-xl
border
bg-white
p-6
shadow-sm
">


<h3 className="
text-xl
font-bold
">

{title}

</h3>


<p className="
mt-3
text-slate-600
">

{description}

</p>


</div>

);


}





function Step({

number,

text

}:{

number:string;

text:string;

}){


return (

<div className="
text-center
">


<div className="
mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-blue-600
font-bold
text-white
">

{number}

</div>


<p className="
mt-4
font-medium
">

{text}

</p>


</div>

);


}