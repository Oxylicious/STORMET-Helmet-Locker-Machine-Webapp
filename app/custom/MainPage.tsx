import MyBox from "@/components/custom/MyBox";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useC } from "@/hooks/useReactHooks";
import { FHContext } from "../templates/FH_Wrapper";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { device } = useC(FHContext);

  return (
    <PageContainer>
      <p className="t95">Helmet Machine</p>

      <div className="grid grid-cols-2 gap-10">
        <MyBox slot={1} available={device?.s1 === true} />
        <MyBox slot={2} available={device?.s2 === true} />
        <MyBox slot={3} available={device?.s3 === true} />
        <MyBox slot={4} available={device?.s4 === true} />
        <MyBox slot={5} available={device?.s5 === true} />
        <MyBox slot={6} available={device?.s6 === true} />
      </div>
      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;
