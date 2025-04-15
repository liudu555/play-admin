import CardContainer from "@/components/CardContainer";
import { Tabs ,TabsProps} from "antd";
import LinkSearch from "./components/LinkSerach";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: '投放链接数据',
        children: <div>投放链接数据</div>,
    },
    {
        key: '2',
        label: '投放剧名数据',
        children: <div>投放剧名数据</div>,
    },
];
/**
 * 链接数据页面
 * @returns 
 */
const LinkData: React.FC = () => {
  return (
    <CardContainer title="链接数据">
      <div>数据更新时间：2025-04-14 12:15:20</div>
      <Tabs items={items} />
      <LinkSearch />
    </CardContainer>
  );
};

export default LinkData;
