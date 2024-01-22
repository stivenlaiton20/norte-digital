import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import icon from "/public/iconLittle.png";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const MainPanel = ({ title }: { title: string }) => (
  <>
    <div className="flex">
      <div className="pr-10 ">
        <Image width={120} alt="icon" src={icon}></Image>
      </div>

      <div className="w-screen pt-11">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <hr className="mt-5"></hr>
      </div>
    </div>
  </>
);
MainPanel.displayName = "MainPanel";
export { MainPanel };
