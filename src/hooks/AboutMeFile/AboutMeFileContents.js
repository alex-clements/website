import React from 'react';
import './AboutMe.css';
import seymourPic from '../../data/SeymourPic.jpg';

export default function AboutMeFileContents(props) {

    /**
     * Style props for the image in the component.
     */
    const imageStyle={
        "width" : "100%",
        "height" : "auto",
        "marginBottom": "10px",
    }

    return (
        <div className="about-me-main px-md-5 px-lg-5 px-xl-5 px-sm-2 px-2 pt-2 text-start font-global">
            <h3 className="text-center">About Me</h3>
            <p className="">Hey, I'm Alex. I'm a Computer Science student at the University of British Columbia.</p>
            
            <p className="">This is my second degree now. My first was in Petroleum Engineering at the University of Alberta. After graduating, 
            I worked as a consultant at a software company called Copperleaf Technologies, based in Vancouver. Copperleaf provided me with many 
            opportunities for professional development. I had a great time there and worked with so many fantastic people and clients. Along the 
            way, I realized that I had a passion for coding, and decided to take the leap and head back to school to pursue software engineering 
            in the next stage in my career.</p>

            <p className="">I'm in my second semester back in school now, with three more to go afterwards. So far I've finished courses 
            in Computation, Programs and Programming (CPSC 110), Models of Computation (CPSC 121), and Object-Oriented Programming 
            (CPSC 210). I'm now in Introduction to Computer Systems (CPSC 213) and Basic Algorithms and Data Structures (CPSC 221). These 
            courses have proven to be challenging, but very interesting and rewarding. Even one and a half semesters in, I already feel 
            like I've made a lot of progress in becoming a better software developer.</p>

            <p className="">Outside of school, I've been keeping busy with a few different personal projects. I made this website, 
            modelled after Windows 95. I liked the idea of having a place to showcase some of my work and show off a bit about myself. 
            I also made an app called Spacestagram, which is an app like Instagram that grabs pictures from NASA and shows them off. 
            It's been embedded into this site! If you're reading this, you should check it out. In one hackathon, my teammate and I 
            made a Chrome extension that lets users navigate web pages using the arrow keys. We thought that this was cool vs. just being 
            able to use the tab key to focus through websites. In another hackathon, my group created an app that lets you write code 
            by talking in full sentences to the computer. We called it SpeechScript, and it was probably one of the more technical apps 
            that I've worked on so far. To make it we used the Microsoft Azure Speech Services API and the OpenAI Codex API.</p>

            <p className="">When I'm not working on personal projects, assignments, or studying for exams, I like to go mountain 
            biking on Vancouver's North Shore, or skiing up in Whistler. The environment around Vancouver is surreal. There's a picture
            below that I took while biking one afternoon.</p>

            <p className="">Anyways, I hope you enjoy checking out the site!</p>

            <p className="">Alex</p>

            <img style={imageStyle} src={seymourPic} />
            
        </div>
    )


}