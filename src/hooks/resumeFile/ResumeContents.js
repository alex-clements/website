import React, {useEffect} from 'react';
import './ResumeFile.css';
import captureAnalytics from '../../scripts/captureAnalytics.js';

export default function ResumeContents(props) {

  useEffect(() => {
    captureAnalytics("resume");
  },[])

  const styleProps = {
    "height": "calc(100%)",
    "width":"100%",
    "backgroundColor": "white"
  }

  return (
    <div className="text-start resume-contents-container font-global px-md-5 px-lg-5 px-xl-5 px-sm-2 px-2 pt-2" style={styleProps}>
      <h1 className="text-center">Resume</h1>
      <br />
      <h3>Education</h3>
      <div className="d-flex justify-content-between">
        <p className="mb-0">Bachelor of Computer Science</p>
        <p className="mb-0">2021 - Present</p>
      </div>
      <p>University of British Columbia, Vancouver, BC</p>

      <div className="d-flex justify-content-between">
        <p className="mb-0">BSc., Petroleum Engineering</p>
        <p className="mb-0">2011 - 2017</p>
      </div>
      <p className="mb-0">University of Alberta, Edmonton, AB</p>
      <p>Awarded 1st Place in the Petroleum Engineering Design Course Competition</p>
      <br />
      <h3>Employment History</h3>

      <h4>Copperleaf Technologies, Vancouver, British Columbia</h4>
      <div className="d-flex justify-content-between">
      <p className="mb-0">Senior Consultant</p>
      <p className="mb-0">Jan 2021 - Aug 2021</p>
      </div>
      <div className="d-flex justify-content-between">
      <p className="mb-0">Consultant</p>
      <p className="mb-0">Jul 2019 - Dec 2020</p>
      </div>
      <div className="d-flex justify-content-between">
      <p>Implementation Consultant</p>
      <p>Nov 2017 - Jun 2019</p>
      </div>
      <ul>
        <li>Performed project management activities for multiple ongoing software implementation projects to manage the schedule, scope, costs, and to drive client engagement</li>
        <li>Coordinated product release activities across development, operations, and QA teams</li>
        <li>Created and executed training plans to ensure client success in the use the software system</li>
        <li>Ran workshop sessions with clients to gather system requirements based on specific business needs</li>
        <li>Prepared specification documents to accurately communicate software system requirements to both the client and internal development teams</li>
        <li>Configured the flagship Copperleaf software system to match documented requirements</li>
        <li>Performed data migration services to transfer data from existing client software systems to the Copperleaf flagship software system</li>
      </ul>

      <h4>Pengrowth Energy, Calgary, Alberta</h4>
      <div className="d-flex justify-content-between">
      <p>Engineering Intern</p>
      <p>Jan 2015 - Aug 2015</p>
      </div>
      <ul>
        <li>Performed Gas Material Balance calculations on several different reservoirs using production, pressure, and gas analysis data collected from GeoScout mapping software</li>
        <li>Created a reservoir model which could accurately predict Original Gas in Place values for low-permeability gas reservoirs by utilizing pressure and production data</li>
        <li>Collected and used production data and PVT analyses to calculate the monthly voidage replacement ratio for a waterflooded reservoir</li>
        <li>Calculated the drainage area for specific wells, which was used to supplement an exploitation study</li>
        <li>Used AccuMap and GeoScout mapping software to create pipeline and infrastructure maps</li>
        <li>Responsible for preparing appropriate lease operating cost statements used in well reviews</li>
        <li>Performed a look-back study on the economic viability of plunger lift installations for a gas field</li>
      </ul>

      <h4>Red River Oil Inc., Calgary, Alberta</h4>
      <div className="d-flex justify-content-between">
      <p>Engineering Student</p>
      <p>May 2013 - Dec 2013</p>
      </div>
      <ul>
        <li>Created cost-tracking spreadsheets for a variety of projects in order to accurately determine current incurrent and spent costs as well as to provide a forecast of overall project costs</li>
        <li>Processed licensing documents for newly drilled and completed wells</li>
        <li>Prepared drilling and completions programs to be sent to the field</li>
        <li>Designed a database to organize information pertaining to well inventory, pump jack speeds, fluid levels, and pump efficiencies</li>
        <li>Collaborated with the productions engineer, construction consultant, surveyors, land company, and provincial government to plan and carry out the construction of a water injecting flow line and injection facility</li>
        <li>Made several trips to the field in order to develop a further understanding of production operations, drilling, and fracking</li>
      </ul>

      <br />

      <h3>Technical & Computer Skills</h3>
      <ul>
        <li>Proficient with Microsoft Word, Excel and PowerPoint</li>
        <li>Knowledgeable in Python, HTML, Javascript, VBA, and C# programming languages</li>
      </ul>

    </div>
  )
}