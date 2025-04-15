import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useAtom } from 'jotai';
import {  userAtom } from '@/models/atomUser';
import { useEffect } from 'react';
const HomePage: React.FC = () => {
  const [user] = useAtom(userAtom);
  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        123123
        {/* <Guide name={trim(name)} /> */}
      </div>
    </PageContainer>
  );
};

export default HomePage;
