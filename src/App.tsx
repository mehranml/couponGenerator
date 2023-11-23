import {SafeAreaProvider as SafeArea} from 'react-native-safe-area-context';
// @ts-ignore
import fa from 'moment/locale/fa';
import moment from 'moment-jalaali';

import {CouponsRealmContext} from '@src/models';
import Navigation from '@src/navigation';
import Theme from '@src/theme';

const {RealmProvider} = CouponsRealmContext;
moment.updateLocale('fa', fa);
moment.loadPersian();
const App = () => (
  <SafeArea>
    <RealmProvider deleteRealmIfMigrationNeeded>
      <Theme>
        <Navigation />
      </Theme>
    </RealmProvider>
  </SafeArea>
);

export default App;
