import Hero from "../components/Home/Hero";
import Classes from "./../components/Home/Classes";
import JoinCourse from "./../components/Home/JoinCourse";
import Lessons from "./../components/Home/Lessons";
import NewsLetter from "./../components/newsbox/NewsLetter";
const Index = () => {
  return (
    <div className='App'>
      <Hero />
      <Classes />
      <Lessons />
      <JoinCourse />
      <NewsLetter />
    </div>
  );
};

export default Index;
