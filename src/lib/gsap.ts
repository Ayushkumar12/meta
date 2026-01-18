import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/all";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, Flip, MotionPathPlugin);
  CustomEase.create("premium", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1");
}

export * from "gsap";
export { ScrollTrigger, CustomEase, Flip, MotionPathPlugin };
export default gsap;
