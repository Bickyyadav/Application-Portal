import React from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselItem,
  CarouselNext,
} from "../components/ui/carousel";

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
  ];

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((category, index) => (
            <CarouselItem key={index} className="md:basic-1/2 lg:basis-1/3">
              <Button variant="outline" className="rounded-full">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
