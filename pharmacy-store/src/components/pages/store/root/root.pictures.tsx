import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function RootPictures() {
  const images = [
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349760/logo-y-te-suc-khoe-benh-vien_ac7niv.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349849/y-te-4.0-SUNS_wyejb3.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751349949/AI-trong-y-te-FPT-IS-1743578295_sckcwe.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350009/edited-support-ser-555x290-1_cgb6x0.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350134/637667890_izgli5.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350485/image-39_eixdgd.png",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350607/bac-si_ff62511651daab121f1c097ef0fb8d6d_450_300_yz7pty.jpg",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350651/vai-tro-chuyen-doi-so-trong-y-te-1024x576_duxzpk.webp",
    "https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751350684/Chuyen-doi-so-trong-nganh-Y-te-1_hhxsut.jpg",
  ];
  return (
    <div className="relative mx-auto flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-black text-balance text-white md:text-4xl lg:text-6xl flex items-center justify-center gap-3 flex-wrap">
        <span>Sức khỏe của bạn là</span>
        <span className="relative z-20 inline-flex items-center gap-2 rounded-2xl bg-violet-600/60 border border-blue-400/40 px-5 py-1.5 text-white underline decoration-cyan-400 decoration-[6px] underline-offset-[14px] backdrop-blur-md shadow-lg shadow-violet-500/30">
          <motion.div animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <Sparkles className="w-7 h-7 text-cyan-300" />
          </motion.div>
          ưu tiên
        </span>{" "}
        <span>hàng đầu của chúng tôi.</span>
      </h2>

      <div className="absolute inset-0 z-10 h-full w-full bg-slate-950/70 dark:bg-slate-950/80" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
