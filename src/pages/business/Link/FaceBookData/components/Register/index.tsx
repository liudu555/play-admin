import { useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { faceBookOrderRegisterAtom } from "@/models/atomFaceBook";

/**
 * 注册组件
 */
const RegisterComponent = ({resister_people, resister_cost, index}: any) => {
    const [registerOrder, setRegisterOrder] = useAtom(faceBookOrderRegisterAtom);


    const [sortResisterPeopleTitle, setSortResisterPeopleTitle] = useState('注册人数升序');
    const [sortResisterPeopleType, setSortResisterPeopleType] = useState('asc');
    
    const [sortResisterCostTitle, setSortResisterCostTitle] = useState('注册成本升序');
    const [sortResisterCostType, setSortResisterCostType] = useState('asc');
    
    const sortResisterPeople = () => {
        setSortResisterPeopleType(sortResisterPeopleType === 'asc' ? 'desc' : 'asc');
        setSortResisterPeopleTitle(sortResisterPeopleTitle === '注册人数升序' ? '注册人数降序' : '注册人数升序');
        setRegisterOrder(sortResisterPeopleType === 'asc' ? '-resister_people' : 'resister_people');
    }
    
    const sortResisterCost = () => {
        setSortResisterCostType(sortResisterCostType === 'asc' ? 'desc' : 'asc');
        setSortResisterCostTitle(sortResisterCostTitle === '注册成本升序' ? '注册成本降序' : '注册成本升序');
        setRegisterOrder(sortResisterCostType === 'asc' ? '-register_cost' : 'register_cost');
    }

    return (
        <div className="flex items-center justify-center  bg-blue-50 border rounded-md p-2">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortResisterPeople}
            >
                <span>注册人数</span>
                <div className="flex items-center">
                    <span>{resister_people}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortResisterPeopleType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortResisterPeopleType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortResisterPeopleTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-[150px] gap-5 hover:bg-blue-100 transition-colors duration-200 cursor-pointer group relative"
                onClick={sortResisterCost}
            >
                <span>注册成本</span>
                <div className="flex items-center">
                    <span>{resister_cost || '0.00'}</span>
                    {index === 0 && (
                        <>
                            <div className="flex flex-col ml-1">
                                <CaretUpOutlined className={`text-xs ${sortResisterCostType === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} />
                                <CaretDownOutlined className={`text-xs ${sortResisterCostType === 'desc' ? 'text-blue-500' : 'text-gray-400'}`} />
                            </div>
                            <div className="absolute invisible group-hover:visible bg-[#000000] text-white shadow-lg rounded-md p-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                {sortResisterCostTitle}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegisterComponent;   