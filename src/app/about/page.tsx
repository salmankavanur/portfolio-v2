"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Calendar, Mail, Phone, MapPin, Globe, Award } from "lucide-react";

// Define all component functions before using them
const ProfileDetail = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="font-medium text-foreground">{label}:</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);

const TimelineItem = ({ years, title, company, description }) => (
  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-primary/20">
    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-primary -translate-x-1/2 transform flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-background"></div>
    </div>
    <div className="space-y-3">
      <div className="bg-primary/10 text-primary font-medium inline-block text-sm px-3 py-1 rounded-full">
        {years}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-primary font-medium">{company}</p>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const SkillBar = ({ skill, percentage }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <p className="font-medium text-foreground">{skill}</p>
      <div className="flex items-center space-x-2">
        <span 
          className="text-primary font-semibold"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #3b82f6, #6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {percentage}%
        </span>
      </div>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden p-0.5">
      <div 
        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-600"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const AwardCard = ({ year, title, status }) => (
  <div className="border border-border/40 bg-background/50 p-8 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{year}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-primary font-medium">{status}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
          <motion.div
            className="absolute -top-36 -right-36 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">About Me</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Crafting <span className="text-primary">Digital Experiences</span> That Matter
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Web & Graphic Designer Based in Kerala, India with over 7 years of professional experience
              </p>
            </motion.div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-20 relative">
          <div className="container">
            <div className="grid gap-16 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 blur-lg opacity-70"></div>
                  <img
                    src="https://ext.same-assets.com/1352563405/518262652.webp"
                    alt="Salman MP - Freelance Web Designer in Malappuram"
                    className="rounded-xl w-full h-auto relative shadow-2xl border border-white/10"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-8 -right-8 bg-background/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-muted"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Experience</p>
                        <p className="text-xl font-bold text-primary">7+ <span className="text-foreground text-lg">Years</span></p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Salman MP</h2>
                  <h3 className="text-xl text-primary font-medium">Web & Graphic Designer</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Experienced and passionate Web and Graphic Designer with over 7 years of expertise in both fields.
                    My strong portfolio features a variety of design projects, including brochures, flyers, posters,
                    and social media designs. Proficient in Adobe Suite (Photoshop, Illustrator, Premiere, After Effects,
                    and InDesign) and Canva, I excel at creating visually stunning and effective marketing materials,
                    as well as modern, user-friendly websites.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileDetail icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value="hello@salmanmp.me" />
                  <ProfileDetail icon={<Phone className="h-5 w-5 text-primary" />} label="Phone" value="+91 8129489071" />
                  <ProfileDetail icon={<MapPin className="h-5 w-5 text-primary" />} label="Nationality" value="Indian" />
                  <ProfileDetail icon={<Globe className="h-5 w-5 text-primary" />} label="Language" value="Malayalam, English, Arabic" />
                  <ProfileDetail icon={<Calendar className="h-5 w-5 text-primary" />} label="Experience" value="7+ years" />
                  <ProfileDetail icon={<Award className="h-5 w-5 text-primary" />} label="Freelance" value="Available" />
                </div>
                
                <div className="pt-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="px-8 py-6 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Link href="/assets/downloads/salman-cv.pdf" target="_blank" className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Download CV
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Resume Tabs Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
          <motion.div
            className="absolute -bottom-36 -left-36 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-blue-600/5 blur-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="container relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">Professional Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                My <span className="text-primary">Resume</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive overview of my professional experience, education, and skills
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-background/70 backdrop-blur-sm rounded-2xl border border-border/40 shadow-xl p-8"
            >
              <Tabs defaultValue="experience" className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8 bg-muted/50">
                  <TabsTrigger 
                    value="about"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    About Me
                  </TabsTrigger>
                  <TabsTrigger 
                    value="experience"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="awards"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    Awards
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6 p-4">
                  <h3 className="text-xl font-semibold text-primary">Web & Graphic Designer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Experienced and passionate Web and Graphic Designer with over 7 years of expertise in both fields.
                    My strong portfolio features a variety of design projects, including brochures, flyers, posters,
                    and social media designs. Proficient in Adobe Suite (Photoshop, Illustrator, Premiere, After Effects,
                    and InDesign) and Canva, I excel at creating visually stunning and effective marketing materials,
                    as well as modern, user-friendly websites.
                  </p>
                </TabsContent>

                <TabsContent value="experience" className="mt-6 space-y-10 p-4">
                  <TimelineItem 
                    years="2021 - Present"
                    title="Media Coordinator | Senior Web & Graphic Designer"
                    company="AIC - Educational & Cultural Centre"
                    description="Currently I'm working as the Media coordinator at the most well-known educational & cultural centre based in Kerala, India. Here I have to deal with Graphic Design, Web Design, Photography, Videography, Live Telecasting and all other technical supports."
                  />
                  
                  <TimelineItem 
                    years="2020 - 2021"
                    title="Graphic Designer & Digital Marketer"
                    company="Mabco Developers"
                    description="As a Graphic Designer and Digital Marketer, I performed my level best at the Leading builders in Kerala, India."
                  />
                  
                  <TimelineItem 
                    years="2015 - 2020"
                    title="Senior Web Designer"
                    company="Alif Media Solutions"
                    description="During these years, I worked as a senior Web Designer at leading Web & Media company in kerala, India. This was a great milestone in my career journey."
                  />
                  
                  <TimelineItem 
                    years="2014 - 2015"
                    title="Web & Graphic Designer"
                    company="Freelance"
                    description="My journey began over a decade ago. During my higher secondary studies, I embarked on the web world by creating a WAP site. In those early days, I managed to gather a community with hundreds of users, marking the beginning of my exploration into the vast realm of the internet."
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-6 space-y-10 p-4">
                  <TimelineItem 
                    years="2021 - 2024"
                    title="M.A English"
                    company="Indira Gandhi National Open University"
                    description="Honed My Masters Degree: Master of Arts in English Language & Literature (Indira Gandhi National Open University, 2021-2024)"
                  />
                  
                  <TimelineItem 
                    years="2018 - 2020"
                    title="Degree in Islamic Studies"
                    company="Jamia Nooriyya Arabiyya, Kerala"
                    description="Enhanced My Understanding of Islamic Law & Ethics and Graduated from the prestigious Islamic University Jamia Nooriyya Arabiyya, Kerala, India."
                  />
                  
                  <TimelineItem 
                    years="2016 - 2019"
                    title="B.A English"
                    company="Indira Gandhi National Open University"
                    description="Honed My Bachelors Degree: Bachelor of Arts in English Language & Literature (Indira Gandhi National Open University, 2016-2019)"
                  />
                  
                  <TimelineItem 
                    years="2010 - 2013"
                    title="SSLC - Higher Secondary (Science)"
                    company="GHSS Kavanur"
                    description="Completed my Highschool & Higher Secondary studies at Government Higher Secondary School Kavanur based in Malappuram, Kerala, India"
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-6 space-y-8 p-4">
                  <SkillBar skill="Graphic Design" percentage={95} />
                  <SkillBar skill="Web Design" percentage={95} />
                  <SkillBar skill="Digital Marketing" percentage={85} />
                  <SkillBar skill="WordPress | Elementor | WPBakery" percentage={90} />
                  <SkillBar skill="Social Media Management" percentage={90} />
                  <SkillBar skill="Photography" percentage={90} />
                  <SkillBar skill="Videography" percentage={90} />
                </TabsContent>

                <TabsContent value="awards" className="mt-6 p-4">
                  <div className="grid md:grid-cols-2 gap-8">
                    <AwardCard year="2022" title="05x Developer Award" status="Runners Up" />
                    <AwardCard year="2021" title="03x Developer Award" status="Winner" />
                    <AwardCard year="2019" title="02x Developer Award" status="Winner" />
                    <AwardCard year="2018" title="01x Developer Award" status="Nominee" />
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}