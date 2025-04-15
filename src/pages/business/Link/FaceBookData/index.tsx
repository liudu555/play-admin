import React from "react";
import {  PageContainer, ProCard } from "@ant-design/pro-components";
import CardContainer from "@/components/CardContainer";
import FaceBookSearch from "./components/FaceBookSearch";
import FaceBookBase from "./components/FaceBookBase";
import FaceBookTab from "./components/FaceBookTab";
import FaceBookTable from "./components/FaceBookTable";
/**
 * 获取Facebook数据
 * @returns 
 */
const FaceBookData: React.FC = () => {
  return  (
        <CardContainer title="Facebook数据">
             <FaceBookSearch />
             <FaceBookBase />
             <FaceBookTab />
        </CardContainer>
  )
};

export default FaceBookData;
