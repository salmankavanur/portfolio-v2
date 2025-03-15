/**
 * This script seeds the database with sample data for development.
 * It can be run manually using:
 * bun run src/scripts/seed-data.ts
 */

import dbConnect from '../lib/db';
import User from '../models/User';
import BlogPost from '../models/BlogPost';
import PortfolioItem from '../models/PortfolioItem';
import Testimonial from '../models/Testimonial';
import { createUser } from '../lib/data/users';
import { slugify } from '../lib/slug';

// Sample blog posts
const sampleBlogPosts = [
  {
    title: 'The Importance of Responsive Design in Modern Web Development',
    excerpt: 'In today's digital landscape, responsive design isn't just a nice-to-have feature, it's an essential aspect of web development.',
    content: [
      { type: 'heading', content: 'The Importance of Responsive Design in Modern Web Development' },
      { type: 'paragraph', content: 'In today's digital landscape, responsive design isn't just a nice-to-have feature, it's an essential aspect of web development. With users accessing websites from various devices with different screen sizes, it's crucial to ensure that your website looks and functions well across all platforms.' },
      { type: 'subheading', content: 'What is Responsive Design?' },
      { type: 'paragraph', content: 'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It uses CSS media queries to adapt the layout to the viewing environment.' },
      { type: 'image', src: '/uploads/responsive-design.jpg', alt: 'Responsive design illustration', caption: 'Responsive design adapts to different screen sizes' },
      { type: 'subheading', content: 'Why is it Important?' },
      { type: 'list', items: [
        'Improved User Experience: Users can access your website from any device with ease.',
        'Better SEO Rankings: Google favors mobile-friendly websites in its search results.',
        'Cost-Effective: Building one responsive site is more cost-effective than building separate sites for different devices.',
        'Future-Proof: As new devices with different screen sizes enter the market, responsive design ensures your website will still look good.'
      ]},
      { type: 'paragraph', content: 'Implementing responsive design might seem challenging, but with modern frameworks like Bootstrap, Tailwind CSS, or Material UI, it's becoming increasingly straightforward.' },
      { type: 'quote', content: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
      { type: 'paragraph', content: 'Remember, a well-designed responsive website can significantly improve user engagement and satisfaction, leading to higher conversion rates and better business outcomes.' }
    ],
    coverImage: '/uploads/responsive-design-cover.jpg',
    category: 'Web Design',
    tags: ['Responsive Design', 'Web Development', 'UX', 'CSS', 'Mobile'],
    featured: true,
    published: true,
  },
  {
    title: 'SEO Fundamentals Every Website Owner Should Know',
    excerpt: 'Understanding the basics of SEO is essential for anyone who wants their website to be discovered online.',
    content: [
      { type: 'heading', content: 'SEO Fundamentals Every Website Owner Should Know' },
      { type: 'paragraph', content: 'Search Engine Optimization (SEO) is crucial for any website looking to attract organic traffic. Without proper SEO, even the most beautifully designed website might remain hidden in the depths of search engine results.' },
      { type: 'subheading', content: 'What is SEO?' },
      { type: 'paragraph', content: 'SEO is the practice of optimizing your website to rank higher in search engine results pages (SERPs), primarily Google. It involves various strategies and techniques aimed at making your website more attractive to search engines.' },
      { type: 'subheading', content: 'Key SEO Elements' },
      { type: 'paragraph', content: 'Let\'s explore the fundamental elements of SEO:' },
      { type: 'list', items: [
        'Keyword Research: Identifying the terms your target audience is searching for.',
        'On-Page SEO: Optimizing individual pages with relevant keywords, meta tags, and quality content.',
        'Off-Page SEO: Building backlinks and establishing authority.',
        'Technical SEO: Ensuring your website is technically sound, fast, and mobile-friendly.',
        'Content Quality: Creating valuable, relevant content that answers user queries.'
      ]},
      { type: 'image', src: '/uploads/seo-fundamentals.jpg', alt: 'SEO fundamentals diagram', caption: 'The main components of a successful SEO strategy' },
      { type: 'subheading', content: 'Common SEO Mistakes to Avoid' },
      { type: 'paragraph', content: 'Many website owners make common SEO mistakes that can harm their rankings:' },
      { type: 'list', items: [
        'Keyword Stuffing: Overusing keywords in an unnatural way.',
        'Ignoring Mobile Users: Not ensuring your site is mobile-friendly.',
        'Poor Page Speed: Having a slow-loading website.',
        'Low-Quality Content: Publishing content that doesn\'t provide value to users.',
        'Neglecting Analytics: Not tracking and analyzing your website\'s performance.'
      ]},
      { type: 'quote', content: 'Google only loves you when everyone else loves you first.', author: 'Wendy Piersall' },
      { type: 'paragraph', content: 'Remember, SEO is a long-term strategy. It takes time to see results, but the effort is worth it when you start seeing increased organic traffic and improved rankings.' }
    ],
    coverImage: '/uploads/seo-fundamentals-cover.jpg',
    category: 'Digital Marketing',
    tags: ['SEO', 'Digital Marketing', 'Keywords', 'Google', 'Traffic'],
    featured: true,
    published: true,
  },
  {
    title: 'The Role of Color Psychology in Web Design',
    excerpt: 'Colors have a profound impact on human psychology and behavior, making color choices crucial in web design.',
    content: [
      { type: 'heading', content: 'The Role of Color Psychology in Web Design' },
      { type: 'paragraph', content: 'Colors are not just aesthetic elements in web design; they play a crucial role in influencing user behavior and perceptions. Understanding color psychology can help designers create more effective and engaging websites.' },
      { type: 'subheading', content: 'Understanding Color Psychology' },
      { type: 'paragraph', content: 'Color psychology is the study of how colors affect human perception and behavior. In web design, different colors can evoke different emotions and reactions from users.' },
      { type: 'image', src: '/uploads/color-psychology.jpg', alt: 'Color psychology chart', caption: 'Common emotional associations with colors' },
      { type: 'subheading', content: 'Key Colors and Their Meanings' },
      { type: 'paragraph', content: 'Here\'s a quick overview of how different colors are typically perceived:' },
      { type: 'list', items: [
        'Red: Energy, passion, urgency, excitement',
        'Blue: Trust, calmness, stability, professionalism',
        'Green: Growth, health, tranquility, wealth',
        'Yellow: Optimism, clarity, warmth, attention',
        'Purple: Creativity, wisdom, luxury, dignity',
        'Orange: Enthusiasm, creativity, determination',
        'Black: Sophistication, power, elegance, formality',
        'White: Purity, cleanliness, simplicity, space'
      ]},
      { type: 'paragraph', content: 'It\'s important to note that cultural differences can significantly impact how colors are perceived. What works in one culture might not work in another.' },
      { type: 'subheading', content: 'Applying Color Psychology in Web Design' },
      { type: 'paragraph', content: 'When designing a website, consider these principles:' },
      { type: 'list', items: [
        'Brand Alignment: Choose colors that align with your brand personality and values.',
        'Target Audience: Consider the preferences and expectations of your target audience.',
        'Color Harmony: Use complementary colors to create visual appeal.',
        'Call-to-Action: Use contrasting colors for buttons and CTAs to make them stand out.',
        'Consistency: Maintain consistent color usage throughout your website.'
      ]},
      { type: 'quote', content: 'Color is a power which directly influences the soul.', author: 'Wassily Kandinsky' },
      { type: 'paragraph', content: 'By thoughtfully applying color psychology principles, designers can create more impactful, user-friendly websites that not only look good but also effectively communicate brand values and guide user behavior.' }
    ],
    coverImage: '/uploads/color-psychology-cover.jpg',
    category: 'Web Design',
    tags: ['Color Psychology', 'Web Design', 'UX', 'Branding', 'Visual Design'],
    featured: false,
    published: true,
  }
];

// Sample portfolio items
const samplePortfolioItems = [
  {
    title: 'Modern E-commerce Website',
    slug: 'modern-ecommerce-website',
    description: 'A fully responsive e-commerce platform built with React, Next.js, and Tailwind CSS. Features include product filtering, shopping cart, user authentication, and payment integration.',
    category: 'Web Development',
    tags: ['E-commerce', 'React', 'Next.js', 'Tailwind CSS', 'Responsive'],
    images: [
      '/uploads/ecommerce-1.jpg',
      '/uploads/ecommerce-2.jpg',
      '/uploads/ecommerce-3.jpg'
    ],
    mainImage: '/uploads/ecommerce-main.jpg',
    demoLink: 'https://example-ecommerce.com',
    behanceLink: 'https://behance.net/gallery/example-ecommerce',
    featured: true,
    completionDate: new Date('2023-11-15'),
    client: 'FashionFusion Retail',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    order: 1,
    published: true,
  },
  {
    title: 'Corporate Website Redesign',
    slug: 'corporate-website-redesign',
    description: 'Complete redesign of a corporate website for a financial services company. The project involved UX research, wireframing, and modern design implementation with a focus on lead generation and user engagement.',
    category: 'UI/UX Design',
    tags: ['Corporate', 'Finance', 'Redesign', 'UX Research', 'Lead Generation'],
    images: [
      '/uploads/corporate-1.jpg',
      '/uploads/corporate-2.jpg',
      '/uploads/corporate-3.jpg'
    ],
    mainImage: '/uploads/corporate-main.jpg',
    demoLink: 'https://finance-solutions.com',
    behanceLink: 'https://behance.net/gallery/corporate-redesign',
    featured: true,
    completionDate: new Date('2023-08-20'),
    client: 'FinanceSolutions Inc.',
    technologies: ['Adobe XD', 'HTML5', 'CSS3', 'JavaScript', 'WordPress'],
    order: 2,
    published: true,
  },
  {
    title: 'Mobile App UI Design',
    slug: 'mobile-app-ui-design',
    description: 'UI/UX design for a fitness tracking mobile application. The design focuses on clean, intuitive interfaces with gamification elements to encourage user engagement and habit formation.',
    category: 'UI/UX Design',
    tags: ['Mobile App', 'UI Design', 'Fitness', 'Gamification', 'iOS', 'Android'],
    images: [
      '/uploads/mobile-app-1.jpg',
      '/uploads/mobile-app-2.jpg',
      '/uploads/mobile-app-3.jpg'
    ],
    mainImage: '/uploads/mobile-app-main.jpg',
    behanceLink: 'https://behance.net/gallery/fitness-app-ui',
    featured: false,
    completionDate: new Date('2023-06-10'),
    client: 'FitTrack Health',
    technologies: ['Figma', 'Sketch', 'Adobe Illustrator', 'Prototyping'],
    order: 3,
    published: true,
  },
  {
    title: 'Restaurant Branding & Website',
    slug: 'restaurant-branding-website',
    description: 'Complete branding and website development for a high-end restaurant. The project included logo design, color palette, typography, menu design, and a responsive website with online reservation system.',
    category: 'Branding',
    tags: ['Restaurant', 'Branding', 'Logo Design', 'Web Development', 'Food'],
    images: [
      '/uploads/restaurant-1.jpg',
      '/uploads/restaurant-2.jpg',
      '/uploads/restaurant-3.jpg'
    ],
    mainImage: '/uploads/restaurant-main.jpg',
    demoLink: 'https://cuisine-delight.com',
    behanceLink: 'https://behance.net/gallery/restaurant-branding',
    featured: true,
    completionDate: new Date('2023-04-05'),
    client: 'Cuisine Delight',
    technologies: ['Adobe Illustrator', 'PhotoShop', 'HTML/CSS', 'JavaScript', 'PHP'],
    order: 4,
    published: true,
  }
];

// Sample testimonials
const sampleTestimonials = [
  {
    name: 'John Smith',
    role: 'CEO',
    company: 'Tech Innovations Ltd',
    location: 'New York, USA',
    avatar: '/uploads/testimonial-john.jpg',
    text: 'Working with Salman was an absolute pleasure. He understood our vision perfectly and delivered a website that exceeded our expectations. His attention to detail and commitment to quality are truly impressive.',
    rating: 5,
    featured: true,
    date: new Date('2023-12-15'),
    order: 1,
    published: true,
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Global Retail Solutions',
    location: 'London, UK',
    avatar: '/uploads/testimonial-sarah.jpg',
    text: 'I\'ve worked with many web designers, but Salman stands out with his creative approach and technical expertise. He not only built a beautiful e-commerce site for us but also provided valuable insights to improve our online presence.',
    rating: 5,
    featured: true,
    date: new Date('2023-10-20'),
    order: 2,
    published: true,
  },
  {
    name: 'Mohammed Al-Farsi',
    role: 'Founder',
    company: 'Heritage Crafts',
    location: 'Dubai, UAE',
    avatar: '/uploads/testimonial-mohammed.jpg',
    text: 'Salman transformed our outdated website into a modern, responsive platform that perfectly represents our brand. His understanding of Arabic typography and design aesthetics was particularly impressive. Highly recommended!',
    rating: 5,
    featured: true,
    date: new Date('2023-09-05'),
    order: 3,
    published: true,
  },
  {
    name: 'Priya Patel',
    role: 'Small Business Owner',
    company: 'Lotus Wellness',
    location: 'Mumbai, India',
    avatar: '/uploads/testimonial-priya.jpg',
    text: 'As a small business owner, I was looking for an affordable yet professional web solution. Salman delivered exactly what I needed - a beautiful website that\'s easy to manage. He was patient with my questions and made the whole process stress-free.',
    rating: 4,
    featured: false,
    date: new Date('2023-07-12'),
    order: 4,
    published: true,
  },
  {
    name: 'David Wilson',
    role: 'Art Director',
    company: 'Creative Vision Studios',
    location: 'Sydney, Australia',
    avatar: '/uploads/testimonial-david.jpg',
    text: 'Salman\'s design sensibility is exceptional. He created a portfolio website for our studio that perfectly balances aesthetics and functionality. His code is clean and well-structured, making future updates easy.',
    rating: 5,
    featured: false,
    date: new Date('2023-05-28'),
    order: 5,
    published: true,
  }
];

// Main seed function
async function seedData() {
  console.log('Connecting to database...');

  try {
    await dbConnect();
    console.log('Database connected.');

    // Check if sample data already exists
    const existingPostsCount = await BlogPost.countDocuments();
    const existingPortfolioCount = await PortfolioItem.countDocuments();
    const existingTestimonialsCount = await Testimonial.countDocuments();

    if (existingPostsCount > 0 || existingPortfolioCount > 0 || existingTestimonialsCount > 0) {
      console.log('Sample data already exists. Skipping seeding...');
      return;
    }

    // Seed blog posts
    console.log('Seeding blog posts...');
    for (const post of sampleBlogPosts) {
      await BlogPost.create({
        ...post,
        slug: slugify(post.title),
        date: new Date(),
        views: Math.floor(Math.random() * 1000)
      });
    }
    console.log(`✅ ${sampleBlogPosts.length} blog posts created`);

    // Seed portfolio items
    console.log('Seeding portfolio items...');
    for (const item of samplePortfolioItems) {
      await PortfolioItem.create(item);
    }
    console.log(`✅ ${samplePortfolioItems.length} portfolio items created`);

    // Seed testimonials
    console.log('Seeding testimonials...');
    for (const testimonial of sampleTestimonials) {
      await Testimonial.create(testimonial);
    }
    console.log(`✅ ${sampleTestimonials.length} testimonials created`);

    console.log('Sample data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedData();
