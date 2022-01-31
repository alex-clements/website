import React, {useEffect} from 'react';
import './AboutMe.css';
import seymourPic from '../../data/SeymourPic.jpg';
import captureAnalytics from '../../scripts/captureAnalytics.js';

export default function AboutMeFileContents(props) {

    useEffect(() => {
        captureAnalytics("about me");
    }, [])

    const imageStyle={
        "width" : "100%",
        "height" : "auto"
    }

    return (
        <div className="about-me-main px-md-5 px-lg-5 px-xl-5 px-sm-2 px-2 text-start font-global">
            <h3 className="text-center">About Me</h3>
            <p className="">Hey, I'm Alex. I'm currently a student in Computer Science at the University of British Columbia.</p>
            <p className="">When I'm not working on projects or assignments, I like to go mountain biking over on Vancouver's North Shore and skiing - either up in Whistler
                or somewhere in interior BC. </p>
            <p className="">There's a picture of my girlfriend's dog Cosmo on the site. He's a floppy Basset Hound, and the best boy in the world.  
            I don't really have many other pictures, but here's a pretty one that I took at Mt. Seymour
            while biking one day!</p>
            <img style={imageStyle} src={seymourPic} />
            
        </div>
    )


}