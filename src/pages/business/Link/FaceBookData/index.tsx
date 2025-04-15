import React, { useEffect, useRef, useState } from "react";
import CardContainer from "@/components/CardContainer";
import FaceBookSearch from "./components/FaceBookSearch";
import FaceBookBase from "./components/FaceBookBase";
import FaceBookTab from "./components/FaceBookTab";
import { GetAdvertisingAccountList } from "@/apis/facebook";
import { message } from "antd";



/**
 * 获取Facebook数据
 * @returns 
 */
const FaceBookData: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    start_time: string | undefined;
    end_time: string | undefined;
    page_size: string | undefined;
    page: string | undefined;
    search: string | undefined /** 广告账户ID和名称模糊查询 */
    ordering: string | undefined /** 排序字段 */
  }>({
    start_time: undefined,
    end_time: undefined,
    page_size: '10',
    page: '1',
    search: undefined,
    ordering: undefined
  });
  /** 总页数 */
  const [pageTotal, setPageTotal] = useState<number>(0);
  /** 每页条数 */
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  /** 广告账户列表 */
  const [advertisingAccountList, setAdvertisingAccountList] = useState<any[]>([]);
  /** 广告系列列表 */
  const [campaignList, setCampaignList] = useState<any[]>([]);
  /** 广告组列表 */
  const [adsetList, setAdsetList] = useState<any[]>([]);
  /** 广告列表 */
  const [adList, setAdList] = useState<any[]>([]);
  /** 当前选中的tab */
  const [currentTab, setCurrentTab] = useState<string>('1');
  /** 广告账户搜索组件ref */
  const faceBookSearchRef = useRef<any>(null);
   /** 清除搜索参数 */
   const clearSearchParams = () => {
    setSearchParams({
      start_time: undefined,
      end_time: undefined,
      page_size: '10',
      page: '1',
      search: undefined,
      ordering: undefined
    });
    setCurrentPageSize(10);
    setPageTotal(0);
  }
  /** 修改搜索参数 */
  const changeSearchParams = (params: any) => {
    console.log('params', params);
    if(!params) {
      clearSearchParams()
    } else {
      setSearchParams({...searchParams, ...params});
    }
  }


  /** 获取广告账户列表 */
  const loadAdvertisingAccountList = async () => {
    console.log('获取广告账户列表');
    try {
      const {code,data} = await GetAdvertisingAccountList(searchParams);
      if(code === 200) {
        setAdvertisingAccountList(data.results);
        setPageTotal(data.pagination.total_items);
        setCurrentPageSize(data.pagination.current_page_size);
      } else {
        throw new Error('获取广告账户列表失败');
      }
    } catch (error: any) {
      message.error(error);
    }
  }

  /** 获取广告系列列表 */
  const loadCampaignList = async () => {
    console.log('获取广告系列列表');
    
  }

  /** 获取广告组列表 */
  const loadAdsetList = async () => {
    console.log('获取广告组列表');
  }

  /** 获取广告列表 */
  const loadAdList = async () => {
    console.log('获取广告列表');
  }
  /** 切换当前选中的tab */
  const changeCurrentTab = (tab: string) =>  {
    setCurrentTab(tab);
    // 清除搜索组件参数
    faceBookSearchRef.current?.clearSearchParams();
  }
  /** 根据当前选中的tab，获取对应的数据 */
  useEffect(() => {
    if(currentTab === '1') {
      loadAdvertisingAccountList();
    } else if(currentTab === '2') {
      loadCampaignList();
    } else if(currentTab === '3') {
      loadAdsetList();
    } else if(currentTab === '4') {
      loadAdList();
    }
  }, [searchParams,currentTab])
  return  (
        <CardContainer title="Facebook数据">
             <FaceBookSearch changeSearchParams={changeSearchParams} ref={faceBookSearchRef}/>
             <FaceBookBase />
             <FaceBookTab 
              currentPageSize={currentPageSize}
              pageTotal={pageTotal}
              changePageTotal={(page,pageSize) => {
                changeSearchParams({page,page_size: pageSize});
              }}
              advertisingAccountList={advertisingAccountList}
              campaignList={campaignList}
              adsetList={adsetList}
              adList={adList}
              changeSearchParams={changeSearchParams}
              changeCurrentTab={changeCurrentTab}
              />
        </CardContainer>
  )
};

export default FaceBookData;
