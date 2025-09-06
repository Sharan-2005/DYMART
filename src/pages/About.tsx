import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail, Users, Target, Award } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sharan Suvarna",
      role: "Btech IT",
      rollNumber: "23IT1014",
      image: "/images/sharan.jpg", 
      github: "https://github.com/Sharan-2005",
      linkedin: "https://www.linkedin.com/in/sharan-suvarna-043128289/",
      instagram: "https://www.instagram.com/sharan_suvarna2005/"
    },
    {
      id: 2,
      name: "Vishal Tilokani", 
      role: "Btech IT",
      rollNumber: "23IT1030",
      image: "/images/vishal.jpg", 
      github: "https://github.com/vishaltilokani",
      linkedin: "https://www.linkedin.com/in/vishal-tilokani-55b934282/",
      instagram: "https://www.instagram.com/wanderinglupine/"
    },
    {
      id: 3,
      name: "Vinit Yadav",
      role: "Btech IT",
      rollNumber: "23IT1037", 
      image: "/images/vinit.jpg", 
      github: "https://github.com/vinittyadav",
      linkedin: "https://www.linkedin.com/in/vinit-yadav-487063289/",
      instagram: "https://www.instagram.com/vinittt.4149/"
    },
    {
      id: 4,
      name: "Vedant Gadhave",
      role: "Btech IT",
      rollNumber: "23IT1062",
      image: "/images/vedant.jpg", 
      github: "https://github.com/Vedant100730",
      linkedin: "https://www.linkedin.com/in/vedant-gadhave-555809288/",
      instagram: "https://www.instagram.com/ve.dant_300/"
    }
  ];
  const stats = [
    { icon: Users, value: "10+", label: "Happy Customers" },
    { icon: Target, value: "20+", label: "Products" },
    { icon: Award, value: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About DY MART</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Your trusted e-commerce platform built by passionate students, 
            delivering quality products and exceptional shopping experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At DY MART, we're revolutionizing the e-commerce experience by combining 
                cutting-edge technology with personalized service. Our platform leverages 
                machine learning to understand your preferences and deliver tailored 
                recommendations that make shopping effortless and enjoyable.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Built with modern technologies including React-Vite, TypeScript, and Supabase, 
                our platform ensures fast, secure, and reliable shopping experiences 
                for customers across multiple categories.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-card shadow-hover">
                <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>AI-powered product recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Fast and reliable delivery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Wide range of product categories</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A dedicated team of B1 batch students passionate about creating 
              innovative e-commerce solutions that make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-hover transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Roll No: {member.rollNumber}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"  
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-muted-foreground hover:text-sale" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages the latest technologies to deliver a fast, 
              secure, and scalable e-commerce experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">VITE</span>
              </div>
              <h3 className="font-semibold mb-2">React-Vite</h3>
              <p className="text-sm text-muted-foreground">Frontend Framework</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-success-foreground font-bold text-2xl">TS</span>
              </div>
              <h3 className="font-semibold mb-2">TypeScript</h3>
              <p className="text-sm text-muted-foreground">Backend API</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-warning rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-warning-foreground font-bold text-2xl">SB</span>
              </div>
              <h3 className="font-semibold mb-2">Supabase</h3>
              <p className="text-sm text-muted-foreground">Database & Auth</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-hover transition-all duration-300">
              <div className="w-16 h-16 bg-sale rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-sale-foreground font-bold text-2xl">SIGN</span>
              </div>
              <h3 className="font-semibold mb-2">User Authentication</h3>
              <p className="text-sm text-muted-foreground">Sign in and Sign up</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Have questions about DY MART? We'd love to hear from you.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90" size="lg">
            <Mail className="w-5 h-5 mr-2" />
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;