import { images } from "../assets/assets"
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const ImageSection = () => {

    const containerRef = useRef(null)

    useGSAP(() => {
        const items = gsap.utils.toArray(".img-con")

        gsap.set(items, {
            opacity: 0,
            scale: 0,
            filter: "blur(15px)"
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
            }
        })

        tl.to(items, {
            keyframes: [
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: "power2.out"
                },
                {
                    opacity: 1,
                    scale: 1.05,
                    duration: 0.4
                },
                {
                    opacity: 0,
                    scale: 1.5,
                    duration: 0.7,
                    ease: "power2.in"
                }
            ],
            stagger: {
                amount: 2,
                from: "start"
            }
        })

        tl.to(".hero-text", {
            scale: 1.1,
            duration: 2,
        }, 0)


    }, { scope: containerRef })

  return (
    <section
        ref={containerRef}
        className="relative h-screen w-screen overflow-hidden bg-amber-100 flex items-center justify-center"
    >
        <div
            className="absolute inset-0 pointer-events-none"
        >
            {
                images.map((item, index) => (
                    <div
                        key={index}
                        className="img-con absolute z-10"
                        style={{
                            top: item.top,
                            left: item.left
                        }}
                    >
                        <img 
                            style={{
                                display: "block",
                                width: "auto",
                                height: "auto",
                                maxWidth: "25vw",
                                maxHeight: "30vh",
                                objectFit: "contain",
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                backgroundColor: "transparent"
                            }}
                            src={item.image} alt="" />

                    </div>
                ))
            }
        </div>

        <div
            className="hero-text"
            style={{
                zIndex: 20,
                textAlign: "center",
                color: "#000",
                padding: "0 20px"
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(2rem , 5vw, 5rem)",
                    fontWeight: "900",
                    lineHeight: "0.9",
                    margin: 0,
                    textTransform: "uppercase"
                }}
            >
                Mass Production with <br /> Artisanal-Level Quality.
            </h1>

        </div>
    </section>
  )
}
