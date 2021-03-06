import React, { Component } from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

// import components
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import { Heading6, Subtitle1, Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import RNRestart from 'react-native-restart';

// SettingsB Config
const IOS = Platform.OS === 'ios';

const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const PAYMENT_ICON = IOS ? 'ios-card' : 'md-card';

const ABOUT_ICON = IOS ? 'ios-finger-print' : 'md-finger-print';
const UPDATE_ICON = IOS ? 'ios-cloud-download' : 'md-cloud-download';
const TERMS_ICON = IOS ? 'ios-paper' : 'md-paper';

const LOGOUT_ICON = IOS ? 'ios-exit' : 'md-exit';
const check_raffles = IOS ? 'ios-checkmark-circle-outline' : 'md-checkmark-circle-outline';

// SettingsB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileContainer: {
    // height: 88
    paddingVertical: 16,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 16,
  },
  name: {
    fontWeight: '500',
    textAlign: 'left',
  },
  email: {
    paddingVertical: 2,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  sectionHeaderText: {
    textAlign: 'left',
  },
  setting: {
    height: 48
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 24,
    height: 24,
  },
});

// SectionHeader Props
type SectionHeadreProps = {
  title: string,
};

// Setting Props
type SettingProps = {
  icon: string,
  setting: string,
  type: string,
  onPress: () => {},
};

// SettingsB Components
const SectionHeader = ({ title }: SectionHeadreProps) => (
  <View style={styles.sectionHeader}>
    <Subtitle1 style={styles.sectionHeaderText}>{title}</Subtitle1>
  </View>
);

const Setting = ({ onPress, icon, setting, type }: SettingProps) => (
  <TouchableItem onPress={onPress}>
    <View style={[styles.row, styles.setting]}>
      <View style={styles.leftSide}>
        {icon !== undefined && (
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={20}
              color={
                type === 'logout' ? '#3b5998' : '#3b5998'
              }
            />
          </View>
        )}
        <Subtitle2 style={type === 'logout' && { color: '#000' }}>
          {setting}
        </Subtitle2>
      </View>
    </View>
  </TouchableItem>
);

// SetingsB
export default class SettingsB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsOn: true,
      userLogged: undefined
    };

    props.navigation.addListener('focus', async () => {
      this.getuserLogged();
    });
    this.getuserLogged();
  }

  getuserLogged = async () => {
    try {
      const userLoggedString = await AsyncStorage.getItem('@loginuser');
      const userLogged = JSON.parse(userLoggedString);
      
      this.setState({
        userLogged
      })
    } catch (e) {
      console.error(e)
    }
  }

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = (value) => {
    this.setState({
      notificationsOn: value,
    });
  };

  logout = async () => {
    const { navigation } = this.props;
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK', onPress: async () => {
            await AsyncStorage.removeItem('@showapresentation');
            await AsyncStorage.removeItem('@loginuser');
            RNRestart.Restart();
            // navigation.navigate('SignIn');
          }
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { notificationsOn, userLogged } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={'#3b5998'}
          barStyle="light-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Conta</Heading6>
          </View>

          {/* <TouchableItem useForeground onPress={this.navigateTo('EditProfile')}></TouchableItem> */}
          <TouchableItem useForeground onPress={() => { }}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>

                {
                  userLogged !== undefined &&
                  <Avatar
                    imageUri={userLogged.imagem !== null ? userLogged.imagem : require('../../assets/img/imgholder.png')}
                    size={60}
                    rounded
                  />
                }

                {userLogged !== undefined &&
                  <View style={styles.profileInfo}>
                    <Subtitle1 style={styles.name}>{userLogged.nome}</Subtitle1>
                    <Subtitle2 style={styles.email}>
                      {userLogged.email}
                    </Subtitle2>
                  </View>
                }

              </View>
            </View>
          </TouchableItem>

          {/* <SectionHeader title="Notifica????es" />
          <TouchableItem onPress={this.navigateTo('Notifications')}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  {notificationsOn ? (
                    <Icon
                      name={NOTIFICATION_ICON}
                      size={20}
                      color={Colors.primaryColor}
                    />
                  ) : (
                      <Icon
                        name={NOTIFICATION_OFF_ICON}
                        size={20}
                        color={Colors.primaryColor}
                      />
                    )}
                </View>
                <Subtitle2>Notifica????es</Subtitle2>
              </View>

              <Switch
                trackColor={{
                  true: IOS && Colors.primaryColor,
                }}
                thumbColor={IOS ? Colors.onPrimaryColor : Colors.primaryColor}
                value={notificationsOn}
                onValueChange={this.toggleNotifications}
              />
            </View>
          </TouchableItem> */}

          <SectionHeader title="Endere??o" />
          <Setting
            onPress={this.navigateTo('DeliveryAddress')}
            icon={ADDRESS_ICON}
            setting="Definir endere??o de entrega"
          />

          <SectionHeader title="Pagamentos" />
          <Setting
            onPress={this.navigateTo('FormPayment')}
            icon={PAYMENT_ICON}
            setting="Escolha o m??todo de pagamento"
          />

          {/* <SectionHeader title="Encomendas" />
          <Setting
            onPress={this.navigateTo('Orders')}
            icon={ORDERS_ICON}
            setting="Minhas Encomendas"
          /> */}

          <SectionHeader title="Sobre" />
          <Setting
            onPress={this.navigateTo('AboutUs')}
            icon={ABOUT_ICON}
            setting="Quem n??s somos"
          />

          <Setting icon={UPDATE_ICON} setting="Atualiza????es do aplicativo" />

          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={TERMS_ICON}
            setting="Termos de uso"
          />

          <SectionHeader title="Logins" />
          {/* <Setting icon={ADD_ICON} setting="Add Account" /> */}
          <Setting
            onPress={this.logout}
            icon={LOGOUT_ICON}
            setting="Log Out"
            type="logout"
          />

          <SectionHeader title="Administrador" />
          <Setting
            onPress={this.navigateTo('AcceptRaffles')}
            icon={check_raffles}
            setting="Aceite das rifas"
          />

        </ScrollView>
      </SafeAreaView>
    );
  }
}
