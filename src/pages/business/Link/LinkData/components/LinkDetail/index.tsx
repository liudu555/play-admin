import React, { useEffect, useState } from 'react';
import { GetLinkReportDetail } from '@/apis/facebook/linkdRequest';
interface LinkDetailProps {
    recordDetail: any;
}

const LinkDetail: React.FC<LinkDetailProps> = React.memo(({ recordDetail }) => {
    const [linkDetail, setLinkDetail] = useState<any>(null);
    const loadLinkDetail = async () => {
        const {drama_id} = recordDetail
        const {results} = await GetLinkReportDetail({id: drama_id});
        setLinkDetail(results);
    }
    useEffect(() => {
        loadLinkDetail();
    }, [recordDetail]);
  return <div>LinkDetail</div>;
});

export default LinkDetail;
