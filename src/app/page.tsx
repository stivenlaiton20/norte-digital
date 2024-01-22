import { Label } from "@/components/core/label";
//import Navbar from "../components/Navbar/Navbar";
import { Input } from "@/components/core/input";
import Link from "next/link";
import Image from "next/image";
import content1 from "../../public/content1.png";
export default function Home() {
  return (
    <main>
      <header
        //style="background-size: 50%"
        className=" bg-[url('../../public/icon-login.png')] h-screen bg-contain  bg-right bg-no-repeat  "
      >
        {/*<Navbar /> */}
        <div className="flex m-0 m-auto w-4/5">
          <div className="pt-56">
            <div>
              <h2 className="w-2/5 text-7xl font-extrabold">
                Lorem ipsum Design
              </h2>
            </div>
            <div className="w-2/5 pt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit modi
              nostrum error eius labore laborum nihil iusto, neque dolor
              maiores, accusantium, placeat nesciunt. Velit laboriosam error
              quae nam labore officiis.
            </div>
            <div className="pt-20">
              <Link href={"private/dashboard"}>
                <button className="pt-3 pl-10 pr-10 pb-3  bg-[#2196f3] rounded-no  text-white ">
                  <span className="font-extrabold">LOGIN</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="flex m-0 m-auto w-4/5">
        <div className="pt-56">
          <div>
            <h2 className="w-2/5 text-7xl font-extrabold">Content 1</h2>
          </div>
          <div className="w-1/5 pt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit modi
            nostrum error eius labore laborum nihil iusto, neque dolor maiores,
            accusantium, placeat nesciunt. Velit laboriosam error quae nam
            labore officiis.
          </div>
          <div className="grid gap-4 grid-cols-4 grid-rows-1">
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
      </section>
      <section className=" bg-[url('../../public/bg-content3.png')] min-h-screen bg-cover   bg-no-repeat ">
        <div className="flex m-0 m-auto w-4/5 ">
          <div className="flex flex-col items-end pt-10">
            <div>
              <h2 className="w-2/5 text-7xl font-extrabold">Content 2</h2>
            </div>
            <div className="w-1/5 pt-8 mr-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit modi
              nostrum error eius labore laborum nihil iusto, neque dolor
              maiores, accusantium, placeat nesciunt. Velit laboriosam error
              quae nam labore officiis.
            </div>
          </div>
        </div>
        <div className=" m-0 m-auto w-4/5 ">
          <div className="grid gap-10 grid-cols-3 grid-rows-1 pt-16 justify-center">
            <div className="mx-auto">
              <Image
                src="/content3-1.png"
                alt="article"
                width={350}
                height={550}
              />
            </div>
            <div className="mx-auto">
              <Image
                src="/content3-2.png"
                alt="article"
                width={350}
                height={550}
              />
            </div>
            <div className="mx-auto">
              <Image
                src="/content3-1.png"
                alt="article"
                width={350}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
const Article = () => {
  return (
    <div>
      <div className="pt-56">
        <Image src="/content1.png" alt="article" width={250} height={250} />
      </div>
      <div className="w-4/5 pt-8 h-60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit modi
        nostrum error eius labore laborum nihil iusto, neque dolor maiores,
        accusantium, placeat nesciunt. Velit laboriosam error quae nam labore
        officiis.
      </div>
    </div>
  );
};
