import { useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { faceBookOrderFirstDayPayRateAtom } from "@/models/atomFaceBook";
import { useAtom } from "jotai";

/**
 * 首日付费组件
 */
const PayCostComponent = ({first_day_people, first_day_pay_rate, per_capita_rate, pay_cost, index}: any) => {
    const [firstDayPayRateOrder, setFirstDayPayRateOrder] = useAtom(faceBookOrderFirstDayPayRateAtom);
    const [sortFirstDayPeopleTitle, setSortFirstDayPeopleTitle] = useState('首日人数升序');
    const [sortFirstDayPeopleType, setSortFirstDayPeopleType] = useState('asc');
    
    const [sortFirstDayPayRateTitle, setSortFirstDayPayRateTitle] = useState('首日支付率升序');
    const [sortFirstDayPayRateType, setSortFirstDayPayRateType] = useState('asc');
    
    const [sortPerCapitaRateTitle, setSortPerCapitaRateTitle] = useState('人均支付升序');
    const [sortPerCapitaRateType, setSortPerCapitaRateType] = useState('asc');
    
    const [sortPayCostTitle, setSortPayCostTitle] = useState('付费成本升序');
    const [sortPayCostType, setSortPayCostType] = useState('asc');
    
    const sortFirstDayPeople = () => {
        setSortFirstDayPeopleType(sortFirstDayPeopleType === 'asc' ? 'desc' : 'asc');
        setSortFirstDayPeopleTitle(sortFirstDayPeopleTitle === '首日人数升序' ? '首日人数降序' : '首日人数升序');
        setFirstDayPayRateOrder(sortFirstDayPeopleType === 'asc' ? '-first_day_people' : 'first_day_people');
    }
    
    const sortFirstDayPayRate = () => {
        setSortFirstDayPayRateType(sortFirstDayPayRateType === 'asc' ? 'desc' : 'asc');
        setSortFirstDayPayRateTitle(sortFirstDayPayRateTitle === '首日支付率升序' ? '首日支付率降序' : '首日支付率升序');
    }
    
    const sortPerCapitaRate = () => {
        setSortPerCapitaRateType(sortPerCapitaRateType === 'asc' ? 'desc' : 'asc');
        setSortPerCapitaRateTitle(sortPerCapitaRateTitle === '人均支付升序' ? '人均支付降序' : '人均支付升序');
        setFirstDayPayRateOrder(sortPerCapitaRateType === 'asc' ? '-per_capita_rate' : 'per_capita_rate');
    }
    
    const sortPayCost = () => {
        setSortPayCostType(sortPayCostType === 'asc' ? 'desc' : 'asc');
        setSortPayCostTitle(sortPayCostTitle === '付费成本升序' ? '付费成本降序' : '付费成本升序');
        setFirstDayPayRateOrder(sortPayCostType === 'asc' ? '-pay_cost' : 'pay_cost');
    }

    return (
        <div className="flex items-center flex-col bg-blue-50 border rounded-md p-2">
        <div className="flex gap-2 flex-col">
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortFirstDayPeople}
            >
                <span>首日人数</span>
                <div className="flex items-center">
                    <span>{first_day_people}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortFirstDayPeopleType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortFirstDayPeopleType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortFirstDayPeopleTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortFirstDayPayRate}
            >
                <span>首日支付率</span>
                <div className="flex items-center">
                    <span>{first_day_pay_rate}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortFirstDayPayRateType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortFirstDayPayRateType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortFirstDayPayRateTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortPerCapitaRate}
            >
                <span>人均支付</span>
                <div className="flex items-center">
                    <span>{per_capita_rate}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortPerCapitaRateType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortPerCapitaRateType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortPerCapitaRateTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortPayCost}
            >
                <span>付费成本</span>
                <div className="flex items-center">
                    <span>{pay_cost}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortPayCostType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortPayCostType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortPayCostTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default PayCostComponent;
