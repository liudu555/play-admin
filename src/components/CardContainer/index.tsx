import { PageContainer } from "@ant-design/pro-components";
import { ReactNode } from "react";

/**
 * 卡片容器
 * @param param0 
 * @returns 
 */
interface CardContainerProps {
    children: ReactNode;
    title: string;
}
const CardContainer: React.FC<CardContainerProps> = ({ children, title }) => {
  return <div className="bg-[#f5f4f9] min-h-[calc(100vh-56px)]">
    <div className="m-4 bg-white rounded-md h-full">
        <PageContainer title={title}>
            {children}
        </PageContainer>
    </div>
  </div>;
};

export default CardContainer;
