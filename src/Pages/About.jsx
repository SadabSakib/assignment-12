// import React from 'react';

// const About = () => {
//     return (
//         <div>
//            About
//         </div>
//     );
// };

// export default About;

import React from "react";

const About = () => {
  return (
    <div className="p-8 bg-base-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>

        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-full md:w-1/3">
            <img
              src="developer.jpg"
              alt="Developer"
              className="rounded-full w-48 mx-auto md:mx-0"
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <h3 className="text-2xl font-semibold mb-2">John Doe</h3>
            <p className="text-xl mb-4">
              John is a passionate software developer with a knack for creating
              innovative solutions. With a strong background in full-stack
              development, he has successfully completed multiple projects
              across various domains.
            </p>
            <ul className="list-disc list-inside text-xl">
              <li>Number of projects created: 20</li>
              <li>
                GitHub Repositories:
                <ul className="list-disc list-inside pl-4">
                  <li>
                    <a
                      href="https://github.com/johndoe/project1"
                      className="text-blue-500 hover:underline"
                    >
                      Project 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/johndoe/project2"
                      className="text-blue-500 hover:underline"
                    >
                      Project 2
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/johndoe/project3"
                      className="text-blue-500 hover:underline"
                    >
                      Project 3
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/johndoe/project4"
                      className="text-blue-500 hover:underline"
                    >
                      Project 4
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/johndoe/project5"
                      className="text-blue-500 hover:underline"
                    >
                      Project 5
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Connect with John</h3>
          <p className="text-xl mb-4">
            Feel free to reach out to John via the following platforms:
          </p>
          <div className="space-x-4">
            <a
              href="https://linkedin.com/in/johndoe"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/johndoe"
              className="text-blue-500 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://github.com/johndoe"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
