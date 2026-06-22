import designImg from '../assets/works/design.webp';
import webImg from '../assets/works/web.webp';
import videoImg from '../assets/works/video.webp';
import othersImg from '../assets/works/others.webp';

export const projects = [
  {
    id: '01',
    title: 'UI & Design',
    category: 'Creative Conference',
    year: '2025',
    image: designImg,
    desc: "Exploring the depths of visual aesthetics and user interfaces.",
    color: "#f2982d",
    selected: true,
    link: '/works/design'
  },
  {
    id: '02',
    title: 'Dev & Projects',
    category: 'Creativity at Work',
    year: '2025',
    image: webImg,
    desc: "Building functional and impactful digital experiences.",
    color: "#3bc6c3",
    selected: true,
    link: '/works/dev'
  },
  {
    id: '03',
    title: 'Video Production',
    category: 'Creative Progress',
    year: '2025',
    image: videoImg,
    desc: "Telling stories through motion and cinematic visuals.",
    color: "#4e7ab5",
    selected: true,
    link: '/works/video'
  },
  {
    id: '04',
    title: 'Other Explorations',
    category: 'Creativity in Ideas',
    year: '2025',
    image: othersImg,
    desc: "A collection of miscellaneous creative experiments.",
    color: "#e64390",
    selected: true,
    link: '/works/others'
  }
]
