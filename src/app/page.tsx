import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { WhoWeServe } from "@/components/who-we-serve";
import { Founders } from "@/components/founders";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <WhoWeServe />
      <Founders />
      <Contact />
      <Footer />
    </main>
  );
}
