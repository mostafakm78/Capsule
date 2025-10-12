'use client';

import { useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamically import the Card (Swiper) to avoid SSR issues with window/DOM APIs
const Card = dynamic(() => import('./Card'), { ssr: false });

// Minimal API surface we need from the Swiper instance
type SwiperApi = {
  slidePrev: () => void;
  slideNext: () => void;
};

// Register GSAP plugins once for this module
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Testimonials() {
  // Holds Swiper API instance exposed by <Card />
  const [swiperApi, setSwiperApi] = useState<SwiperApi | null>(null);
  // Track if the carousel is at the beginning to dim the "Prev" arrow
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  // Track if the carousel is at the end to dim the "Next" arrow
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useGSAP(() => {
    // Animate right-side text blocks into view on scroll
    gsap.fromTo(
      '.section-right',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: { trigger: '.section-right', start: 'top 80%' },
      }
    );

    // Fade in left-side (carousel) container on scroll
    gsap.fromTo(
      '.section-left',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        delay: 0.2,
        scrollTrigger: { trigger: '.section-left', start: 'top 80%' },
      }
    );
  }, []);

  return (
    // Root region for the testimonials area with an accessible name
    <section aria-label="تجربه کاربران" className="flex mb-16 px-4 md:px-6 lg:px-10 justify-center lg:mt-44 mt-20 items-center">
      {/* Two-column responsive layout: left (copy/controls) + right (carousel) */}
      <section className="flex lg:flex-row flex-col gap-10 justify-center items-center">
        {/* Introductory copy and local controls for the testimonials */}
        <article className="w-full space-y-6">
          {/* Heading row with decorative icon and section title */}
          <header className="section-right flex items-center">
            <svg className="text-foreground lg:ml-4 lg:flex hidden mt-2" width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="24" r="10" fill="currentColor"></circle>
              <circle cx="30" cy="13" r="7" fill="currentColor" fillOpacity="0.4"></circle>
              <circle cx="15" cy="4" r="4" fill="currentColor" fillOpacity="0.7"></circle>
            </svg>
            <h4 className="lg:text-4xl text-center lg:text-right text-2xl md:text-3xl font-kalmeh mx-auto lg:mx-0 text-foreground">شما در مورد کپسول چی گفتین ؟</h4>
          </header>

          {/* Short description/subtitle for the testimonials section */}
          <p className="section-right lg:text-xl text-sm md:text-base text-foreground/70 lg:w-2/3 w-full lg:mr-14 mx-auto">بخش کوچیکی از نظرات کاربرای کپسول درباره تجربه ای که اینجا داشتن</p>

          {/* Local navigation for the testimonial carousel (prev/next controls + decorative SVGs) */}
          <nav aria-label="گردش بین نظرات" className="section-right flex items-center w-2/3 justify-between lg:text-xl text-2xl text-foreground/70 lg:mr-14 mx-auto">
            {/* Arrow controls that call the Swiper API exposed by <Card /> */}
            <div className="flex gap-3">
              {/* Prev arrow; visually dimmed when at the beginning */}
              <BiSolidRightArrow onClick={() => swiperApi?.slidePrev()} className={`cursor-pointer ${isBeginning ? 'opacity-50' : ''}`} />
              {/* Next arrow; visually dimmed when at the end */}
              <BiSolidLeftArrow onClick={() => swiperApi?.slideNext()} className={`cursor-pointer ${isEnd ? 'opacity-50' : ''}`} />
            </div>

            {/* Decorative squiggle (desktop) */}
            <svg className="text-foreground/60 transform hidden lg:block lg:rotate-0" width="81" height="25" viewBox="0 0 81 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M29.1967 14.3986C25.5868 13.9847 22.0069 13.342 18.4784 12.4745C16.792 12.0466 12.2026 11.5965 11.3659 10.0623C14.4789 9.24078 17.802 9.66713 20.9105 8.43793C22.2549 7.90469 24.0976 7.15477 24.3908 5.52325C24.8311 3.10397 22.5994 3.77298 21.0294 3.94254C17.6692 4.3178 14.1955 4.26364 10.8129 4.37265C8.21636 4.45288 2.1991 3.36004 0.75924 6.3001C-0.680619 9.24016 3.70799 12.3632 5.54259 14.087C8.50795 16.9111 11.4369 19.7705 14.422 22.5651C15.2426 23.339 16.7726 25.1362 18.1266 24.8437C19.9916 24.4238 19.3821 22.6707 18.7377 21.448C18.3268 20.6539 12.3485 13.2275 12.3318 13.2334C12.9125 13.059 16.0756 14.503 16.5971 14.6724C18.7851 15.3399 21.0082 15.8863 23.2564 16.3091C29.1409 17.505 35.2798 18.8366 41.3307 18.5846C44.1562 18.4613 46.2644 17.4415 48.7901 16.4024C51.1811 15.4181 53.2468 16.8916 55.7475 17.5098C60.9531 18.7403 66.3814 18.6725 71.5546 17.3125C75.0607 16.4128 83.0583 13.2526 79.9898 8.14036C79.1913 6.81046 77.6537 5.8984 77.713 7.71002C77.7492 8.94395 78.6421 9.14417 78.0975 10.5525C77.6207 11.4769 76.8129 12.1875 75.8353 12.5428C71.3525 14.7964 64.9792 15.3272 60.1138 14.7865C58.2671 14.554 54.5964 13.8444 53.1131 12.6278C51.7956 11.5519 52.7224 10.088 52.4922 8.17502C51.8776 3.22806 46.3507 -1.37941 41.1423 0.48748C33.6157 3.20407 42.2988 11.4021 45.8298 13.4113C42.1694 16.6785 33.3853 14.926 29.1967 14.3986ZM44.3831 4.04077C48.1118 4.66985 49.1864 7.04037 48.6529 10.4538C47.4697 9.70609 38.6072 3.3136 44.3831 4.04077C45.0235 4.15333 43.8802 3.97745 44.3831 4.04077Z"
                fill="currentColor"
              ></path>
            </svg>

            {/* Decorative path (mobile) */}
            <svg className="text-foreground/70 h-[70px] lg:hidden" width="98" height="129" viewBox="0 0 98 129" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M47.029 72.7354C50.0557 71.6329 52.8873 70.0549 55.4172 68.061C57.918 66.0579 60.1214 63.7096 61.9613 61.0864C63.8091 58.5597 65.3461 55.8197 66.5391 52.9257C67.7364 50.0386 68.4208 46.9647 68.5614 43.8423C68.6206 42.2624 68.4539 40.6823 68.0664 39.1495C67.6842 37.5558 66.9595 36.0643 65.9428 34.7789C64.7806 33.3631 63.1784 32.3767 61.3909 31.9766C59.5532 31.6118 57.6498 31.7712 55.8983 32.4365C55.0759 32.7319 54.2792 33.094 53.5159 33.5193C52.8228 33.9419 52.1521 34.4002 51.5067 34.8924C50.8464 35.3833 50.2154 35.9122 49.6168 36.4767L48.7047 37.3268L47.9174 38.176C45.9117 40.3826 44.1355 42.7873 42.6161 45.3531C41.0832 47.8361 39.9117 50.5248 39.1369 53.3382C38.4021 56.0043 38.062 58.7636 38.1276 61.5283L38.1352 62.5269L38.2181 63.5108C38.2949 64.1638 38.3506 64.8288 38.426 65.4547C38.6641 66.713 38.8388 68.0071 39.1613 69.2176C39.3611 69.9404 39.5715 70.6571 39.797 71.3514C39.1183 71.4567 38.4336 71.5514 37.7521 71.6025C35.0578 71.8377 32.3439 71.7042 29.6857 71.2059C27.1472 70.7067 24.7021 69.8151 22.4382 68.5631C18.1815 66.0403 14.5592 62.5759 11.8492 58.4358C9.29381 54.5665 7.28986 50.3601 5.89515 45.9379C4.59231 41.9013 3.61834 37.7659 2.98278 33.5722C2.37826 29.925 2.02126 26.2411 1.91425 22.5457C1.70973 17.104 2.3983 11.6657 3.9526 6.44679C5.16315 2.72557 6.29982 0.745502 6.07447 0.691869C5.84913 0.638235 5.6891 1.11877 5.13313 2.03216C4.35997 3.37851 3.68579 4.77932 3.11593 6.22352C1.15449 11.494 0.148942 17.0721 0.146538 22.6957C0.0827322 30.8741 1.20309 39.0187 3.47277 46.8761C4.84019 51.5314 6.86593 55.9674 9.48854 60.0495C12.359 64.5675 16.2315 68.3638 20.8056 71.144C23.3087 72.5646 26.0167 73.5892 28.8333 74.1813C31.7991 74.7897 34.8346 74.9853 37.8539 74.7626C38.8963 74.7008 39.9342 74.5788 40.9626 74.3974C42.0487 77.0395 43.365 79.5811 44.8961 81.9928C49.0382 88.373 54.1048 94.1027 59.9301 98.9944C64.1151 102.568 68.5796 105.8 73.2808 108.66C78.4719 111.87 83.9951 114.51 89.7538 116.532C90.4657 116.756 91.0559 116.938 91.5846 117.085L89.8096 117.517C87.9185 118.016 86.1129 118.591 84.4109 119.178C81.4044 120.241 78.4811 121.526 75.6654 123.024C70.8732 125.609 68.3039 127.814 68.5339 128.171C68.7639 128.529 71.7657 127.137 76.6077 125.207C79.0452 124.246 81.9645 123.152 85.2533 122.17C86.8948 121.673 88.6234 121.183 90.4314 120.76C91.3377 120.539 92.2605 120.324 93.2012 120.14C93.6785 120.024 94.0938 119.97 94.7849 119.788C95.6863 119.554 96.4869 119.033 97.0653 118.303C97.3671 117.906 97.5841 117.452 97.7028 116.967C97.7854 116.588 97.8184 116.199 97.8012 115.811C97.7666 115.238 97.6738 114.67 97.5245 114.115C97.2833 113.221 97.0481 112.337 96.8248 111.474C96.3407 109.756 95.8652 108.103 95.4151 106.519C94.4514 103.387 93.4861 100.645 92.63 98.3437C90.8863 93.7582 89.4203 90.9936 88.9623 91.169C88.5044 91.3445 89.0609 94.3727 90.2022 99.1736C90.8155 101.613 91.4858 104.423 92.2553 107.582L93.4801 112.53C93.6928 113.399 93.9055 114.268 94.1136 115.153L94.1554 115.227C93.4908 114.864 92.5499 114.408 91.1826 113.788C85.8335 111.319 80.6587 108.489 75.6942 105.317C71.2264 102.459 66.9737 99.2775 62.9701 95.7986C57.4752 91.1225 52.6808 85.6811 48.7339 79.6412C47.4482 77.6274 46.327 75.5132 45.3812 73.3191C45.9369 73.1441 46.4926 72.9692 47.0409 72.7565L47.029 72.7354ZM43.4862 67.8998C43.1601 66.8307 43.0267 65.7082 42.7956 64.5853C42.7124 64.0195 42.6833 63.4509 42.6107 62.8791L42.5228 62.0095L42.5221 61.1462C42.4528 58.7661 42.7319 56.3886 43.3504 54.0892C44.0065 51.6603 45.0047 49.337 46.315 47.1891C47.665 44.8794 49.2338 42.7048 50.9997 40.6951L51.6783 39.9492L52.3986 39.2772C52.8665 38.8172 53.3632 38.3874 53.8856 37.9904C54.3858 37.6017 54.9076 37.2415 55.4484 36.9115C55.9708 36.6141 56.5172 36.361 57.0819 36.1548C58.0155 35.7022 59.0732 35.5735 60.0881 35.7891C61.1029 36.0046 62.017 36.5521 62.6861 37.3451C64.0769 39.295 64.7488 41.6667 64.5873 44.0563C64.4873 46.7312 63.924 49.3685 62.9226 51.8509C61.88 54.4673 60.5227 56.9469 58.8806 59.2351C57.2951 61.5697 55.386 63.6671 53.2105 65.4645C51.0022 67.2219 48.5304 68.6198 45.8864 69.6068C45.3169 69.8314 44.7296 70.0243 44.1633 70.2053C43.902 69.4477 43.6558 68.6676 43.4234 67.8379"
                fill="currentColor"
              ></path>
            </svg>
          </nav>
        </article>

        {/* Carousel column: contains the Card component which renders the Swiper with slides */}
        <section className="section-left w-full relative after:content-[''] after:absolute after:h-full after:w-full after:bg-foreground/15 after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:blur-3xl">
          {/* Card will set Swiper API (for the arrows) and report boundary states */}
          <Card setSwiperApi={setSwiperApi} isEnd={setIsEnd} isBegining={setIsBeginning} />
        </section>
      </section>
    </section>
  );
}
