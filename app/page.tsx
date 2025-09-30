import Hero from "@/components/home/hero";

export default function Home() {
  return (<>
    {/* Hero section */}   
      <Hero />
     {/* Section One */}
      <section 
        id="section-1" 
        className="h-screen flex flex-col items-center justify-center bg-background"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground">Section One</h1>
          <p className="mt-4 text-lg text-foreground/70">
            Scroll down to test the sticky header and footer.
          </p>
        </div>
      </section>

      {/* Section Two */}
      <section 
        id="section-2" 
        className="h-screen flex flex-col items-center justify-center bg-muted"
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold text-foreground">Section Two</h2>
          <p className="mt-4 text-lg text-foreground/70">
            The header should now be sticky with a blurred background.
          </p>
        </div>
      </section>

      {/* Section Three */}
      <section 
        id="section-3" 
        className="h-screen flex flex-col items-center justify-center bg-background"
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold text-foreground">Section Three</h2>
          <p className="mt-4 text-lg text-foreground/70">
            The footer will appear at the end of this section.
          </p>
        </div>
      </section>
  </>);
}
