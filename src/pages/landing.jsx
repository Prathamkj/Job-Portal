import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
// importing the carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// companies and Autoplay
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
// Importing all the necessary components and styles
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// importing the accordion components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "../data/faq.json";
// 
const LandingPage = () => {
  const { user } = useUser();
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 px-25'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job <span className='flex items-center gap-2 sm:gap-6'>and get<img src='logo.png' alt="Hirrd Logo" className='h-14 sm:h-24 lg:h-32' /></span></h1>
        {/* for the bigger logo and heading */}
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      {/* section ends here */}
      {/* div for finding the jobs */}
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl" className={"cursor-pointer"}>
            Find Jobs
          </Button>
        </Link>

        {user?.publicMetadata?.role === "recruiter" && (
          <Link to={"/post-job"}>
            <Button variant="destructive" size="xl" className={"cursor-pointer"}>
              Post a Job
            </Button>
          </Link>
        )}
      </div>

      {/* Now we are using the Carousel component */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* For Banner */}
      <img src="/banner.jpeg" className="w-full" />
      {/* here we are using the card component for the two sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      {/* End of card section */}
      {/* According -- you will find it in shadcn ui */}
      {/* Here we are rendering all the Faq's from faq.json in data folder */}
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}

export default LandingPage
