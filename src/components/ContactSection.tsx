import React from 'react';
import { Mail, MessageSquare, Phone, MapPin, Github } from 'lucide-react';
export function ContactSection() {
  const developers = [{
    name: 'Sonu Prasad Mahato',
    role: 'Lead Developer',
    image: 'https://i.ibb.co/gFwByFTz/pfpi.jpg',
    linkedin: 'https://www.linkedin.com/in/sonu-prasad23/',
    github: 'https://github.com/sonuprasad23/'
  }, {
    name: 'Srushti Patwa',
    role: 'ML Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    linkedin: 'https://www.linkedin.com/in/srushti-patwa14',
    github: 'https://github.com/sarahjohnson'
  }, {
    name: 'Gauri Pansare',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    linkedin: 'https://linkedin.com/in/michaelchen',
    github: 'https://github.com/michaelchen'
  }];
  return <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help.
          </p>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map(dev => <div key={dev.name} className="text-center">
                <div className="mb-4">
                  <img src={dev.image} alt={dev.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-emerald-500" />
                </div>
                <h4 className="text-xl font-semibold mb-1">{dev.name}</h4>
                <p className="text-gray-400 mb-3">{dev.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                    LinkedIn
                  </a>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                    GitHub
                  </a>
                </div>
              </div>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input type="text" id="name" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Your name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input type="email" id="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="your.email@example.com" />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input type="text" id="subject" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="How can we help?" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea id="message" rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-900/30 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-300">sonubab2222@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-900/30 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    {/* <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p> */}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    {/* <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-gray-300">
                      123 AI Boulevard
                      <br />
                      Tech District, CA 94103
                      <br />
                      United States
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl border border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-300 mb-6">
                Stay updated on the latest deepfake detection technology and
                connect with others interested in media authenticity.
              </p>
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600/80 hover:bg-blue-700 text-white p-2 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="mr-2" />
                  <span>Forum</span>
                </button>
                <button className="flex-1 bg-gray-700/80 hover:bg-gray-600 text-white p-2 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="mr-2" />
                  <span>Newsletter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8 mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Github className="mr-2" />
            Follow Our Project
          </h3>
          <p className="text-gray-300 mb-6">
            Stay up to date with our latest developments and contribute to our
            open-source project.
          </p>
          <a href="https://github.com/sonuprasad23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition">
            <Github className="mr-2" />
            Follow on GitHub
          </a>
        </div>
      </div>
    </section>;
}