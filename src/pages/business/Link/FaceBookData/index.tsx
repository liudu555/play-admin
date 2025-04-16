import React, { useEffect, useRef, useState } from "react";
import CardContainer from "@/components/CardContainer";
import FaceBookSearch from "./components/FaceBookSearch";
import FaceBookBase from "./components/FaceBookBase";
import FaceBookTab from "./components/FaceBookTab";
import { GetAdvertisingAccountList, GetCampaignList, GetAdsetList, GetAdList, GetSummaryData } from "@/apis/facebook";
import { message } from "antd";
import AdvertisingType from "./enum";
import { faceBookOrderRegisterAtom, faceBookOrderPaySubAtom, faceBookOrderFirstDayPayRateAtom } from "@/models/atomFaceBook";
import { useAtom } from "jotai";

/**
 * 获取Facebook数据
 * @returns JSX.Element
 */
const FaceBookData: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    start_time: string | undefined;
    end_time: string | undefined;
    page_size: string | undefined;
    page: string | undefined;
    search: string | undefined /** 广告账户ID和名称模糊查询 */
    ordering: string | undefined /** 排序字段 */
    account_id: string | undefined /** 广告账户ID */
    campaign_id: string | undefined /** 广告系列ID */
    adset_id: string | undefined /** 广告组ID */
  }>({
    start_time: undefined,
    end_time: undefined,
    page_size: '10',
    page: '1',
    search: undefined,
    ordering: undefined,
    account_id: undefined,
    campaign_id: undefined,
    adset_id: undefined
  });
  const [registerOrder, setRegisterOrder] = useAtom(faceBookOrderRegisterAtom);
  const [paySubOrder, setPaySubOrder] = useAtom(faceBookOrderPaySubAtom);
  const [firstDayPayRateOrder, setFirstDayPayRateOrder] = useAtom(faceBookOrderFirstDayPayRateAtom);
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
  /** 汇总数据 */
  const [summaryData, setSummaryData] = useState<any>(undefined);
  /** 当前选中的tab */
  const [currentTab, setCurrentTab] = useState<string>(AdvertisingType.ACCOUNT);
  /** 广告账户搜索组件ref */
  const faceBookSearchRef = useRef<any>(null);
  useEffect(() => {
    changeSearchParams({ordering: registerOrder});
  }, [registerOrder])
  useEffect(() => {
    changeSearchParams({ordering: paySubOrder});
  }, [paySubOrder])
  useEffect(() => {
    changeSearchParams({ordering: firstDayPayRateOrder});
  }, [firstDayPayRateOrder])
  /** 清除搜索参数 */
  const clearSearchParams = () => {
    setSearchParams({
      start_time: undefined,
      end_time: undefined,
      page_size: '10',
      page: '1',
      search: undefined,
      ordering: undefined,
      account_id: undefined,
      campaign_id: undefined,
      adset_id: undefined
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

  /** 获取汇总数据 */
  const loadSummaryData = async () => {
    let tab = ''
    if(currentTab === AdvertisingType.ACCOUNT) {
        tab = 'account'
      } else if(currentTab === AdvertisingType.CAMPAIGN) {
        tab = 'campaign'
      } else if(currentTab === AdvertisingType.ADSET) {
        tab = 'adset'
      } else if(currentTab === AdvertisingType.AD) {
        tab = 'ad'
      }
      try {
        const {code,data} = await GetSummaryData({
          start_time: searchParams.start_time,
          end_time: searchParams.end_time,
          search: searchParams.search,
          tab,
        });
        if(code === 200) {
          setSummaryData(data);
        } else {
          throw new Error('获取汇总数据失败');
        }
      } catch (error: any) {
        message.error(error);
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
    try {
      const {code,data} = await GetCampaignList(searchParams);
      if(code === 200) {
        setCampaignList(data.results);
        setPageTotal(data.pagination.total_items);
        setCurrentPageSize(data.pagination.current_page_size);
      } else {
        throw new Error('获取广告系列列表失败');
      }
    } catch (error: any) {
      message.error(error);
    }
  }

  /** 获取广告组列表 */
  const loadAdsetList = async () => {
    console.log('获取广告组列表');
    try {
      const {code,data} = await GetAdsetList(searchParams);
      if(code === 200) {
        setAdsetList(data.results);
        setPageTotal(data.pagination.total_items);
        setCurrentPageSize(data.pagination.current_page_size);
      } else {
        throw new Error('获取广告组列表失败');
      }
    } catch (error: any) {
      message.error(error);
    }
  }

  /** 获取广告列表 */
  const loadAdList = async () => {
    console.log('获取广告列表');
    try {
      const {code,data} = await GetAdList(searchParams);
      if(code === 200) {
        setAdList(data.results);
        setPageTotal(data.pagination.total_items);
        setCurrentPageSize(data.pagination.current_page_size);
      } else {
        throw new Error('获取广告列表失败');
      }
    } catch (error: any) {
      message.error(error);
    }
  }

  /** 切换当前选中的tab */
  const changeCurrentTab = (tab: string,queryType: string) =>  {
    if(queryType === 'common') {
          // 清除搜索组件参数
      faceBookSearchRef.current?.clearSearchParams();
    }
    // if(queryType === 'route') {

    // }
    setCurrentTab(tab);
  }

  /** 根据当前选中的tab，获取对应的数据 */
  useEffect(() => {
    if(currentTab === AdvertisingType.ACCOUNT) {
      loadAdvertisingAccountList();
    } else if(currentTab === AdvertisingType.CAMPAIGN) {
      loadCampaignList();
    } else if(currentTab === AdvertisingType.ADSET) {
      loadAdsetList();
    } else if(currentTab === AdvertisingType.AD) {
      loadAdList();
    }
    loadSummaryData();
  }, [searchParams,currentTab])

  return (
    <CardContainer title="Facebook数据">
      <FaceBookSearch 
        changeSearchParams={changeSearchParams} 
        ref={faceBookSearchRef}
      />
      <FaceBookBase summaryData={summaryData} />
      <FaceBookTab 
        currentPageSize={currentPageSize}
        pageTotal={pageTotal}
        changeSearchParams={changeSearchParams}
        changePageTotal={(page,pageSize) => {
          changeSearchParams({page,page_size: pageSize});
        }}
        advertisingAccountList={advertisingAccountList}
        campaignList={campaignList}
        adsetList={adsetList}
        adList={adList}
        changeCurrentTab={changeCurrentTab}       
      />
    </CardContainer>
  );
};

export default FaceBookData;
