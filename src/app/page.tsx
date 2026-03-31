import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Industry } from "@/components/industry";
import { Building } from "@/components/building";
import { Founders } from "@/components/founders";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Industry />
      <Building />
      <Founders />
      <Footer />
    </main>
  );
}
