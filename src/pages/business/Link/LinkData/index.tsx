import CardContainer from "@/components/CardContainer";
import LinkSearch from "./components/LinkSerach";
import LinkTable from "./components/LinkTable";
import { useState, useRef, useEffect } from "react";
import LinkCard from "./components/LinkCard"; 
import LinkTabs from "./components/LinkTabs";
import { GetLinkReportList } from "@/apis/facebook/linkdRequest";
import { message } from "antd";
/**
 * 链接数据页面
 * @returns 
 */
const LinkData: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    start_time?: string;
    end_time?: string;
    page?: string;
    page_size?: string;
  }>({
    page: '1',  
    page_size: '10',
    start_time: undefined,
    end_time: undefined,
  });
  /** 当前页码 */
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  /** 总页数 */
  const [pageTotal, setPageTotal] = useState<number>(0);
  /** 链接搜索组件ref */
  const linkSearchRef = useRef<any>(null);

  /** 链接数据列表 */
  const [linkDataList, setLinkDataList] = useState<any[]>([]);

  const clearSearchParams = () => {
    setSearchParams({
      start_time: undefined,
      end_time: undefined,
      page_size: '10',
      page: '1',
    });
    setCurrentPageSize(10);
    setPageTotal(0);
  }
  /** 改变搜索参数 */
  const changeSearchParams = (params: any) => {
    if(!params) {
      clearSearchParams()
    } else {
      setSearchParams({...searchParams, ...params});
    }
  }
  /** 加载链接数据 */
  const loadLinkData = async () => {
    try {
      const {results,pagination} = await GetLinkReportList(searchParams);
      if(results) {
        setLinkDataList(results);
        setPageTotal(pagination.total_items);
        setCurrentPageSize(pagination.current_page_size);
      } else {
        message.error("获取链接数据失败");
      }
    } catch (error: any) {
      message.error(error);
    }
  }
  useEffect(() => {
    loadLinkData();
  }, [searchParams]);

  return (
    <CardContainer title="链接数据">
      <div className="pb-5 font-bold text-lg">数据更新时间：{new Date().toLocaleString()}</div>
      <LinkSearch ref={linkSearchRef} changeSearchParams={changeSearchParams} />
      <LinkTabs 
        linkDataList={linkDataList}
        currentPageSize={currentPageSize}
        pageTotal={pageTotal}
        changeSearchParams={changeSearchParams}
        changePageTotal={(page, pageSize) => {
          changeSearchParams({page, page_size: pageSize});
        }}
      />
    </CardContainer>
  );
};

export default LinkData;
