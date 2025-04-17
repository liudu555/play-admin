import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { faceBookOrderPaySubAtom } from "@/models/atomFaceBook";
import { useSetAtom } from "jotai";

/**
 * 充值订阅组件
 */
const PaySubComponent = ({pay_people, total_pay_rate, weekly_subscribers_people, month_subscribers_people, year_subscribers_people, subscribers_rate, index}: any) => {
    const setPaySubOrder = useSetAtom(faceBookOrderPaySubAtom);
    const [sortPayPeopleTitle, setSortPayPeopleTitle] = useState('支付人数升序');
    const [sortPayPeopleType, setSortPayPeopleType] = useState('asc');

    const [sortTotalPayRateTitle, setSortTotalPayRateTitle] = useState('总支付率升序');
    const [sortTotalPayRateType, setSortTotalPayRateType] = useState('asc');

    const [sortWeeklySubscribersTitle, setSortWeeklySubscribersTitle] = useState('周订阅人数升序');
    const [sortWeeklySubscribersType, setSortWeeklySubscribersType] = useState('asc');

    const [sortMonthSubscribersTitle, setSortMonthSubscribersTitle] = useState('月订阅人数升序');   
    const [sortMonthSubscribersType, setSortMonthSubscribersType] = useState('asc');

    const [sortYearSubscribersTitle, setSortYearSubscribersTitle] = useState('年订阅人数升序');
    const [sortYearSubscribersType, setSortYearSubscribersType] = useState('asc');

    const [sortSubscribersRateTitle, setSortSubscribersRateTitle] = useState('总订阅率升序');
    const [sortSubscribersRateType, setSortSubscribersRateType] = useState('asc');

    const sortPayPeople = () => {
        setSortPayPeopleType(sortPayPeopleType === 'asc' ? 'desc' : 'asc');
        setSortPayPeopleTitle(sortPayPeopleTitle === '支付人数升序' ? '支付人数降序' : '支付人数升序');
        setPaySubOrder(sortPayPeopleType === 'asc' ? '-pay_people' : 'pay_people');
    }

    const sortTotalPayRate = () => {
        setSortTotalPayRateType(sortTotalPayRateType === 'asc' ? 'desc' : 'asc');
        setSortTotalPayRateTitle(sortTotalPayRateTitle === '总支付率升序' ? '总支付率降序' : '总支付率升序');
    }

    const sortWeeklySubscribers = () => {
        setSortWeeklySubscribersType(sortWeeklySubscribersType === 'asc' ? 'desc' : 'asc');
        setSortWeeklySubscribersTitle(sortWeeklySubscribersTitle === '周订阅人数升序' ? '周订阅人数降序' : '周订阅人数升序');
        setPaySubOrder(sortWeeklySubscribersType === 'asc' ? '-weekly_subscribers_people' : 'weekly_subscribers_people');
    }

    const sortMonthSubscribers = () => {
        setSortMonthSubscribersType(sortMonthSubscribersType === 'asc' ? 'desc' : 'asc');
        setSortMonthSubscribersTitle(sortMonthSubscribersTitle === '月订阅人数升序' ? '月订阅人数降序' : '月订阅人数升序');
    }

    const sortYearSubscribers = () => {
        setSortYearSubscribersType(sortYearSubscribersType === 'asc' ? 'desc' : 'asc');
        setSortYearSubscribersTitle(sortYearSubscribersTitle === '年订阅人数升序' ? '年订阅人数降序' : '年订阅人数升序');
        setPaySubOrder(sortYearSubscribersType === 'asc' ? '-year_subscribers_people' : 'year_subscribers_people');
    }

    const sortSubscribersRate = () => {
        setSortSubscribersRateType(sortSubscribersRateType === 'asc' ? 'desc' : 'asc');
        setSortSubscribersRateTitle(sortSubscribersRateTitle === '总订阅率升序' ? '总订阅率降序' : '总订阅率升序');
        setPaySubOrder(sortSubscribersRateType === 'asc' ? '-subscribers_rate' : 'subscribers_rate');
    }

    return (
        <div className="flex items-center justify-center  bg-blue-50 border rounded-md p-2">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortPayPeople}
            >
                <span>支付人数</span>
                <div className="flex items-center">
                    <span>{pay_people}</span>
                    {
                        index === 0 && (
                            <>
                                <div className="flex flex-col ml-1">
                                    <CaretUpOutlined className={`text-xs ${sortPayPeopleType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortPayPeopleType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                              <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                              {sortPayPeopleTitle}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortTotalPayRate}
            >
                <span>总支付率</span>
                <div className="flex items-center">
                    <span>{total_pay_rate + '%'}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortTotalPayRateType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortTotalPayRateType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortTotalPayRateTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortWeeklySubscribers}
            >
                <span>周订阅人数</span>
                <div className="flex items-center">
                    <span>{weekly_subscribers_people}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortWeeklySubscribersType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortWeeklySubscribersType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortWeeklySubscribersTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortMonthSubscribers}
            >
                <span>月订阅人数</span>
                <div className="flex items-center">
                    <span>{month_subscribers_people}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortMonthSubscribersType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortMonthSubscribersType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortMonthSubscribersTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortYearSubscribers}
            >
                <span>年订阅人数</span>
                <div className="flex items-center">
                    <span>{year_subscribers_people}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortYearSubscribersType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortYearSubscribersType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortYearSubscribersTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[160px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortSubscribersRate}
            >
                <span>总订阅率</span>
                <div className="flex items-center">
                    <span>{subscribers_rate + '%'}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortSubscribersRateType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortSubscribersRateType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortSubscribersRateTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default PaySubComponent;