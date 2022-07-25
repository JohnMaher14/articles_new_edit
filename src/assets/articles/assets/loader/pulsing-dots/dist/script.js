const stagger = 0.115;
const duration = 0.5;

const tl = gsap.
timeline({
  repeat: -1,
  repeatDelay: 1,
  defaults: {
    stagger,
    duration } })


// hadnle dot shrink and blur
.to(".dot", {
  filter: "blur(2px)",
  scale: 0.65,
  yPercent: 50,
  ease: "power2.out" })

// reset dot shrink and blur
.to(
".dot",
{
  filter: "blur(0px)",
  scale: 1,
  yPercent: 0,
  ease: "power2.in" },

">-=0.4")

// hadnle dot grow and blur
.to(
".dot",
{
  filter: "blur(6px)",
  scale: 1.5,
  yPercent: -40,
  ease: "power2.out" },

">-=0.31")

// reset dot grow and blur
.to(
".dot",
{
  scale: 1,
  yPercent: 0,
  filter: "blur(0px)",
  ease: "power2.out" },

`>-=${duration}`);