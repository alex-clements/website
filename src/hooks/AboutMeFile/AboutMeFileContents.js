import React, { useEffect } from "react";
import "./AboutMe.css";
import seymourPic from "../../data/SeymourPic.jpg";
import captureAnalytics from "../../scripts/captureAnalytics";

export default function AboutMeFileContents(props) {
  /**
   * Style props for the image in the component.
   */
  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  };

  useEffect(() => {
    captureAnalytics("about me");
  }, []);

  return (
    <div className="about-me-main px-md-5 px-lg-5 px-xl-5 px-sm-2 px-2 pt-2 text-start font-global">
      <h3 className="text-center">About Me</h3>
      <p className="">
        Hey, I'm Alex. I'm a Computer Science student at the University of
        British Columbia.
      </p>

      <p className="">
        This is my second degree now. My first was in Petroleum Engineering at
        the University of Alberta. After graduating, I worked as a consultant at
        a software company called Copperleaf Technologies, based in Vancouver.
        Copperleaf provided me with many opportunities for professional
        development. I had a great time there and worked with so many fantastic
        people and clients. Along the way, I realized that I had a passion for
        coding, and decided to take the leap and head back to school to pursue
        software engineering in the next stage in my career.
      </p>

      <p className="">
        I've completed two and a half semesters in school now. So far I've
        finished courses in Computation, Programs and Programming (CPSC 110),
        Models of Computation (CPSC 121), Object-Oriented Programming (CPSC
        210), Introduction to Computer Systems (CPSC 213), and Basic Algorithms
        and Data Structures (CPSC 221). These courses have proven to be
        challenging, but very interesting and rewarding. Even this far in, I
        already feel like I've made lots of progress towards becoming a better
        software engineer.
      </p>

      <p className="">
        I'm recently completed a Software Engineering co-op at Workday, Inc. out
        of the office in Vancouver, British Columbia. It was my first position
        as a software engineer, and I loved it. There's been a lot to learn
        getting up to speed on all the processes required for software
        development in a professional environment. I hadn't ever realized just
        how much effort was involved in testing, code reviews, and planning for
        new features. It's been a great learning experience for sure!
      </p>

      <p className="">
        Outside of school and work, I've been keeping busy with a few different
        personal projects. I made this website, modelled after Windows 95. I
        liked the idea of having a place to showcase some of my work and show
        off a bit about myself. I also made an app called Spacestagram, which is
        an app like Instagram that grabs pictures from NASA and shows them off.
        It's been embedded into this site! If you're reading this, you should
        check it out. In one hackathon, my group created an app that lets you
        write code by talking in full sentences to the computer. We called it
        SpeechScript. To make it we used the Microsoft Azure Speech Services API
        and the OpenAI Codex API.
      </p>

      <p className="">
        The project that I'm working on now is called Cosmocam. It's a video
        streaming website that will allow users to log in, and stream video from
        any and all computers in their home to a central server. Users can then
        log into the web site from their phone and view all their streams
        simultaneously to see what's going on. I got the idea when my partner's
        pet camera broke. I thought this would be a cool opportunity to try
        creating a streaming app of my own as a replacement! One of the
        shortcomings of the pet camera was that it only captured one angle at a
        time. When Cosmo, her Basset Hound, walked out of view, it wasn't
        possible to see where he was anymore. With Cosmocam, the benefit will be
        that you can capture multiple camera angles and view them all to check
        in on your pet.
      </p>

      <p className="">
        When I'm not working on personal projects, assignments, or studying for
        exams, I like to go mountain biking on Vancouver's North Shore, skiing
        up in Whistler, and playing with Cosmo. The environment around Vancouver
        is surreal. There's a picture below that I took while biking one
        afternoon.
      </p>

      <p className="">Anyways, I hope you enjoy checking out the site!</p>

      <p className="">Alex</p>

      <img alt={"Mount Seymour"} style={imageStyle} src={seymourPic} />
    </div>
  );
}
